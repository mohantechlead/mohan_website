<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { slides, presentationMeta } from '@/presentation/data/slides.js'
import { buildLineChart } from '@/presentation/utils/charts.js'
import deckLogo from '@/assets/img/slider-logo.png'

const props = defineProps({ embedded: { type: Boolean, default: false } })
const emit = defineEmits(['exit'])

const currentIndex = ref(0)
const isAnimating = ref(false)
const isFullscreen = ref(false)
const animatedStats = ref([])
const animatedRings = ref([])
const deckRef = ref(null)
const showControls = ref(true)
const slideDirection = ref('next')

const currentSlide = computed(() => slides[currentIndex.value])
const progress = computed(() => ((currentIndex.value + 1) / slides.length) * 100)

const sectionLabels = { intro: 'Introduction', products: 'Products', ddftz: 'DDFTZ' }
const sectionLabel = computed(() => sectionLabels[currentSlide.value.section] ?? '')

const buildDonut = (segments) => {
  const total = segments.reduce((s, x) => s + x.value, 0)
  let offset = 0
  return {
    total,
    segments: segments.map((seg) => {
      const pct = (seg.value / total) * 100
      const item = { ...seg, dash: `${pct} ${100 - pct}`, offset, pct: Math.round(pct) }
      offset += pct
      return item
    })
  }
}

const slideDonut = computed(() => {
  const d = currentSlide.value.donut
  return d?.segments ? buildDonut(d.segments) : null
})

const slideLineChart = computed(() => {
  const lc = currentSlide.value.lineChart
  if (!lc?.series?.length || !lc?.labels?.length) return null
  return { ...lc, ...buildLineChart(lc.series, lc.labels, lc.opts) }
})

