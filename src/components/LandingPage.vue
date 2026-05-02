<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CompanyOverview from '@/components/CompanyOverview.vue'
import building from '@/assets/img/mohan.jpg'

const homeRef = ref(null)
const statsRef = ref(null)
const headOfficeMapUrl = 'https://maps.app.goo.gl/GA7KLd3X4wbu6c3r9'

const slides = [
  { src: '/slider-1.jpg', title: 'Industry Leadership', detail: 'Built on decades of trust and proven delivery.' },
  { src: '/slider-2.jpg', title: 'Global Quality Standards', detail: 'Consistent quality in every unit and process.' },
  { src: '/slider-3.jpg', title: 'Innovation In Manufacturing', detail: 'Modern systems for scale, quality, and speed.' },
  { src: '/slider-4.jpg', title: 'Sustainable Growth Vision', detail: 'Responsible expansion with long-term value.' },
  { src: '/slider-5.jpg', title: 'Trusted Across Ethiopia', detail: 'A dependable partner across industries and regions.' }
]

const impactStats = [
  { value: 30, suffix: '+', label: 'Years of Industrial Legacy' },
  { value: 7, suffix: '', label: 'Manufacturing Units Operating' },
  { value: 1, suffix: '', label: 'Trading Unit Within Ethiopia' },
  { value: 1, suffix: 'st', label: 'Ever Free Trade Zone Operator In Ethiopia At The Dire Dawa Free Trade Zone' }
]

const businessHighlights = [
  {
    title: 'Mohan PLC',
    route: '/mohan-plc',
    image: '/slider-3.jpg',
    description: 'Polymer solutions and industrial raw materials powering modern manufacturing.'
  },
  {
    title: 'Mohan International',
    route: '/mohan-international',
    image: '/mohan_int.jpg',
    description: 'Global sourcing and trading expertise delivering reliable supply continuity.'
  },
  {
    title: 'Vina Trade And Industry PLC',
    route: '/vina-trade-and-industry',
    image: '/vina-2.png',
    description: 'Footwear and compounds built for comfort, quality, and market relevance.'
  },
  {
    title: 'Mohan Wire Industries',
    route: '/mohan-wire-industries',
    image: '/wire-2.jpg',
    description: 'Industrial wire and nail production engineered for durable performance.'
  }
]

const currentSlide = ref(0)
const animatedStats = ref(impactStats.map(() => 0))
const showChairmanFull = ref(false)

let autoplay
let revealObserver
let statsObserver
let statsStarted = false

const goToSlide = (index) => {
  currentSlide.value = index
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const resetAutoplay = () => {
  clearInterval(autoplay)
  autoplay = setInterval(nextSlide, 4500)
}

const animateCounter = (index, target) => {
  const duration = 1400
  const start = performance.now()

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    animatedStats.value[index] = Math.floor(progress * target)
    if (progress < 1) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
}

const startStatsAnimation = () => {
  if (statsStarted) return
  statsStarted = true
  impactStats.forEach((item, index) => animateCounter(index, item.value))
}

onMounted(() => {
  autoplay = setInterval(nextSlide, 4500)

  if (homeRef.value) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.18 }
    )

    const revealCards = homeRef.value.querySelectorAll('[data-home-reveal]')
    revealCards.forEach((card) => revealObserver.observe(card))
  }

  if (statsRef.value) {
    statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startStatsAnimation()
          }
        })
      },
      { threshold: 0.25 }
    )

    statsObserver.observe(statsRef.value)
  }
})

onBeforeUnmount(() => {
  clearInterval(autoplay)
  if (revealObserver) revealObserver.disconnect()
  if (statsObserver) statsObserver.disconnect()
})
</script>

