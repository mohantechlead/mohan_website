<script setup>
import { computed, ref } from 'vue'
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const images = [
  { src: '/wire-1.jpg', label: 'Mohan Wire Industries' },
  { src: '/wire-2.jpg', label: 'Elephant Brand Products' }
]

const activeImage = ref(images[0])

const applications = [
  { id: 'nails', label: 'Iron Nails', detail: 'Reliable common iron nails for general construction and hardware use.' },
  { id: 'barbed', label: 'Barbed Wires', detail: 'Strong, durable barbed wire products for fencing and perimeter security.' }
]

const activeApplication = ref(applications[0].id)

const activeApplicationData = computed(
  () => applications.find((item) => item.id === activeApplication.value) ?? applications[0]
)
</script>

<template>
  <main>
    <NaVBar />

    <section class="py-16 md:py-20">
      <div class="container-section">
        <article class="wire-hero">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Mohan Wire Industries</p>
          <p class="mt-2 text-sm font-medium text-slate-300">Mohan &gt; Mohan Wire Industries</p>
          <h1 class="mt-4 text-3xl font-bold text-white md:text-5xl">Mohan Wire Industries</h1>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div class="wire-metric">
              <p class="text-2xl font-bold text-white">1995</p>
              <p class="mt-1 text-xs uppercase tracking-[0.12em] text-slate-300">Steel Market Entry</p>
            </div>
            <div class="wire-metric">
              <p class="text-2xl font-bold text-white">Oldest</p>
              <p class="mt-1 text-xs uppercase tracking-[0.12em] text-slate-300">Private Sector Maker</p>
            </div>
            <div class="wire-metric">
              <p class="text-2xl font-bold text-white">Elephant</p>
              <p class="mt-1 text-xs uppercase tracking-[0.12em] text-slate-300">Trusted Brand</p>
            </div>
          </div>
        </article>

        <article class="surface-card mt-8">
          <p class="section-eyebrow">Mohan Wire Industries</p>
          <h2 class="section-subtitle mt-4">Industrial Legacy and Reliability</h2>

          <div class="mt-8 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div class="body-copy space-y-6">
              <p>
                In 1995, Mohan International expanded its wings and entered the steel market by creating Mohan wire
                industries, which manufactures iron nails and barbed wires.
              </p>
              <p>
                Mohan Wire Industries is the oldest existing company in the private sector in Ethiopia manufacturing
                common iron nails and barbed wires. Today, "Elephant" brand is well respected and known in the Ethiopian
                market for its reliable strength and quality.
              </p>
              <p>
                The Mohan Group has engaged in diverse business activities, it has specialized in the raw material
                business especially for plastics, packaging, footwear and plastic based construction industries.
              </p>
            </div>

            <div class="space-y-4">
              <div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg">
                <img
                  :src="activeImage.src"
                  :alt="activeImage.label"
                  class="h-full w-full object-cover transition duration-500 hover:scale-105"
                >
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="item in images"
                  :key="item.src"
                  type="button"
                  class="overflow-hidden rounded-xl border-2 transition"
                  :class="activeImage.src === item.src ? 'border-amber-500 shadow-md' : 'border-transparent hover:border-slate-300'"
                  @click="activeImage = item"
                >
                  <img :src="item.src" :alt="item.label" class="h-20 w-full object-cover">
                </button>
              </div>
            </div>
          </div>
        </article>

        <section class="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article class="wire-focus">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">Product Focus</p>
            <div class="mt-4 space-y-2">
              <button
                v-for="item in applications"
                :key="item.id"
                type="button"
                class="block w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition"
                :class="
                  activeApplication === item.id
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : 'border-white/20 bg-white/5 text-slate-200 hover:border-white/35 hover:bg-white/10'
                "
                @click="activeApplication = item.id"
              >
                {{ item.label }}
              </button>
            </div>
          </article>

          <article class="application-card">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Selected Product</p>
            <h3 class="mt-2 text-2xl font-bold text-slate-900">{{ activeApplicationData.label }}</h3>
            <p class="mt-4 text-base leading-8 text-slate-700">{{ activeApplicationData.detail }}</p>
            <div class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-600">
                Elephant brand is respected in Ethiopia for reliable strength, consistent quality, and trusted performance.
              </p>
            </div>
          </article>
        </section>

        <article class="soft-card mt-8">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Follow Us On</p>
          <div class="mt-4 flex gap-3">
            <span class="muted-pill">Facebook</span>
            <span class="muted-pill">LinkedIn</span>
            <span class="muted-pill">X</span>
          </div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.wire-hero {
  border-radius: 1.5rem;
  padding: 1.5rem;
  background:
    repeating-linear-gradient(
      -35deg,
      rgba(148, 163, 184, 0.12) 0px,
      rgba(148, 163, 184, 0.12) 8px,
      transparent 8px,
      transparent 22px
    ),
    linear-gradient(145deg, #0f172a, #1e293b);
  box-shadow: 0 20px 45px -30px rgba(15, 23, 42, 0.8);
}

.wire-metric {
  border-radius: 0.85rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
}

.wire-focus {
  border-radius: 1.25rem;
  background: linear-gradient(160deg, #0f172a, #1e293b);
  padding: 1rem;
}

.application-card {
  border-radius: 1.25rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 1.25rem;
}
</style>
