<script setup>
defineProps({
  t: { type: Object, required: true }
})
</script>

<template>
  <section class="section narrow how-section page-enter">
    <h2>{{ t.how.title }}</h2>
    <p class="lead">{{ t.how.lead }}</p>
    <ol class="steps">
      <li v-for="(step, index) in t.how.steps" :key="step.title">
        <span class="step-index">{{ index + 1 }}</span>
        <div>
          <h3>{{ step.title }}</h3>
          <p class="muted">{{ step.body }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