<template>
  <div ref="homeRef">
    <section class="relative overflow-hidden bg-slate-950 py-5 sm:py-6 md:py-10">
      <div class="hero-orb hero-orb-one"></div>
      <div class="hero-orb hero-orb-two"></div>

      <div class="mx-auto w-full max-w-[96rem] px-3 sm:px-4 md:px-8 lg:px-14">
        <div data-home-reveal
          class="home-reveal rounded-[1.65rem] bg-gradient-to-br from-slate-800 to-slate-900 p-1.5 sm:rounded-[2rem] md:rounded-[2.35rem] md:p-3">
          <div
            class="hero-slider relative overflow-hidden rounded-[1.35rem] border border-slate-700 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.85)] sm:rounded-[1.75rem] md:rounded-[2rem]">
            <div class="relative min-h-[31rem] overflow-hidden sm:min-h-[28rem] md:aspect-[16/8] md:min-h-0">
              <transition-group name="slide-fade" tag="div" class="h-full">
                <img v-for="(slide, index) in slides" v-show="currentSlide === index" :key="slide.src" :src="slide.src"
                  :alt="slide.title" class="absolute inset-0 h-full w-full object-cover object-center">
              </transition-group>

              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-slate-900/25 md:bg-gradient-to-r md:from-slate-950/85 md:via-slate-900/55 md:to-slate-900/20"></div>
              <div class="hero-grain absolute inset-0 opacity-30"></div>

              <div class="absolute inset-0 flex items-end sm:items-center">
                <div class="w-full px-5 pb-16 pt-20 sm:px-8 sm:py-0 md:px-12">
                  <p class="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Mohan Group</p>
                  <h2 class="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:mt-4 md:text-5xl">
                    {{ slides[currentSlide].title }}
                  </h2>
                  <p class="mt-3 max-w-xl text-sm leading-7 text-slate-200 sm:mt-4 md:max-w-2xl md:text-base">
                    {{ slides[currentSlide].detail }}
                  </p>
                  <div class="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                    <RouterLink to="/about" class="btn-primary w-full sm:w-auto">Discover More</RouterLink>
                    <RouterLink to="/contact" class="hero-btn-secondary w-full sm:w-auto">Start a Conversation</RouterLink>
                  </div>
                </div>
              </div>

              <div
                class="absolute bottom-4 right-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur md:bottom-6 md:right-6">
                {{ currentSlide + 1 }} / {{ slides.length }}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-center gap-2">
          <button v-for="(slide, index) in slides" :key="slide.src + '-dot'" type="button"
            class="h-2.5 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-400 hover:bg-slate-300'"
            :aria-label="`Go to slide ${index + 1}`" @click="goToSlide(index); resetAutoplay()" />
        </div>
      </div>
    </section>

    <section class="bg-white py-16 md:py-20">
      <div class="container-section grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-home-reveal class="home-reveal text-left">
          <p class="section-eyebrow">Four Generations</p>
          <h1 class="mt-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            Built on Legacy,
            <span class="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Designed for Tomorrow
            </span>
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            The Mohan Group is one of the most respected names in Ethiopia across polymer, footwear, and industrial
            manufacturing sectors.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <RouterLink to="/about" class="btn-primary">Explore Our Story</RouterLink>
            <RouterLink to="/news" class="btn-secondary">Latest News</RouterLink>
          </div>
        </div>

        <div data-home-reveal class="home-reveal relative">
          <div
            class="hero-image-shell relative overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-[0_28px_65px_-36px_rgba(15,23,42,0.45)]">
            <div class="aspect-[4/5] overflow-hidden">
              <img :src="building" alt="Mohan Building"
                class="h-full w-full object-cover object-center transition duration-700 hover:scale-105">
            </div>
            <div
              class="absolute inset-x-4 bottom-4 rounded-2xl border border-white/30 bg-slate-900/55 p-4 backdrop-blur">
              <p class="text-xs uppercase tracking-[0.18em] text-amber-300">Head Office</p>
              <p class="mt-1 text-sm font-semibold text-white">Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="statsRef" class="relative overflow-hidden bg-slate-900 py-16 text-white md:py-20">
      <div class="stats-shape"></div>
      <div class="container-section relative">
        <div data-home-reveal class="home-reveal text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Impact At A Glance</p>
          <h3 class="mt-3 text-3xl font-bold md:text-4xl">Driving Industrial Progress At Scale</h3>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="(item, index) in impactStats" :key="item.label" data-home-reveal
            class="home-reveal stats-card rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur">
            <p class="text-4xl font-bold text-amber-300 md:text-5xl">
              {{ animatedStats[index] }}{{ item.suffix }}
            </p>
            <p class="mt-3 text-sm font-medium text-slate-200">{{ item.label }}</p>
          </article>
        </div>
      </div>
    </section>

    <CompanyOverview :isHomePreview="true" />

    <section class="bg-white py-16 md:py-20">
      <div class="container-section">
        <div data-home-reveal class="home-reveal flex flex-wrap items-end justify-between gap-5">
          <div>
            <p class="section-eyebrow">Our Companies</p>
            <h3 class="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">The Group Powering Every Sector</h3>
          </div>
          <RouterLink to="/about" class="btn-secondary">View Full Portfolio</RouterLink>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <article v-for="item in businessHighlights" :key="item.title" data-home-reveal
            class="home-reveal group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div class="relative h-52 overflow-hidden">
              <img :src="item.image" :alt="item.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent"></div>
            </div>
            <div class="p-6">
              <h4 class="text-xl font-bold text-slate-900">{{ item.title }}</h4>
              <p class="mt-3 text-sm leading-7 text-slate-600">{{ item.description }}</p>
              <RouterLink :to="item.route"
                class="mt-5 inline-flex text-sm font-semibold text-amber-600 transition hover:text-amber-500">
                Learn More →
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white pb-8">
      <div class="container-section">
        <article data-home-reveal
          class="home-reveal mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-[0_24px_65px_-38px_rgba(15,23,42,0.5)] md:p-8">
          <div class="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div class="order-2 lg:order-1">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Leadership Note</p>
              <h4 class="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Message from Chairman</h4>
              <div class="mt-6 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm md:p-6">
                <p class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Mayur Suryakant Kothari</p>
                <div class="mt-4 text-base leading-8 text-slate-700 md:text-lg">
                  <p class="relative pl-5">
                    <span class="absolute left-0 top-0 text-2xl font-bold leading-none text-amber-500">"</span>
                    Mayur Suryakant Kothari, the founder of the Mohan Group of Companies started off his business
                    with a small trading firm, which he named Mohan International in fond memory of his late father,
                    Mr. Suryakant Chhotalal Kothari, who was popularly known by his nickname "Mohan". Today, the
                    small trading firm has transformed into a group of companies, popularly known as "The Mohan Group
                    of Companies".
                  </p>
                  <p v-if="showChairmanFull" class="mt-4">
                    The Mohan Group has engaged in diverse business activities, it has specialized in the raw material
                    business especially for plastics, packaging, footwear and plastic based construction industries.
                  </p>
                </div>
              </div>
              <div class="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" class="btn-secondary" @click="showChairmanFull = !showChairmanFull">
                  {{ showChairmanFull ? 'Show Less' : 'Read Full Message' }}
                </button>
                <RouterLink to="/about" class="text-sm font-semibold text-amber-600 transition hover:text-amber-500">
                  Learn About Our Legacy →
                </RouterLink>
              </div>
            </div>

            <div class="order-1 lg:order-2">
              <div
                class="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-[0_22px_45px_-30px_rgba(15,23,42,0.7)]">
                <img src="/CEO_Mohan.jpg" alt="Chairman Mayur Suryakant Kothari"
                  class="h-full w-full object-cover transition duration-500 hover:scale-105">
              </div>
              <div class="mx-auto mt-4 w-full max-w-sm rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">Chairman Vision</p>
                <p class="mt-1 text-sm leading-6 text-amber-900">
                  Quality, continuity, and innovation that serve generations.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="bg-white pb-4">
      <div class="container-section">
        <div class="grid gap-8 lg:grid-cols-2">
          <article data-home-reveal class="home-reveal dark-card">
            <h4 class="text-2xl font-bold">Need Help? Write us a quick message.</h4>
            <p class="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Our team supports partnerships across polymer, packaging, footwear, and construction materials.
            </p>
            <RouterLink to="/contact" class="btn-primary mt-8">
              Get In Touch
            </RouterLink>
          </article>

          <article data-home-reveal class="home-reveal surface-card">
            <h4 class="text-2xl font-bold text-slate-900">Head Office Location</h4>
            <p class="mt-4 text-sm leading-7 text-slate-700">
              <a :href="headOfficeMapUrl" target="_blank" rel="noopener noreferrer"
                class="font-semibold text-amber-600 transition hover:text-amber-500">
                Around Bole Japan Embassy, Addis Ababa, Ethiopia
              </a>
            </p>

            <div class="mt-8 border-t border-slate-200 pt-6">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Follow Us On</p>
              <div class="mt-4 flex gap-3">
                <a href="#" class="muted-pill">Facebook</a>
                <a href="#" class="muted-pill">LinkedIn</a>
                <a href="#" class="muted-pill">X</a>
              </div>
              <p class="mt-6 text-xs text-slate-500">
                Copyright © Mohan All Right Reserved.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-16 md:py-20">
      <div class="cta-glow"></div>
      <div class="container-section relative">
        <div data-home-reveal
          class="home-reveal rounded-3xl border border-white/15 bg-white/5 p-8 text-center text-white backdrop-blur md:p-12">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Let’s Build Together</p>
          <h3 class="mt-4 text-3xl font-bold md:text-5xl">Ready To Partner With Mohan Group?</h3>
          <p class="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
            From polymer and compounds to footwear and industrial products, our teams are ready to support your next
            growth milestone.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <RouterLink to="/contact" class="btn-primary">Contact Our Team</RouterLink>
            <RouterLink to="/csr" class="hero-btn-secondary">Explore CSR Impact</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-slider {
  border: 1px solid rgba(148, 163, 184, 0.25);
}

