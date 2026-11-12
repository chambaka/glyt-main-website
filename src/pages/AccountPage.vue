<script setup>
import { ref } from 'vue'
import { useSession } from '../composables/useSession'

const props = defineProps({
  t: { type: Object, required: true }
})

const {
  signedIn,
  profile,
  bookings,
  tickets,
  register,
  login,
  logout,
  cancelBooking,
  createTicket,
  loadBookings,
  loadTickets
} = useSession()

const authMode = ref('login')
const showPassword = ref(false)
const authForm = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  nationality: '',
  passportNumber: ''
})
const ticketForm = ref({ subject: '', body: '' })
const localError = ref('')

async function submitAuth() {
  localError.value = ''
  try {
    if (authMode.value === 'register') {
      await register({ ...authForm.value })
    } else {
      await login(authForm.value.email, authForm.value.password)
    }
  } catch (err) {
    localError.value = err.message || props.t.common.error
  }
}

async function submitTicket() {
  localError.value = ''
  try {
    await createTicket({ ...ticketForm.value })
    ticketForm.value = { subject: '', body: '' }
  } catch (err) {
    localError.value = err.message || props.t.common.error
  }
}

async function onCancel(id) {
  localError.value = ''
  try {
    await cancelBooking(id)
  } catch (err) {
    localError.value = err.message || props.t.common.error
  }
}

async function refresh() {
  try {
    await Promise.all([loadBookings(), loadTickets()])
  } catch (err) {
    localError.value = err.message || props.t.common.error
  }
}

if (signedIn.value) {
  refresh()
}
</script>

<template>
  <section class="section account-page page-enter">
    <h2>{{ t.account.title }}</h2>
    <p v-if="localError" class="err">{{ localError }}</p>

    <template v-if="!signedIn">
      <div class="auth-shell">
        <div class="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            :aria-selected="authMode === 'login'"
            :class="{ on: authMode === 'login' }"
            @click="authMode = 'login'"
          >
            {{ t.account.signIn }}
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="authMode === 'register'"
            :class="{ on: authMode === 'register' }"
            @click="authMode = 'register'"
          >
            {{ t.account.register }}
          </button>
        </div>

        <form class="auth-card" @submit.prevent="submitAuth">
          <template v-if="authMode === 'register'">
            <label>{{ t.account.fullName }}</label>
            <input v-model="authForm.fullName" required />
            <label>{{ t.account.phone }}</label>
            <input v-model="authForm.phone" required />
            <label>{{ t.account.nationality }}</label>
            <input v-model="authForm.nationality" required />
            <label>{{ t.account.passport }}</label>
            <input v-model="authForm.passportNumber" required />
          </template>

          <label>{{ t.account.email }}</label>
          <input v-model="authForm.email" type="email" autocomplete="email" required />

          <label>{{ t.account.password }}</label>
          <div class="password-field">
            <input
              v-model="authForm.password"
              :type="showPassword ? 'text' : 'password'"
              :autocomplete="authMode === 'register' ? 'new-password' : 'current-password'"
              required
            />
            <button
              class="password-toggle"
              type="button"
              :aria-label="showPassword ? t.account.hidePassword : t.account.showPassword"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 5c5.2 0 9.3 3.4 10.5 7-1.2 3.6-5.3 7-10.5 7S2.7 15.6 1.5 12C2.7 8.4 6.8 5 12 5zm0 2.2c-3.9 0-7.1 2.5-8.2 4.8 1.1 2.3 4.3 4.8 8.2 4.8s7.1-2.5 8.2-4.8C19.1 9.7 15.9 7.2 12 7.2zm0 1.6a3.2 3.2 0 110 6.4 3.2 3.2 0 010-6.4zm0 1.7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  fill="currentColor"
                />
              </svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3.3 3.3a1 1 0 011.4 0l16 16a1 1 0 01-1.4 1.4l-2.5-2.5C14.9 19 13.5 19.2 12 19.2c-5.2 0-9.3-3.4-10.5-7 0.5-1.5 1.5-2.9 2.8-4L3.3 4.7a1 1 0 010-1.4zM12 6.8c1.1 0 2.1.2 3 .6l-1.6 1.6a3.2 3.2 0 00-3.2 3.2l-1.6 1.6A5.2 5.2 0 0112 6.8zm8.7 1.5c1.1 1 1.9 2.2 2.3 3.7-1.2 3.6-5.3 7-10.5 7-.9 0-1.8-.1-2.6-.3l1.7-1.7c.3 0 .6.1.9.1a5.2 5.2 0 005.2-5.2c0-.3 0-.6-.1-.9l3.1-3.1z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <button class="auth-submit" type="submit">
            {{ authMode === 'register' ? t.account.createAccount : t.account.signIn }}
          </button>
        </form>
      </div>
    </template>

    <template v-else>
      <div class="auth-card profile-card">
        <h3>{{ profile?.fullName }}</h3>
        <p class="muted">{{ profile?.email }} · {{ profile?.phone }}</p>
        <button class="auth-submit secondary" type="button" @click="logout()">{{ t.account.signOut }}</button>
      </div>

      <h3>{{ t.account.bookings }}</h3>
      <p v-if="!bookings.length" class="muted">{{ t.account.noBookings }}</p>
      <article v-for="booking in bookings" :key="booking.id" class="auth-card">
        <h4>{{ booking.bookingNumber }} · {{ booking.status }}</h4>
        <p class="muted">
          {{ booking.internationalArrivalFlight }} · KIA {{ booking.kiaArrivalDate }} → ZNZ {{ booking.zanzibarTravelDate }}
        </p>
        <details>
          <summary>{{ t.account.receipt }}</summary>
          <ul class="receipt">
            <li>{{ booking.customerName }}</li>
            <li>{{ booking.zanzibarHotel || '—' }}</li>
            <li>{{ booking.bookingReference || '—' }}</li>
            <li>{{ booking.notes || '—' }}</li>
          </ul>
        </details>
        <button
          v-if="booking.status === 'OPEN'"
          class="auth-submit secondary"
          type="button"
          @click="onCancel(booking.id)"
        >
          {{ t.account.cancel }}
        </button>
      </article>

      <h3>{{ t.account.support }}</h3>
      <form class="auth-card" @submit.prevent="submitTicket">
        <label>{{ t.contact.subject }}</label>
        <input v-model="ticketForm.subject" required />
        <label>{{ t.contact.message }}</label>
        <textarea v-model="ticketForm.body" rows="3" required />
        <button class="auth-submit" type="submit">{{ t.account.openTicket }}</button>
      </form>
      <p v-if="!tickets.length" class="muted">{{ t.account.noTickets }}</p>
      <article v-for="ticket in tickets" :key="ticket.id" class="auth-card">
        <h4>{{ ticket.subject }} · {{ ticket.status }}</h4>
        <p class="muted">{{ ticket.body }}</p>
      </article>
    </template>
  </section>
</template>
