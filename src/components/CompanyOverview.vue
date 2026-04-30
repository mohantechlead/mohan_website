<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  isHomePreview: {
    type: Boolean,
    default: false
  }
})

const sectionRef = ref(null)

const productSegments = [
  {
    label: 'Trading Items',
    items: [
      {
        name: 'HDPE',
        detail: 'High-density polyethylene grades for rigid applications including molding and industrial packaging.'
      },
      {
        name: 'LDPE',
        detail: 'Low-density polyethylene grades suitable for flexible film, lamination, and soft packaging formats.'
      },
      {
        name: 'LLDPE',
        detail: 'Linear low-density polyethylene for strong, flexible film applications and efficient processability.'
      },
      {
        name: 'PP',
        detail: 'Polypropylene grades supporting injection, extrusion, and woven product requirements.'
      },
      {
        name: 'Exceed',
        detail: 'Premium performance polyethylene grades designed for demanding high-strength film applications.'
      },
      {
        name: 'mLLDPE',
        detail: 'Metallocene LLDPE grades delivering excellent toughness, clarity, and downgauging capability.'
      }
    ]
  },
  {
    label: 'Manufacturing Items',
    items: [
      {
        name: 'EVA Compounds',
        detail: 'Designed for footwear comfort, cushioning, durability, and high-quality molded product performance.'
      },
      {
        name: 'PVC Compounds',
        detail: 'Engineered for consistent processing and quality output in construction and industrial products.'
      },
      {
        name: 'Rubber Compound',
        detail: 'Custom blends for footwear, resilient components, and long-life industrial applications.'
      },
      {
        name: 'Color Masterbatches',
        detail: 'Reliable color consistency and dispersion for enhanced product appearance and brand finish.'
      },
      {
        name: 'Filler Masterbatches',
        detail: 'Cost-effective and performance-balanced additives optimized for scalable manufacturing.'
      },
      {
        name: 'Endure / PPR Compounds',
        detail: 'Durable compounds suited for pressure pipe systems and long-service construction needs.'
      },
      {
        name: 'EVA / Rubber Sheets',
        detail: 'We also produce EVA/Rubber sheets that serve as expansion joints in important construction projects.'
      },
      {
        name: 'Footwear',
        detail: 'High-volume and quality-focused footwear production tailored for local and regional demand.'
      },
      {
        name: 'Flip-flops',
        detail: 'Comfort-first everyday products manufactured with consistent quality and finishing standards.'
      },
      {
        name: 'Nails and Wire',
        detail: 'Supporting construction and hardware segments through reliable basic industrial products.'
      }
    ]
  }
]

const valicor = [
  {
    letter: 'V',
    text: 'Value Addition',
    detail: 'Create measurable impact in every product, partnership, and process.',
    tone: 'valicor-tone-v'
  },
  {
    letter: 'A',
    text: 'Alignment',
    detail: 'Keep people, purpose, and performance moving toward one shared vision, with alignment to government policies.',
    tone: 'valicor-tone-a'
  },
  {
    letter: 'L',
    text: 'Linkage',
    detail: 'Build strong connections across suppliers, customers, communities, and industry players.',
    tone: 'valicor-tone-l'
  },
  {
    letter: 'I',
    text: 'Innovation',
    detail: 'Continuously improve through modern thinking, technology, and design.',
    tone: 'valicor-tone-i'
  },
  {
    letter: 'CO',
    text: 'Compliance',
    detail: 'We ensure compliance with regards regulatory frameworks, tax, quality, environment, etc.',
    tone: 'valicor-tone-c'
  },
  {
    letter: 'R',
    text: 'Relationship',
    detail: 'Relationship is a fundamental human character that our company optimizes to satisfy all stakeholders.',
    tone: 'valicor-tone-r'
  }
]

const previewHighlights = [
  '7 manufacturing units operating',
  '1 trading unit within Ethiopia',
  '1st ever free trade zone operator in Ethiopia at the Dire Dawa Free Trade Zone'
]