.hero-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(40px);
  opacity: 0.45;
  pointer-events: none;
}

.hero-orb-one {
  width: 220px;
  height: 220px;
  background: rgba(245, 158, 11, 0.35);
  top: 30px;
  left: -30px;
  animation: float-orb 8s ease-in-out infinite;
}

.hero-orb-two {
  width: 260px;
  height: 260px;
  background: rgba(14, 165, 233, 0.2);
  bottom: 10px;
  right: -40px;
  animation: float-orb 10s ease-in-out infinite reverse;
}

.hero-grain {
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 0.5px, transparent 0.5px);
  background-size: 4px 4px;
}

.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  transition: all 0.2s ease;
}

.hero-btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.home-reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

.home-reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

.stats-card {
  box-shadow: 0 18px 35px -24px rgba(15, 23, 42, 0.85);
}

.stats-shape {
  position: absolute;
  inset: auto -8% -30% -8%;
  height: 70%;
  background: radial-gradient(circle at center, rgba(245, 158, 11, 0.22), transparent 70%);
  pointer-events: none;
}

.cta-glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 620px;
  height: 620px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(245, 158, 11, 0.22), transparent 65%);
  pointer-events: none;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.55s ease, transform 0.55s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: scale(1.04);
}

.slide-fade-leave-to {
  opacity: 0;
}

@keyframes float-orb {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(16px);
  }
}
</style>