<script setup>
defineProps({
  t: { type: Object, required: true },
  services: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' }
})
</script>

<template>
  <section class="section page-enter">
    <h2>{{ t.services.title }}</h2>
    <p class="lead">{{ t.services.lead }}</p>
    <p v-if="error" class="err">{{ error }}</p>
    <p v-if="loading" class="muted">{{ t.services.loading }}</p>
    <p v-else-if="!services.length" class="muted">{{ t.services.empty }}</p>
    <div class="service-list">
      <article v-for="service in services" :key="service.id" class="service-row">
        <div>
          <h3>{{ service.name }}</h3>
          <p class="muted">{{ service.description }}</p>
        </div>
        <div class="price-block">
          <p v-if="service.amountMinor" class="price">
            {{ service.currency }} {{ (service.amountMinor / 100).toLocaleString() }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
