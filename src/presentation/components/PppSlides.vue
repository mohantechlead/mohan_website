<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { buildLineChart } from '@/presentation/utils/charts.js'
import { presentationMeta } from '@/presentation/data/slides.js'

const props = defineProps({
  slide: { type: Object, required: true }
})

const isLightSlice = (color) => /^#?(fff|ffffff)$/i.test(color.replace(/\s/g, ''))

const buildDonut = (segments) => {
  const total = segments.reduce((s, x) => s + x.value, 0)
  const cx = 21
  const cy = 21
  const ringR = 15.9
  let offset = 0
  return {
    total,
    segments: segments.map((seg) => {
      const pct = (seg.value / total) * 100
      const mid = offset + pct / 2
      const angle = (2 * Math.PI * mid) / 100
      const rounded = Math.round(pct)
      const item = {
        ...seg,
        dash: `${pct} ${100 - pct}`,
        offset,
        pct: rounded,
        labelX: cx + ringR * Math.sin(angle),
        labelY: cy - ringR * Math.cos(angle),
        labelLight: isLightSlice(seg.color),
        showLabel: pct >= 3
      }
      offset += pct
      return item
    })
  }
}

const slideLineChart = computed(() => {
  const lc = props.slide.lineChart
  if (!lc?.series?.length || !lc?.labels?.length) return null
  return { ...lc, ...buildLineChart(lc.series, lc.labels, lc.opts) }
})

const slideDonuts = computed(() =>
  (props.slide.donuts ?? []).map((d) => ({ ...d, ...buildDonut(d.segments) }))
)

const scaledVBars = computed(() => {
  const vb = props.slide.vBars
  if (!vb?.items?.length) return null
  const max = Math.max(...vb.items.map((i) => i.value))
  return {
    ...vb,
    items: vb.items.map((i) => ({ ...i, pct: Math.round((i.value / max) * 100) }))
  }
})

const IMG_ENTRANCE = ['slide-left', 'slide-right', 'slide-up', 'rotate-in', 'flip-in', 'zoom-in']
const imgAnimClass = (i = 0, o) => `img-anim img-anim--${o ?? IMG_ENTRANCE[i % IMG_ENTRANCE.length]}`
const imgLiveClass = (i = 0) => `img-live img-live--${['ken-burns', 'sway', 'float-tilt'][i % 3]}`
const imgDelay = (i = 0, b = 0) => ({ animationDelay: `${b + (i % 6) * 0.08}s` })
const isStaticPhoto = (slide, img) => Boolean(slide.staticPhotos || img.static)
const isStaticGridPhoto = (slide, img) => Boolean(slide.staticPhotos || img.static)
</script>

