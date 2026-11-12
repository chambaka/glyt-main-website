<script setup>
defineProps({
  t: { type: Object, required: true }
})
const emit = defineEmits(['navigate'])

const explore = ['how', 'services', 'pricing']
const travel = ['book', 'track', 'account']
const company = ['about', 'contact', 'faq', 'terms', 'privacy']
</script>

<template>
  <footer class="site-footer">
    <div class="footer-glow" aria-hidden="true" />
    <div class="footer-inner">
      <div class="footer-brand-card">
        <button class="footer-logo" type="button" @click="emit('navigate', 'home')">
          <img src="/golyt-logo.png" :alt="t.brand" width="148" height="56" />
        </button>
        <p class="footer-tag">{{ t.tagline }}</p>
        <p class="footer-blurb">{{ t.footer.rights }}</p>
        <button class="footer-cta" type="button" @click="emit('navigate', 'book')">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.8c-3.7 0-6.7 2.9-6.7 6.6 0 4.6 5.3 10.1 6.3 11.1.2.2.6.2.8 0 1-1 6.3-6.5 6.3-11.1 0-3.7-3-6.6-6.7-6.6zm0 9a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8z" fill="currentColor" />
          </svg>
          {{ t.nav.book }}
        </button>
      </div>

      <div class="footer-cols">
        <div class="footer-col">
          <h3>{{ t.footer.explore }}</h3>
          <div class="footer-links">
            <button
              v-for="key in explore"
              :key="key"
              type="button"
              @click="emit('navigate', key)"
            >
              {{ t.nav[key] }}
            </button>
          </div>
        </div>

        <div class="footer-col">
          <h3>{{ t.footer.travel }}</h3>
          <div class="footer-links">
            <button
              v-for="key in travel"
              :key="key"
              type="button"
              @click="emit('navigate', key)"
            >
              {{ t.nav[key] }}
            </button>
          </div>
        </div>

        <div class="footer-col">
          <h3>{{ t.footer.company }}</h3>
          <div class="footer-links">
            <button
              v-for="key in company"
              :key="key"
              type="button"
              @click="emit('navigate', key)"
            >
              {{ t.nav[key] }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <p>{{ t.footer.ops }}</p>
      <div class="footer-bar-links">
        <button type="button" @click="emit('navigate', 'terms')">{{ t.nav.terms }}</button>
        <button type="button" @click="emit('navigate', 'privacy')">{{ t.nav.privacy }}</button>
        <button type="button" @click="emit('navigate', 'contact')">{{ t.nav.contact }}</button>
      </div>
    </div>
  </footer>
</template>
