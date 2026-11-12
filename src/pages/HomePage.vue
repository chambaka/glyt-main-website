<script setup>
defineProps({
  t: { type: Object, required: true }
})
const emit = defineEmits(['navigate'])
</script>

<template>
  <section class="hero-bleed">
    <div class="hero-visual" aria-hidden="true">
      <svg class="hero-scene" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stop-color="#9fd4f0" />
            <stop offset="38%" stop-color="#c9e7f7" />
            <stop offset="68%" stop-color="#eaf5fb" />
            <stop offset="100%" stop-color="#f7fbfd" />
          </linearGradient>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4ec0ef" />
            <stop offset="40%" stop-color="#00a8e8" />
            <stop offset="100%" stop-color="#002050" />
          </linearGradient>
          <linearGradient id="ridge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#14365c" />
            <stop offset="55%" stop-color="#0a2748" />
            <stop offset="100%" stop-color="#002050" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="78%" cy="28%" r="18%">
            <stop offset="0%" stop-color="#fff4c8" stop-opacity="0.95" />
            <stop offset="45%" stop-color="#ffe39a" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#ffe39a" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#sky)" />
        <circle fill="url(#sunGlow)" cx="1120" cy="250" r="220" />
        <circle class="sun" cx="1120" cy="250" r="42" fill="#fff6d2" />
        <path d="M820 560 L900 390 L970 560 Z" fill="#f3f8fb" opacity="0.9" />
        <path d="M900 390 L938 485 L900 468 L862 485 Z" fill="#ffffff" />
        <path d="M0 560 C160 528 300 548 460 534 C640 518 760 548 930 530 C1100 512 1260 540 1440 520 L1440 620 L0 620 Z" fill="url(#ridge)" />
        <path d="M0 600 C240 640 480 580 720 620 C960 660 1200 610 1440 645 L1440 900 L0 900 Z" fill="url(#sea)" />
        <path class="wave wave-a" d="M0 690 C200 670 360 720 560 700 C760 680 940 730 1140 710 C1280 698 1360 715 1440 705" fill="none" stroke="#b9e6f8" stroke-width="2.5" opacity="0.4" />
        <path class="wave wave-b" d="M0 750 C180 735 340 775 520 755 C740 730 920 780 1120 760 C1280 746 1360 765 1440 755" fill="none" stroke="#dff3fb" stroke-width="2" opacity="0.28" />
        <g class="route" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="8 10" opacity="0.55">
          <path d="M720 545 C860 520 980 555 1100 530 C1200 512 1280 500 1360 510" />
        </g>
        <g class="pin pin-start" transform="translate(720 515)">
          <path d="M0-28c-12 0-22 9.5-22 21.5 0 15 17 29.5 20.5 32.5 1.2 1 3.3 1 4.5 0C6.5 23 24 8.5 24-6.5 24-18.5 12-28 0-28z" fill="#002050" />
          <circle cy="-8" r="7.5" fill="#00A8E8" />
        </g>
        <g class="pin pin-end" transform="translate(1360 480)">
          <path d="M0-28c-12 0-22 9.5-22 21.5 0 15 17 29.5 20.5 32.5 1.2 1 3.3 1 4.5 0C6.5 23 24 8.5 24-6.5 24-18.5 12-28 0-28z" fill="#002050" />
          <circle cy="-8" r="7.5" fill="#00A8E8" />
        </g>
      </svg>
      <div class="hero-veil" />
    </div>

    <div class="hero-content">
      <img class="hero-logo reveal" src="/golyt-logo.png" :alt="t.brand" width="280" height="120" />
      <h1 class="reveal delay-1">{{ t.hero.headline }}</h1>
      <p class="hero-support reveal delay-2">{{ t.hero.support }}</p>
      <div class="actions reveal delay-3">
        <button type="button" @click="emit('navigate', 'book')">{{ t.hero.ctaBook }}</button>
        <button class="ghost" type="button" @click="emit('navigate', 'track')">{{ t.hero.ctaTrack }}</button>
      </div>
    </div>
  </section>

  <section class="section narrow how-section">
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