<template>
  <!-- Title -->
  <div v-if="slide.type === 'ppp-title'" class="ppp ppp-title">
    <img :src="slide.texture" alt="" class="ppp-title__texture">
    <div class="ppp-title__overlay"></div>
    <div class="ppp-title__content">
      <div class="ppp-title__hero">
        <div class="ppp-title__ring ppp-title__ring--outer"></div>
        <div class="ppp-title__ring ppp-title__ring--inner"></div>
        <img :src="slide.logo" alt="Mohan Group" class="ppp-title__logo">
      </div>
      <h1 class="ppp-title__heading">{{ slide.title }}</h1>
      <p class="ppp-title__tagline">{{ slide.tagline }}</p>
      <div class="ppp-title__line"></div>
      <p class="ppp-title__event">{{ slide.event }}</p>
    </div>
    <p class="ppp-footer ppp-footer--title">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Stat grid -->
  <div v-else-if="slide.type === 'stat-grid'" class="ppp ppp-panel">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <p class="ppp-body">{{ slide.body }}</p>
    <div class="ppp-stats">
      <article v-for="(s, i) in slide.stats" :key="s.label" class="ppp-stat" :style="imgDelay(i)">
        <strong>{{ s.value }}</strong>
        <span>{{ s.label }}</span>
        <em v-if="s.sub">{{ s.sub }}</em>
        <em v-if="s.sub2">{{ s.sub2 }}</em>
      </article>
    </div>
    <p class="ppp-source">{{ slide.source }}</p>
    <p class="ppp-footer">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Chart + KPIs -->
  <div v-else-if="slide.type === 'ppp-chart-kpi'" class="ppp ppp-panel">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <p class="ppp-source">{{ slide.source }}</p>
    <div class="ppp-chart-kpi">
      <div v-if="slideLineChart" class="ppp-chart-card">
        <h3>{{ slide.lineChart.title }}</h3>
        <svg :viewBox="`0 0 ${slideLineChart.w} ${slideLineChart.h}`" preserveAspectRatio="none" class="ppp-chart-svg">
          <path v-for="s in slideLineChart.rendered" :key="s.label" :d="s.path" :stroke="s.color" stroke-width="1.8"
            fill="none" class="line-path" />
          <template v-for="s in slideLineChart.rendered" :key="`${s.label}-d`">
            <circle v-for="(p, pi) in s.points" :key="pi" :cx="p.x" :cy="p.y" r="1.8" :fill="s.color" />
          </template>
        </svg>
        <div class="ppp-chart-labels"><span v-for="l in slideLineChart.labels" :key="l">{{ l }}</span></div>
      </div>
      <div class="ppp-kpis">
        <article v-for="(k, i) in slide.kpis" :key="k.label" class="ppp-kpi" :style="imgDelay(i)">
          <strong>{{ k.value }}</strong>
          <span>{{ k.label }}</span>
          <em v-if="k.sub">{{ k.sub }}</em>
        </article>
      </div>
    </div>
    <p class="ppp-footnote">{{ slide.footnote }}</p>
    <p class="ppp-footer">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Dual chart -->
  <div v-else-if="slide.type === 'ppp-dual-chart'" class="ppp ppp-panel">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <p class="ppp-source">{{ slide.source }}</p>
    <div class="ppp-dual-charts">
      <div v-if="scaledVBars" class="ppp-chart-card">
        <h3>{{ scaledVBars.title }}</h3>
        <div class="vbar-chart">
          <div v-for="(item, i) in scaledVBars.items" :key="item.label" class="vbar-col">
            <div class="vbar-col__track">
              <div class="vbar-col__fill"
                :style="{ height: `${item.pct}%`, background: item.color, animationDelay: `${i * 0.06}s` }"></div>
            </div>
            <span class="vbar-col__val">{{ item.value }}</span>
            <span class="vbar-col__lbl">{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div v-if="slideLineChart" class="ppp-chart-card">
        <h3>{{ slide.lineChart.title }}</h3>
        <svg :viewBox="`0 0 ${slideLineChart.w} ${slideLineChart.h}`" preserveAspectRatio="none" class="ppp-chart-svg">
          <path v-for="s in slideLineChart.rendered" :key="s.label" :d="s.path" :stroke="s.color" stroke-width="1.8"
            fill="none" />
        </svg>
        <div class="ppp-chart-labels"><span v-for="l in slideLineChart.labels" :key="l">{{ l }}</span></div>
      </div>
    </div>
    <p class="ppp-note">{{ slide.note }}</p>
    <p class="ppp-highlight">{{ slide.highlight }}</p>
    <p class="ppp-footer">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Dual pie -->
  <div v-else-if="slide.type === 'ppp-dual-pie'" class="ppp ppp-panel ppp-panel--fit">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <p class="ppp-source">{{ slide.source }}</p>
    <div class="ppp-dual-pie ppp-dual-pie--fit">
      <div v-for="(d, di) in slideDonuts" :key="d.title" class="ppp-chart-card ppp-chart-card--pie">
        <h3>{{ d.title }}</h3>
        <div class="ppp-pie-row">
          <div class="donut">
            <svg viewBox="0 0 42 42" class="donut__svg">
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="9" />
              <circle v-for="(s, i) in d.segments" :key="s.label" cx="21" cy="21" r="15.9" fill="none" :stroke="s.color"
                stroke-width="9" :stroke-dasharray="s.dash" :stroke-dashoffset="25 - s.offset" class="donut__seg"
                :style="{ animationDelay: `${i * 0.08}s` }" />
              <text v-for="s in d.segments" v-show="s.showLabel" :key="`${s.label}-lbl`" :x="s.labelX" :y="s.labelY"
                class="donut__label" :class="{ 'donut__label--sm': s.pct < 8, 'donut__label--dark': s.labelLight }"
                text-anchor="middle" dominant-baseline="central" alignment-baseline="central">{{ s.pct }}%</text>
            </svg>
          </div>
          <ul class="legend legend--pie">
            <li v-for="s in d.segments" :key="s.label">
              <i :style="{ background: s.color, border: s.labelLight ? '1px solid #888888' : undefined }"></i>
              <span class="legend__text">{{ s.label }} <b>{{ s.pct }}%</b></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="ppp-footnote ppp-footnote--fit">{{ slide.footnote }}</p>
    <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Story -->
  <div v-else-if="slide.type === 'story-split'" class="ppp ppp-panel ppp-panel--story">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <div class="ppp-story">
      <figure class="ppp-story__photo" :class="imgAnimClass(0, 'rotate-in')">
        <img :src="slide.image" :alt="slide.name" :class="imgLiveClass(0)">
      </figure>
      <div class="ppp-story__text">
        <h3>{{ slide.name }}</h3>
        <p class="ppp-story__role">{{ slide.role }}</p>
        <p class="ppp-story__co">{{ slide.company }}</p>
        <p v-for="p in slide.paragraphs" :key="p" class="ppp-body">{{ p }}</p>
      </div>
    </div>
    <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Presence -->
  <div v-else-if="slide.type === 'presence'" class="ppp ppp-panel ppp-panel--presence">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <div class="ppp-presence">
      <figure class="ppp-presence__img" :class="imgAnimClass(0)">
        <img :src="slide.image" alt="Mohan Group HQ" :class="imgLiveClass(0)">
      </figure>
      <div class="ppp-presence__side">
        <div class="ppp-stats ppp-stats--row">
          <article v-for="(s, i) in slide.stats" :key="s.label" class="ppp-stat" :style="imgDelay(i)">
            <strong>{{ s.value }}</strong><span>{{ s.label }}</span>
          </article>
        </div>
        <p class="ppp-label">Product Portfolio:</p>
        <div class="ppp-tags">
          <span v-for="(t, i) in slide.portfolio" :key="t" :style="imgDelay(i)">{{ t }}</span>
        </div>
      </div>
    </div>
    <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Feature split -->
  <div v-else-if="slide.type === 'feature-split'" class="ppp ppp-panel ppp-panel--feature">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <div class="ppp-feature" :class="{ 'ppp-feature--duo': slide.images?.length }">
      <figure class="ppp-feature__img" :class="[imgAnimClass(0, 'slide-left'), {
        'ppp-feature__img--multi': slide.images?.length > 1,
        'ppp-feature__img--pair': slide.images?.length === 2,
        'ppp-feature__img--quad-fit': slide.quadImageFit,
        'ppp-feature__img--pent-fit': slide.pentImageFit,
      }]">
        <div v-if="slide.pentImageFit && slide.images?.length >= 5" class="ppp-feature__pent-grid">
          <div v-for="(img, ii) in slide.images" :key="img.src" class="ppp-feature__pent-cell">
            <img :src="img.src" :alt="img.caption || slide.title" class="ppp-feature__pent-img"
              :style="{ objectPosition: img.objectPosition || 'center center' }">
          </div>
        </div>
        <div v-else-if="slide.images?.length >= 4" class="ppp-feature__quad-grid">
          <div v-for="(img, ii) in slide.images" :key="img.src" class="ppp-feature__quad-cell">
            <img :src="img.src" :alt="img.caption || slide.title" class="ppp-feature__quad-img"
              :style="{ objectPosition: img.objectPosition || 'center center' }">
          </div>
        </div>
        <template v-else-if="slide.images?.length">
          <div v-for="(img, ii) in slide.images" :key="img.src" class="ppp-feature__duo-item">
            <img :src="img.src" :alt="img.caption || slide.title" class="ppp-feature__duo-img"
              :style="{ objectFit: 'contain', objectPosition: img.objectPosition || 'center center' }">
          </div>
        </template>
        <img v-else :src="slide.image" :alt="slide.title" :class="imgLiveClass(0)">
      </figure>
      <div class="ppp-feature__list">
        <article v-for="(f, i) in slide.features" :key="f.title" class="ppp-feature__item" :style="imgDelay(i)">
          <strong>{{ f.title }}</strong>
          <span>{{ f.detail }}</span>
        </article>
      </div>
    </div>
    <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Photo grid -->
  <div v-else-if="slide.type === 'photo-grid'" class="ppp ppp-panel"
    :class="{ 'ppp-panel--photos': slide.largePhotos }">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <p v-if="slide.subtitle" class="ppp-body">{{ slide.subtitle }}</p>
    <div class="ppp-photo-grid" :class="{
      'ppp-photo-grid--large': slide.largePhotos,
      'ppp-photo-grid--contain': slide.containPhotos,
      'ppp-photo-grid--three-cols': slide.threeCols,
      'ppp-photo-grid--static': slide.staticPhotos
    }">
      <figure v-for="(img, i) in slide.images" :key="img.src"
        :class="isStaticGridPhoto(slide, img) ? undefined : imgAnimClass(i)"
        :style="isStaticGridPhoto(slide, img) ? undefined : imgDelay(i)">
        <img :src="img.src" :alt="img.caption" :class="isStaticGridPhoto(slide, img) ? undefined : imgLiveClass(i)"
          :style="img.objectPosition ? { objectPosition: img.objectPosition } : undefined">
        <figcaption>{{ img.caption }}</figcaption>
      </figure>
    </div>
    <p class="ppp-footer" :class="{ 'ppp-footer--panel': slide.largePhotos }">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Photo duo -->
  <div v-else-if="slide.type === 'photo-duo'" class="ppp ppp-panel" :class="{ 'ppp-panel--photos': slide.largePhotos }">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <p v-if="slide.subtitle" class="ppp-body">{{ slide.subtitle }}</p>
    <div class="ppp-photo-duo"
      :class="{ 'ppp-photo-duo--large': slide.largePhotos, 'ppp-photo-duo--static': slide.staticPhotos }">
      <figure v-for="(img, i) in slide.images" :key="img.src"
        :class="isStaticPhoto(slide, img) ? undefined : imgAnimClass(i)"
        :style="isStaticPhoto(slide, img) ? undefined : imgDelay(i)">
        <div v-if="isStaticPhoto(slide, img)" class="ppp-photo-duo__frame"
          :class="{ 'ppp-photo-duo__frame--static': slide.largePhotos || slide.staticPhotos }">
          <img :src="img.src" :alt="img.caption" class="ppp-photo-duo__img--static"
            :style="img.objectPosition ? { objectPosition: img.objectPosition } : undefined">
        </div>
        <img v-else :src="img.src" :alt="img.caption" :class="imgLiveClass(i)"
          :style="img.objectPosition ? { objectPosition: img.objectPosition } : undefined">
        <figcaption>{{ img.caption }}</figcaption>
      </figure>
    </div>
    <p class="ppp-footer" :class="{ 'ppp-footer--panel': slide.largePhotos }">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Portfolio + industries merged -->
  <div v-else-if="slide.type === 'portfolio-industries'" class="ppp ppp-panel ppp-panel--portfolio"
    :class="{ 'ppp-panel--resin-bg': slide.background }">
    <img v-if="slide.background" :src="slide.background" alt="" class="ppp-slide-bg">
    <div v-if="slide.background" class="ppp-slide-bg-overlay"></div>
    <div class="ppp-panel__content">
      <h2 class="ppp-headline ppp-resin-title">{{ slide.title }}</h2>
      <div class="ppp-resin-grid ppp-portfolio-resins">
        <article v-for="(r, i) in slide.resins" :key="r.code" class="ppp-resin-card" :style="imgDelay(i)">
          <div class="ppp-resin-card__media">
            <img v-if="r.image" :src="r.image" :alt="r.code" class="ppp-resin-card__thumb"
              :style="r.objectPosition ? { objectPosition: r.objectPosition } : undefined">
          </div>
          <div class="ppp-resin-card__body">
            <strong>{{ r.code }}</strong>
            <em>{{ r.name }}</em>
            <span>{{ r.uses }}</span>
          </div>
        </article>
      </div>
      <p class="ppp-portfolio-section-label">{{ slide.industriesTitle }}</p>
      <div class="ppp-industry-grid ppp-portfolio-industries">
        <article v-for="(item, i) in slide.items" :key="item.title" class="ppp-industry-card" :style="imgDelay(i)">
          <figure class="ppp-industry-card__figure">
            <img :src="item.image" :alt="item.title" class="ppp-industry-card__img">
          </figure>
          <div class="ppp-industry-card__text">
            <strong>{{ item.title }}</strong>
            <span>{{ item.detail }}</span>
          </div>
        </article>
      </div>
      <p class="ppp-footnote ppp-resin-footnote">{{ slide.footnote }}</p>
      <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
    </div>
  </div>

  <!-- Application categories 4x4 -->
  <div v-else-if="slide.type === 'application-categories-4x4'" class="ppp ppp-panel ppp-panel--apps-4x4"
    :class="{ 'ppp-panel--resin-bg': slide.background }">
    <img v-if="slide.background" :src="slide.background" alt="" class="ppp-slide-bg">
    <div v-if="slide.background" class="ppp-slide-bg-overlay"></div>
    <div class="ppp-panel__content">
      <h2 class="ppp-headline ppp-resin-title">{{ slide.title }}</h2>
      <div class="ppp-apps-4x4">
        <section v-for="(category, colIndex) in slide.categories" :key="category.heading" class="ppp-apps-4x4__column"
          :style="imgDelay(colIndex, 0.05)">
          <h3 class="ppp-apps-4x4__heading">{{ category.heading }}</h3>
          <article v-for="(item, i) in category.items" :key="`${category.heading}-${item.title}`"
            class="ppp-apps-4x4__card" :style="imgDelay(i, 0.12 + colIndex * 0.08)">
            <figure class="ppp-apps-4x4__figure">
              <img :src="item.image" :alt="item.title" class="ppp-apps-4x4__img">
            </figure>
            <div class="ppp-apps-4x4__label">
              <strong>{{ item.title }}</strong>
              <span v-if="item.detail">{{ item.detail }}</span>
            </div>
          </article>
        </section>
      </div>
      <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
    </div>
  </div>

  <!-- Resin grid -->
  <div v-else-if="slide.type === 'resin-grid'" class="ppp ppp-panel"
    :class="{ 'ppp-panel--resin-bg': slide.background }">
    <img v-if="slide.background" :src="slide.background" alt="" class="ppp-slide-bg">
    <div v-if="slide.background" class="ppp-slide-bg-overlay"></div>
    <div class="ppp-panel__content">
      <h2 class="ppp-headline ppp-resin-title">{{ slide.title }}</h2>
      <div class="ppp-resin-grid">
        <article v-for="(r, i) in slide.resins" :key="r.code" class="ppp-resin-card" :style="imgDelay(i)">
          <div class="ppp-resin-card__media">
            <img v-if="r.image" :src="r.image" :alt="r.code" class="ppp-resin-card__thumb"
              :style="r.objectPosition ? { objectPosition: r.objectPosition } : undefined">
          </div>
          <div class="ppp-resin-card__body">
            <strong>{{ r.code }}</strong>
            <em>{{ r.name }}</em>
            <span>{{ r.uses }}</span>
          </div>
        </article>
      </div>
      <p class="ppp-footnote ppp-resin-footnote">{{ slide.footnote }}</p>
      <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
    </div>
  </div>

  <!-- Masterbatch -->
  <div v-else-if="slide.type === 'masterbatch-colors'" class="ppp ppp-panel ppp-panel--masterbatch">
    <div class="ppp-masterbatch__hero">
      <h2 class="ppp-headline ppp-masterbatch__title">{{ slide.title }}</h2>
      <p class="ppp-masterbatch__subtitle">{{ slide.subtitle }}</p>
    </div>
    <div class="ppp-masterbatch__gallery">
      <figure v-for="(img, i) in slide.images" :key="img.src" class="ppp-masterbatch__display"
        :class="imgAnimClass(i, 'flip-in')" :style="imgDelay(i)">
        <img :src="img.src" :alt="img.alt || slide.title" class="ppp-masterbatch__display-img">
      </figure>
    </div>
    <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Industry grid -->
  <div v-else-if="slide.type === 'industry-grid'" class="ppp ppp-panel ppp-panel--industry">
    <h2 class="ppp-headline">{{ slide.title }}</h2>
    <div class="ppp-industry-grid">
      <article v-for="(item, i) in slide.items" :key="item.title" class="ppp-industry-card" :style="imgDelay(i)">
        <figure class="ppp-industry-card__figure">
          <img :src="item.image" :alt="item.title" class="ppp-industry-card__img">
        </figure>
        <div class="ppp-industry-card__text">
          <strong>{{ item.title }}</strong>
          <span>{{ item.detail }}</span>
        </div>
      </article>
    </div>
    <p class="ppp-footer ppp-footer--panel">{{ presentationMeta.footer }}</p>
  </div>

  <!-- Thank you -->
  <div v-else-if="slide.type === 'ppp-thankyou'" class="ppp ppp-thankyou">
    <div class="ppp-thankyou__content">
      <img :src="slide.logo" alt="Mohan Group" class="ppp-thankyou__logo">
      <h2 class="ppp-thankyou__title">{{ slide.title }}</h2>
      <p class="ppp-thankyou__sub">{{ slide.subtitle }}</p>
      <div class="ppp-thankyou__card">
        <img v-if="slide.qr" :src="slide.qr" alt="QR code" class="ppp-thankyou__qr">
        <div class="ppp-thankyou__contacts">
          <p v-for="c in slide.contacts" :key="c.label">
            <em>{{ c.label }}:</em>
            <a v-if="c.href" :href="c.href" target="_blank" rel="noopener">{{ c.value }}</a>
            <span v-else>{{ c.value }}</span>
          </p>
        </div>
      </div>
    </div>
    <p class="ppp-thankyou__tagline">{{ slide.tagline }}</p>
    <p class="ppp-footer ppp-footer--thankyou">{{ presentationMeta.footer }}</p>
  </div>
