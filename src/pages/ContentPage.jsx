import { useState } from 'react'
import { CalendarDays, Check, ChevronDown, ExternalLink, Filter, MoreHorizontal, Pencil, Plus, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { contentStatuses, formatScheduledDate } from '../contentWorkflow.js'

const columns = [
  { id: 'idea', label: 'Idea', hint: 'No ideas at this stage yet' },
  { id: 'scripting', label: 'Scripting', hint: 'No scripts have been prepared yet' },
  { id: 'recording', label: 'Recording', hint: 'No content has been recorded yet' },
  { id: 'editing', label: 'Editing', hint: 'No content is under review yet' },
  { id: 'ready', label: 'Ready', hint: 'No content is ready to publish yet' },
  { id: 'published', label: 'Published', hint: 'No content has been published yet' },
]

const platformLabels = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
}

const formats = ['Short video', 'Long video', 'Carousel', 'Single post']
const priorities = ['Low', 'Medium', 'High']
const metricLabels = { views: 'Views', likes: 'Likes', comments: 'Comments', shares: 'Shares' }

function createDraft(content = {}, channels = []) {
  return {
    id: content.id,
    title: content.title || '',
    concept: content.concept || '',
    channelId: content.channelId || channels[0]?.id || '',
    format: content.format || formats[0],
    priority: content.priority || 'Medium',
    status: content.status || 'idea',
    scheduledDate: content.scheduledDate || '',
    script: content.script || '',
    productionChecklist: content.productionChecklist || [],
    draftUrl: content.draftUrl || '',
    reviewNotes: content.reviewNotes || '',
    publishedUrl: content.publishedUrl || '',
  }
}

function isValidHttpUrl(value) {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol)
  } catch {
    return false
  }
}

