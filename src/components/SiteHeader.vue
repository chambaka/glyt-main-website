<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  page: { type: String, required: true },
  t: { type: Object, required: true },
  signedIn: { type: Boolean, default: false }
})

const emit = defineEmits(['navigate', 'toggle-lang'])

const open = ref(false)

const links = [
  {
    key: 'how',
    icon: 'M12 3l7 4v5c0 4.4-3 8.4-7 9.5C8 20.4 5 16.4 5 12V7l7-4zm0 5.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6z'
  },
  {
    key: 'services',
    icon: 'M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5v-9zm3 .5h10v2H7V8zm0 4h6v2H7v-2z'
  },
  {
    key: 'pricing',
    icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zm.8 4.2v.9c1.3.2 2.2 1 2.2 2.2 0 1.4-1.1 2.1-2.9 2.4l-.5.1v2.5c.7-.1 1.3-.4 1.7-.8l1.2 1.1c-.7.7-1.7 1.2-2.9 1.4v.8h-1.6v-.8c-1.4-.2-2.5-1.1-2.5-2.5h1.7c0 .6.5 1 1.4 1.1v-2.3c-1.4-.3-2.3-1.1-2.3-2.3 0-1.3 1-2.1 2.3-2.3v-.9h1.6zm-1.6 2.1c-.5.1-.8.4-.8.8s.4.7 1.1.8v-1.6zm1.6 4.1c.7-.1 1.1-.4 1.1-.9s-.5-.7-1.1-.8v1.7z'
  },
  {
    key: 'track',
    icon: 'M12 2.8c-3.7 0-6.7 2.9-6.7 6.6 0 4.6 5.3 10.1 6.3 11.1.2.2.6.2.8 0 1-1 6.3-6.5 6.3-11.1 0-3.7-3-6.6-6.7-6.6zm0 9a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8z'
  },
  {
    key: 'account',
    icon: 'M12 3.5a4.2 4.2 0 110 8.4 4.2 4.2 0 010-8.4zM5 19.2c0-3.2 3.1-5.2 7-5.2s7 2 7 5.2v.8H5v-.8z'
  }
]

function go(key) {
  open.value = false
  document.body.classList.remove('nav-locked')
  emit('navigate', key)
}

function toggleMenu() {
  open.value = !open.value
  document.body.classList.toggle('nav-locked', open.value)
}

function onKey(e) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    document.body.classList.remove('nav-locked')
  }
}

watch(
  () => props.page,
  () => {
    open.value = false
    document.body.classList.remove('nav-locked')
  }
)

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('nav-locked')
})
</script>

<template>
  <header class="site-header" :class="{ 'menu-open': open }">
    <div class="header-bar">
      <button class="brand-block" type="button" :aria-label="t.brand" @click="go('home')">
        <img class="brand-logo" src="/golyt-logo.png" :alt="t.brand" width="148" height="56" />
      </button>

      <nav class="nav-desktop" aria-label="Primary">
        <div class="nav-island">
          <button
            v-for="item in links"
            :key="item.key"
            type="button"
            class="nav-link"
            :class="{ on: page === item.key }"
            @click="go(item.key)"
          >
            <svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="item.icon" fill="currentColor" />
            </svg>
            <span>{{ t.nav[item.key] }}</span>
            <span v-if="item.key === 'account' && signedIn" class="dot" aria-hidden="true" />
          </button>
        </div>

        <div class="nav-actions">
          <button class="nav-cta" type="button" @click="go('book')">
            <svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.8c-3.7 0-6.7 2.9-6.7 6.6 0 4.6 5.3 10.1 6.3 11.1.2.2.6.2.8 0 1-1 6.3-6.5 6.3-11.1 0-3.7-3-6.6-6.7-6.6zm0 9a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8z" fill="currentColor" />
            </svg>
            {{ t.nav.book }}
          </button>
          <button class="lang" type="button" @click="emit('toggle-lang')" :aria-label="`Language ${t.lang}`">
            {{ t.lang }}
          </button>
        </div>
      </nav>

      <div class="header-tools">
        <button class="lang mobile-only" type="button" @click="emit('toggle-lang')">{{ t.lang }}</button>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          @click="toggleMenu"
        >
          <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
          <span class="burger" aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>
      </div>
    </div>

    <div class="nav-scrim" :hidden="!open" @click="toggleMenu" />

    <nav
      id="mobile-nav"
      class="nav-drawer"
      aria-label="Mobile"
      :hidden="!open"
    >
      <p class="drawer-kicker">{{ t.tagline }}</p>

      <div class="drawer-list">
        <button
          v-for="(item, index) in links"
          :key="item.key"
          type="button"
          class="drawer-link"
          :class="{ on: page === item.key }"
          :style="{ '--i': index }"
          @click="go(item.key)"
        >
          <span class="drawer-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path :d="item.icon" fill="currentColor" />
            </svg>
          </span>
          <span class="drawer-copy">
            <span class="drawer-label">{{ t.nav[item.key] }}</span>
          </span>
          <span v-if="item.key === 'account' && signedIn" class="dot" aria-hidden="true" />
          <svg class="drawer-chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.5 6.5l5 5.5-5 5.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <button class="drawer-cta" type="button" @click="go('book')">
        {{ t.nav.book }}
      </button>

      <div class="drawer-meta">
        <button type="button" @click="go('about')">{{ t.nav.about }}</button>
        <button type="button" @click="go('contact')">{{ t.nav.contact }}</button>
        <button type="button" @click="go('faq')">{{ t.nav.faq }}</button>
      </div>
    </nav>
  </header>
</template>
