<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { api } from './api'
import { createI18n, loadSavedLang } from './i18n'
import { useSession } from './composables/useSession'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomePage from './pages/HomePage.vue'
import HowPage from './pages/HowPage.vue'
import ServicesPage from './pages/ServicesPage.vue'
import PricingPage from './pages/PricingPage.vue'
import AboutPage from './pages/AboutPage.vue'
import ContactPage from './pages/ContactPage.vue'
import FaqPage from './pages/FaqPage.vue'
import LegalPage from './pages/LegalPage.vue'
import BookPage from './pages/BookPage.vue'
import TrackPage from './pages/TrackPage.vue'
import AccountPage from './pages/AccountPage.vue'

const i18n = createI18n(loadSavedLang())
const lang = ref(i18n.lang)
const t = computed(() => {
  // Depend on lang so toggle() invalidates translations.
  void lang.value
  return i18n.t()
})
const unsubscribe = i18n.subscribe((next) => {
  lang.value = next
})

const page = ref(readHash())
const services = ref([])
const servicesError = ref('')
const servicesLoading = ref(false)
const { signedIn, loadMe } = useSession()

function readHash() {
  const raw = (window.location.hash || '#/home').replace(/^#\/?/, '')
  const key = raw.split('?')[0] || 'home'
  const allowed = new Set([
    'home', 'how', 'services', 'pricing', 'about', 'contact', 'faq',
    'terms', 'privacy', 'book', 'track', 'account'
  ])
  return allowed.has(key) ? key : 'home'
}

function navigate(next) {
  page.value = next
  window.location.hash = `/${next}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onHashChange() {
  page.value = readHash()
}

async function loadServices() {
  servicesLoading.value = true
  servicesError.value = ''
  try {
    services.value = await api('/api/v1/services')
  } catch (err) {
    servicesError.value = err.message
  } finally {
    servicesLoading.value = false
  }
}

watch(page, (next) => {
  document.title = `${t.value.brand} · ${t.value.nav[next] || t.value.brand}`
})

onMounted(async () => {
  window.addEventListener('hashchange', onHashChange)
  document.title = `${t.value.brand} · ${t.value.nav[page.value] || t.value.brand}`
  await loadServices()
  if (signedIn.value) await loadMe()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange)
  unsubscribe()
})
</script>

<template>
  <div class="shell" :lang="lang">
    <SiteHeader
      :page="page"
      :t="t"
      :signed-in="signedIn"
      @navigate="navigate"
      @toggle-lang="i18n.toggle()"
    />

    <main>
      <HomePage v-if="page === 'home'" :t="t" @navigate="navigate" />
      <HowPage v-else-if="page === 'how'" :t="t" />
      <ServicesPage
        v-else-if="page === 'services'"
        :t="t"
        :services="services"
        :loading="servicesLoading"
        :error="servicesError"
      />
      <PricingPage
        v-else-if="page === 'pricing'"
        :t="t"
        :services="services"
        :error="servicesError"
        @navigate="navigate"
      />
      <AboutPage v-else-if="page === 'about'" :t="t" />
      <ContactPage v-else-if="page === 'contact'" :t="t" :signed-in="signedIn" />
      <FaqPage v-else-if="page === 'faq'" :t="t" />
      <LegalPage v-else-if="page === 'terms'" :title="t.terms.title" :paragraphs="t.terms.body" />
      <LegalPage v-else-if="page === 'privacy'" :title="t.privacy.title" :paragraphs="t.privacy.body" />
      <BookPage
        v-else-if="page === 'book'"
        :t="t"
        :services="services"
        :signed-in="signedIn"
        @navigate="navigate"
      />
      <TrackPage v-else-if="page === 'track'" :t="t" />
      <AccountPage v-else-if="page === 'account'" :t="t" />
    </main>

    <SiteFooter :t="t" @navigate="navigate" />
  </div>
</template>