</template>

<style scoped>
.ppp {
  --gold: #C8A020;
  --gold-dark: #8A6D10;
  --gold-light: #F0D060;
  --bg: #080600;
  --panel: #100D00;
  --text: #FFFFFF;
  --muted: #888888;
  --caption: #CCCCCC;
  height: 100%;
  position: relative;
  overflow-y: auto;
  color: var(--text);
  font-family: Calibri, 'Segoe UI', system-ui, sans-serif;
}

.ppp-footer {
  position: absolute;
  bottom: 0.65rem;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.62rem;
  color: var(--muted);
  letter-spacing: 0.04em;
  padding: 0 1rem;
  line-height: 1.4;
}

.ppp-footer--title {
  position: static;
  flex-shrink: 0;
  width: 100%;
  padding: 0.6rem 1rem 0.75rem;
  margin-top: auto;
  border-top: 1px solid rgba(200, 160, 32, 0.12);
}

.ppp-footer--thankyou {
  position: static;
  flex-shrink: 0;
  width: 100%;
  padding: 0.6rem 1rem 0.75rem;
  margin-top: 0;
  border-top: 1px solid rgba(200, 160, 32, 0.12);
}

.ppp-footer--panel {
  position: static;
  flex-shrink: 0;
  width: 100%;
  padding: 0.45rem 0 0.5rem;
  margin-top: auto;
  border-top: 1px solid rgba(200, 160, 32, 0.12);
}