function ContentPage({ contents, channels, onAddContent, onUpdateContent, onDeleteContent, onSaveMetrics, role = 'creator' }) {
  const [activeDraft, setActiveDraft] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [channelFilter, setChannelFilter] = useState('all')
  const [formatFilter, setFormatFilter] = useState('all')
  const [newChecklistTask, setNewChecklistTask] = useState('')
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [activeMetricContent, setActiveMetricContent] = useState(null)
  const [metricValues, setMetricValues] = useState({})
  const [metricError, setMetricError] = useState('')
  const [isSavingMetrics, setIsSavingMetrics] = useState(false)

  const isNewContent = activeDraft?.id === undefined
  const draftStageIndex = activeDraft ? contentStatuses.findIndex((item) => item.value === activeDraft.status) : 0
  const isAdmin = role === 'admin'
  const isCreator = role === 'creator'
  const isEditor = role === 'editor'
  const canCreate = !isEditor
  const canEditDetails = isAdmin || isCreator || (isEditor && activeDraft && draftStageIndex >= 2)
  const selectableStatuses = contentStatuses.filter((status, index) => {
    if (isEditor && index < 2) return status.value === activeDraft?.status
    if (isEditor && index === 5) return false
    return index <= draftStageIndex + 1
  })

  const filteredContents = contents.filter((content) => {
    const matchesText = `${content.title} ${content.concept || ''} ${content.ownerName || ''}`.toLowerCase().includes(searchText.trim().toLowerCase())
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter
    const matchesChannel = channelFilter === 'all' || String(content.channelId) === channelFilter
    const matchesFormat = formatFilter === 'all' || content.format === formatFilter
    return matchesText && matchesStatus && matchesChannel && matchesFormat
  })

  function openNewForm() {
    if (!canCreate) return
    setFormError('')
    setNewChecklistTask('')
    setActiveDraft(createDraft({}, channels))
  }

  function openEditForm(content) {
    if (content.status === 'published') return
    setFormError('')
    setNewChecklistTask('')
    setActiveDraft(createDraft(content, channels))
  }

  function updateDraft(field, value) {
    setFormError('')
    setActiveDraft((current) => ({ ...current, [field]: value }))
  }

  function updateChecklistItem(index, field, value) {
    setActiveDraft((current) => ({
      ...current,
      productionChecklist: current.productionChecklist.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item),
    }))
  }

  function addChecklistItem() {
    const task = newChecklistTask.trim()
    if (!task) {
      setFormError('A checklist task name is required.')
      return
    }
    setActiveDraft((current) => ({
      ...current,
      productionChecklist: [...current.productionChecklist, { id: null, task: task.trim(), completed: false }],
    }))
    setNewChecklistTask('')
    setFormError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSaving) return
    const targetIndex = contentStatuses.findIndex((item) => item.value === activeDraft.status)
    const originalContent = contents.find((content) => content.id === activeDraft.id)
    const currentIndex = isNewContent ? 0 : contentStatuses.findIndex((item) => item.value === originalContent?.status)

    if (!activeDraft.title.trim()) {
      setFormError('A content title is required.')
      return
    }
    if (!channels.some((channel) => String(channel.id) === String(activeDraft.channelId))) {
      setFormError('Select a connected channel first.')
      return
    }
    if (!isNewContent && targetIndex < currentIndex) {
      setFormError('A content item cannot move to an earlier stage.')
      return
    }
    if (targetIndex > currentIndex + 1) {
      setFormError('Content must progress through each stage in order.')
      return
    }
    if (targetIndex >= 1 && (!activeDraft.script.trim() || !activeDraft.scheduledDate)) {
      setFormError('Add a script and scheduled date before moving beyond the Idea stage.')
      return
    }
    if (targetIndex >= 3 && targetIndex > currentIndex
      && (!activeDraft.productionChecklist.length || activeDraft.productionChecklist.some((item) => !item.task.trim() || !item.completed))) {
      setFormError('Add production tasks and complete every checklist item before moving to Editing.')
      return
    }
    if (targetIndex >= 4 && targetIndex > currentIndex
      && (!isValidHttpUrl(activeDraft.draftUrl) || !activeDraft.reviewNotes.trim())) {
      setFormError('Add a valid draft link and review notes before marking content as Ready to publish.')
      return
    }
    if (activeDraft.draftUrl && !isValidHttpUrl(activeDraft.draftUrl)) {
      setFormError('The draft link must be a valid HTTP or HTTPS URL.')
      return
    }
    if (targetIndex === 5 && !isValidHttpUrl(activeDraft.publishedUrl)) {
      setFormError('A valid HTTP or HTTPS publication URL is required before publishing content.')
      return
    }

    setIsSaving(true)
    setFormError('')
    try {
      if (isNewContent) await onAddContent(activeDraft)
      else await onUpdateContent(activeDraft)
      setActiveDraft(null)
    } catch (error) {
      setFormError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(content) {
    if (!window.confirm(`Delete "${content.title}"? Its checklist and metrics will also be deleted.`)) return
    try {
      await onDeleteContent(content.id)
      if (activeDraft?.id === content.id) setActiveDraft(null)
    } catch (error) {
      setFormError(error.message)
    }
  }

  function openMetricForm(content) {
    setActiveMetricContent(content)
    setMetricValues({ ...content.metrics })
    setMetricError('')
  }

  async function handleMetricSubmit(event) {
    event.preventDefault()
    if (Object.values(metricValues).some((value) => value === '' || !Number.isSafeInteger(Number(value)) || Number(value) < 0 || Number(value) > 2147483647)) {
      setMetricError('Enter a non-negative whole number for each metric.')
      return
    }
    setIsSavingMetrics(true)
    setMetricError('')
    try {
      await onSaveMetrics(activeMetricContent.id, metricValues)
      setActiveMetricContent(null)
    } catch (error) {
      setMetricError(error.message)
    } finally {
      setIsSavingMetrics(false)
    }
  }

  return (
    <div className="content-page">
      <section className="board-toolbar">
        <div className="board-task-count"><strong>{filteredContents.length} items</strong><span className="board-online-dot" /></div>
        {canCreate && <button className="board-add-button" type="button" onClick={openNewForm} disabled={!channels.length}><Plus size={15} /> Add idea</button>}
        {!canCreate && <div className="role-board-note">Editor: view all Creator content; manage it from the Recording stage onward</div>}
        <div className="board-toolbar-spacer" />
        <label className="board-search">
          <Search size={15} />
          <input type="search" aria-label="Search content" placeholder="Search titles or concepts..." value={searchText} onChange={(event) => setSearchText(event.target.value)} />
        </label>
        <label className="board-select-control">
          <Filter size={14} />
          <select aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All statuses</option>
            {contentStatuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
          </select>
          <ChevronDown size={13} />
        </label>
        <label className="board-select-control">
          <select aria-label="Filter by channel" value={channelFilter} onChange={(event) => setChannelFilter(event.target.value)}>
            <option value="all">All channels</option>
            {channels.map((channel) => <option key={channel.id} value={String(channel.id)}>{platformLabels[channel.platform]} · {channel.handle_name}</option>)}
          </select>
          <ChevronDown size={13} />
        </label>
        <label className="board-select-control">
          <select aria-label="Filter by format" value={formatFilter} onChange={(event) => setFormatFilter(event.target.value)}>
            <option value="all">All formats</option>
            {formats.map((format) => <option key={format} value={format}>{format}</option>)}
          </select>
          <ChevronDown size={13} />
        </label>
        <button className="board-tool-button" type="button" onClick={() => {
          setSearchText('')
          setStatusFilter('all')
          setChannelFilter('all')
          setFormatFilter('all')
        }}><SlidersHorizontal size={14} /> Reset filters</button>
      </section>

      {channels.length === 0 && (
        <p className="workflow-form-error" role="status">Add a channel from the profile menu before creating content.</p>
      )}

      <section className="kanban-board" aria-label="Content workflow board">
        {columns.map((column) => {
          const columnContents = filteredContents.filter((content) => content.status === column.id)
          return (
            <section className="kanban-column" key={column.id}>
              <header className="kanban-column-header"><div><h2>{column.label}</h2><span>{columnContents.length}</span></div></header>
              <div className="kanban-card-list">
                {columnContents.map((content, index) => {
                  const stage = contentStatuses.find((item) => item.value === content.status) || contentStatuses[0]
                  return (
                    <article className={`kanban-card kanban-card-tone-${(Number(content.id) + index) % 4}`} key={content.id}>
                      <div className="kanban-card-topline">
                        <span><CalendarDays size={12} />{content.date}</span>
                        {content.status !== 'published' && (isAdmin || isCreator || isEditor) && (
                          <button type="button" aria-label={`Edit ${content.title}`} onClick={() => openEditForm(content)}><MoreHorizontal size={16} /></button>
                        )}
                      </div>
                      <h3>{content.title}</h3>
                      {content.ownerName && <p className="kanban-card-description">Created by: {content.ownerName}</p>}
                      {content.concept && <p className="kanban-card-description">{content.concept}</p>}
                      <p className="kanban-card-description">{content.format} · {content.channel} {content.channelHandle}</p>
                      <div className="kanban-card-footer">
                        <span className={`kanban-priority priority-${content.priority.toLowerCase()}`}>{content.priority} priority</span>
                        <span className={`kanban-status-chip ${stage.color}`}>{stage.label}</span>
                      </div>
                      {content.status === 'published' && content.publishedUrl && (
                        <a className="kanban-published-link" href={content.publishedUrl} target="_blank" rel="noreferrer"><ExternalLink size={11} /> View published content</a>
                      )}
                      {content.status === 'published' && (
                        <button className="kanban-edit-button" type="button" onClick={() => openMetricForm(content)}>Record metrics</button>
                      )}
                      {content.status === 'published' && <span className="kanban-locked-label">Details are locked after publishing</span>}
                      {content.status !== 'published' && (
                        <div className="kanban-card-actions">
                          <button className="kanban-edit-button" type="button" onClick={() => openEditForm(content)}>
                            {isEditor && ['idea', 'scripting'].includes(content.status) ? 'View content' : <><Pencil size={12} /> Manage content</>}
                          </button>
                          {(isAdmin || isCreator) && <button className="kanban-edit-button" type="button" onClick={() => handleDelete(content)} aria-label={`Delete ${content.title}`}><Trash2 size={12} /> Delete</button>}
                        </div>
                      )}
                    </article>
                  )
                })}
                {columnContents.length === 0 && (
                  <div className="kanban-empty-column"><span>{searchText || statusFilter !== 'all' || channelFilter !== 'all' || formatFilter !== 'all' ? 'No content found' : column.hint}</span></div>
                )}
              </div>
            </section>
          )
        })}
      </section>

      {activeDraft && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !isSaving) setActiveDraft(null) }}>
          <section className="content-modal workflow-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <div className="modal-heading">
              <div><span className="modal-kicker">{isNewContent ? 'NEW IDEA' : 'CONTENT WORKFLOW'}</span><h2 id="form-title">{isNewContent ? 'Add content' : 'Manage content'}</h2><p>{isNewContent ? 'Add a content idea to start the production workflow.' : 'Update the details and move content to the next stage.'}</p></div>
              <button type="button" className="modal-close" onClick={() => setActiveDraft(null)} aria-label="Close" disabled={isSaving}>×</button>
            </div>
            <div className="workflow-stepper" aria-label="Content stages">
              {contentStatuses.map((stage, index) => (
                <div className={`workflow-step ${index <= draftStageIndex ? 'active' : ''}`} key={stage.value}>
                  <span>{index < draftStageIndex ? <Check size={11} /> : index + 1}</span><small>{stage.label}</small>
                </div>
              ))}
            </div>
            <form className="content-form" onSubmit={handleSubmit}>
              <div className="workflow-section-heading"><strong>Content details</strong><span>Basic idea information</span></div>
              <label htmlFor="content-title">Content title</label>
              <input id="content-title" value={activeDraft.title} onChange={(event) => updateDraft('title', event.target.value)} placeholder="Example: Tips for creating your first post" required maxLength="255" disabled={!canEditDetails} />
              <label htmlFor="content-concept">Short concept</label>
              <textarea id="content-concept" value={activeDraft.concept} onChange={(event) => updateDraft('concept', event.target.value)} placeholder="What is the main message you want to share?" rows="2" disabled={!canEditDetails} />
              <div className="form-row">
                <div><label htmlFor="content-channel">Channel</label><select id="content-channel" value={activeDraft.channelId} onChange={(event) => updateDraft('channelId', event.target.value)} disabled={!canEditDetails} required>
                  <option value="">Select a channel</option>{channels.map((channel) => <option key={channel.id} value={channel.id}>{platformLabels[channel.platform]} · {channel.handle_name}</option>)}
                </select></div>
                <div><label htmlFor="content-format">Content format</label><select id="content-format" value={activeDraft.format} onChange={(event) => updateDraft('format', event.target.value)} disabled={!canEditDetails}>{formats.map((format) => <option key={format}>{format}</option>)}</select></div>
              </div>
              <div className="form-row">
                <div><label htmlFor="content-priority">Priority</label><select id="content-priority" value={activeDraft.priority} onChange={(event) => updateDraft('priority', event.target.value)} disabled={!canEditDetails}>{priorities.map((priority) => <option key={priority}>{priority}</option>)}</select></div>
                <div><label htmlFor="content-status">Status</label><select id="content-status" value={activeDraft.status} onChange={(event) => updateDraft('status', event.target.value)} disabled={isEditor && draftStageIndex < 2}>
                  {selectableStatuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                </select></div>
              </div>

              {draftStageIndex >= 1 && (
                <section className="workflow-stage-section">
                  <div className="workflow-section-heading"><strong>Planning & script</strong><span>Set a schedule and write the script</span></div>
                  <div className="form-row">
                    <div><label htmlFor="content-date">Scheduled date</label><input id="content-date" type="date" value={activeDraft.scheduledDate} onChange={(event) => updateDraft('scheduledDate', event.target.value)} required disabled={!canEditDetails} /></div>
                    <div className="workflow-helper-field"><span>Planned publish date</span><small>{formatScheduledDate(activeDraft.scheduledDate)}</small></div>
                  </div>
                  <label htmlFor="content-script">Script</label>
                  <textarea id="content-script" value={activeDraft.script} onChange={(event) => updateDraft('script', event.target.value)} placeholder="Write the key points, hook, and content flow..." rows="4" required disabled={!canEditDetails} />
                </section>
              )}

              {draftStageIndex >= 2 && (
                <section className="workflow-stage-section">
                  <div className="workflow-section-heading"><strong>Production checklist</strong><span>Mark completed tasks</span></div>
                  <div className="production-checklist">
                    {activeDraft.productionChecklist.map((item, index) => (
                      <label key={item.id || `new-${index}`}>
                        <input type="checkbox" checked={item.completed} onChange={(event) => updateChecklistItem(index, 'completed', event.target.checked)} disabled={!canEditDetails} />
                        <input type="text" aria-label={`Production task ${index + 1}`} value={item.task} maxLength="255" onChange={(event) => updateChecklistItem(index, 'task', event.target.value)} disabled={!canEditDetails} />
                        {canEditDetails && <button type="button" className="button-outline" onClick={() => setActiveDraft((current) => ({ ...current, productionChecklist: current.productionChecklist.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete task ${item.task}`}>×</button>}
                      </label>
                    ))}
                    {canEditDetails && (
                      <div className="production-checklist-add">
                        <input aria-label="New task name" value={newChecklistTask} onChange={(event) => setNewChecklistTask(event.target.value)} maxLength="255" placeholder="Enter a production task..." />
                        <button type="button" className="button-outline" onClick={addChecklistItem}><Plus size={13} /> Add</button>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {draftStageIndex >= 3 && (
                <section className="workflow-stage-section">
                  <div className="workflow-section-heading"><strong>Editing & review</strong><span>Add a draft and review notes</span></div>
                  <label htmlFor="content-draft-url">Draft link</label>
                  <input id="content-draft-url" type="url" value={activeDraft.draftUrl} onChange={(event) => updateDraft('draftUrl', event.target.value)} placeholder="https://..." disabled={!canEditDetails} />
                  <label htmlFor="content-review-notes">Review notes</label>
                  <textarea id="content-review-notes" value={activeDraft.reviewNotes} onChange={(event) => updateDraft('reviewNotes', event.target.value)} placeholder="Record the review results or required revisions..." rows="3" disabled={!canEditDetails} />
                </section>
              )}

              {draftStageIndex >= 5 && (
                <section className="workflow-stage-section">
                  <div className="workflow-section-heading"><strong>Publishing</strong><span>A valid publication URL is required</span></div>
                  <label htmlFor="content-published-url">Published content URL</label>
                  <input id="content-published-url" type="url" value={activeDraft.publishedUrl} onChange={(event) => updateDraft('publishedUrl', event.target.value)} placeholder="https://..." required disabled={!canEditDetails} />
                </section>
              )}
              {formError && <p className="workflow-form-error" role="alert">{formError}</p>}
              <div className="modal-actions">
                {!isNewContent && (isAdmin || isCreator) && <button type="button" className="button-outline" onClick={() => handleDelete(activeDraft)} disabled={isSaving}><Trash2 size={14} /> Delete content</button>}
                <button type="button" className="button-outline" onClick={() => setActiveDraft(null)} disabled={isSaving}>Cancel</button>
                {canEditDetails && <button className="button-primary" type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : isNewContent ? 'Save idea' : 'Save changes'}</button>}
              </div>
            </form>
          </section>
        </div>
      )}

      {activeMetricContent && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !isSavingMetrics) setActiveMetricContent(null) }}>
          <section className="content-modal" role="dialog" aria-modal="true" aria-labelledby="metrics-title">
            <div className="modal-heading">
              <div><span className="modal-kicker">ANALYTICS</span><h2 id="metrics-title">Record metrics</h2><p>{activeMetricContent.title}</p></div>
              <button type="button" className="modal-close" onClick={() => setActiveMetricContent(null)} aria-label="Close" disabled={isSavingMetrics}>×</button>
            </div>
            <form className="content-form" onSubmit={handleMetricSubmit}>
              <div className="form-row workflow-metrics">
                {Object.entries(metricLabels).map(([key, label]) => (
                  <div key={key}><label htmlFor={`snapshot-${key}`}>{label}</label><input id={`snapshot-${key}`} type="number" min="0" max="2147483647" step="1" value={metricValues[key] ?? ''} onChange={(event) => setMetricValues((current) => ({ ...current, [key]: event.target.value }))} required /></div>
                ))}
              </div>
              {metricError && <p className="workflow-form-error" role="alert">{metricError}</p>}
              <div className="modal-actions"><button type="button" className="button-outline" onClick={() => setActiveMetricContent(null)} disabled={isSavingMetrics}>Cancel</button><button className="button-primary" type="submit" disabled={isSavingMetrics}>{isSavingMetrics ? 'Saving...' : 'Save snapshot'}</button></div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default ContentPage
