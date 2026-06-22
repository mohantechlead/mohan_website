<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const strategicAdvantages = [
  {
    id: 'nearshoring',
    title: 'Optimized Near-Shoring',
    summary: 'Seamless near-shoring support from DDFTZ.',
    detail:
      'Our presence at the DDFTZ allows us to offer seamless near-shoring services, drastically reducing lead times and ensuring rapid order fulfillment.'
  },
  {
    id: 'resilience',
    title: 'Supply Chain Resilience',
    summary: 'Buffer stocks for continuity and stability.',
    detail:
      'By maintaining robust inventories of essential commodities and industrial inputs within the Free Zone, we provide a critical buffer for the Ethiopian economy.'
  },
  {
    id: 'agility',
    title: 'Operational Agility',
    summary: 'Fast turnaround between global supply and local demand.',
    detail:
      'We bridge the gap between global supply and local demand, offering a turnaround time that sets a new benchmark for the industry.'
  }
]

const impactHighlights = [
  { label: 'Historic First', value: '1st', note: 'Licensed free zone operator in Ethiopia' },
  { label: 'Trade Capability', value: 'Global', note: 'Third-country merchant trade execution' },
  { label: 'Partner Focus', value: 'Fast', note: 'Lead-time reduction and responsive fulfillment' }
]

const facilityPhotos = [
  {
    src: '/ddftz/ddftz-gateway-overview.png',
    alt: 'Dire Dawa Free Trade Zone gateway and facility overview',
    caption: 'DDFTZ Gateway',
    description: 'Strategic entry point to our bonded warehouse and yard operations inside the Free Trade Zone.',
  },
  {
    src: '/ddftz/ddftz-warehouse-exterior-yard.png',
    alt: 'Bonded warehouse exterior at DDFTZ',
    caption: 'Bonded Warehouses',
    description: 'Modern stone-and-steel warehouse buildings for duty-free storage of imported raw materials.',
  },
  {
    src: '/ddftz/ddftz-warehouse-interior-stacks.png',
    alt: 'Warehouse interior with palletised resin stocks',
    caption: 'Warehouse Interior',
    description: 'High-capacity interior storage with palletised polymer resin stocks ready for distribution.',
  },
  {
    src: '/ddftz/ddftz-yard-drums-mountains.png',
    alt: 'Outdoor yard storage with resin drums and bulk sacks',
    caption: 'Outdoor Yard Storage',
    description: 'Bulk resin drums and sack storage in the DDFTZ yard for large-volume inventory.',
  },
  {
    src: '/ddftz/ddftz-reachstacker-container.png',
    alt: 'Reach stacker handling shipping containers at DDFTZ',
    caption: 'Container Handling',
    description: 'Heavy-duty reach stackers for Ethiopian Shipping Lines container operations on-site.',
  },
  {
    src: '/ddftz/ddftz-forklift-container.png',
    alt: 'HELI forklift loading a shipping container',
    caption: 'Container Loading',
    description: 'HELI forklift operations for efficient container loading and export preparation.',
  },
  {
    src: '/ddftz/ddftz-forklift-warehouse.png',
    alt: 'HELI forklift loading warehouse at DDFTZ',
    caption: 'Warehouse Logistics',
    description: 'HELI forklift teams managing inbound and outbound movement inside bonded warehouses.',
  },
]

const activeAdvantage = ref(strategicAdvantages[0].id)

const selectedAdvantage = computed(
  () => strategicAdvantages.find((item) => item.id === activeAdvantage.value) ?? strategicAdvantages[0]
)
</script>

