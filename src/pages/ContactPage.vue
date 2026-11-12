<script setup>
import { ref } from 'vue'
import { useSession } from '../composables/useSession'

const props = defineProps({
  t: { type: Object, required: true },
  signedIn: { type: Boolean, default: false }
})

const { createTicket } = useSession()
const subject = ref('')
const body = ref('')
const localError = ref('')
const sent = ref(false)

async function send() {
  localError.value = ''
  sent.value = false
  if (!subject.value.trim() || !body.value.trim()) {
    localError.value = props.t.common.error
    return
  }
  if (!props.signedIn) {
    window.location.href = `mailto:${props.t.contact.email}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body.value)}`
    sent.value = true
    return
  }
  try {
    await createTicket({ subject: subject.value.trim(), body: body.value.trim() })
    subject.value = ''
    body.value = ''
    sent.value = true
  } catch (err) {
    localError.value = err.message || props.t.common.error
  }
}
</script>

<template>
  <section class="section page-enter">
    <h2>{{ t.contact.title }}</h2>
    <p class="lead">{{ t.contact.lead }}</p>

    <div class="split">
      <div class="info-card">
        <h3>{{ t.contact.desk }}</h3>
        <p class="muted">{{ t.contact.place }}</p>
        <p class="muted">{{ t.contact.hours }}</p>
        <p><a :href="`tel:${t.contact.phone}`">{{ t.contact.phone }}</a></p>
        <p><a :href="`mailto:${t.contact.email}`">{{ t.contact.email }}</a></p>
      </div>

      <form class="panel" @submit.prevent="send">
        <h3>{{ t.contact.formTitle }}</h3>
        <p class="muted">{{ signedIn ? t.contact.signedInNote : t.contact.guestNote }}</p>
        <label>{{ t.contact.subject }}</label>
        <input v-model="subject" required />
        <label>{{ t.contact.message }}</label>
        <textarea v-model="body" rows="4" required />
        <button type="submit">{{ t.contact.send }}</button>
        <p v-if="localError" class="err">{{ localError }}</p>
        <p v-if="sent" class="ok">{{ t.contact.sent }}</p>
      </form>
    </div>
  </section>
</template>