.ppp-panel--fit {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding: 0.85rem 1.25rem 0;
}

.ppp.ppp-panel--fit {
  overflow: hidden;
}

.ppp-panel--fit .ppp-headline {
  flex-shrink: 0;
  margin-bottom: 0.25rem;
  font-size: clamp(1.1rem, 2.2vw, 1.55rem);
  line-height: 1.2;
}

.ppp-panel--fit .ppp-source {
  flex-shrink: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.ppp-dual-pie--fit {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 0.5rem;
  align-items: stretch;
  overflow: hidden;
}

.ppp-chart-card--pie {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  padding: 0.65rem 0.85rem;
  overflow: hidden;
}

.ppp-chart-card--pie h3 {
  flex-shrink: 0;
  margin-bottom: 0.4rem;
}

.ppp-pie-row {
  display: flex;
  align-items: center;
  gap: clamp(0.65rem, 1.5vw, 1rem);
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
}

.ppp-chart-card--pie .donut {
  width: min(280px, 38vw, 36vh);
  height: min(280px, 38vw, 36vh);
  margin: 0;
  flex-shrink: 0;
}

.ppp-chart-card--pie .legend--pie {
  flex: 1;
  min-width: 0;
  margin-top: 0;
  gap: 0.28rem;
  align-self: center;
}

.ppp-chart-card--pie .legend--pie li {
  grid-template-columns: auto 1fr;
  font-size: 0.72rem;
  line-height: 1.35;
}

.ppp-chart-card--pie .legend--pie b {
  font-size: 0.76rem;
  margin-left: 0.3rem;
}

.ppp-chart-card--pie .donut__label {
  font-size: 3.2px;
  letter-spacing: -0.15px;
}

.ppp-chart-card--pie .donut__label--sm {
  font-size: 2.75px;
}

.ppp-footnote--fit {
  flex-shrink: 0;
  font-size: 0.78rem;
  margin-top: 0.45rem;
  margin-bottom: 0;
  padding-top: 0.45rem;
  line-height: 1.45;
  border-top: 1px solid rgba(200, 160, 32, 0.1);
}

@media (max-height: 720px) {
  .ppp-panel--fit {
    padding-top: 0.65rem;
  }

  .ppp-chart-card--pie {
    padding: 0.5rem 0.7rem;
  }

  .ppp-chart-card--pie .donut {
    width: min(220px, 34vw, 30vh);
    height: min(220px, 34vw, 30vh);
  }

  .ppp-chart-card--pie .donut__label {
    font-size: 3.1px;
  }

  .ppp-chart-card--pie .donut__label--sm {
    font-size: 2.7px;
  }

  .ppp-chart-card--pie .legend--pie li {
    font-size: 0.68rem;
  }

  .ppp-footnote--fit {
    font-size: 0.72rem;
    margin-top: 0.35rem;
    padding-top: 0.35rem;
  }

  .donut__label {
    font-size: 2.35px;
  }

  .donut__label--sm {
    font-size: 2px;
  }
}

@media (max-width: 520px) {
  .ppp-pie-row {
    flex-direction: column;
    align-items: stretch;
  }

  .ppp-chart-card--pie .donut {
    width: min(220px, 70vw);
    height: min(220px, 70vw);
    margin: 0 auto;
  }
}

.ppp-panel {
  background: var(--bg);
  border-radius: 1rem;
  border: 1px solid rgba(200, 160, 32, 0.15);
  padding: 1.25rem 1.5rem 2.5rem;
}

.ppp-headline {
  font-size: clamp(1.35rem, 2.8vw, 2rem);
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 0.65rem;
}

.ppp-body {
  font-size: 0.92rem;
  color: var(--caption);
  line-height: 1.6;
  max-width: 52rem;
}

.ppp-source,
.ppp-note {
  font-size: 0.72rem;
  color: var(--muted);
  margin-top: 0.5rem;
}

.ppp-footnote {
  font-size: 0.82rem;
  color: var(--caption);
  margin-top: 0.75rem;
  line-height: 1.5;
}

.ppp-highlight {
  font-size: 0.85rem;
  color: var(--gold-light);
  font-weight: 600;
  margin-top: 0.35rem;
}

.ppp-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gold);
  margin: 0.75rem 0 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Title slide */
.ppp-title {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  background: var(--bg);
  border-radius: 1rem;
  overflow: hidden;
}

.ppp-title__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
  width: 100%;
  padding: clamp(0.75rem, 2vh, 1.5rem) 1rem clamp(0.5rem, 1.5vh, 1rem);
}

.ppp-title__texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
}

.ppp-title__overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 6, 0, 0.72);
}

.ppp-title__hero {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: min(240px, 34vw, 28vh);
  height: min(240px, 34vw, 28vh);
  margin-bottom: clamp(0.65rem, 1.5vh, 1.25rem);
  flex-shrink: 1;
}

.ppp-title__ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 3px solid var(--gold);
  pointer-events: none;
}

.ppp-title__ring--outer {
  width: 100%;
  height: 100%;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}

.ppp-title__ring--inner {
  width: 82%;
  height: 82%;
  border-color: var(--gold-dark);
  background: rgba(200, 160, 32, 0.06);
}

.ppp-title__logo {
  position: relative;
  z-index: 1;
  display: block;
  width: 110%;
  height: auto;
  object-fit: contain;
  object-position: center;
  filter: drop-shadow(0 0 20px rgba(200, 160, 32, 0.4));
  animation: logo-in 1s ease both;
}

.ppp-title__heading {
  position: relative;
  z-index: 2;
  font-size: clamp(1.15rem, 2.6vw, 2rem);
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.06em;
  animation: rise 0.8s 0.2s ease both;
}

.ppp-title__tagline {
  position: relative;
  z-index: 2;
  font-size: clamp(0.82rem, 1.4vw, 1.05rem);
  color: var(--text);
  margin-top: 0.5rem;
  max-width: 36rem;
  padding: 0 0.5rem;
  animation: rise 0.8s 0.35s ease both;
}

.ppp-title__line {
  position: relative;
  z-index: 2;
  width: min(320px, 50vw);
  height: 3px;
  background: var(--gold);
  margin: clamp(0.75rem, 1.5vh, 1.1rem) 0;
  animation: rise 0.8s 0.45s ease both;
}

