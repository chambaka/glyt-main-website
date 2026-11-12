<script setup>
import { ref } from 'vue'
import { api, authHeaders } from '../api'
import { useSession } from '../composables/useSession'

const props = defineProps({
  t: { type: Object, required: true },
  services: { type: Array, default: () => [] },
  signedIn: { type: Boolean, default: false }
})

const emit = defineEmits(['navigate'])
const { createBooking: saveBooking } = useSession()

const selectedService = ref(null)
const bagCount = ref(1)
const provider = ref('MOBILE_MONEY')
const quote = ref(null)
const booking = ref(null)
const payment = ref(null)
const error = ref('')
const bookingForm = ref({
  internationalArrivalFlight: '',
  kiaArrivalDate: '',
  zanzibarTravelDate: '',
  zanzibarFlight: '',
  tourOperator: '',
  bookingReference: '',
  zanzibarHotel: '',
  notes: ''
})

async function createQuote() {
  error.value = ''
  quote.value = null
  booking.value = null
  payment.value = null
  if (!selectedService.value) {
    error.value = props.t.common.chooseService
    return
  }
  try {
    const path = props.signedIn ? '/api/v1/customer/quotations' : '/api/v1/quotations'
    quote.value = await api(path, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ serviceId: selectedService.value, bagCount: Number(bagCount.value) || 1 })
    })
  } catch (err) {
    error.value = err.message
  }
}

async function createBooking() {
  error.value = ''
  payment.value = null
  if (!quote.value?.id) {
    error.value = props.t.common.chooseService
    return
  }
  try {
    booking.value = await saveBooking({
      quotationId: quote.value.id,
      ...bookingForm.value
    })
  } catch (err) {
    error.value = err.message || props.t.common.error
  }
}

async function initiatePayment() {
  error.value = ''
  if (!booking.value?.id || !quote.value?.id) {
    error.value = props.t.common.error
    return
  }
  try {
    payment.value = await api('/api/v1/payments/initiate', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        provider: provider.value,
        bookingId: booking.value.id,
        quotationId: quote.value.id,
        idempotencyKey: `web-${booking.value.id}-${quote.value.id}-${provider.value}`
      })
    })
    if (payment.value.checkoutUrl) {
      const completed = await api(`${payment.value.checkoutUrl.replace(/^https?:\/\/[^/]+/, '')}`, {
        method: 'POST',
        headers: authHeaders()
      }).catch(async () => {
        // Fallback GET for sandbox complete page JSON
        return api(`/api/v1/payments/sandbox/complete?paymentId=${payment.value.id}&ref=${encodeURIComponent(payment.value.externalRef || '')}`)
      })
      payment.value = completed.payment || completed
    }
    emit('navigate', 'account')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <section class="section page-enter">
    <h2>{{ t.book.title }}</h2>
    <p class="lead">{{ t.book.lead }}</p>

    <form class="panel" @submit.prevent="createQuote">
      <label>{{ t.book.service }}</label>
      <select v-model="selectedService">
        <option :value="null">{{ t.common.select }}</option>
        <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
      </select>
      <label>{{ t.book.bags }}</label>
      <input v-model="bagCount" type="number" min="1" />
      <button type="submit">{{ t.book.quote }}</button>
    </form>

    <p v-if="error" class="err">{{ error }}</p>

    <div v-if="quote" class="panel accent">
      <h3>{{ t.book.quoteReady }}</h3>
      <p>{{ quote.serviceName }} · {{ quote.bagCount }}</p>
      <p class="price">{{ quote.currency }} {{ (quote.totalAmountMinor / 100).toLocaleString() }}</p>
      <p class="muted">#{{ quote.id }} · {{ t.book.expires }} {{ quote.expiresAt || '—' }}</p>
    </div>

    <template v-if="signedIn">
      <h3>{{ t.book.travel }}</h3>
      <form class="panel" @submit.prevent="createBooking">
        <label>{{ t.book.flight }}</label>
        <input v-model="bookingForm.internationalArrivalFlight" required />
        <label>{{ t.book.kiaDate }}</label>
        <input v-model="bookingForm.kiaArrivalDate" type="date" required />
        <label>{{ t.book.znzDate }}</label>
        <input v-model="bookingForm.zanzibarTravelDate" type="date" required />
        <label>{{ t.book.znzFlight }}</label>
        <input v-model="bookingForm.zanzibarFlight" />
        <label>{{ t.book.operator }}</label>
        <input v-model="bookingForm.tourOperator" />
        <label>{{ t.book.reference }}</label>
        <input v-model="bookingForm.bookingReference" />
        <label>{{ t.book.hotel }}</label>
        <input v-model="bookingForm.zanzibarHotel" />
        <label>{{ t.book.notes }}</label>
        <textarea v-model="bookingForm.notes" rows="3" />
        <button type="submit">{{ t.book.create }}</button>
      </form>

      <div v-if="booking" class="panel accent">
        <h3>{{ booking.bookingNumber }} · {{ booking.status }}</h3>
        <p class="muted">{{ t.book.payNote }}</p>
        <label>Provider</label>
        <select v-model="provider">
          <option value="MOBILE_MONEY">Mobile Money</option>
          <option value="CARD">Card</option>
        </select>
        <button type="button" @click="initiatePayment">{{ t.book.payStub }}</button>
        <p v-if="payment" class="ok">{{ payment.status }} · {{ payment.receiptNumber || payment.externalRef }}</p>
      </div>
    </template>
    <p v-else class="muted">
      {{ t.book.needAccount }}
      <button class="linkish" type="button" @click="emit('navigate', 'account')">{{ t.nav.account }}</button>
    </p>
  </section>
</template>
