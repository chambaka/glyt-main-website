const TOKEN_KEY = 'golyt_customer_token'
const REFRESH_KEY = 'golyt_customer_refresh'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY) || ''
}

export function setAuth(token, refreshToken) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken)
  else localStorage.removeItem(REFRESH_KEY)
}

export function clearAuth() {
  setAuth('', '')
}

export function authHeaders(json = true) {
  const headers = { Accept: 'application/json' }
  if (json) headers['Content-Type'] = 'application/json'
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export async function api(path, options = {}) {
  const response = await fetch(path, options)
  const text = await response.text()
  let body = null
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = { error: text || 'Unexpected response' }
  }
  if (!response.ok) {
    throw new Error(body?.error || `Request failed (${response.status})`)
  }
  return body
}
