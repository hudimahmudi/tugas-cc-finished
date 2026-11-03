export const contentStatuses = [
  { value: 'idea', label: 'Idea', color: 'status-idea' },
  { value: 'scripting', label: 'Scripting', color: 'status-writing' },
  { value: 'recording', label: 'Recording', color: 'status-production' },
  { value: 'editing', label: 'Editing & review', color: 'status-editing' },
  { value: 'ready', label: 'Ready to publish', color: 'status-ready' },
  { value: 'published', label: 'Published', color: 'status-published' },
]

export function getContentStatus(status) {
  return contentStatuses.find((item) => item.value === status) || contentStatuses[0]
}

export function formatScheduledDate(date) {
  if (!date) return 'Not scheduled'
  const dateValue = typeof date === 'string' ? date.slice(0, 10) : date.toISOString().slice(0, 10)
  const [year, month, day] = dateValue.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

const platformLabels = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
}

const formatLabels = {
  short_video: 'Short video',
  long_video: 'Long video',
  carousel: 'Carousel',
  single_post: 'Single post',
}

const formatValues = Object.fromEntries(Object.entries(formatLabels).map(([value, label]) => [label, value]))
const priorityLabels = { low: 'Low', medium: 'Medium', high: 'High' }

export function mapContentFromApi(content) {
  const metrics = content.metrics || {}
  return {
    id: content.id,
    channelId: content.channel_id,
    channel: platformLabels[content.platform] || content.platform,
    channelHandle: content.handle_name,
    ownerName: content.owner_name || '',
    assignedEditorId: content.assigned_editor_id || '',
    assignedEditorName: content.assigned_editor_name || '',
    title: content.title,
    concept: content.description || '',
    format: formatLabels[content.format_type] || content.format_type,
    status: content.status,
    priority: priorityLabels[content.priority] || 'Medium',
    scheduledDate: content.scheduled_date ? String(content.scheduled_date).slice(0, 10) : '',
    publishedDate: content.published_date ? String(content.published_date).slice(0, 10) : '',
    date: formatScheduledDate(content.scheduled_date),
    script: content.script_draft || '',
    productionChecklist: (content.checklists || []).map((item) => ({
      id: item.id,
      task: item.task_name,
      completed: Boolean(item.is_completed),
    })),
    draftUrl: content.draft_url || '',
    reviewNotes: content.review_notes || '',
    creatorReviewNotes: content.creator_review_notes || '',
    publishedUrl: content.published_url || '',
    metrics: {
      views: metrics.views_count == null ? '' : String(metrics.views_count),
      likes: metrics.likes_count == null ? '' : String(metrics.likes_count),
      comments: metrics.comments_count == null ? '' : String(metrics.comments_count),
      shares: metrics.shares_count == null ? '' : String(metrics.shares_count),
    },
  }
}

export function mapContentToApi(content) {
  return {
    channel_id: Number(content.channelId),
    title: content.title.trim(),
    description: content.concept.trim(),
    script_draft: content.script.trim(),
    format_type: formatValues[content.format],
    priority: { Low: 'low', Medium: 'medium', High: 'high' }[content.priority],
    status: content.status,
    scheduled_date: content.scheduledDate || null,
    draft_url: content.draftUrl.trim() || null,
    review_notes: content.reviewNotes.trim() || null,
    creator_review_notes: content.creatorReviewNotes.trim() || null,
    published_url: content.publishedUrl.trim() || null,
    assigned_editor_id: content.assignedEditorId || null,
  }
}
