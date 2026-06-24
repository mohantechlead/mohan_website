<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { slides, presentationMeta } from '@/presentation/data/slides.js'
import PppSlides from '@/presentation/components/PppSlides.vue'
import deckLogo from '@/assets/img/slider-logo.png'

const props = defineProps({ embedded: { type: Boolean, default: false } })
const emit = defineEmits(['exit'])

const currentIndex = ref(0)
const isAnimating = ref(false)
const isFullscreen = ref(false)
const deckRef = ref(null)
const showControls = ref(true)
const slideDirection = ref('next')

const visibleSlides = computed(() => slides.filter((s) => !s.hidden))
const currentSlide = computed(() => visibleSlides.value[currentIndex.value])
const progress = computed(() => ((currentIndex.value + 1) / visibleSlides.value.length) * 100)

const sectionLabels = { intro: 'plastprintpack 2026', products: 'Products', ddftz: 'DDFTZ' }
const sectionLabel = computed(() => sectionLabels[currentSlide.value.section] ?? '')

const goTo = async (index, direction = 'next') => {
  if (isAnimating.value || index === currentIndex.value) return
  if (index < 0 || index >= visibleSlides.value.length) return
  isAnimating.value = true
  slideDirection.value = direction
  currentIndex.value = index
  setTimeout(() => { isAnimating.value = false }, 480)
}

const next = () => goTo(currentIndex.value + 1, 'next')
const prev = () => goTo(currentIndex.value - 1, 'prev')

const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await deckRef.value?.requestFullscreen?.()
    isFullscreen.value = true
  } else {
    await document.exitFullscreen?.()
    isFullscreen.value = false
  }
}

const onKeydown = (e) => {
  if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); next() }
  else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev() }
  else if (e.key === 'Home') { e.preventDefault(); goTo(0, 'prev') }
  else if (e.key === 'End') { e.preventDefault(); goTo(visibleSlides.value.length - 1, 'next') }
  else if (e.key === 'f' || e.key === 'F') toggleFullscreen()
  else if (e.key === 'Escape' && props.embedded) emit('exit')
}

let hideTimer
const bumpControls = () => {
  showControls.value = true
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => { if (isFullscreen.value) showControls.value = false }, 3000)
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('fullscreenchange', () => { isFullscreen.value = Boolean(document.fullscreenElement) })
  bumpControls()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(hideTimer)
})
</script>

<template>
  <div
    ref="deckRef"
    class="deck"
    :class="{ 'deck--fullscreen': isFullscreen, 'deck--controls': showControls }"
    @mousemove="bumpControls"
  >
    <header class="deck__header">
      <div class="deck__brand">
        <img :src="deckLogo" alt="Mohan Group" class="deck__logo">
        <div class="deck__brand-text">
          <span class="deck__meta">{{ presentationMeta.subtitle }}</span>
          <span class="deck__title">{{ presentationMeta.title }}</span>
        </div>
      </div>
      <div class="deck__actions">
        <span v-if="sectionLabel" class="deck__section-pill" :class="`deck__section-pill--${currentSlide.section}`">
          {{ sectionLabel }}
        </span>
        <span class="deck__counter">{{ currentIndex + 1 }} / {{ visibleSlides.length }}</span>
        <button type="button" class="deck__btn" title="Fullscreen" @click="toggleFullscreen">FS</button>
        <RouterLink v-if="!embedded" to="/" class="deck__btn" title="Exit">X</RouterLink>
        <button v-else type="button" class="deck__btn" @click="emit('exit')">X</button>
      </div>
    </header>

    <div class="deck__progress"><div class="deck__progress-fill" :style="{ width: `${progress}%` }"></div></div>

    <main class="deck__stage">
      <Transition :name="slideDirection === 'next' ? 'fwd' : 'back'" mode="out-in">
        <article :key="currentSlide.id" class="slide">
          <PppSlides :slide="currentSlide" />
        </article>
      </Transition>
    </main>

    <footer class="deck__footer" :class="{ 'deck__footer--show': showControls }">
      <button type="button" class="nav-btn" :disabled="currentIndex === 0" @click="prev">Prev</button>
      <div class="deck__dots">
        <button
          v-for="(s, i) in visibleSlides"
          :key="s.id"
          type="button"
          class="dot"
          :class="{ 'dot--active': i === currentIndex, [`dot--${s.section}`]: s.section }"
          :title="s.title || s.id"
          @click="goTo(i, i > currentIndex ? 'next' : 'prev')"
        />
      </div>
      <button type="button" class="nav-btn nav-btn--primary" :disabled="currentIndex === visibleSlides.length - 1" @click="next">Next</button>
    </footer>
  </div>