.ppp-title__event {
  position: relative;
  z-index: 2;
  font-size: clamp(0.72rem, 1.2vw, 0.82rem);
  color: var(--muted);
  padding: 0 0.75rem;
  animation: rise 0.8s 0.55s ease both;
}

/* Stats */
.ppp-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .ppp-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

.ppp-stats--row {
  grid-template-columns: repeat(3, 1fr);
}

.ppp-stat {
  padding: 0.85rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(200, 160, 32, 0.2);
  background: var(--panel);
  animation: rise 0.5s ease both;
}

.ppp-stat strong {
  display: block;
  font-size: 1.5rem;
  color: var(--gold);
}

.ppp-stat span {
  display: block;
  font-size: 0.72rem;
  color: var(--caption);
  margin-top: 0.2rem;
  line-height: 1.3;
}

.ppp-stat em {
  display: block;
  font-size: 0.65rem;
  color: var(--muted);
  font-style: normal;
}

/* KPIs */
.ppp-chart-kpi {
  display: grid;
  gap: 1rem;
  margin-top: 0.75rem;
}

@media (min-width: 900px) {
  .ppp-chart-kpi {
    grid-template-columns: 1.4fr 0.6fr;
    align-items: start;
  }
}

.ppp-kpis {
  display: grid;
  gap: 0.55rem;
}

.ppp-kpi {
  padding: 0.85rem;
  border-radius: 0.65rem;
  background: var(--panel);
  border: 1px solid rgba(200, 160, 32, 0.2);
  animation: rise 0.5s ease both;
}

.ppp-kpi strong {
  display: block;
  font-size: 1.75rem;
  color: var(--gold);
}

.ppp-kpi span {
  font-size: 0.78rem;
  color: var(--caption);
}

.ppp-kpi em {
  font-size: 0.68rem;
  color: var(--muted);
  font-style: normal;
}

.ppp-chart-card {
  background: var(--panel);
  border: 1px solid rgba(200, 160, 32, 0.15);
  border-radius: 0.75rem;
  padding: 0.85rem;
}

.ppp-chart-card h3 {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--caption);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.ppp-chart-svg {
  width: 100%;
  height: min(180px, 22vh);
  display: block;
}

.ppp-chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.35rem;
}

.ppp-chart-labels span {
  font-size: 0.58rem;
  color: var(--muted);
}

.ppp-dual-charts {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

@media (min-width: 900px) {
  .ppp-dual-charts {
    grid-template-columns: 1fr 1fr;
  }
}

.ppp-dual-pie {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

@media (min-width: 768px) {
  .ppp-dual-pie {
    grid-template-columns: 1fr 1fr;
  }
}

.ppp-dual-pie--fit {
  gap: 0.75rem;
}

.donut {
  position: relative;
  width: min(200px, 55vw);
  margin: 0 auto;
}

.donut__svg {
  width: 100%;
  display: block;
  overflow: visible;
}

.donut__seg {
  animation: donut-in 1s ease both;
}

.donut__label {
  font-size: 2.6px;
  font-weight: 800;
  fill: #ffffff;
  stroke: rgba(8, 6, 0, 0.85);
  stroke-width: 0.4px;
  paint-order: stroke fill;
  font-family: Calibri, 'Segoe UI', system-ui, sans-serif;
}

.donut__label--sm {
  font-size: 2.15px;
}

.donut__label--dark {
  fill: #080600;
  stroke: rgba(255, 255, 255, 0.45);
}

.legend {
  margin-top: 0.65rem;
  display: grid;
  gap: 0.3rem;
  list-style: none;
  padding: 0;
}

.legend li {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: var(--caption);
}

.legend__text {
  min-width: 0;
  line-height: 1.25;
}

.legend i {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend b {
  color: var(--gold);
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
}

.vbar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 0.35rem;
  min-height: 140px;
}

.vbar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 0;
}

.vbar-col__track {
  width: 100%;
  max-width: 2rem;
  height: 110px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 0.35rem 0.35rem 0 0;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.vbar-col__fill {
  width: 100%;
  border-radius: 0.35rem 0.35rem 0 0;
  animation: vbar-in 1s ease both;
}

.vbar-col__val {
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--gold);
}

.vbar-col__lbl {
  font-size: 0.55rem;
  color: var(--muted);
  text-align: center;
  line-height: 1.2;
}

/* Story */
.ppp-panel--story {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}

.ppp.ppp-panel--story {
  overflow: hidden;
}

.ppp-panel--story .ppp-story {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 0.75rem;
  align-items: stretch;
}

.ppp-story {
  display: grid;
  gap: 1rem;
  margin-top: 0.75rem;
}

@media (min-width: 900px) {
  .ppp-story {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: stretch;
  }
}

.ppp-panel--story .ppp-story__photo {
  display: flex;
  margin: 0;
  min-height: min(440px, 52vh);
  height: 100%;
}

.ppp-story__photo {
  overflow: hidden;
  border-radius: 0.75rem;
  border: 2px solid rgba(200, 160, 32, 0.3);
  margin: 0;
}

.ppp-panel--story .ppp-story__photo img {
  width: 100%;
  height: 100%;
  min-height: min(440px, 52vh);
  object-fit: cover;
  object-position: center 12%;
  display: block;
}

.ppp-story__photo img {
  width: 100%;
  height: min(440px, 52vh);
  object-fit: cover;
  object-position: center 12%;
  display: block;
}

.ppp-story__text h3 {
  font-size: 1.25rem;
  color: var(--gold);
}

.ppp-story__role {
  font-size: 0.85rem;
  color: var(--gold-light);
  font-weight: 600;
}

.ppp-story__co {
  font-size: 0.78rem;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

/* Presence */
.ppp-panel--presence {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}

.ppp.ppp-panel--presence {
  overflow: hidden;
}

.ppp-panel--presence .ppp-presence {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 0.75rem;
  align-items: stretch;
}

.ppp-presence {
  display: grid;
  gap: 1rem;
  margin-top: 0.75rem;
}

@media (min-width: 900px) {
  .ppp-presence {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }
}

.ppp-panel--presence .ppp-presence__img {
  display: flex;
  margin: 0;
  min-height: min(440px, 52vh);
  height: 100%;
}

.ppp-presence__img {
  margin: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid rgba(200, 160, 32, 0.2);
}

.ppp-panel--presence .ppp-presence__img img {
  width: 100%;
  height: 100%;
  min-height: min(440px, 52vh);
  object-fit: fill;
  object-position: center center;
  display: block;
}

.ppp-presence__img img {
  width: 100%;
  height: min(440px, 52vh);
  object-fit: cover;
  object-position: center center;
  display: block;
}

.ppp-presence__side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}

.ppp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.ppp-tags span {
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 700;
  background: rgba(200, 160, 32, 0.12);
  color: var(--gold-light);
  border: 1px solid rgba(200, 160, 32, 0.25);
  animation: rise 0.4s ease both;
}

/* Feature */
.ppp-panel--feature {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}

.ppp.ppp-panel--feature {
  overflow: hidden;
}

.ppp-panel--feature .ppp-headline {
  flex-shrink: 0;
  margin-bottom: 0.4rem;
  font-size: clamp(1.1rem, 2.2vw, 1.55rem);
  line-height: 1.2;
}

.ppp-panel--feature .ppp-feature {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 0.5rem;
  align-items: stretch;
  overflow: hidden;
}

.ppp-feature {
  display: grid;
  gap: 1rem;
  margin-top: 0.75rem;
}

@media (min-width: 900px) {
  .ppp-feature {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }

  .ppp-feature--duo {
    grid-template-columns: 0.95fr 1.05fr;
  }
}

.ppp-panel--feature .ppp-feature__img {
  display: flex;
  margin: 0;
  min-height: 0;
  height: 100%;
  max-height: min(380px, 48vh);
}

.ppp-panel--feature .ppp-feature__img--multi {
  max-height: min(520px, 62vh);
  width: 100%;
  max-width: 100%;
  align-items: stretch;
}

.ppp-panel--feature .ppp-feature__img--pair {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.35rem;
  padding: 0.3rem;
  background: rgba(0, 0, 0, 0.2);
}

.ppp-feature__pent-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: 1.05fr 1fr;
  gap: 0.35rem;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  min-height: min(460px, 54vh);
  padding: 0.35rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.65rem;
}

