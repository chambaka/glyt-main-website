<script setup>
defineProps({
  t: { type: Object, required: true },
  services: { type: Array, default: () => [] },
  error: { type: String, default: '' }
})
const emit = defineEmits(['navigate'])
</script>

<template>
  <section class="section page-enter">
    <h2>{{ t.pricing.title }}</h2>
    <p class="lead">{{ t.pricing.lead }}</p>
    <p v-if="error" class="err">{{ error }}</p>
    <div class="service-list">
      <article v-for="service in services" :key="service.id" class="service-row">
        <div>
          <h3>{{ service.name }}</h3>
          <p class="muted">{{ service.code }}</p>
        </div>
        <div class="price-block">
          <p v-if="service.amountMinor" class="price">
            {{ service.currency }} {{ (service.amountMinor / 100).toLocaleString() }}
          </p>
          <p class="muted">{{ t.pricing.per }}</p>
        </div>
      </article>
    </div>
    <p class="muted">{{ t.pricing.note }}</p>
    <div class="actions solid">
      <button type="button" @click="emit('navigate', 'book')">{{ t.nav.book }}</button>
    </div>
  </section>
</template>