const allProducts = computed(() => productSegments.flatMap((segment) => segment.items))
const activeProduct = ref(allProducts.value[0].name)
const animatedCards = ref([])
let observer

const activeProductDetail = computed(
  () => allProducts.value.find((item) => item.name === activeProduct.value) ?? allProducts.value[0]
)

onMounted(() => {
  animatedCards.value = sectionRef.value
    ? Array.from(sectionRef.value.querySelectorAll('[data-reveal]'))
    : []

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    },
    { threshold: 0.15 }
  )

  animatedCards.value.forEach((card) => observer.observe(card))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 md:py-20"
    :class="props.isHomePreview ? '-mt-10 md:-mt-14 relative z-20' : ''"
  >
    <div class="container-section">
      <div
        data-reveal
        class="reveal-card mb-10"
        :class="
          props.isHomePreview
            ? 'relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-amber-50/40 p-8 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.65)] ring-1 ring-amber-100 md:p-10'
            : 'surface-card'
        "
      >
        <div
          v-if="props.isHomePreview"
          class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-200/45 blur-3xl"
        ></div>
        <div
          v-if="props.isHomePreview"
          class="pointer-events-none absolute -left-14 bottom-0 h-32 w-32 rounded-full bg-sky-200/35 blur-3xl"
        ></div>

        <template v-if="props.isHomePreview">
          <div id="about-us" class="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p class="section-eyebrow">About</p>
              <p class="mt-2 text-sm font-medium text-slate-500">Mohan &gt; About</p>

              <h2 class="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                Building Ethiopia's Industrial Future With
                <span class="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Legacy and Innovation</span>
              </h2>

              <p class="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                Founded by Mayur Suryakant Kothari, Mohan Group has evolved from a humble trading firm into a respected industrial
                group delivering polymer, footwear, and manufacturing solutions across Ethiopia.
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <span
                  v-for="item in previewHighlights"
                  :key="item"
                  class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  {{ item }}
                </span>
              </div>

              <RouterLink to="/about" class="btn-primary mt-8">
                Read Full Story
              </RouterLink>
            </div>

            <div class="space-y-4">
              <div class="stat-badge-modern">
                <p class="text-xs uppercase tracking-[0.18em] opacity-90">Years Of Experience</p>
                <p class="text-4xl font-bold leading-none">30+</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-amber-600">Group Scale</p>
                <p class="mt-2 text-sm leading-7 text-slate-600">
                  7 manufacturing units operating, 1 trading unit within Ethiopia, and the 1st ever free trade zone
                  operator in Ethiopia at the Dire Dawa Free Trade Zone.
                </p>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div id="about-us" class="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p class="section-eyebrow">About</p>
              <p class="mt-2 text-sm font-medium text-slate-500">Mohan &gt; About</p>
            </div>
            <div class="stat-badge">
              <p class="text-xs uppercase tracking-[0.18em] opacity-90">Years Of Experience</p>
              <p class="text-4xl font-bold leading-none">30</p>
            </div>
          </div>

          <h2 class="section-title">About Us</h2>
          <div class="body-copy mt-8 space-y-6">
            <p>
              Mayur Suryakant Kothari, the founder of the Mohan Group of Companies started his business with a
              small trading firm, which he named Mohan International in fond memory of his late father,
              Mr. Suryakant Chhotalal Kothari, who was popularly known by his nickname, "Mohan". Today, the small
              trading firm has transformed into a group of companies, popularly known as "The Mohan Group of Companies".
            </p>
            <p>
              The Mohan Group of companies operates 7 manufacturing units and 1 trading unit within Ethiopia. It is
              also the 1st ever free trade zone operator in Ethiopia at the Dire Dawa Free Trade Zone. The Mohan Group
              is one of the most respectable and trusted names in polymer and footwear business in Ethiopia.
            </p>
          </div>
        </template>

        <template v-if="!props.isHomePreview">
          <div class="body-copy mt-8 space-y-6">
            <p>
              Our mission is to provide quality footwear and raw materials to the plastic and rubber industries.
              Our vision is to be a global player of repute in plastic raw materials and footwear.
            </p>
            <p>
              The success of our business is based on the strategy of VALICOR, an acronym coined to indicate the
              following components:
            </p>
          </div>

          <div class="valicor-shell mt-10">
            <div class="mb-5 flex items-center justify-between gap-3">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">VALICOR Framework</p>
              <span class="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Core Business Values
              </span>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="item in valicor"
              :key="item.letter"
              class="valicor-card group relative overflow-hidden rounded-2xl px-5 py-5"
              :class="item.tone"
            >
              <div class="valicor-shine"></div>
              <div class="pointer-events-none absolute -right-3 -top-5 text-7xl font-extrabold text-white/20 transition duration-300 group-hover:scale-110">
                {{ item.letter }}
              </div>
              <p class="relative text-xs font-semibold uppercase tracking-[0.16em] text-amber-200/90">
                {{ item.letter }}
              </p>
              <h5 class="relative mt-2 text-lg font-bold text-white">
                {{ item.text }}
              </h5>
              <p class="relative mt-2 text-sm leading-6 text-slate-200">
                {{ item.detail }}
              </p>
            </article>
            </div>
          </div>
        </template>
      </div>

      <article id="what-we-do" data-reveal class="reveal-card mb-10 rounded-3xl bg-slate-900 p-8 text-slate-100 shadow-xl md:p-10">
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h3 class="text-2xl font-bold md:text-3xl">What We Do</h3>
          <span class="rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-slate-100">
            7 Manufacturing Units + 1 Trading Unit
          </span>
        </div>

        <p class="mb-8 max-w-4xl text-sm leading-7 text-slate-300 md:text-base">
          The Mohan Group has 7 manufacturing units operating and 1 trading unit within Ethiopia. It is also the 1st
          ever free trade zone operator in Ethiopia at the Dire Dawa Free Trade Zone. The group is one of the most
          respectable and trusted names in polymer and footwear business in Ethiopia.
        </p>

        <div class="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div class="space-y-5">
            <div v-for="segment in productSegments" :key="segment.label">
              <p class="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">{{ segment.label }}</p>
              <div class="grid gap-3 sm:grid-cols-2">
                <button
                  v-for="item in segment.items"
                  :key="item.name"
                  type="button"
                  class="rounded-xl border px-4 py-3 text-left text-sm font-semibold transition"
                  :class="
                    activeProduct === item.name
                      ? 'border-amber-400 bg-amber-500 text-white'
                      : 'border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10'
                  "
                  @click="activeProduct = item.name"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-white/15 bg-white/5 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Selected Segment</p>
            <h4 class="mt-3 text-xl font-bold">{{ activeProductDetail.name }}</h4>
            <p class="mt-4 text-sm leading-7 text-slate-300 md:text-base">
              {{ activeProductDetail.detail }}
            </p>
          </div>
        </div>
      </article>

      <div v-if="!props.isHomePreview" class="grid gap-8 lg:grid-cols-2">
        <article data-reveal class="reveal-card dark-card">
          <h4 class="text-2xl font-bold">Need Help? Write us a quick message.</h4>
          <p class="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Our team supports partnerships across polymer, packaging, footwear, and construction materials.
          </p>
          <RouterLink to="/contact" class="btn-primary mt-8">
            Get In Touch
          </RouterLink>
        </article>

        <article data-reveal class="reveal-card surface-card">
          <h4 class="text-2xl font-bold text-slate-900">Head Office Location</h4>
          <p class="mt-4 text-sm leading-7 text-slate-700">
            Around Bole Japan Embassy, Addis Ababa, Ethiopia
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
</template>


