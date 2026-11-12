import { computed, ref } from 'vue'
import { api, authHeaders, clearAuth, getRefreshToken, getToken, setAuth } from '../api'

const token = ref(getToken())
const refreshToken = ref(getRefreshToken())
const profile = ref(null)
const bookings = ref([])
const tickets = ref([])

export function useSession() {
  const signedIn = computed(() => Boolean(token.value))

  function applyAuth(body) {
    token.value = body.token
    refreshToken.value = body.refreshToken
    profile.value = body.user
    setAuth(body.token, body.refreshToken)
  }

  async function register(payload) {
    const body = await api('/api/v1/customer/auth/register', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    })
    applyAuth(body)
    await Promise.all([loadBookings(), loadTickets()])
    return body
  }

  async function login(email, password) {
    const body = await api('/api/v1/customer/auth/login', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ email, password })
    })
    applyAuth(body)
    await Promise.all([loadBookings(), loadTickets()])
    return body
  }

  async function loadMe() {
    if (!token.value) return null
    try {
      profile.value = await api('/api/v1/customer/auth/me', { headers: authHeaders(false) })
      return profile.value
    } catch {
      token.value = ''
      refreshToken.value = ''
      profile.value = null
      clearAuth()
      return null
    }
  }

  async function loadBookings() {
    if (!token.value) {
      bookings.value = []
      return
    }
    bookings.value = await api('/api/v1/customer/bookings', { headers: authHeaders(false) })
  }

  async function loadTickets() {
    if (!token.value) {
      tickets.value = []
      return
    }
    tickets.value = await api('/api/v1/customer/support/tickets', { headers: authHeaders(false) })
  }

  async function createBooking(payload) {
    const booking = await api('/api/v1/customer/bookings', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    })
    await loadBookings()
    return booking
  }

  async function cancelBooking(id) {
    await api(`/api/v1/customer/bookings/${id}/cancel`, {
      method: 'POST',
      headers: authHeaders()
    })
    await loadBookings()
  }

  async function createTicket(payload) {
    const ticket = await api('/api/v1/customer/support/tickets', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    })
    await loadTickets()
    return ticket
  }

  async function logout() {
    try {
      await api('/api/v1/customer/auth/logout', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ refreshToken: refreshToken.value })
      })
    } catch {
      // ignore
    }
    token.value = ''
    refreshToken.value = ''
    profile.value = null
    bookings.value = []
    tickets.value = []
    clearAuth()
  }

  return {
    token,
    refreshToken,
    profile,
    bookings,
    tickets,
    signedIn,
    register,
    login,
    loadMe,
    loadBookings,
    loadTickets,
    createBooking,
    cancelBooking,
    createTicket,
    logout
  }
}
