<script setup>
defineProps({
  t: { type: Object, required: true }
})
</script>

<template>
  <section class="section narrow page-enter">
    <h2>{{ t.faq.title }}</h2>
    <details v-for="item in t.faq.items" :key="item.q" class="faq-item">
      <summary>{{ item.q }}</summary>
      <p class="muted">{{ item.a }}</p>
    </details>
  </section>
</template>