.ppp-feature__pent-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(200, 160, 32, 0.25);
  border-radius: 0.45rem;
  overflow: hidden;
}

.ppp-feature__pent-cell:nth-child(1) {
  grid-column: 1 / 4;
  grid-row: 1;
}

.ppp-feature__pent-cell:nth-child(2) {
  grid-column: 4 / 7;
  grid-row: 1;
}

.ppp-feature__pent-cell:nth-child(3) {
  grid-column: 1 / 3;
  grid-row: 2;
}

.ppp-feature__pent-cell:nth-child(4) {
  grid-column: 3 / 5;
  grid-row: 2;
}

.ppp-feature__pent-cell:nth-child(5) {
  grid-column: 5 / 7;
  grid-row: 2;
}

.ppp-feature__pent-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  background: rgba(0, 0, 0, 0.48);
  display: block;
}

.ppp-panel--feature .ppp-feature__img--pent-fit .ppp-feature__pent-img {
  width: 88%;
  height: 94%;
  background: none;
  object-fit: contain;
}

.ppp-feature__quad-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 0.4rem;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  min-height: min(460px, 54vh);
  padding: 0.35rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.65rem;
}

.ppp-feature__quad-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(200, 160, 32, 0.25);
  border-radius: 0.45rem;
  overflow: hidden;
}

.ppp-feature__quad-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  background: rgba(0, 0, 0, 0.48);
  display: block;
}

.ppp-panel--feature .ppp-feature__img--quad-fit .ppp-feature__quad-img,
.ppp-panel--feature .ppp-feature__img--quad-fit img {
  width: 74%;
  height: 96%;
  background: none;
  object-fit: contain;
}

.ppp-feature__img {
  margin: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid rgba(200, 160, 32, 0.2);
}

.ppp-panel--feature .ppp-feature__img img {
  width: 100%;
  height: 100%;
  min-height: 0;
  max-height: min(380px, 48vh);
  object-fit: cover;
  object-position: center center;
  display: block;
}

.ppp-feature__duo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 0;
  width: 92%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(200, 160, 32, 0.25);
  border-radius: 0.45rem;
  overflow: hidden;
}

.ppp-panel--feature .ppp-feature__duo-img {
  width: 100%;
  height: 100%;
  max-height: none;
  object-fit: contain;
  object-position: center center;
  background: rgba(0, 0, 0, 0.48);
  border-radius: 0.45rem;
}

.ppp-panel--feature .ppp-feature--duo .ppp-feature__img {
  max-height: min(460px, 58vh);
  width: 100%;
  max-width: 90%;
  justify-self: center;
}

.ppp-panel--feature .ppp-feature--duo .ppp-feature__img--multi {
  max-width: 100%;
}

.ppp-feature__img img {
  width: 100%;
  height: min(440px, 52vh);
  object-fit: cover;
  object-position: center center;
  display: block;
}

.ppp-feature__list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  overflow: hidden;
}

.ppp-feature__item {
  padding: 0.65rem 0.75rem;
  border-left: 3px solid var(--gold);
  margin-bottom: 0.5rem;
  background: var(--panel);
  border-radius: 0 0.5rem 0.5rem 0;
  animation: rise 0.45s ease both;
}

.ppp-feature__item strong {
  display: block;
  font-size: 0.82rem;
  color: var(--gold);
}

.ppp-feature__item span {
  font-size: 0.75rem;
  color: var(--caption);
  line-height: 1.4;
}

.ppp-panel--feature .ppp-feature__item {
  padding: 0.5rem 0.65rem;
  margin-bottom: 0.35rem;
}

.ppp-panel--feature .ppp-feature__item:last-child {
  margin-bottom: 0;
}

.ppp-panel--feature .ppp-feature__item strong {
  font-size: 0.78rem;
}

.ppp-panel--feature .ppp-feature__item span {
  font-size: 0.72rem;
  line-height: 1.35;
}

/* Photos */
.ppp-photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
  margin-top: 0.75rem;
}

.ppp-photo-grid figure {
  margin: 0;
  overflow: hidden;
  border-radius: 0.65rem;
  border: 1px solid rgba(200, 160, 32, 0.15);
  animation: rise 0.5s ease both;
}

.ppp-photo-grid img {
  width: 100%;
  height: min(160px, 18vh);
  object-fit: cover;
  display: block;
}

.ppp-photo-grid--contain figure {
  background: #0f0d08;
}

.ppp-photo-grid--contain img {
  object-fit: contain;
}

.ppp-photo-grid--three-cols {
  grid-template-columns: repeat(3, 1fr);
}

.ppp-photo-grid--three-cols figure {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.ppp-photo-grid--three-cols img {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  max-height: none;
  object-fit: cover;
}

.ppp-photo-grid--static figure,
.ppp-photo-grid--static img {
  animation: none;
}

.ppp-photo-grid figcaption {
  padding: 0.45rem 0.6rem;
  font-size: 0.65rem;
  color: var(--caption);
  background: var(--panel);
}

.ppp-photo-duo {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

@media (min-width: 768px) {
  .ppp-photo-duo {
    grid-template-columns: 1fr 1fr;
  }
}

.ppp-photo-duo figure {
  margin: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid rgba(200, 160, 32, 0.15);
}

.ppp-photo-duo img {
  width: 100%;
  height: min(240px, 28vh);
  object-fit: cover;
  display: block;
}

.ppp-photo-duo figcaption {
  padding: 0.5rem 0.75rem;
  font-size: 0.72rem;
  color: var(--caption);
  background: var(--panel);
}

/* Large DDFTZ photo slides */
.ppp-panel--photos {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}

.ppp.ppp-panel--photos {
  overflow: hidden;
}

.ppp-panel--photos .ppp-body {
  flex-shrink: 0;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.ppp-panel--photos .ppp-photo-duo--large,
.ppp-panel--photos .ppp-photo-grid--large {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 0.5rem;
  align-items: stretch;
}

.ppp-photo-duo--large figure {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.ppp-photo-duo--large img {
  flex: 1 1 auto;
  width: 100%;
  min-height: min(280px, 34vh);
  height: 100%;
  max-height: none;
  object-fit: cover;
}

.ppp-photo-grid--large img {
  height: min(220px, 26vh);
}

.ppp-photo-duo--large figcaption,
.ppp-photo-grid--large figcaption {
  flex-shrink: 0;
  font-size: 0.72rem;
}

.ppp-photo-duo__frame--static {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0d08;
  min-height: min(280px, 32vh);
  overflow: hidden;
}

.ppp-photo-duo--static figure {
  animation: none;
}

.ppp-photo-duo--static .ppp-photo-duo__img--static {
  width: 100%;
  height: 100%;
  max-height: min(280px, 32vh);
  object-fit: contain;
  object-position: center center;
  display: block;
  animation: none;
}

.ppp-photo-duo--large.ppp-photo-duo--static figure {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.ppp-photo-duo--large.ppp-photo-duo--static .ppp-photo-duo__frame--static {
  flex: 1 1 auto;
  min-height: min(320px, 42vh);
}

.ppp-photo-duo--large.ppp-photo-duo--static .ppp-photo-duo__img--static {
  max-height: none;
  height: 100%;
  width: 100%;
  object-fit: contain;
}

/* Resin grid */
.ppp-panel--resin-bg {
  position: relative;
  overflow: hidden;
  padding: 0;
  height: 100%;
  border-color: rgba(200, 160, 32, 0.25);
}

.ppp.ppp-panel--resin-bg {
  overflow: hidden;
}

.ppp-slide-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 0;
}

.ppp-slide-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 6, 0, 0.9) 0%, rgba(8, 6, 0, 0.82) 45%, rgba(8, 6, 0, 0.92) 100%);
  z-index: 1;
}

.ppp-panel--resin-bg .ppp-panel__content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: clamp(0.75rem, 1.5vh, 1.1rem) clamp(1rem, 2vw, 1.5rem) 0;
}