const animateStats = (stats) => {
  stats.forEach((item, i) => {
    const duration = 1200
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      animatedStats.value[i] = Math.floor(eased * item.value)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

const animateRings = (rings) => {
  rings.forEach((ring, i) => {
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      animatedRings.value[i] = Math.floor(eased * ring.value)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

const resetAnimations = () => {
  const slide = currentSlide.value
  if (slide.stats) {
    animatedStats.value = slide.stats.map(() => 0)
    nextTick(() => animateStats(slide.stats))
  }
  if (slide.rings) {
    animatedRings.value = slide.rings.map(() => 0)
    nextTick(() => animateRings(slide.rings))
  }
}

const goTo = async (index, direction = 'next') => {
  if (isAnimating.value || index === currentIndex.value) return
  if (index < 0 || index >= slides.length) return
  isAnimating.value = true
  slideDirection.value = direction
  currentIndex.value = index
  await nextTick()
  resetAnimations()
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
  else if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1, 'next') }
  else if (e.key === 'f' || e.key === 'F') toggleFullscreen()
  else if (e.key === 'Escape' && props.embedded) emit('exit')
}

let hideTimer
const bumpControls = () => {
  showControls.value = true
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => { if (isFullscreen.value) showControls.value = false }, 3000)
}

watch(currentIndex, resetAnimations)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('fullscreenchange', () => { isFullscreen.value = Boolean(document.fullscreenElement) })
  resetAnimations()
  bumpControls()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(hideTimer)
})

const IMG_ENTRANCE = ['slide-left', 'slide-right', 'slide-up', 'rotate-in', 'flip-in', 'zoom-in', 'tilt-in']
const IMG_LIVE = ['ken-burns', 'sway', 'float-tilt']

const imgAnimClass = (index = 0, override) =>
  `img-anim img-anim--${override ?? IMG_ENTRANCE[index % IMG_ENTRANCE.length]}`

const imgLiveClass = (index = 0) => `img-live img-live--${IMG_LIVE[index % IMG_LIVE.length]}`

const imgAnimDelay = (index = 0, base = 0) => ({ animationDelay: `${base + (index % 6) * 0.09}s` })

const imgContainClass = (src) =>
  src?.includes('/presentation/') ? 'img-stage--contain' : 'img-stage--cover'

const icons = {
  globe: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.2 0 2.3.2 3.3.6-1 .8-1.7 2-1.9 3.4H8.6C9 6.2 10.4 4.8 12 4zm-4.1.9C6.8 6.5 6 8.2 5.8 10h2.9c.2-1.5.9-2.8 1.9-3.6-.8-.2-1.6-.4-2.7-.5zM4 12c0-.7.1-1.4.2-2h3.2c0 .7-.1 1.3-.1 2s0 1.3.1 2H4.2c-.1-.6-.2-1.3-.2-2zm1.8 4c.2 1.8 1 3.5 2.1 5.1 1-.6 1.7-1.9 1.9-3.4H5.8zm6.2 0h2.9c-.2 1.5-.9 2.8-1.9 3.4 1.1-1.6 1.9-3.3 2.1-5.1H12zm0-8h2.9c-.2-1.8-1-3.5-2.1-5.1-1 .6-1.7 1.9-1.9 3.4H12zm4.1-1.1c1 .8 1.7 2 1.9 3.5h2.9c-.2-1.8-1-3.5-2.1-5.1-.8.5-1.6.9-2.7 1.6zM16.2 10c0-.7.1-1.3.1-2s0-1.3-.1-2h3.2c.1.6.2 1.3.2 2s-.1 1.4-.2 2h-3.2zm.3 4h2.9c-.4 1.8-1.8 3.2-3.4 3.9 1-.4 1.9-1 2.5-1.9z',
  zone: 'M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z',
  factory: 'M4 20V10l4-2v12H4zm6 0V6l4-2v16h-4zm6 0V4l4 2v14h-4z',
  speed: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v5l4 2-.9 1.6-4.6-2.7V7h1.5z',
  shield: 'M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4zm0 3.2L6 7.5V12c0 3.8 2.6 7.2 6 7.8 3.4-.6 6-4 6-7.8V7.5L12 5.2z',
  agility: 'M13 2L3 14h7l-1 8 10-12h-7l1-8z'
}
</script>

<template>
  <div
    ref="deckRef"
    class="deck"
    :class="{ 'deck--fullscreen': isFullscreen, 'deck--controls': showControls }"
    @mousemove="bumpControls"
  >
    <div class="deck__bg">
      <div class="deck__mesh"></div>
      <div class="deck__orb deck__orb--amber"></div>
      <div class="deck__orb deck__orb--sky"></div>
    </div>

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
        <span class="deck__counter">{{ currentIndex + 1 }} / {{ slides.length }}</span>
        <button type="button" class="deck__btn" title="Fullscreen" @click="toggleFullscreen">⛶</button>
        <RouterLink v-if="!embedded" to="/" class="deck__btn" title="Exit">✕</RouterLink>
        <button v-else type="button" class="deck__btn" @click="emit('exit')">✕</button>
      </div>
    </header>

    <div class="deck__progress"><div class="deck__progress-fill" :style="{ width: `${progress}%` }"></div></div>

    <main class="deck__stage">
      <Transition :name="slideDirection === 'next' ? 'fwd' : 'back'" mode="out-in">
        <article :key="currentSlide.id" class="slide">

          <!-- Logo splash -->
          <div v-if="currentSlide.type === 'logo-splash'" class="splash">
            <div class="splash__glow"></div>
            <img :src="currentSlide.logo" alt="Mohan Group" class="splash__logo">
            <h1 class="splash__title">{{ currentSlide.title }}</h1>
            <p class="splash__tagline">{{ currentSlide.tagline }}</p>
            <p class="splash__hint">Press → or Space to begin</p>
          </div>

          <!-- Company intro only -->
          <div v-else-if="currentSlide.type === 'company-intro'" class="intro">
            <img :src="currentSlide.image" alt="" class="intro__bg">
            <div class="intro__overlay"></div>
            <div class="intro__content">
              <img :src="currentSlide.logo" alt="" class="intro__logo splash__logo--sm">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h1 class="headline">{{ currentSlide.title }}</h1>
              <p class="lede">{{ currentSlide.subtitle }}</p>
              <div class="intro__facts">
                <div v-for="(f, i) in currentSlide.facts" :key="f.label" class="glass-pill" :style="{ animationDelay: `${i * 0.08}s` }">
                  <strong>{{ f.value }}</strong><span>{{ f.label }}</span>
                </div>
              </div>
              <div class="intro__pillars">
                <figure v-for="(p, i) in currentSlide.pillars" :key="p.name" class="pillar" :class="imgAnimClass(i)" :style="imgAnimDelay(i)">
                  <img :src="p.image" :alt="p.name" :class="imgLiveClass(i)">
                  <figcaption>
                    <em>{{ p.tag }}</em>
                    <strong>{{ p.name }}</strong>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <!-- Section chapter -->
          <div v-else-if="currentSlide.type === 'section'" class="chapter" :class="`chapter--${currentSlide.accent}`">
            <img v-if="currentSlide.image" :src="currentSlide.image" alt="" class="chapter__bg">
            <div class="chapter__overlay"></div>
            <div class="chapter__content">
              <img :src="deckLogo" alt="" class="slide-brand">
              <span class="chapter__num">{{ currentSlide.chapter }}</span>
              <h2 class="chapter__title">{{ currentSlide.title }}</h2>
              <p class="chapter__sub">{{ currentSlide.subtitle }}</p>
              <div class="chapter__line"></div>
            </div>
          </div>

          <!-- Product analytics -->
          <div v-else-if="currentSlide.type === 'product-analytics'" class="panel panel--dark">
            <header class="panel__head">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
            </header>
            <div class="analytics">
              <div class="analytics__chart glass-card">
                <h3>{{ currentSlide.donut.title }}</h3>
                <div v-if="slideDonut" class="donut">
                  <svg viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="4" />
                    <circle
                      v-for="(s, i) in slideDonut.segments" :key="s.label"
                      cx="21" cy="21" r="15.9" fill="none" :stroke="s.color" stroke-width="4"
                      :stroke-dasharray="s.dash" :stroke-dashoffset="25 - s.offset"
                      class="donut__seg" :style="{ animationDelay: `${i * 0.1}s` }"
                    />
                  </svg>
                  <div class="donut__center"><strong>{{ slideDonut.total }}</strong><span>Lines</span></div>
                </div>
                <ul class="legend">
                  <li v-for="s in slideDonut?.segments" :key="s.label">
                    <i :style="{ background: s.color }"></i>{{ s.label }} <b>{{ s.pct }}%</b>
                  </li>
                </ul>
              </div>
              <div class="analytics__bars glass-card">
                <h3>Capability Index</h3>
                <div v-for="(m, i) in currentSlide.metrics" :key="m.label" class="bar">
                  <label>{{ m.label }}</label>
                  <div class="bar__track"><div class="bar__fill" :style="{ width: `${m.value}%`, background: m.color, animationDelay: `${i * 0.08}s` }"></div></div>
                  <span>{{ m.value }}%</span>
                </div>
              </div>
              <div v-if="slideLineChart" class="analytics__line glass-card">
                <h3>{{ currentSlide.lineChart.title }}</h3>
                <div class="line-chart">
                  <svg :viewBox="`0 0 ${slideLineChart.w} ${slideLineChart.h}`" preserveAspectRatio="none" class="line-chart__svg">
                    <line v-for="g in 4" :key="g" x1="0" :x2="slideLineChart.w" :y1="(g * slideLineChart.h) / 4" :y2="(g * slideLineChart.h) / 4" stroke="rgba(255,255,255,0.07)" stroke-width="0.4" />
                    <path v-for="(s, i) in slideLineChart.rendered" :key="`${s.label}-area`" :d="s.area" :fill="s.color" fill-opacity="0.15" class="line-area" :style="{ animationDelay: `${i * 0.1}s` }" />
                    <path v-for="(s, i) in slideLineChart.rendered" :key="s.label" :d="s.path" :stroke="s.color" stroke-width="1.6" class="line-path" :style="{ animationDelay: `${i * 0.12}s` }" />
                    <template v-for="s in slideLineChart.rendered" :key="`${s.label}-pts`">
                      <circle v-for="(p, pi) in s.points" :key="pi" :cx="p.x" :cy="p.y" r="1.6" :fill="s.color" class="line-dot" :style="{ animationDelay: `${pi * 0.06}s` }" />
                    </template>
                  </svg>
                  <div class="line-chart__labels">
                    <span v-for="l in slideLineChart.labels" :key="l">{{ l }}</span>
                  </div>
                  <ul class="line-chart__legend">
                    <li v-for="s in slideLineChart.rendered" :key="s.label"><i :style="{ background: s.color }"></i>{{ s.label }}</li>
                  </ul>
                </div>
              </div>
              <div v-if="currentSlide.vBars" class="analytics__vbars glass-card">
                <h3>{{ currentSlide.vBars.title }}</h3>
                <div class="vbar-chart">
                  <div v-for="(item, i) in currentSlide.vBars.items" :key="item.label" class="vbar-col">
                    <div class="vbar-col__track"><div class="vbar-col__fill" :style="{ height: `${item.value}%`, background: item.color, animationDelay: `${i * 0.07}s` }"></div></div>
                    <span class="vbar-col__val">{{ item.value }}%</span>
                    <span class="vbar-col__lbl">{{ item.label }}</span>
                  </div>
                </div>
              </div>
              <div class="analytics__products">
                <article v-for="(p, i) in currentSlide.products" :key="p.name" class="prod-tile" :style="imgAnimDelay(i)">
                  <figure class="img-stage" :class="[imgContainClass(p.image), imgAnimClass(i)]" :style="imgAnimDelay(i)">
                    <img :src="p.image" :alt="p.name" :class="['img-stage__img', imgLiveClass(i)]">
                  </figure>
                  <div><strong>{{ p.name }}</strong><em>{{ p.stat }}</em></div>
                </article>
              </div>
            </div>
          </div>

          <!-- Product detail -->
          <div v-else-if="currentSlide.type === 'product-detail'" class="panel panel--dark">
            <header class="panel__head">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
              <p class="lede">{{ currentSlide.body }}</p>
            </header>
            <div class="detail">
              <figure class="detail__hero glass-card img-stage" :class="[currentSlide.contain ? 'img-stage--contain' : 'img-stage--cover', imgAnimClass(0, 'rotate-in')]" :style="imgAnimDelay(0)">
                <img :src="currentSlide.image" :alt="currentSlide.title" :class="['img-stage__img', imgLiveClass(0)]">
              </figure>
              <div class="detail__gallery">
                <figure
                  v-for="(src, i) in currentSlide.gallery"
                  :key="src"
                  class="img-stage img-stage--thumb"
                  :class="[imgContainClass(src), imgAnimClass(i + 1)]"
                  :style="imgAnimDelay(i, 0.12)"
                >
                  <img :src="src" alt="" :class="['img-stage__img', imgLiveClass(i + 1)]">
                </figure>
              </div>
              <div class="detail__charts">
                <div class="glass-card">
                  <h3>Applications</h3>
                  <div v-for="(a, i) in currentSlide.applications" :key="a.label" class="bar">
                    <label>{{ a.label }}</label>
                    <div class="bar__track"><div class="bar__fill" :style="{ width: `${a.value}%`, animationDelay: `${i * 0.08}s` }"></div></div>
                    <span>{{ a.value }}%</span>
                  </div>
                </div>
                <div class="detail__figures">
                  <article v-for="fig in currentSlide.figures" :key="fig.label" class="figure-card">
                    <strong>{{ fig.value }}</strong>
                    <span>{{ fig.label }}</span>
                  </article>
                </div>
              </div>
            </div>
          </div>

          <!-- Dual panel -->
          <div v-else-if="currentSlide.type === 'dual-panel'" class="panel panel--dark">
            <header class="panel__head">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
            </header>
            <div class="dual">
              <article v-for="(p, pi) in currentSlide.panels" :key="p.title" class="dual__col glass-card">
                <figure class="dual__img img-stage img-stage--cover" :class="imgAnimClass(pi, 'slide-up')" :style="imgAnimDelay(pi)">
                  <img :src="p.image" :alt="p.title" :class="['img-stage__img', imgLiveClass(pi)]">
                </figure>
                <h3>{{ p.title }}</h3>
                <div v-for="(b, i) in p.bars" :key="b.label" class="bar">
                  <label>{{ b.label }}</label>
                  <div class="bar__track"><div class="bar__fill" :style="{ width: `${b.value}%`, background: b.color, animationDelay: `${pi * 0.1 + i * 0.06}s` }"></div></div>
                  <span>{{ b.value }}%</span>
                </div>
                <div v-if="p.images?.length" class="dual__thumbs">
                  <figure v-for="(src, ti) in p.images" :key="src" class="img-stage img-stage--cover img-stage--thumb" :class="imgAnimClass(pi + ti + 2)" :style="imgAnimDelay(ti, 0.15)">
                    <img :src="src" alt="" :class="['img-stage__img', imgLiveClass(ti)]">
                  </figure>
                </div>
              </article>
            </div>
          </div>

          <!-- Chart dashboard -->
          <div v-else-if="currentSlide.type === 'chart-dashboard'" class="panel panel--dark">
            <header class="panel__head panel__head--compact">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
              <p class="lede">{{ currentSlide.subtitle }}</p>
            </header>
            <div class="dash-grid">
              <div class="dash-grid__pie glass-card">
                <h3>{{ currentSlide.donut.title }}</h3>
                <div v-if="slideDonut" class="donut donut--md">
                  <svg viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="4" />
                    <circle v-for="(s, i) in slideDonut.segments" :key="s.label" cx="21" cy="21" r="15.9" fill="none" :stroke="s.color" stroke-width="4" :stroke-dasharray="s.dash" :stroke-dashoffset="25 - s.offset" class="donut__seg" :style="{ animationDelay: `${i * 0.1}s` }" />
                  </svg>
                  <div class="donut__center"><strong>100%</strong><span>Mix</span></div>
                </div>
                <ul class="legend legend--compact">
                  <li v-for="s in slideDonut?.segments" :key="s.label"><i :style="{ background: s.color }"></i>{{ s.label }} <b>{{ s.pct }}%</b></li>
                </ul>
              </div>
              <div v-if="slideLineChart" class="dash-grid__line glass-card">
                <h3>{{ currentSlide.lineChart.title }}</h3>
                <div class="line-chart line-chart--tall">
                  <svg :viewBox="`0 0 ${slideLineChart.w} ${slideLineChart.h}`" preserveAspectRatio="none" class="line-chart__svg">
                    <line v-for="g in 4" :key="g" x1="0" :x2="slideLineChart.w" :y1="(g * slideLineChart.h) / 4" :y2="(g * slideLineChart.h) / 4" stroke="rgba(255,255,255,0.07)" stroke-width="0.4" />
                    <path v-for="(s, i) in slideLineChart.rendered" :key="`${s.label}-area`" :d="s.area" :fill="s.color" fill-opacity="0.15" class="line-area" :style="{ animationDelay: `${i * 0.1}s` }" />
                    <path v-for="(s, i) in slideLineChart.rendered" :key="s.label" :d="s.path" :stroke="s.color" stroke-width="1.8" class="line-path" :style="{ animationDelay: `${i * 0.12}s` }" />
                    <template v-for="s in slideLineChart.rendered" :key="`${s.label}-pts`">
                      <circle v-for="(p, pi) in s.points" :key="pi" :cx="p.x" :cy="p.y" r="1.8" :fill="s.color" class="line-dot" />
                    </template>
                  </svg>
                  <div class="line-chart__labels"><span v-for="l in slideLineChart.labels" :key="l">{{ l }}</span></div>
                  <ul class="line-chart__legend"><li v-for="s in slideLineChart.rendered" :key="s.label"><i :style="{ background: s.color }"></i>{{ s.label }}</li></ul>
                </div>
              </div>
              <div v-if="currentSlide.vBars" class="dash-grid__vbars glass-card">
                <h3>{{ currentSlide.vBars.title }}</h3>
                <div class="vbar-chart vbar-chart--tall">
                  <div v-for="(item, i) in currentSlide.vBars.items" :key="item.label" class="vbar-col">
                    <div class="vbar-col__track"><div class="vbar-col__fill" :style="{ height: `${item.value}%`, background: item.color, animationDelay: `${i * 0.07}s` }"></div></div>
                    <span class="vbar-col__val">{{ item.value }}%</span>
                    <span class="vbar-col__lbl">{{ item.label }}</span>
                  </div>
                </div>
              </div>
              <div v-if="currentSlide.hBars" class="dash-grid__hbars glass-card">
                <h3>{{ currentSlide.hBars.title }}</h3>
                <div v-for="(b, i) in currentSlide.hBars.items" :key="b.label" class="bar bar--on-dark">
                  <label>{{ b.label }}</label>
                  <div class="bar__track bar__track--dark"><div class="bar__fill" :style="{ width: `${b.value}%`, background: b.color, animationDelay: `${i * 0.08}s` }"></div></div>
                  <span>{{ b.value }}%</span>
                </div>
              </div>
              <div v-if="currentSlide.images" class="dash-grid__imgs">
                <figure v-for="(img, i) in currentSlide.images" :key="img.src" class="dash-grid__img img-stage" :class="[img.contain ? 'img-stage--contain' : 'img-stage--cover', imgAnimClass(i)]" :style="imgAnimDelay(i)">
                  <img :src="img.src" :alt="img.caption" :class="['img-stage__img', imgLiveClass(i)]">
                  <figcaption>{{ img.caption }}</figcaption>
                </figure>
              </div>
            </div>
          </div>

          <!-- Market chart -->
          <div v-else-if="currentSlide.type === 'market-chart'" class="panel panel--dark">
            <header class="panel__head">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
              <p class="lede">{{ currentSlide.subtitle }}</p>
            </header>
            <div class="market">
              <div class="market__charts">
                <div class="market__donut glass-card">
                  <div v-if="slideDonut" class="donut donut--lg">
                    <svg viewBox="0 0 42 42">
                      <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="4" />
                      <circle
                        v-for="(s, i) in slideDonut.segments" :key="s.label"
                        cx="21" cy="21" r="15.9" fill="none" :stroke="s.color" stroke-width="4"
                        :stroke-dasharray="s.dash" :stroke-dashoffset="25 - s.offset"
                        class="donut__seg" :style="{ animationDelay: `${i * 0.1}s` }"
                      />
                    </svg>
                    <div class="donut__center"><strong>100%</strong><span>Markets</span></div>
                  </div>
                  <ul class="legend">
                    <li v-for="s in slideDonut?.segments" :key="s.label">
                      <i :style="{ background: s.color }"></i>{{ s.label }} <b>{{ s.pct }}%</b>
                    </li>
                  </ul>
                </div>
                <div v-if="currentSlide.vBars" class="market__vbars glass-card">
                  <h3>{{ currentSlide.vBars.title }}</h3>
                  <div class="vbar-chart">
                    <div v-for="(item, i) in currentSlide.vBars.items" :key="item.label" class="vbar-col">
                      <div class="vbar-col__track"><div class="vbar-col__fill" :style="{ height: `${item.value}%`, background: item.color, animationDelay: `${i * 0.07}s` }"></div></div>
                      <span class="vbar-col__val">{{ item.value }}%</span>
                      <span class="vbar-col__lbl">{{ item.label }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="slideLineChart" class="market__line glass-card">
                  <h3>{{ currentSlide.lineChart.title }}</h3>
                  <div class="line-chart">
                    <svg :viewBox="`0 0 ${slideLineChart.w} ${slideLineChart.h}`" preserveAspectRatio="none" class="line-chart__svg">
                      <path v-for="(s, i) in slideLineChart.rendered" :key="`${s.label}-area`" :d="s.area" :fill="s.color" fill-opacity="0.15" class="line-area" :style="{ animationDelay: `${i * 0.1}s` }" />
                      <path v-for="(s, i) in slideLineChart.rendered" :key="s.label" :d="s.path" :stroke="s.color" stroke-width="1.6" class="line-path" :style="{ animationDelay: `${i * 0.12}s` }" />
                    </svg>
                    <div class="line-chart__labels"><span v-for="l in slideLineChart.labels" :key="l">{{ l }}</span></div>
                  </div>
                </div>
              </div>
              <div class="market__imgs">
                <figure
                  v-for="(img, i) in currentSlide.images"
                  :key="img.src"
                  class="market__img img-stage"
                  :class="[img.contain ? 'img-stage--contain' : 'img-stage--cover', imgAnimClass(i)]"
                  :style="imgAnimDelay(i)"
                >
                  <img :src="img.src" :alt="img.caption" :class="['img-stage__img', imgLiveClass(i)]">
                  <figcaption>{{ img.caption }}</figcaption>
                </figure>
              </div>
            </div>
          </div>

          <!-- DDFTZ hero -->
          <div v-else-if="currentSlide.type === 'ddftz-hero'" class="ddftz-hero">
            <img :src="currentSlide.image" alt="DDFTZ" class="ddftz-hero__bg">
            <div class="ddftz-hero__overlay"></div>
            <div class="ddftz-hero__content">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
              <p class="lede">{{ currentSlide.body }}</p>
              <div class="ddftz-hero__stats">
                <article v-for="(s, i) in currentSlide.stats" :key="s.label" class="glass-pill" :style="{ animationDelay: `${i * 0.08}s` }">
                  <strong>{{ animatedStats[i] ?? 0 }}{{ s.suffix }}</strong>
                  <span>{{ s.label }}</span>
                </article>
              </div>
            </div>
          </div>

          <!-- DDFTZ visual -->
          <div v-else-if="currentSlide.type === 'ddftz-visual'" class="panel panel--dark">
            <header class="panel__head">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
              <p class="lede">{{ currentSlide.body }}</p>
            </header>
            <div class="ddftz-visual">
              <figure class="ddftz-visual__img" :class="imgAnimClass(0, 'slide-left')" :style="imgAnimDelay(0)">
                <img :src="currentSlide.image" :alt="currentSlide.title" :class="imgLiveClass(0)">
              </figure>
              <div class="ddftz-visual__side">
                <div class="detail__figures">
                  <article v-for="fig in currentSlide.figures" :key="fig.label" class="figure-card">
                    <strong>{{ fig.value }}</strong>
                    <span>{{ fig.label }}</span>
                  </article>
                </div>
                <div class="glass-card">
                  <h3 class="card-label">Performance</h3>
                  <div v-for="(b, i) in currentSlide.bars" :key="b.label" class="bar bar--on-dark">
                    <label>{{ b.label }}</label>
                    <div class="bar__track bar__track--dark"><div class="bar__fill" :style="{ width: `${b.value}%`, background: b.color, animationDelay: `${i * 0.08}s` }"></div></div>
                    <span>{{ b.value }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- DDFTZ gallery -->
          <div v-else-if="currentSlide.type === 'ddftz-gallery'" class="panel panel--dark">
            <header class="panel__head">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
            </header>
            <div class="ddftz-gallery">
              <figure v-for="(img, i) in currentSlide.images" :key="img.src" class="ddftz-gallery__item" :class="imgAnimClass(i)" :style="imgAnimDelay(i)">
                <img :src="img.src" :alt="img.caption" :class="imgLiveClass(i)">
                <figcaption>{{ img.caption }}</figcaption>
              </figure>
            </div>
          </div>

          <!-- DDFTZ metrics -->
          <div v-else-if="currentSlide.type === 'ddftz-metrics'" class="panel panel--dark">
            <header class="panel__head">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
            </header>
            <div class="metrics-layout">
              <figure v-if="currentSlide.image" class="metrics-layout__img">
                <img :src="currentSlide.image" alt="DDFTZ" :class="[imgAnimClass(0, 'tilt-in'), imgLiveClass(0)]">
              </figure>
              <div class="metrics-grid">
                <article v-for="(c, i) in currentSlide.cards" :key="c.title" class="metric-card glass-card" :style="{ animationDelay: `${i * 0.1}s` }">
                  <div class="metric-card__icon"><svg viewBox="0 0 24 24" fill="currentColor"><path :d="icons[c.icon]" /></svg></div>
                  <div class="metric-card__body">
                    <h4>{{ c.title }}</h4>
                    <p>{{ c.detail }}</p>
                  </div>
                  <div class="metric-card__num">
                    <strong>{{ c.metric }}</strong>
                    <span>{{ c.metricLabel }}</span>
                  </div>
                </article>
                <div class="metric-card glass-card metric-card--wide">
                  <h3 class="card-label">Lead-Time Comparison</h3>
                  <div v-for="(b, i) in currentSlide.compareBars" :key="b.label" class="bar bar--on-dark" :class="{ 'bar--highlight': b.highlight }">
                    <label>{{ b.label }}</label>
                    <div class="bar__track bar__track--dark"><div class="bar__fill" :style="{ width: `${b.value}%`, animationDelay: `${i * 0.08}s` }"></div></div>
                    <span>{{ b.highlight ? 'Fastest' : `${b.value}%` }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product showcase -->
          <div v-else-if="currentSlide.type === 'product-showcase'" class="panel panel--dark">
            <header class="panel__head panel__head--compact">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
              <p class="lede">{{ currentSlide.body }}</p>
            </header>
            <div class="showcase" :class="{ 'showcase--dual': currentSlide.secondaryImage }">
              <figure class="showcase__main img-stage" :class="[currentSlide.contain ? 'img-stage--contain' : 'img-stage--cover', imgAnimClass(0, 'flip-in')]" :style="imgAnimDelay(0)">
                <img :src="currentSlide.image" :alt="currentSlide.title" :class="['img-stage__img', imgLiveClass(0)]">
                <div class="showcase__tags">
                  <span v-for="(tag, i) in currentSlide.tags" :key="tag" :style="{ animationDelay: `${i * 0.08}s` }">{{ tag }}</span>
                </div>
              </figure>
              <figure v-if="currentSlide.secondaryImage" class="showcase__secondary img-stage img-stage--contain" :class="imgAnimClass(1, 'slide-right')" :style="imgAnimDelay(1, 0.1)">
                <img :src="currentSlide.secondaryImage" alt="Product features" :class="['img-stage__img', imgLiveClass(1)]">
              </figure>
              <div class="showcase__side">
                <div class="glass-card">
                  <h3 class="card-label">Performance</h3>
                  <div v-for="(s, i) in currentSlide.specs" :key="s.label" class="bar bar--on-dark">
                    <label>{{ s.label }}</label>
                    <div class="bar__track bar__track--dark"><div class="bar__fill" :style="{ width: `${s.value}%`, animationDelay: `${i * 0.1}s` }"></div></div>
                    <span>{{ s.value }}%</span>
                  </div>
                </div>
                <div v-if="currentSlide.vBars" class="glass-card">
                  <h3 class="card-label">{{ currentSlide.vBars.title }}</h3>
                  <div class="vbar-chart vbar-chart--compact">
                    <div v-for="(item, i) in currentSlide.vBars.items" :key="item.label" class="vbar-col">
                      <div class="vbar-col__track"><div class="vbar-col__fill" :style="{ height: `${item.value}%`, background: item.color, animationDelay: `${i * 0.07}s` }"></div></div>
                      <span class="vbar-col__val">{{ item.value }}%</span>
                      <span class="vbar-col__lbl">{{ item.label }}</span>
                    </div>
                  </div>
                </div>
                <div class="detail__figures">
                  <article v-for="(fig, i) in currentSlide.figures" :key="fig.label" class="figure-card" :style="{ animationDelay: `${i * 0.08}s` }">
                    <strong>{{ fig.value }}</strong>
                    <span>{{ fig.label }}</span>
                  </article>
                </div>
              </div>
              <div v-if="slideLineChart" class="showcase__line glass-card">
                <h3 class="card-label">{{ currentSlide.lineChart.title }}</h3>
                <div class="line-chart">
                  <svg :viewBox="`0 0 ${slideLineChart.w} ${slideLineChart.h}`" preserveAspectRatio="none" class="line-chart__svg">
                    <path v-for="(s, i) in slideLineChart.rendered" :key="`${s.label}-area`" :d="s.area" :fill="s.color" fill-opacity="0.12" class="line-area" />
                    <path v-for="(s, i) in slideLineChart.rendered" :key="s.label" :d="s.path" :stroke="s.color" stroke-width="1.6" class="line-path" :style="{ animationDelay: `${i * 0.1}s` }" />
                  </svg>
                  <div class="line-chart__labels"><span v-for="l in slideLineChart.labels" :key="l">{{ l }}</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product gallery -->
          <div v-else-if="currentSlide.type === 'product-gallery'" class="panel panel--dark">
            <header class="panel__head panel__head--compact">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
              <p class="lede">{{ currentSlide.subtitle }}</p>
            </header>
            <div class="prod-gallery-wrap">
              <div v-if="slideDonut || currentSlide.vBars" class="prod-gallery__charts">
                <div v-if="slideDonut" class="glass-card prod-gallery__pie">
                  <h3>{{ currentSlide.donut.title }}</h3>
                  <div class="donut donut--sm">
                    <svg viewBox="0 0 42 42">
                      <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="4" />
                      <circle v-for="(s, i) in slideDonut.segments" :key="s.label" cx="21" cy="21" r="15.9" fill="none" :stroke="s.color" stroke-width="4" :stroke-dasharray="s.dash" :stroke-dashoffset="25 - s.offset" class="donut__seg" :style="{ animationDelay: `${i * 0.08}s` }" />
                    </svg>
                    <div class="donut__center"><strong>100%</strong><span>Range</span></div>
                  </div>
                  <ul class="legend legend--compact">
                    <li v-for="s in slideDonut?.segments" :key="s.label"><i :style="{ background: s.color }"></i>{{ s.label }} <b>{{ s.pct }}%</b></li>
                  </ul>
                </div>
                <div v-if="currentSlide.vBars" class="glass-card prod-gallery__vbars">
                  <h3>{{ currentSlide.vBars.title }}</h3>
                  <div class="vbar-chart">
                    <div v-for="(item, i) in currentSlide.vBars.items" :key="item.label" class="vbar-col">
                      <div class="vbar-col__track"><div class="vbar-col__fill" :style="{ height: `${item.value}%`, background: item.color, animationDelay: `${i * 0.06}s` }"></div></div>
                      <span class="vbar-col__val">{{ item.value }}%</span>
                      <span class="vbar-col__lbl">{{ item.label }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="slideLineChart" class="glass-card prod-gallery__line">
                  <h3>{{ currentSlide.lineChart.title }}</h3>
                  <div class="line-chart line-chart--compact">
                    <svg :viewBox="`0 0 ${slideLineChart.w} ${slideLineChart.h}`" preserveAspectRatio="none" class="line-chart__svg">
                      <path v-for="s in slideLineChart.rendered" :key="s.label" :d="s.path" :stroke="s.color" stroke-width="1.6" class="line-path" />
                    </svg>
                    <div class="line-chart__labels"><span v-for="l in slideLineChart.labels" :key="l">{{ l }}</span></div>
                  </div>
                </div>
              </div>
            <div class="prod-gallery">
              <article
                v-for="(item, i) in currentSlide.items"
                :key="item.title"
                class="prod-gallery__card"
                :style="imgAnimDelay(i)"
              >
                <figure class="img-stage" :class="[item.contain ? 'img-stage--contain' : 'img-stage--cover', imgAnimClass(i)]" :style="imgAnimDelay(i)">
                  <img :src="item.image" :alt="item.title" :class="['img-stage__img', imgLiveClass(i)]">
                </figure>
                <div class="prod-gallery__meta">
                  <em>{{ item.category }}</em>
                  <strong>{{ item.title }}</strong>
                </div>
              </article>
            </div>
            </div>
          </div>

          <!-- CTA -->
          <div v-else-if="currentSlide.type === 'cta'" class="cta">
            <img :src="currentSlide.image" alt="" class="cta__bg">
            <div class="cta__overlay"></div>
            <div class="cta__content">
              <img :src="deckLogo" alt="" class="slide-brand">
              <p class="eyebrow">{{ currentSlide.eyebrow }}</p>
              <h2 class="headline">{{ currentSlide.title }}</h2>
              <p class="lede">{{ currentSlide.subtitle }}</p>
              <div class="cta__links">
                <template v-for="link in currentSlide.links" :key="link.label">
                  <RouterLink v-if="link.route" :to="link.route" :class="link.primary ? 'btn-glow' : 'btn-ghost'">{{ link.label }}</RouterLink>
                  <a v-else :href="link.href" target="_blank" rel="noopener" :class="link.primary ? 'btn-glow' : 'btn-ghost'">{{ link.label }}</a>
                </template>
              </div>
            </div>
          </div>

          <!-- QR close -->
          <div v-else-if="currentSlide.type === 'qr-close'" class="qr-close">
            <div class="qr-close__glow"></div>
            <img :src="deckLogo" alt="" class="slide-brand qr-close__logo">
            <h2 class="headline">{{ currentSlide.title }}</h2>
            <p class="lede">{{ currentSlide.subtitle }}</p>
            <div class="qr-close__card">
              <img :src="currentSlide.qr" alt="QR code — visit https://www.highlandershoe.com" class="qr-close__code">
              <div class="qr-close__info">
                <p class="qr-close__scan">Scan to visit</p>
                <a :href="currentSlide.url" target="_blank" rel="noopener" class="qr-close__link">{{ currentSlide.urlLabel }}</a>
                <RouterLink to="/contact" class="btn-glow qr-close__btn">Contact Our Team</RouterLink>
              </div>
            </div>
          </div>

        </article>
      </Transition>
    </main>

    <footer class="deck__footer" :class="{ 'deck__footer--show': showControls }">
      <button type="button" class="nav-btn" :disabled="currentIndex === 0" @click="prev">← Prev</button>
      <div class="deck__dots">
        <button
          v-for="(s, i) in slides" :key="s.id" type="button"
          class="dot" :class="{ 'dot--active': i === currentIndex, [`dot--${s.section}`]: s.section }"
          :title="s.title || s.id" @click="goTo(i, i > currentIndex ? 'next' : 'prev')"
        />
      </div>
      <button type="button" class="nav-btn nav-btn--primary" :disabled="currentIndex === slides.length - 1" @click="next">Next →</button>
    </footer>
  </div>
</template>

<style scoped>
.deck {
  --amber: #f59e0b;
  --amber-glow: rgba(245, 158, 11, 0.35);
  --sky: #0ea5e9;
  --bg: #030712;
  --glass: rgba(255, 255, 255, 0.06);
  --glass-border: rgba(255, 255, 255, 0.12);
  --deck-chrome: 8.75rem;
  --slide-h: calc(100vh - var(--deck-chrome));
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: #f8fafc;
  overflow: hidden;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.deck--fullscreen { height: 100dvh; --slide-h: calc(100dvh - var(--deck-chrome)); }

.deck__bg { position: absolute; inset: 0; pointer-events: none; }
.deck__mesh {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 20% 20%, rgba(245,158,11,0.08), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(14,165,233,0.08), transparent 40%),
    linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px);
  background-size: auto, auto, 40px 40px, 40px 40px;
}
.deck__orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; }
.deck__orb--amber { width: 360px; height: 360px; background: var(--amber-glow); top: -120px; left: -80px; animation: float 10s ease-in-out infinite; }
.deck__orb--sky { width: 300px; height: 300px; background: rgba(14,165,233,0.25); bottom: -60px; right: -60px; animation: float 12s ease-in-out infinite reverse; }

.deck__header {
  position: relative; z-index: 20;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 0.85rem 1.25rem;
  background: rgba(3, 7, 18, 0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--glass-border);
}
.deck__brand { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
.deck__logo { height: 2.25rem; }
.deck__brand-text { display: flex; flex-direction: column; min-width: 0; }
.deck__meta { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #fcd34d; }
.deck__title { font-size: 0.82rem; font-weight: 600; color: #cbd5e1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.deck__actions { display: flex; align-items: center; gap: 0.45rem; }
.deck__section-pill {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.3rem 0.65rem; border-radius: 9999px; border: 1px solid var(--glass-border);
}
.deck__section-pill--intro { background: rgba(245,158,11,0.15); color: #fcd34d; border-color: rgba(245,158,11,0.35); }
.deck__section-pill--products { background: rgba(16,185,129,0.12); color: #6ee7b7; border-color: rgba(16,185,129,0.3); }
.deck__section-pill--ddftz { background: rgba(14,165,233,0.12); color: #7dd3fc; border-color: rgba(14,165,233,0.3); }
.deck__counter { font-size: 0.72rem; font-weight: 600; color: #94a3b8; padding: 0.3rem 0.6rem; border-radius: 9999px; border: 1px solid var(--glass-border); }
.deck__btn {
  width: 2rem; height: 2rem; border-radius: 9999px;
  border: 1px solid var(--glass-border); color: #e2e8f0;
  display: grid; place-items: center; font-size: 0.85rem;
  transition: 0.2s;
}
.deck__btn:hover { background: var(--glass); border-color: var(--amber); }

.deck__progress { height: 3px; background: rgba(255,255,255,0.06); position: relative; z-index: 20; }
.deck__progress-fill { height: 100%; background: linear-gradient(90deg, var(--amber), #fb923c); transition: width 0.4s ease; }

.deck__stage { flex: 1; padding: 0.5rem 1.25rem 0; position: relative; z-index: 10; min-height: 0; overflow: hidden; }
.slide { height: var(--slide-h); max-height: var(--slide-h); overflow: hidden; }

.splash, .intro, .chapter, .panel, .ddftz-hero, .cta, .qr-close {
  height: 100%;
  max-height: 100%;
  min-height: 0;
  box-sizing: border-box;
}

/* Logo splash */
.splash {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 2rem; position: relative;
  border-radius: 1.25rem; border: 1px solid var(--glass-border);
  background: radial-gradient(circle at center, rgba(245,158,11,0.08), transparent 55%), rgba(3,7,18,0.6);
}
.splash__glow {
  position: absolute; width: 280px; height: 280px; border-radius: 50%;
  background: var(--amber-glow); filter: blur(60px); opacity: 0.5;
  animation: pulse-glow 3s ease-in-out infinite;
}
.splash__logo {
  width: min(220px, 45vw); position: relative; z-index: 1;
  filter: drop-shadow(0 0 40px var(--amber-glow));
  animation: logo-in 1.2s ease both, img-sway 5.5s 1.2s ease-in-out infinite alternate;
}
.intro__bg, .chapter__bg, .ddftz-hero__bg, .cta__bg {
  animation: img-zoom-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both, ken-burns 16s 1s ease-in-out infinite alternate;
}
.splash__title { margin-top: 1.5rem; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; color: #fff; position: relative; z-index: 1; animation: rise 0.8s 0.3s ease both; }
.splash__tagline { margin-top: 0.5rem; font-size: 1rem; color: #94a3b8; position: relative; z-index: 1; animation: rise 0.8s 0.45s ease both; }
.splash__hint { margin-top: 2rem; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #64748b; position: relative; z-index: 1; animation: rise 0.8s 0.6s ease both; }

.slide-brand {
  width: 72px; height: auto; margin-bottom: 0.75rem;
  filter: drop-shadow(0 0 12px var(--amber-glow));
  opacity: 0.95;
}

/* Typography */
.eyebrow { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #fcd34d; }
.headline { font-size: clamp(1.6rem, 3.5vw, 2.75rem); font-weight: 800; line-height: 1.1; margin-top: 0.5rem; color: #f8fafc; }
.lede { margin-top: 0.75rem; font-size: clamp(0.9rem, 1.5vw, 1.05rem); line-height: 1.7; color: #94a3b8; max-width: 42rem; }
.card-label { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #fcd34d; margin-bottom: 0.65rem; }

/* Intro */
.intro { position: relative; border-radius: 1.25rem; overflow: hidden; border: 1px solid var(--glass-border); }
.intro__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.intro__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(3,7,18,0.94) 0%, rgba(15,23,42,0.7) 50%, rgba(3,7,18,0.5) 100%); }
.intro__content { position: relative; z-index: 2; padding: 1.5rem; display: flex; flex-direction: column; justify-content: flex-end; height: 100%; overflow-y: auto; }
.intro__logo { width: min(140px, 30vw); margin-bottom: 1rem; filter: drop-shadow(0 0 20px var(--amber-glow)); }
.intro__facts { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
.glass-pill {
  display: flex; flex-direction: column; padding: 0.65rem 0.9rem; border-radius: 0.85rem;
  background: var(--glass); border: 1px solid var(--glass-border); backdrop-filter: blur(10px);
  animation: rise 0.5s ease both;
}
.glass-pill strong { font-size: 1.2rem; color: #fcd34d; }
.glass-pill span { font-size: 0.68rem; color: #94a3b8; font-weight: 600; }
.intro__pillars {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; margin-top: 1.25rem;
}
@media (min-width: 768px) { .intro__pillars { grid-template-columns: repeat(4, 1fr); } }
.pillar {
  overflow: hidden; border-radius: 0.85rem; border: 1px solid var(--glass-border);
  background: var(--glass); backdrop-filter: blur(8px); animation: rise 0.5s ease both;
}
.pillar img { width: 100%; height: 100px; object-fit: cover; display: block; }
.pillar figcaption { padding: 0.55rem 0.65rem; }
.pillar em { display: block; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #fcd34d; font-style: normal; }
.pillar strong { display: block; font-size: 0.72rem; color: #f1f5f9; margin-top: 0.15rem; line-height: 1.3; }

/* Chapter */
.chapter {
  border-radius: 1.25rem; position: relative; overflow: hidden;
  border: 1px solid var(--glass-border);
}
.chapter__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.chapter__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(3,7,18,0.88) 0%, rgba(15,23,42,0.75) 60%, rgba(3,7,18,0.85) 100%);
}
.chapter--sky .chapter__overlay { background: linear-gradient(135deg, rgba(3,7,18,0.9) 0%, rgba(8,47,73,0.75) 60%, rgba(3,7,18,0.88) 100%); }
.chapter__content {
  position: relative; z-index: 2; padding: 2rem;
  display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
  height: 100%;
}
.chapter__num { font-size: 5rem; font-weight: 900; line-height: 1; opacity: 0.2; color: #fff; }
.chapter__title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; margin-top: -1rem; background: linear-gradient(90deg, #fff, #fcd34d); -webkit-background-clip: text; background-clip: text; color: transparent; }
.chapter--sky .chapter__title { background: linear-gradient(90deg, #fff, #7dd3fc); -webkit-background-clip: text; background-clip: text; }
.chapter__sub { margin-top: 1rem; max-width: 32rem; font-size: 1.05rem; line-height: 1.7; color: #cbd5e1; }
.chapter__line { margin-top: 2rem; width: 80px; height: 4px; border-radius: 9999px; background: linear-gradient(90deg, var(--amber), transparent); }
.chapter--sky .chapter__line { background: linear-gradient(90deg, var(--sky), transparent); }

/* Panels */
.panel { border-radius: 1.25rem; padding: 1rem; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; }
.panel--dark {
  background: linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(3,7,18,0.98) 100%);
  border: 1px solid var(--glass-border);
  box-shadow: 0 25px 60px -30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04);
}
@media (min-width: 768px) { .panel { padding: 1.75rem; } }
.panel__head { margin-bottom: 1rem; }
.panel__head--compact { margin-bottom: 0.75rem; }
.panel__head--compact .headline { font-size: clamp(1.35rem, 3vw, 1.85rem); }
.panel__head--compact .lede { font-size: 0.88rem; }

.glass-card {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem;
  padding: 1rem; backdrop-filter: blur(8px);
}

/* Analytics */
.analytics { display: grid; gap: 0.75rem; flex: 1; align-content: start; }
@media (min-width: 768px) { .analytics { grid-template-columns: 1fr 1fr; } }
.analytics__products { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.55rem; }
@media (min-width: 640px) { .analytics__products { grid-template-columns: repeat(4, 1fr); } }
.analytics__chart h3, .analytics__bars h3, .analytics__line h3, .analytics__vbars h3 { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 0.65rem; }

.donut { position: relative; width: min(200px, 55vw); margin: 0 auto; }
.donut--lg { width: min(240px, 65vw); }
.donut--md { width: min(180px, 50vw); }
.donut--sm { width: min(140px, 40vw); }
.donut svg { width: 100%; transform: rotate(-90deg); }
.donut__seg { animation: donut-in 1s ease both; }
.donut__center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.donut__center strong { font-size: 1.75rem; font-weight: 900; color: #fcd34d; }
.donut__center span { font-size: 0.72rem; color: #94a3b8; font-weight: 600; }
.legend { margin-top: 0.75rem; display: grid; gap: 0.35rem; }
.legend li { display: flex; align-items: center; gap: 0.45rem; font-size: 0.78rem; font-weight: 600; color: #cbd5e1; }
.legend i { width: 0.55rem; height: 0.55rem; border-radius: 9999px; flex-shrink: 0; }
.legend b { margin-left: auto; color: #fcd34d; }
.legend--compact { gap: 0.25rem; }
.legend--compact li { font-size: 0.68rem; }

/* Line chart */
.line-chart { display: grid; gap: 0.35rem; }
.line-chart__svg { width: 100%; height: min(140px, 18vh); display: block; }
.line-chart--tall .line-chart__svg { height: min(180px, 22vh); }
.line-chart--compact .line-chart__svg { height: min(90px, 12vh); }
.line-path { fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 200; animation: line-draw 1.4s ease both; }
.line-area { opacity: 0; animation: area-in 0.9s 0.25s ease both; }
.line-dot { opacity: 0; animation: rise 0.35s ease both; }
.line-chart__labels { display: flex; justify-content: space-between; gap: 0.25rem; }
.line-chart__labels span { font-size: 0.58rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
.line-chart__legend { display: flex; flex-wrap: wrap; gap: 0.5rem 0.85rem; margin: 0.25rem 0 0; padding: 0; list-style: none; }
.line-chart__legend li { display: flex; align-items: center; gap: 0.35rem; font-size: 0.68rem; font-weight: 600; color: #cbd5e1; }
.line-chart__legend i { width: 0.5rem; height: 0.5rem; border-radius: 9999px; }

/* Vertical bar chart */
.vbar-chart { display: flex; align-items: flex-end; justify-content: space-around; gap: 0.45rem; min-height: 130px; padding-top: 0.25rem; }
.vbar-chart--tall { min-height: 160px; }
.vbar-chart--compact { min-height: 100px; }
.vbar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; min-width: 0; }
.vbar-col__track { width: 100%; max-width: 2.5rem; height: 100px; border-radius: 0.45rem 0.45rem 0.1rem 0.1rem; background: rgba(255,255,255,0.08); display: flex; align-items: flex-end; overflow: hidden; }
.vbar-chart--tall .vbar-col__track { height: 120px; }
.vbar-chart--compact .vbar-col__track { height: 72px; }
.vbar-col__fill { width: 100%; border-radius: 0.45rem 0.45rem 0 0; animation: vbar-in 1s ease both; }
.vbar-col__val { font-size: 0.62rem; font-weight: 800; color: #fcd34d; }
.vbar-col__lbl { font-size: 0.58rem; font-weight: 600; color: #94a3b8; text-align: center; line-height: 1.2; }

/* Dashboard grid */
.dash-grid { display: grid; gap: 0.75rem; flex: 1; align-content: start; }
@media (min-width: 768px) { .dash-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .dash-grid { grid-template-columns: repeat(4, 1fr); } }
.dash-grid__pie { grid-column: span 1; }
.dash-grid__line { grid-column: span 1; }
@media (min-width: 1100px) { .dash-grid__line { grid-column: span 2; } }
.dash-grid__vbars { grid-column: span 1; }
.dash-grid__hbars { grid-column: span 1; }
@media (min-width: 768px) { .dash-grid__hbars { grid-column: span 2; } }
@media (min-width: 1100px) { .dash-grid__hbars { grid-column: span 1; } }
.dash-grid__imgs { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; }
@media (min-width: 768px) { .dash-grid__imgs { grid-template-columns: repeat(3, 1fr); } }
.dash-grid__img { height: min(140px, 16vh); position: relative; animation: rise 0.5s ease both; }
.dash-grid__img figcaption { position: absolute; bottom: 0; left: 0; right: 0; padding: 0.45rem 0.65rem; font-size: 0.65rem; font-weight: 700; color: #e2e8f0; background: linear-gradient(transparent, rgba(3,7,18,0.9)); }
.dash-grid h3 { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 0.55rem; }

.bar { display: grid; grid-template-columns: minmax(90px, 1fr) 2fr auto; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; }
.bar label { font-size: 0.72rem; font-weight: 700; color: #94a3b8; }
.bar--on-dark label, .bar--on-dark span { color: #e2e8f0; }
.bar__track { height: 0.55rem; border-radius: 9999px; background: rgba(255,255,255,0.08); overflow: hidden; }
.bar__track--dark { background: rgba(255,255,255,0.1); }
.bar__fill { height: 100%; border-radius: 9999px; background: linear-gradient(90deg, var(--amber), #fb923c); animation: bar-in 1s ease both; }
.bar--highlight .bar__fill { background: linear-gradient(90deg, #22c55e, #4ade80); }
.bar span { font-size: 0.68rem; font-weight: 700; color: #fcd34d; }

.prod-tile {
  display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem;
  border-radius: 0.85rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03);
  animation: rise 0.5s ease both; overflow: hidden;
}
.prod-tile .img-stage { height: 120px; border-radius: 0.65rem; }
.prod-tile strong { display: block; font-size: 0.78rem; color: #f1f5f9; }
.prod-tile em { font-size: 0.65rem; color: #fcd34d; font-style: normal; font-weight: 600; }

/* Image staging */
.img-stage {
  margin: 0; overflow: hidden; border-radius: 0.85rem;
  background: linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #0f172a 100%);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
}
.img-stage__img { width: 100%; height: 100%; display: block; }
.img-stage--contain .img-stage__img { object-fit: contain; padding: 0.65rem; }
.img-stage--cover .img-stage__img { object-fit: cover; }
.img-stage--thumb { height: 110px; }
.img-stage.img-anim { transform-origin: center center; will-change: transform, opacity; }

/* Image entrance animations */
.img-anim { animation-duration: 0.85s; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); animation-fill-mode: both; }
.img-anim--slide-left { animation-name: img-slide-left; }
.img-anim--slide-right { animation-name: img-slide-right; }
.img-anim--slide-up { animation-name: img-slide-up; }
.img-anim--rotate-in { animation-name: img-rotate-in; }
.img-anim--flip-in { animation-name: img-flip-in; }
.img-anim--zoom-in { animation-name: img-zoom-in; }
.img-anim--tilt-in { animation-name: img-tilt-in; }

/* Continuous image motion */
.img-live { transform-origin: center center; }
.img-live--ken-burns { animation: ken-burns 14s ease-in-out infinite alternate; }
.img-live--sway { animation: img-sway 5.5s ease-in-out infinite alternate; }
.img-live--float-tilt { animation: img-float-tilt 6s ease-in-out infinite alternate; }

/* Product detail */
.detail { display: grid; gap: 1rem; }
@media (min-width: 1024px) {
  .detail { grid-template-columns: 1.2fr 0.8fr; }
  .detail__charts { grid-column: 2; grid-row: 1 / span 2; align-self: start; }
}
.intro__logo.splash__logo--sm { width: min(100px, 22vw); }
.detail__hero.img-stage { height: min(340px, 42vh); }
.detail__gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; }
@media (min-width: 768px) { .detail__gallery { grid-template-columns: repeat(4, 1fr); } }
.detail__gallery .img-stage { animation: rise 0.45s ease both; }
.detail__charts { display: grid; gap: 0.75rem; }
.detail__figures { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; }
.figure-card {
  padding: 1rem; border-radius: 0.85rem; text-align: center;
  background: linear-gradient(135deg, #0f172a, #1e293b); color: #fff;
  animation: rise 0.5s ease both;
}

/* Product showcase */
.showcase { display: grid; gap: 0.75rem; flex: 1; align-content: start; }
@media (min-width: 1024px) {
  .showcase { grid-template-columns: 1.2fr 0.8fr; align-items: stretch; }
  .showcase--dual { grid-template-columns: 1fr 1fr; }
  .showcase--dual .showcase__side { grid-column: 1 / -1; grid-template-columns: repeat(3, 1fr); display: grid; }
}
.showcase__main { position: relative; min-height: min(260px, 32vh); }
.showcase__secondary { min-height: min(220px, 28vh); }
.showcase__line { grid-column: 1 / -1; }
.showcase__tags {
  position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem 0.85rem;
  display: flex; flex-wrap: wrap; gap: 0.4rem;
  background: linear-gradient(transparent, rgba(3,7,18,0.85));
}
.showcase__tags span {
  padding: 0.3rem 0.65rem; border-radius: 9999px; font-size: 0.68rem; font-weight: 700;
  background: rgba(245,158,11,0.2); color: #fcd34d; border: 1px solid rgba(252,211,77,0.35);
  animation: rise 0.45s ease both;
}
.showcase__side { display: grid; gap: 0.75rem; }

/* Product gallery grid */
.prod-gallery-wrap { display: grid; gap: 0.75rem; flex: 1; align-content: start; }
.prod-gallery__charts { display: grid; gap: 0.65rem; }
@media (min-width: 768px) { .prod-gallery__charts { grid-template-columns: repeat(3, 1fr); } }
.prod-gallery__charts h3 { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 0.5rem; }
.prod-gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.55rem; }
@media (min-width: 768px) { .prod-gallery { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1200px) { .prod-gallery { grid-template-columns: repeat(5, 1fr); } }
.prod-gallery__card {
  border-radius: 0.9rem; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03);
  animation: rise 0.5s ease both;
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.prod-gallery__card:hover { transform: translateY(-4px); border-color: rgba(252,211,77,0.35); }
.prod-gallery__card .img-stage { height: min(110px, 14vh); border-radius: 0; border: none; }
.prod-gallery__meta { padding: 0.65rem 0.75rem 0.8rem; }
.prod-gallery__meta em { display: block; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-style: normal; }
.prod-gallery__meta strong { display: block; font-size: 0.78rem; color: #f1f5f9; margin-top: 0.2rem; }
.figure-card strong { display: block; font-size: 1.5rem; color: #fcd34d; }
.figure-card span { font-size: 0.68rem; color: #94a3b8; font-weight: 600; }

/* Dual */
.dual { display: grid; gap: 1rem; }
@media (min-width: 1024px) { .dual { grid-template-columns: 1fr 1fr; } }
.dual__img { width: 100%; height: 200px; margin-bottom: 0.75rem; }
.dual__col h3 { font-size: 0.95rem; font-weight: 800; color: #f1f5f9; margin-bottom: 0.65rem; }
.dual__thumbs { display: grid; grid-template-columns: 1fr 1fr; gap: 0.55rem; margin-top: 0.75rem; }
.dual__thumbs .img-stage { border-radius: 0.65rem; }

/* Market */
.market { display: grid; gap: 0.75rem; flex: 1; align-content: start; }
.market__charts { display: grid; gap: 0.65rem; }
@media (min-width: 768px) { .market__charts { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .market { grid-template-columns: 1fr 1.1fr; } .market__charts { grid-template-columns: 1fr; } }
.market__vbars h3, .market__line h3 { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 0.5rem; }
.market__imgs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.55rem; }
.market__img { overflow: hidden; border-radius: 0.85rem; border: 1px solid #e2e8f0; animation: rise 0.5s ease both; }
.market__img { border: 1px solid rgba(255,255,255,0.1); border-radius: 0.85rem; overflow: hidden; }
.market__img.img-stage { height: min(150px, 17vh); }
.market__img figcaption { padding: 0.55rem 0.75rem; font-size: 0.72rem; font-weight: 700; color: #cbd5e1; background: rgba(0,0,0,0.25); }

/* DDFTZ hero */
.ddftz-hero {
  position: relative; border-radius: 1.25rem; overflow: hidden;
  border: 1px solid rgba(14,165,233,0.3);
}
.ddftz-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; }
.ddftz-hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.85) 55%, rgba(8,47,73,0.75) 100%); }
.ddftz-hero__content { position: relative; z-index: 2; padding: 1.75rem; display: flex; flex-direction: column; justify-content: flex-end; height: 100%; max-width: 36rem; }
.ddftz-hero__stats { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 1.25rem; }

/* DDFTZ visual */
.ddftz-visual { display: grid; gap: 1rem; }
@media (min-width: 1024px) { .ddftz-visual { grid-template-columns: 1.2fr 0.8fr; align-items: start; } }
.ddftz-visual__img { margin: 0; overflow: hidden; border-radius: 1rem; border: 1px solid rgba(14,165,233,0.25); }
.ddftz-visual__img { overflow: hidden; }
.ddftz-visual__img img { width: 100%; height: 100%; min-height: 220px; max-height: 100%; object-fit: cover; display: block; }
.ddftz-visual { flex: 1; min-height: 0; align-items: stretch; }
@media (min-width: 1024px) { .ddftz-visual__img { min-height: 0; height: 100%; } }
.ddftz-visual__side { display: grid; gap: 0.75rem; }

/* DDFTZ gallery */
.ddftz-gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
@media (min-width: 1024px) { .ddftz-gallery { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
.ddftz-gallery__item {
  overflow: hidden; border-radius: 1rem; border: 1px solid rgba(14,165,233,0.2);
  background: rgba(255,255,255,0.03); animation: rise 0.5s ease both;
}
.ddftz-gallery { flex: 1; min-height: 0; align-content: stretch; }
.ddftz-gallery__item { display: flex; flex-direction: column; min-height: 0; }
.ddftz-gallery__item img { width: 100%; flex: 1; min-height: 140px; object-fit: cover; display: block; }
.ddftz-gallery__item figcaption { padding: 0.75rem 1rem; font-size: 0.78rem; font-weight: 600; color: #cbd5e1; line-height: 1.4; }

/* Metrics */
.metrics-layout { display: grid; gap: 1rem; }
@media (min-width: 1024px) { .metrics-layout { grid-template-columns: 0.85fr 1.15fr; align-items: start; } }
.metrics-layout__img { overflow: hidden; border-radius: 1rem; border: 1px solid rgba(14,165,233,0.25); margin: 0; }
.metrics-layout__img img { width: 100%; height: min(380px, 45vh); object-fit: cover; object-position: center top; }
.metrics-grid { display: grid; gap: 0.75rem; }
@media (min-width: 1024px) { .metrics-grid { grid-template-columns: repeat(3, 1fr); } }
.metric-card { display: grid; gap: 0.65rem; animation: rise 0.5s ease both; }
.metric-card--wide { grid-column: 1 / -1; }
.metric-card__icon { width: 2.25rem; height: 2.25rem; border-radius: 0.65rem; background: rgba(245,158,11,0.15); color: #fcd34d; display: grid; place-items: center; }
.metric-card__icon svg { width: 1.1rem; height: 1.1rem; }
.metric-card__body h4 { font-size: 0.88rem; font-weight: 800; color: #f1f5f9; }
.metric-card__body p { font-size: 0.75rem; color: #94a3b8; line-height: 1.45; }
.metric-card__num { padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.1); }
.metric-card__num strong { font-size: 1.35rem; color: #fcd34d; }
.metric-card__num span { display: block; font-size: 0.65rem; color: #94a3b8; font-weight: 600; }

/* QR close */
.qr-close {
  position: relative; border-radius: 1.25rem; overflow: hidden;
  border: 1px solid rgba(252,211,77,0.2);
  background: linear-gradient(160deg, #020617 0%, #0f172a 45%, #1e293b 100%);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 2.5rem 1.5rem; gap: 0.75rem;
}
.qr-close__glow {
  position: absolute; width: min(420px, 80vw); height: min(420px, 80vw); border-radius: 50%;
  background: radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%);
  animation: pulse-glow 4s ease-in-out infinite; pointer-events: none;
}
.qr-close__logo { position: relative; z-index: 1; width: min(90px, 18vw); margin-bottom: 0.25rem; }
.qr-close .headline, .qr-close .lede { position: relative; z-index: 1; max-width: 32rem; }
.qr-close__card {
  position: relative; z-index: 1; display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
  gap: 2rem; margin-top: 1.25rem; padding: 1.5rem 2rem; border-radius: 1.25rem;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(12px); animation: rise 0.6s ease both;
}
.qr-close__code {
  width: 200px; height: 200px; border-radius: 1rem; padding: 0.75rem; background: #fff;
  animation: qr-pulse 2.8s ease-in-out infinite;
}
.qr-close__info { display: flex; flex-direction: column; align-items: flex-start; gap: 0.65rem; text-align: left; }
.qr-close__scan { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8; }
.qr-close__link { font-size: 1.35rem; font-weight: 800; color: #fcd34d; transition: color 0.2s; }
.qr-close__link:hover { color: #fde68a; }
.qr-close__btn { margin-top: 0.35rem; }

/* CTA */
.cta { position: relative; border-radius: 1.25rem; overflow: hidden; border: 1px solid var(--glass-border); }
.cta__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.cta__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(3,7,18,0.92), rgba(15,23,42,0.65)); }
.cta__content { position: relative; z-index: 2; padding: 2rem; display: flex; flex-direction: column; justify-content: flex-end; height: 100%; }
.cta__links { display: flex; flex-wrap: wrap; gap: 0.65rem; margin-top: 1.5rem; }
.btn-glow {
  display: inline-flex; padding: 0.7rem 1.35rem; border-radius: 9999px;
  background: linear-gradient(135deg, var(--amber), #fb923c); color: #0f172a;
  font-size: 0.85rem; font-weight: 700; box-shadow: 0 8px 24px -6px var(--amber-glow);
  transition: transform 0.2s;
}
.btn-glow:hover { transform: translateY(-2px); }
.btn-ghost {
  display: inline-flex; padding: 0.7rem 1.35rem; border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.35); color: #fff; font-size: 0.85rem; font-weight: 600;
  transition: 0.2s;
}
.btn-ghost:hover { background: rgba(255,255,255,0.08); }

/* Footer */
.deck__footer {
  position: relative; z-index: 20;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 0.75rem 1.25rem 1rem;
  opacity: 0; transform: translateY(6px); transition: 0.3s;
}
.deck__footer--show { opacity: 1; transform: translateY(0); }
.nav-btn { padding: 0.5rem 1rem; border-radius: 9999px; border: 1px solid var(--glass-border); font-size: 0.8rem; font-weight: 600; color: #e2e8f0; }
.nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.nav-btn--primary { background: var(--amber); border-color: var(--amber); color: #0f172a; }
.deck__dots { display: none; flex-wrap: wrap; justify-content: center; gap: 0.3rem; max-width: 50vw; }
@media (min-width: 768px) { .deck__dots { display: flex; } }
.dot { width: 0.4rem; height: 0.4rem; border-radius: 9999px; background: rgba(255,255,255,0.2); transition: 0.25s; }
.dot--active { width: 1.1rem; }
.dot--intro.dot--active { background: #fcd34d; }
.dot--products.dot--active { background: #34d399; }
.dot--ddftz.dot--active { background: #38bdf8; }

/* Animations */
.fwd-enter-active, .fwd-leave-active, .back-enter-active, .back-leave-active { transition: 0.4s ease; }
.fwd-enter-from { opacity: 0; transform: translateX(28px); }
.fwd-leave-to { opacity: 0; transform: translateX(-28px); }
.back-enter-from { opacity: 0; transform: translateX(-28px); }
.back-leave-to { opacity: 0; transform: translateX(28px); }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bar-in { from { width: 0; } }
@keyframes donut-in { from { stroke-dasharray: 0 100; } }
@keyframes logo-in { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
@keyframes pulse-glow { 0%, 100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.08); } }
@keyframes ken-burns { from { transform: scale(1); } to { transform: scale(1.08); } }
@keyframes img-slide-left { from { opacity: 0; transform: translateX(-36px) scale(0.94); } to { opacity: 1; transform: translateX(0) scale(1); } }
@keyframes img-slide-right { from { opacity: 0; transform: translateX(36px) scale(0.94); } to { opacity: 1; transform: translateX(0) scale(1); } }
@keyframes img-slide-up { from { opacity: 0; transform: translateY(32px) scale(0.94); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes img-rotate-in { from { opacity: 0; transform: perspective(900px) rotateY(-22deg) rotateX(6deg) scale(0.9); } to { opacity: 1; transform: perspective(900px) rotateY(0) rotateX(0) scale(1); } }
@keyframes img-flip-in { from { opacity: 0; transform: perspective(900px) rotateY(90deg) scale(0.88); } to { opacity: 1; transform: perspective(900px) rotateY(0) scale(1); } }
@keyframes img-zoom-in { from { opacity: 0; transform: scale(0.78); } to { opacity: 1; transform: scale(1); } }
@keyframes img-tilt-in { from { opacity: 0; transform: rotate(-8deg) scale(0.9); } to { opacity: 1; transform: rotate(0) scale(1); } }
@keyframes img-sway { from { transform: rotate(-2deg) scale(1); } to { transform: rotate(2deg) scale(1.03); } }
@keyframes img-float-tilt { from { transform: translateY(0) rotate(0deg); } to { transform: translateY(-6px) rotate(1.5deg); } }
@keyframes qr-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(252,211,77,0.45); }
  50% { box-shadow: 0 0 0 14px rgba(252,211,77,0); }
}
@keyframes line-draw { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
@keyframes area-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes vbar-in { from { height: 0; } }
</style>
