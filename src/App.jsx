import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ContentPage from './pages/ContentPage.jsx'
import MatrixPage from './pages/MatrixPage.jsx'
import {
  createChannel as createChannelRequest,
  createContent as createContentRequest,
  createMetricSnapshot,
  downloadContentFile as downloadContentFileRequest,
  deleteContent as deleteContentRequest,
  getContent as getContentRequest,
  listChannels,
  listContents,
  listEditors,
  register as registerRequest,
  replaceChecklists,
  updateContent as updateContentRequest,
  uploadContentFile as uploadContentFileRequest,
} from './api.js'
import { mapContentFromApi, mapContentToApi } from './contentWorkflow.js'
import { roleAccess, roleLabels } from './roles.js'
import Swal from 'sweetalert2'

const pageRoutes = {
  '/login': 'login',
  '/register': 'register',
  '/dashboard': 'dashboard',
  '/contents': 'contents',
  '/matrix': 'matrix',
}

const pagePaths = Object.fromEntries(
  Object.entries(pageRoutes).map(([path, page]) => [page, path]),
)

function readStoredUser() {
  const savedUser = localStorage.getItem('creator-session-user')
  if (!savedUser || !localStorage.getItem('creator-session-token')) return null
  try {
    const user = JSON.parse(savedUser)
    return user && user.id && user.role ? user : null
  } catch {
    localStorage.removeItem('creator-session-user')
    localStorage.removeItem('creator-session-token')
    return null
  }
}