.ppp-resin-title {
  flex-shrink: 0;
  font-size: clamp(1.05rem, 2.2vw, 1.55rem);
  margin-bottom: 0.35rem;
}

.ppp-panel--resin-bg .ppp-resin-grid {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0.45rem;
  align-items: stretch;
}

@media (min-width: 768px) {
  .ppp-panel--resin-bg .ppp-resin-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}

.ppp-panel--resin-bg .ppp-resin-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0.4rem;
  background: rgba(16, 13, 0, 0.92);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(200, 160, 32, 0.22);
  border-radius: 0.55rem;
  overflow: hidden;
}

.ppp-resin-card__media {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.4rem;
  padding: 0.2rem;
  margin-bottom: 0.3rem;
}

.ppp-panel--resin-bg .ppp-resin-card__thumb {
  width: 100%;
  height: 100%;
  max-height: min(5.5rem, 11vh);
  object-fit: contain;
  object-position: center center;
  border: none;
  background: transparent;
  border-radius: 0;
}

.ppp-resin-card__body {
  flex-shrink: 0;
  text-align: center;
  line-height: 1.2;
}

.ppp-panel--resin-bg .ppp-resin-card strong {
  display: block;
  font-size: 0.78rem;
  color: var(--gold);
}

.ppp-panel--resin-bg .ppp-resin-card em {
  display: block;
  font-size: 0.6rem;
  color: var(--gold-light);
  font-style: normal;
  margin: 0.08rem 0;
}

.ppp-panel--resin-bg .ppp-resin-card span {
  display: block;
  font-size: 0.56rem;
  color: var(--caption);
  line-height: 1.25;
}

.ppp-resin-footnote {
  flex-shrink: 0;
  font-size: 0.72rem;
  margin-top: 0.4rem;
  margin-bottom: 0;
  line-height: 1.35;
}

/* Merged portfolio + industries slide */
.ppp-panel--portfolio {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}

.ppp.ppp-panel--portfolio {
  overflow: hidden;
}

.ppp-panel--portfolio .ppp-panel__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: clamp(0.75rem, 1.5vh, 1.1rem) clamp(1rem, 2vw, 1.5rem) 0;
}

.ppp-panel--portfolio .ppp-resin-title {
  flex-shrink: 0;
  font-size: clamp(1.05rem, 2.2vw, 1.55rem);
  margin-bottom: 0.35rem;
}

.ppp-portfolio-resins {
  flex-shrink: 0;
  margin-top: 0;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.45rem;
}

@media (min-width: 768px) {
  .ppp-panel--portfolio .ppp-portfolio-resins {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}

.ppp-portfolio-section-label {
  flex-shrink: 0;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0.45rem 0 0.3rem;
}

.ppp-portfolio-industries {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 0;
  align-content: start;
}

@media (min-width: 768px) {
  .ppp-panel--portfolio .ppp-portfolio-industries {
    grid-template-columns: repeat(5, 1fr);
  }
}

.ppp-panel--portfolio .ppp-resin-footnote {
  font-size: 0.72rem;
  margin-top: 0.4rem;
}

.ppp-panel--apps-4x4 {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}

.ppp.ppp-panel--apps-4x4 {
  overflow: hidden;
}

.ppp-panel--apps-4x4 .ppp-panel__content {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 auto;
}

.ppp-apps-4x4 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 0.55rem;
  flex: 1 1 auto;
  min-height: 0;
}

@media (min-width: 1024px) {
  .ppp-apps-4x4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.ppp-apps-4x4__column {
  border: 1px solid rgba(200, 160, 32, 0.2);
  border-radius: 0.6rem;
  background: rgba(16, 13, 0, 0.88);
  padding: 0.45rem;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.36rem;
}

.ppp-apps-4x4__heading {
  margin: 0;
  padding: 0.28rem 0.45rem;
  border-radius: 0.45rem;
  background: rgba(200, 160, 32, 0.12);
  border: 1px solid rgba(200, 160, 32, 0.35);
  color: var(--gold-light);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  line-height: 1.2;
}

.ppp-apps-4x4__card {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 0;
  border-radius: 0.45rem;
  overflow: hidden;
  border: 1px solid rgba(200, 160, 32, 0.12);
  background: #0f0d08;
  animation: rise 0.42s ease both;
}

.ppp-apps-4x4__figure {
  margin: 0;
  height: min(82px, 8.8vh);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.26rem 0.34rem;
  overflow: hidden;
}

.ppp-apps-4x4__img {
  width: auto;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.32rem;
}

.ppp-apps-4x4__label {
  margin: 0;
  padding: 0.3rem 0.42rem 0.42rem;
  text-align: center;
  min-height: 0;
  flex-shrink: 0;
  display: grid;
  gap: 0.2rem;
  align-content: start;
  position: relative;
  z-index: 1;
  background: #0f0d08;
}

.ppp-apps-4x4__label strong {
  font-size: 0.66rem;
  color: #f6f2e2;
  line-height: 1.2;
  font-weight: 700;
}

.ppp-apps-4x4__label span {
  display: block;
  font-size: 0.6rem;
  color: #efe7cf;
  line-height: 1.25;
}

.ppp-resin-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.55rem;
  margin-top: 0.75rem;
}

@media (min-width: 768px) {
  .ppp-resin-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.ppp-resin-card {
  padding: 0.75rem;
  border-radius: 0.65rem;
  background: var(--panel);
  border: 1px solid rgba(200, 160, 32, 0.18);
  animation: rise 0.45s ease both;
}

.ppp-resin-card__head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.15rem;
}

.ppp-resin-card__thumb {
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 0.4rem;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(200, 160, 32, 0.28);
  background: rgba(0, 0, 0, 0.25);
}

.ppp-resin-card__thumb--contain {
  object-fit: contain;
  padding: 0.12rem;
}

.ppp-resin-card strong {
  font-size: 0.92rem;
  color: var(--gold);
  line-height: 1.2;
}

.ppp-resin-card em {
  display: block;
  font-size: 0.72rem;
  color: var(--gold-light);
  font-style: normal;
  margin: 0.1rem 0;
}

.ppp-resin-card span {
  font-size: 0.68rem;
  color: var(--caption);
  line-height: 1.35;
}

/* Masterbatch */
.ppp-panel--masterbatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  min-height: 0;
  padding-bottom: 0;
}

