<script setup>
defineProps({
  title: { type: String, required: true },
  paragraphs: { type: Array, default: () => [] }
})
</script>

<template>
  <section class="section narrow page-enter">
    <h2>{{ title }}</h2>
    <div class="prose-card">
      <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
    </div>
  </section>
</template>
