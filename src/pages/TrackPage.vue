<script setup>
import { ref } from 'vue'
import { api } from '../api'

const props = defineProps({
  t: { type: Object, required: true }
})

const trackCode = ref('')
const trackToken = ref('')
const result = ref(null)
const error = ref('')
const loading = ref(false)

async function loadTrack() {
  error.value = ''
  result.value = null
  if (!trackCode.value.trim() || !trackToken.value.trim()) {
    error.value = props.t.common.error
    return
  }
  loading.value = true
  try {
    const code = encodeURIComponent(trackCode.value.trim())
    const token = encodeURIComponent(trackToken.value.trim())
    result.value = await api(`/api/v1/public/track/${code}/${token}`)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function openPrintable() {
  if (!trackCode.value.trim() || !trackToken.value.trim()) return
  window.open(
    `/track/${encodeURIComponent(trackCode.value.trim())}/${encodeURIComponent(trackToken.value.trim())}`,
    '_blank'
  )
}
</script>

<template>
  <section class="section page-enter">
    <h2>{{ t.track.title }}</h2>
    <p class="lead">{{ t.track.lead }}</p>

    <form class="panel" @submit.prevent="loadTrack">
      <label>{{ t.track.code }}</label>
      <input v-model="trackCode" placeholder="BG-000001" required />
      <label>{{ t.track.token }}</label>
      <input v-model="trackToken" required />
      <div class="actions solid">
        <button type="submit">{{ loading ? '…' : t.track.submit }}</button>
        <button class="secondary" type="button" @click="openPrintable">{{ t.track.openPage }}</button>
      </div>
    </form>

    <p v-if="error" class="err">{{ error }}</p>

    <div v-if="result" class="panel accent">
      <h3>{{ result.bagCode }}</h3>
      <p class="status-line">{{ result.status }}</p>
      <p class="muted">{{ t.track.updated }} {{ result.lastUpdated }}</p>

      <h4>{{ t.track.timeline }}</h4>
      <ol class="timeline">
        <li v-for="(step, index) in result.timeline" :key="index" :class="{ done: step.done }">
          <span>{{ step.done ? '●' : '○' }}</span>
          {{ step.label }}
        </li>
      </ol>

      <h4>{{ t.track.pickup }}</h4>
      <p>{{ result.pickup?.name }}</p>
      <p class="muted">{{ result.pickup?.place }}</p>
      <p class="muted">{{ result.pickup?.hours }}</p>
      <p v-if="result.pickup?.phone"><a :href="`tel:${result.pickup.phone}`">{{ result.pickup.phone }}</a></p>
    </div>
  </section>
</template>