.ppp-masterbatch__hero {
  flex-shrink: 0;
  width: 100%;
  max-width: 44rem;
  margin: 0 auto;
}

.ppp-masterbatch__title {
  text-align: center;
  margin: 0 0 0.65rem;
}

.ppp-panel--masterbatch p.ppp-masterbatch__subtitle {
  margin: 0 auto;
  margin-block: 0;
  padding: 0;
  max-width: 38rem;
  font-size: clamp(1.15rem, 2.6vw, 0.75rem);
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: 0.025em;
  color: #fff8e8;
  text-align: center;
  text-wrap: balance;
  text-shadow: 0 0 24px rgba(240, 208, 96, 0.35);
}

.ppp-masterbatch__gallery {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  align-items: stretch;
  margin: 1rem auto 0;
  width: min(920px, 92%);
  min-height: 0;
}

.ppp-masterbatch__display {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  height: min(360px, 42vh);
  min-height: min(360px, 42vh);
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(200, 160, 32, 0.15);
  border-radius: 0.65rem;
  overflow: hidden;
}

.ppp-masterbatch__display-img {
  width: 100%;
  height: 100%;
  max-height: none;
  object-fit: contain;
  object-position: center center;
  display: block;
  border-radius: 0.45rem;
}

.ppp-masterbatch {
  display: grid;
  gap: 1rem;
  margin-top: 0.75rem;
  align-items: center;
}

@media (min-width: 768px) {
  .ppp-masterbatch {
    grid-template-columns: 1fr 1fr;
  }
}

.ppp-masterbatch__img {
  margin: 0;
  background: var(--panel);
  border-radius: 0.75rem;
  padding: 0.75rem;
  border: 1px solid rgba(200, 160, 32, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: min(320px, 38vh);
}

.ppp-masterbatch__img img {
  max-width: 100%;
  max-height: min(360px, 42vh);
  width: auto;
  object-fit: contain;
}

.ppp-masterbatch__colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(2.25rem, 1fr));
  gap: 0.45rem;
  align-items: start;
}

.ppp-color-swatch {
  width: 100%;
  aspect-ratio: 1 / 1;
  min-height: 2.25rem;
  border-radius: 0.45rem;
  animation: rise 0.45s ease both;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.ppp-note {
  grid-column: 1 / -1;
  margin-top: 0.25rem;
}

/* Industry grid */
.ppp-panel--industry {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}

.ppp.ppp-panel--industry {
  overflow: hidden;
}

.ppp-panel--industry .ppp-industry-grid {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 0.65rem;
  align-content: start;
}

.ppp-industry-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.45rem;
  margin-top: 0.75rem;
}

@media (min-width: 768px) {
  .ppp-industry-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
}

.ppp-industry-card {
  display: flex;
  flex-direction: column;
  background: var(--panel);
  border: 1px solid rgba(200, 160, 32, 0.12);
  border-radius: 0.55rem;
  overflow: hidden;
  animation: rise 0.45s ease both;
  min-height: 0;
}

.ppp-industry-card__figure {
  margin: 0;
  height: 4.25rem;
  padding: 0.3rem 0.45rem;
  background: #0f0d08;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(200, 160, 32, 0.08);
}

.ppp-industry-card__img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center center;
  display: block;
}

.ppp-industry-card__text {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  padding: 0.35rem 0.5rem 0.45rem;
}

.ppp-industry-card strong {
  display: block;
  font-size: 0.68rem;
  color: var(--gold);
  line-height: 1.25;
}

.ppp-industry-card span {
  display: block;
  margin-top: 0.12rem;
  font-size: 0.58rem;
  color: var(--caption);
  line-height: 1.3;
}

/* Thank you */
.ppp-thankyou {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  height: 100%;
  min-height: 0;
  background: var(--bg);
  border-radius: 1rem;
  padding: clamp(0.75rem, 1.5vh, 1.25rem) 1.25rem 0;
  border: 1px solid rgba(200, 160, 32, 0.2);
  overflow: hidden;
}

.ppp-thankyou__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
  overflow-y: auto;
  padding-bottom: 0.25rem;
}

.ppp-thankyou__logo {
  width: min(100px, 18vw);
  margin-bottom: 0.65rem;
  filter: drop-shadow(0 0 16px rgba(200, 160, 32, 0.35));
}

.ppp-thankyou__title {
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 800;
  color: var(--gold);
  letter-spacing: 0.08em;
  line-height: 1.1;
}

.ppp-thankyou__sub {
  font-size: 0.88rem;
  color: var(--caption);
  margin: 0.35rem 0 0.85rem;
}

.ppp-thankyou__card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--panel);
  border-radius: 1rem;
  border: 1px solid rgba(200, 160, 32, 0.2);
}

.ppp-thankyou__qr {
  width: min(120px, 20vw);
  height: min(120px, 20vw);
  border-radius: 0.75rem;
  padding: 0.45rem;
  background: #fff;
  flex-shrink: 0;
}

.ppp-thankyou__contacts {
  text-align: left;
}

.ppp-thankyou__contacts p {
  margin: 0.35rem 0;
  font-size: 0.78rem;
  color: var(--caption);
  line-height: 1.35;
}

.ppp-thankyou__contacts em {
  color: var(--muted);
  font-style: normal;
  margin-right: 0.35rem;
}

.ppp-thankyou__contacts a {
  color: var(--gold);
  font-weight: 600;
}

.ppp-thankyou__tagline {
  flex-shrink: 0;
  margin: 0;
  padding: 0.65rem 0.75rem 0.5rem;
  font-size: clamp(0.78rem, 1.2vw, 0.88rem);
  color: var(--gold-light);
  line-height: 1.4;
  border-top: 1px solid rgba(200, 160, 32, 0.12);
}

.ppp-footer--thankyou {
  border-top: none;
  padding-top: 0.25rem;
}

/* Image animations */
.img-anim {
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: both;
}

.img-anim--slide-left {
  animation-name: img-slide-left;
}

.img-anim--slide-right {
  animation-name: img-slide-right;
}

.img-anim--slide-up {
  animation-name: img-slide-up;
}

.img-anim--rotate-in {
  animation-name: img-rotate-in;
}

.img-anim--flip-in {
  animation-name: img-flip-in;
}

.img-anim--zoom-in {
  animation-name: img-zoom-in;
}

.img-live--ken-burns {
  animation: ken-burns 14s ease-in-out infinite alternate;
}

.img-live--sway {
  animation: img-sway 5s ease-in-out infinite alternate;
}

.img-live--float-tilt {
  animation: img-float-tilt 6s ease-in-out infinite alternate;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes logo-in {
  from {
    opacity: 0;
    transform: scale(0.88);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes donut-in {
  from {
    stroke-dasharray: 0 100;
  }
}

@keyframes vbar-in {
  from {
    height: 0;
  }
}

@keyframes ken-burns {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.06);
  }
}

@keyframes img-slide-left {
  from {
    opacity: 0;
    transform: translateX(-28px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes img-slide-right {
  from {
    opacity: 0;
    transform: translateX(28px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes img-slide-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes img-rotate-in {
  from {
    opacity: 0;
    transform: perspective(800px) rotateY(-18deg);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes img-flip-in {
  from {
    opacity: 0;
    transform: perspective(800px) rotateY(70deg);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes img-zoom-in {
  from {
    opacity: 0;
    transform: scale(0.85);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes img-sway {
  from {
    transform: rotate(-1.5deg);
  }

  to {
    transform: rotate(1.5deg);
  }
}

@keyframes img-float-tilt {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-5px);
  }
}
</style>