function checklistPayload(items = []) {
  return items.map(({ id, task, completed }) => ({
    ...(id == null ? {} : { id }),
    task_name: task,
    is_completed: completed,
  }))
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(readStoredUser)
  const page = pageRoutes[location.pathname] || 'not-found'
  const [contents, setContents] = useState([])
  const [channels, setChannels] = useState([])
  const [editors, setEditors] = useState([])
  const [loading, setLoading] = useState(Boolean(user))
  const [loadError, setLoadError] = useState('')
  const [notice, setNotice] = useState('')
  const [channelModalOpen, setChannelModalOpen] = useState(false)
  const navigateToPage = (nextPage) => navigate(pagePaths[nextPage] || '/dashboard')

  const account = user ? {
    ...user,
    id: user.role,
    role: roleLabels[user.role] || user.role,
    initials: user.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
    access: roleAccess[user.role] || 'Content management access.',
  } : null

  useEffect(() => {
    if (user && ['login', 'register', 'not-found'].includes(page)) {
      navigate('/dashboard', { replace: true })
    } else if (user?.role === 'editor' && page === 'matrix') {
      navigate('/contents', { replace: true })
    } else if (!user && !['login', 'register'].includes(page)) {
      navigate('/login', { replace: true })
    }
  }, [navigate, page, user])

  async function refreshWorkspace() {
    const [channelRows, contentRows, editorRows] = await Promise.all([
      listChannels(),
      listContents(),
      user.role === 'editor' ? Promise.resolve([]) : listEditors(),
    ])
    setChannels(channelRows)
    setContents(contentRows.map(mapContentFromApi))
    setEditors(editorRows)
  }

  useEffect(() => {
    if (!user) return undefined

    let active = true
    Promise.all([
      listChannels(),
      listContents(),
      user.role === 'editor' ? Promise.resolve([]) : listEditors(),
    ])
      .then(([channelRows, contentRows, editorRows]) => {
        if (!active) return
        setChannels(channelRows)
        setContents(contentRows.map(mapContentFromApi))
        setEditors(editorRows)
      })
      .catch((error) => {
        if (!active) return
        if (error.status === 401) {
          localStorage.removeItem('creator-session-token')
          localStorage.removeItem('creator-session-user')
          setLoading(false)
          setUser(null)
          navigate('/login', { replace: true })
          return
        }
        setLoadError(error.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [navigate, user])

  useEffect(() => {
    if (!notice) return undefined
    const timeoutId = window.setTimeout(() => setNotice(''), 3500)
    return () => window.clearTimeout(timeoutId)
  }, [notice])

  function showNotice(message) {
    setNotice(message)
  }

  function handleLogin(response) {
    localStorage.setItem('creator-session-token', response.token)
    localStorage.setItem('creator-session-user', JSON.stringify(response.user))
    setLoading(true)
    setLoadError('')
    setUser(response.user)
    navigate('/dashboard', { replace: true })
  }

  async function handleLogout() {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Sign out?',
      text: 'Are you sure you want to sign out?',
      showCancelButton: true,
      confirmButtonText: 'Sign out',
      cancelButtonText: 'Stay signed in',
      reverseButtons: true,
    })
    if (!result.isConfirmed) return

    localStorage.removeItem('creator-session-token')
    localStorage.removeItem('creator-session-user')
    setUser(null)
    setChannels([])
    setEditors([])
    setContents([])
    setLoading(false)
    navigate('/login', { replace: true })
  }

  async function addContent(newContent) {
    const created = await createContentRequest(mapContentToApi(newContent))
    if (newContent.productionChecklist.length) {
      await replaceChecklists(created.id, checklistPayload(newContent.productionChecklist))
    }
    await refreshWorkspace()
    return created.id
  }

  async function uploadContentFile(contentId, kind, file) {
    const result = await uploadContentFileRequest(contentId, kind, file)
    await refreshWorkspace()
    return result
  }

  async function updateContent(updatedContent) {
    const originalContent = contents.find((content) => content.id === updatedContent.id)
    const isCreatorNotesOnly = user.role === 'creator'
      && originalContent?.status === 'ready'
      && updatedContent.status === 'ready'
    const canUpdateChecklist = user.role === 'admin'
      || (user.role === 'creator' && ['idea', 'scripting'].includes(originalContent?.status))
      || (user.role === 'editor' && ['recording', 'editing'].includes(originalContent?.status))
    if (canUpdateChecklist && updatedContent.status !== 'published') {
      await replaceChecklists(updatedContent.id, checklistPayload(updatedContent.productionChecklist))
    }
    if (user.role === 'editor') {
      if (originalContent?.status === 'ready') {
        await updateContentRequest(updatedContent.id, {
          published_url: updatedContent.publishedUrl.trim(),
        }, 'PATCH')
      } else {
        await updateContentRequest(updatedContent.id, {
          status: updatedContent.status,
          review_notes: updatedContent.reviewNotes.trim() || null,
        }, 'PATCH')
      }
    } else if (user.role === 'creator' && originalContent?.status === 'ready') {
      await updateContentRequest(updatedContent.id, {
        status: updatedContent.status,
        published_url: updatedContent.publishedUrl.trim() || null,
        creator_review_notes: updatedContent.creatorReviewNotes.trim(),
      }, 'PATCH')
    } else {
      await updateContentRequest(updatedContent.id, mapContentToApi(updatedContent))
    }
    await refreshWorkspace()
    if (!isCreatorNotesOnly) showNotice('Content changes saved successfully.')
  }

  async function removeContent(contentId) {
    await deleteContentRequest(contentId)
    setContents((currentContents) => currentContents.filter((content) => content.id !== contentId))
    showNotice('Content deleted successfully.')
  }

  async function saveMetricSnapshot(contentId, metrics) {
    await createMetricSnapshot(contentId, {
      views_count: Number(metrics.views),
      likes_count: Number(metrics.likes),
      comments_count: Number(metrics.comments),
      shares_count: Number(metrics.shares),
      recorded_at: metrics.recorded_at,
    })
    await refreshWorkspace()
    showNotice('Metrics snapshot recorded successfully.')
  }

  async function addChannel(channel) {
    const created = await createChannelRequest(channel)
    setChannels((currentChannels) => [...currentChannels, created])
    setChannelModalOpen(false)
    showNotice('Channel added successfully.')
  }

  if (!user) {
    if (page === 'register') {
      return <Register onRegister={registerRequest} onLogin={() => navigateToPage('login')} />
    }
    return <Login onLogin={handleLogin} onRegister={() => navigateToPage('register')} />
  }

  if (loading) {
    return <main className="main-area" role="status">Loading your workspace...</main>
  }

  return (
    <div className="app-shell">
      <Navbar
        activePage={page}
        onNavigate={navigateToPage}
        onLogout={handleLogout}
        onAddChannel={() => setChannelModalOpen(true)}
        channels={channels}
        contents={contents}
        account={account}
      />
      <main className="main-area">
        {loadError && (
          <div className="workflow-form-error" role="alert">
            {loadError} <button type="button" onClick={() => {
              setLoadError('')
              refreshWorkspace().catch((error) => setLoadError(error.message))
            }}>Try again</button>
          </div>
        )}
        {page === 'dashboard' ? (
          <Dashboard
            contents={contents}
            canCreate={account.id !== 'editor'}
            role={account.id}
            onViewAll={() => navigateToPage('contents')}
            onAddContent={() => navigateToPage('contents')}
          />
        ) : page === 'matrix' && account.id !== 'editor' ? (
          <MatrixPage contents={contents} />
        ) : (
          <ContentPage
            contents={contents}
            channels={channels}
            editors={editors}
            role={account.id}
            onAddContent={addContent}
            onUpdateContent={updateContent}
            onUploadContentFile={uploadContentFile}
            onDownloadContentFile={downloadContentFileRequest}
            onDeleteContent={removeContent}
            onSaveMetrics={saveMetricSnapshot}
            onLoadContent={getContentRequest}
            onRefresh={refreshWorkspace}
          />
        )}
      </main>
      {notice && <div className="toast-message" role="status">{notice}</div>}
      {channelModalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setChannelModalOpen(false) }}>
          <section className="content-modal" role="dialog" aria-modal="true" aria-labelledby="channel-form-title">
            <div className="modal-heading">
              <div><span className="modal-kicker">SOCIAL ACCOUNT</span><h2 id="channel-form-title">Add a channel</h2><p>Connect a channel to plan your content.</p></div>
                <button type="button" className="modal-close" onClick={() => setChannelModalOpen(false)} aria-label="Close">×</button>
            </div>
            <form className="content-form" onSubmit={async (event) => {
              event.preventDefault()
              const form = new FormData(event.currentTarget)
              try {
                await addChannel({ platform: form.get('platform'), handle_name: form.get('handle_name') })
              } catch (error) {
                setNotice(error.message)
              }
            }}>
              <label htmlFor="channel-platform">Platform</label>
              <select id="channel-platform" name="platform" required>
                <option value="youtube">YouTube</option><option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option><option value="linkedin">LinkedIn</option>
              </select>
              <label htmlFor="channel-handle">Account name / handle</label>
              <input id="channel-handle" name="handle_name" maxLength="100" required placeholder="@namakun" />
              <div className="modal-actions"><button type="button" className="button-outline" onClick={() => setChannelModalOpen(false)}>Cancel</button><button className="button-primary" type="submit">Save channel</button></div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