</template>

<style scoped>
.deck {
  --gold: #C8A020;
  --gold-glow: rgba(200, 160, 32, 0.35);
  --bg: #080600;
  --glass-border: rgba(200, 160, 32, 0.2);
  --deck-chrome: 8.75rem;
  --slide-h: calc(100vh - var(--deck-chrome));
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: #fff;
  overflow: hidden;
  font-family: Calibri, 'Segoe UI', system-ui, sans-serif;
}

.deck--fullscreen { height: 100dvh; --slide-h: calc(100dvh - var(--deck-chrome)); }

.deck__header {
  position: relative; z-index: 20;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 0.75rem 1.25rem;
  background: rgba(8, 6, 0, 0.92);
  border-bottom: 1px solid var(--glass-border);
}

.deck__brand { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
.deck__logo { height: 2rem; }
.deck__brand-text { display: flex; flex-direction: column; min-width: 0; }
.deck__meta { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); }
.deck__title { font-size: 0.82rem; font-weight: 600; color: #ccc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.deck__actions { display: flex; align-items: center; gap: 0.45rem; }
.deck__section-pill {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.3rem 0.65rem; border-radius: 9999px; border: 1px solid var(--glass-border);
}
.deck__section-pill--intro { background: rgba(200,160,32,0.12); color: var(--gold); }
.deck__section-pill--products { background: rgba(112,173,71,0.12); color: #70AD47; border-color: rgba(112,173,71,0.3); }
.deck__section-pill--ddftz { background: rgba(68,114,196,0.12); color: #5B9BD5; border-color: rgba(68,114,196,0.3); }

.deck__counter { font-size: 0.72rem; font-weight: 600; color: #888; padding: 0.3rem 0.6rem; border-radius: 9999px; border: 1px solid var(--glass-border); }
.deck__btn {
  min-width: 2rem; height: 2rem; padding: 0 0.5rem; border-radius: 9999px;
  border: 1px solid var(--glass-border); color: #e2e8f0; font-size: 0.72rem; font-weight: 700;
  display: grid; place-items: center; transition: 0.2s;
}
.deck__btn:hover { background: rgba(200,160,32,0.12); border-color: var(--gold); color: var(--gold); }

.deck__progress { height: 3px; background: rgba(255,255,255,0.06); }
.deck__progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), #F0D060); transition: width 0.4s ease; }

.deck__stage { flex: 1; padding: 0.5rem 1.25rem 0; min-height: 0; overflow: hidden; }
.slide { height: var(--slide-h); max-height: var(--slide-h); overflow: hidden; }

.deck__footer {
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 0.75rem 1.25rem 1rem; opacity: 0; transform: translateY(6px); transition: 0.3s;
}
.deck--controls .deck__footer { opacity: 1; transform: translateY(0); }

.nav-btn { padding: 0.5rem 1rem; border-radius: 9999px; border: 1px solid var(--glass-border); font-size: 0.8rem; font-weight: 600; color: #e2e8f0; }
.nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.nav-btn--primary { background: var(--gold); border-color: var(--gold); color: #080600; }

.deck__dots { display: none; flex-wrap: wrap; justify-content: center; gap: 0.3rem; max-width: 50vw; }
@media (min-width: 768px) { .deck__dots { display: flex; } }
.dot { width: 0.4rem; height: 0.4rem; border-radius: 9999px; background: rgba(255,255,255,0.2); transition: 0.25s; }
.dot--active { width: 1.1rem; }
.dot--intro.dot--active { background: var(--gold); }
.dot--products.dot--active { background: #70AD47; }
.dot--ddftz.dot--active { background: #4472C4; }

.fwd-enter-active, .fwd-leave-active, .back-enter-active, .back-leave-active { transition: 0.4s ease; }
.fwd-enter-from { opacity: 0; transform: translateX(24px); }
.fwd-leave-to { opacity: 0; transform: translateX(-24px); }
.back-enter-from { opacity: 0; transform: translateX(-24px); }
.back-leave-to { opacity: 0; transform: translateX(24px); }
</style>