<template>
  <main>
    <NaVBar />

    <section class="py-16 md:py-20">
      <div class="container-section">
        <article class="surface-card ddftz-hero">
          <div class="ddftz-glow ddftz-glow-one"></div>
          <div class="ddftz-glow ddftz-glow-two"></div>

          <div class="relative">
            <p class="section-eyebrow">Dire Dawa Free Trade Zone</p>
            <p class="mt-2 text-sm font-medium text-slate-500">Mohan &gt; DDFTZ Operations</p>
            <h1 class="section-title mt-4">Mohan PLC's Dire Dawa Free Trade Zone Operations</h1>

            <div class="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div class="flex flex-col gap-6">
                <div class="body-copy space-y-6">
                  <p class="text-lg font-semibold text-slate-900">
                    Mohan PLC: Pioneering Ethiopia's Global Trade Frontier
                  </p>
                  <p>
                    As the first licensed Free Zone Operator in Ethiopia's history, Mohan PLC is at the vanguard of the
                    nation's industrial evolution. Our landmark operations within the Dire Dawa Free Trade Zone (DDFTZ)
                    have redefined regional logistics, underscored by our achievement as the first Ethiopian entity to
                    execute complex merchant trade transactions (third-country international trade).
                  </p>
                </div>

                <div class="grid flex-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:auto-rows-fr">
                  <article
                    v-for="item in impactHighlights"
                    :key="item.label"
                    class="impact-pill flex flex-col justify-center lg:min-h-0"
                  >
                    <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{{ item.label }}</p>
                    <p class="mt-2 text-3xl font-bold text-slate-900">{{ item.value }}</p>
                    <p class="mt-2 text-sm leading-6 text-slate-600">{{ item.note }}</p>
                  </article>
                </div>
              </div>

              <div class="hero-image-wrap overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg">
                <img
                  src="/ddftz/Copilot_20260611_105227.png"
                  alt="Dire Dawa Free Trade Zone operations overview"
                  class="hero-image"
                >
              </div>
            </div>
          </div>
        </article>

        <article class="surface-card mt-8">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-amber-600">
            Facilities &amp; Operations
          </p>
          <h2 class="section-title mt-3">Inside Our Dire Dawa Free Trade Zone Hub</h2>
          <p class="body-copy mt-4 max-w-3xl">
            Bonded warehousing, outdoor yard storage, and on-site container handling — all managed from our
            strategic DDFTZ operations base serving manufacturers and traders across Ethiopia.
          </p>

          <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <figure
              v-for="photo in facilityPhotos"
              :key="photo.src"
              class="facility-card group overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div class="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  :src="photo.src"
                  :alt="photo.alt"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                >
              </div>
              <figcaption class="p-4">
                <p class="text-sm font-bold text-slate-900">{{ photo.caption }}</p>
                <p class="mt-2 text-sm leading-6 text-slate-600">{{ photo.description }}</p>
              </figcaption>
            </figure>
          </div>
        </article>

        <article class="surface-card mt-8">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-amber-600">
            Strategic Advantages for Our Partners
          </p>

          <div class="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div class="space-y-3">
              <button v-for="item in strategicAdvantages" :key="item.id" type="button"
                class="advantage-tab w-full rounded-2xl border p-4 text-left transition" :class="activeAdvantage === item.id
                  ? 'border-amber-400 bg-amber-50/70 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
                  " @click="activeAdvantage = item.id">
                <p class="text-base font-bold text-slate-900">{{ item.title }}</p>
                <p class="mt-1 text-sm leading-6 text-slate-600">{{ item.summary }}</p>
              </button>
            </div>

            <article class="advantage-panel rounded-2xl border border-slate-200 bg-white p-6">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-amber-600">Selected Advantage</p>
              <h2 class="mt-3 text-2xl font-bold text-slate-900">{{ selectedAdvantage.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                {{ selectedAdvantage.detail }}
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <RouterLink to="/contact" class="btn-primary">Work With Us</RouterLink>
                <RouterLink to="/mohan-plc" class="btn-secondary">Explore Mohan PLC</RouterLink>
              </div>
            </article>
          </div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.ddftz-hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 8% 2%, rgba(245, 158, 11, 0.12), transparent 46%),
    radial-gradient(circle at 92% 98%, rgba(14, 165, 233, 0.1), transparent 45%),
    #ffffff;
  border: 1px solid #fde68a;
}

.ddftz-glow {
  position: absolute;
  pointer-events: none;
  border-radius: 9999px;
  filter: blur(26px);
  opacity: 0.5;
}

.ddftz-glow-one {
  width: 180px;
  height: 180px;
  background: rgba(245, 158, 11, 0.28);
  top: -20px;
  right: -10px;
  animation: floaty 7s ease-in-out infinite;
}

.ddftz-glow-two {
  width: 150px;
  height: 150px;
  background: rgba(14, 165, 233, 0.25);
  bottom: -18px;
  left: 10%;
  animation: floaty 8s ease-in-out infinite reverse;
}

.impact-pill {
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(4px);
  padding: 1rem;
  box-shadow: 0 16px 34px -28px rgba(15, 23, 42, 0.8);
}

.hero-image-wrap {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}

.hero-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: top center;
  transition: transform 0.5s ease;
}

.hero-image-wrap:hover .hero-image {
  transform: scale(1.02);
}

.advantage-tab {
  box-shadow: 0 10px 25px -24px rgba(15, 23, 42, 0.75);
}

.advantage-panel {
  box-shadow: 0 20px 40px -30px rgba(15, 23, 42, 0.7);
}

.facility-card {
  box-shadow: 0 16px 34px -28px rgba(15, 23, 42, 0.75);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.facility-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 40px -26px rgba(15, 23, 42, 0.8);
}

@keyframes floaty {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(14px);
  }
}
</style>
