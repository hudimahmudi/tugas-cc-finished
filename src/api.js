const API_BASE = '/api/v1'

async function request(path, { method = 'GET', body, token = localStorage.getItem('creator-session-token') } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (response.status === 204) return null
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed. Please try again.')
    error.status = response.status
    throw error
  }
  return payload
}

export function login(credentials) {
  return request('/auth/login', { method: 'POST', body: credentials, token: null })
}

export function register(details) {
  return request('/auth/register', { method: 'POST', body: details, token: null })
}

export function listChannels() {
  return request('/channels')
}

export function listEditors() {
  return request('/users/editors')
}

export function createChannel(channel) {
  return request('/channels', { method: 'POST', body: channel })
}

export function listContents(filters = {}) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, value]) => value && value !== 'all'),
  )
  return request(`/contents${params.size ? `?${params}` : ''}`)
}

export function getContent(id) {
  return request(`/contents/${id}`)
}

export function createContent(content) {
  return request('/contents', { method: 'POST', body: content })
}

export function updateContent(id, content, method = 'PUT') {
  return request(`/contents/${id}`, { method, body: content })
}

export function deleteContent(id) {
  return request(`/contents/${id}`, { method: 'DELETE' })
}

export function replaceChecklists(id, items) {
  return request(`/contents/${id}/checklists`, { method: 'PUT', body: { items } })
}

export function createMetricSnapshot(id, metrics) {
  return request(`/contents/${id}/metrics`, { method: 'POST', body: metrics })
}
