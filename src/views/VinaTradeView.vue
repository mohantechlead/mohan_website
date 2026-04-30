<script setup>
import { computed, ref } from 'vue'
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const gallery = [
  { src: '/vina-1.jpg', label: 'Vina Facility' },
  { src: '/vina-2.jpg', label: 'Deer Slippers' },
  { src: '/vina-3.jpg', label: 'Production Line' }
]

const activeImage = ref(gallery[0])

const highlights = [
  { id: 'linkage', title: 'Vertical Linkage', text: 'Strong integration with Mohan PLC enables reliable local raw material sourcing and operational control.' },
  { id: 'brand', title: 'Deer Brand Strength', text: 'Deer slippers are trusted in the Ethiopian market for quality, durability, and strong visual appeal.' },
  { id: 'diversity', title: 'Product Diversity', text: 'Beyond flip-flops, Vina produces EVA sheets, rubber soles, components, and compound-based products.' }
]

const activeHighlight = ref(highlights[0].id)

const activeHighlightData = computed(
  () => highlights.find((item) => item.id === activeHighlight.value) ?? highlights[0]
)
</script>

<template>
  <main>
    <NaVBar />

    <section class="py-16 md:py-20">
      <div class="container-section">
        <article class="surface-card vina-hero">
          <p class="section-eyebrow">Vina Trade and Industry PLC</p>
          <p class="mt-2 text-sm font-medium text-slate-500">Mohan &gt; Vina Trade and Industry PLC</p>
          <h1 class="section-title mt-4">Vina Trade and Industry PLC</h1>

          <div class="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
            <div class="body-copy space-y-6">
              <p>
                Vina Trade and Industry PLC is a successful unit in the Mohan Group of Companies, which manufactures
                "Hawaii Slippers" or "flip-flops".
              </p>
              <p>
                Although many companies tried to manufacture Hawaii slippers in Ethiopia, they could not face the stiff
                competition posed by cheaper imports from China and other neighboring countries. Vina Trade and Industry PLC,
                benefiting from its vertical linkage with Mohan PLC, manages to get all the raw materials locally, enabling
                it to overcome competition and dominate the Ethiopian market, making "Deer" a well-known brand in the country.
              </p>
              <p>
                "Deer" slippers are trusted and respected for their high quality and appealing aesthetics.
              </p>
              <p>
                Vina Trade and Industry also manufactures rubber based EVA sheets, rubber soles, rubber sheets, rubber
                components, and other rubber based compounds that can be used for various applications.
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

              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="item in gallery"
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

        <section class="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <article class="brand-panel">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">Why Vina Leads</p>
            <h2 class="mt-3 text-2xl font-bold text-white md:text-3xl">Built for scale, quality, and market trust</h2>

            <div class="mt-6 flex flex-wrap gap-2">
              <button
                v-for="item in highlights"
                :key="item.id"
                type="button"
                class="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] transition"
                :class="
                  activeHighlight === item.id
                    ? 'border-amber-400 bg-amber-500 text-white'
                    : 'border-white/25 bg-white/5 text-slate-200 hover:border-white/40 hover:bg-white/10'
                "
                @click="activeHighlight = item.id"
              >
                {{ item.title }}
              </button>
            </div>

            <div class="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5">
              <p class="text-lg font-bold text-white">{{ activeHighlightData.title }}</p>
              <p class="mt-3 text-sm leading-7 text-slate-200 md:text-base">{{ activeHighlightData.text }}</p>
            </div>
          </article>

          <article class="feature-stack">
            <div class="feature-item">
              <p class="feature-kicker">Market Position</p>
              <p class="feature-text">Competes strongly with imported alternatives through local value chain strength.</p>
            </div>
            <div class="feature-item">
              <p class="feature-kicker">Core Brand</p>
              <p class="feature-text">“Deer” remains a recognizable and respected name across the Ethiopian market.</p>
            </div>
            <div class="feature-item">
              <p class="feature-kicker">Manufacturing Scope</p>
              <p class="feature-text">Flip-flops, EVA sheets, rubber soles, rubber components, and compound-based products.</p>
            </div>
          </article>
        </section>

        <article class="soft-card mt-8">
          <p class="body-copy">
            The Mohan Group has engaged in diverse business activities, it has specialized in the raw material business
            especially for plastics, packaging, footwear and plastic based construction industries.
          </p>
          <div class="mt-8 border-t border-slate-300 pt-6">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Follow Us On</p>
            <div class="mt-4 flex gap-3">
              <span class="muted-pill">Facebook</span>
              <span class="muted-pill">LinkedIn</span>
              <span class="muted-pill">Instagram</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.vina-hero {
  background:
    radial-gradient(circle at 90% 10%, rgba(245, 158, 11, 0.1), transparent 36%),
    linear-gradient(145deg, #ffffff, #f8fafc);
}

.brand-panel {
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  padding: 1.75rem;
  box-shadow: 0 20px 45px -30px rgba(15, 23, 42, 0.8);
}

.feature-stack {
  display: grid;
  gap: 0.75rem;
}

.feature-item {
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 1rem;
  transition: all 0.25s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
  border-color: #f59e0b;
  box-shadow: 0 12px 30px -24px rgba(15, 23, 42, 0.8);
}

.feature-kicker {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0f172a;
}

.feature-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #475569;
}
</style>
