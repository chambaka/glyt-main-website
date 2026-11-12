<script setup>
defineProps({
  t: { type: Object, required: true }
})
</script>

<template>
  <section class="section narrow page-enter">
    <h2>{{ t.about.title }}</h2>
    <p class="lead">{{ t.about.lead }}</p>
    <div class="prose-card">
      <p>{{ t.about.body }}</p>
    </div>
    <div class="value-list">
      <article v-for="value in t.about.values" :key="value.title">
        <h3>{{ value.title }}</h3>
        <p class="muted">{{ value.body }}</p>
      </article>
    </div>
  </section>
</template>
