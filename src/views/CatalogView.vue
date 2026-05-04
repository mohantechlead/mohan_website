<script setup>
import { computed, onMounted, ref } from 'vue'
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const catalogs = ref([])
const activeCatalogIndex = ref(0)
const isLoading = ref(true)
const loadError = ref('')

const activeCatalog = computed(() => catalogs.value[activeCatalogIndex.value] ?? null)

const selectCatalog = (index) => {
  activeCatalogIndex.value = index
}

onMounted(async () => {
  try {
    const response = await fetch('/catalog-pages/manifest.json')
    if (!response.ok) {
      throw new Error('Catalog manifest not found')
    }

    const data = await response.json()
    catalogs.value = data.catalogs ?? []
  } catch (error) {
    loadError.value = 'Catalog pages are not available yet. Please run the PDF splitter script.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main>
    <NaVBar />

    <section class="relative overflow-hidden bg-slate-950 py-16 text-white md:py-24">
      <div class="catalog-grid absolute inset-0 opacity-30"></div>
      <div class="absolute -left-28 top-10 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl"></div>
      <div class="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"></div>

      <div class="container-section relative">
        <div class="max-w-4xl">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Mohan Catalog</p>
            <p class="mt-3 text-sm font-medium text-slate-300">Mohan &gt; Catalog</p>
            <h1 class="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Browse product catalogs.
            </h1>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 py-14 md:py-20">
      <div class="container-section">
        <div v-if="isLoading" class="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">Loading Catalog</p>
          <p class="mt-3 text-slate-600">Preparing catalog pages...</p>
        </div>

        <div v-else-if="loadError" class="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
          <p class="text-lg font-semibold text-slate-900">{{ loadError }}</p>
          <p class="mt-3 text-sm text-slate-600">
            Run <span class="font-mono">py -3 scripts/split_catalog_pdfs.py</span> from the project root.
          </p>
        </div>

        <div v-else>
          <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="section-eyebrow">Product Catalog</p>
              <h2 class="section-title mt-3">Catalog Library</h2>
            </div>

            <div class="flex flex-wrap gap-2">
              <button v-for="(catalog, index) in catalogs" :key="catalog.title" type="button"
                class="rounded-full border px-4 py-2 text-sm font-semibold transition" :class="activeCatalogIndex === index
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:text-slate-950'
                  " @click="selectCatalog(index)">
                Page {{ index + 1 }}
              </button>
            </div>
          </div>

          <article v-if="activeCatalog"
            class="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_-46px_rgba(15,23,42,0.6)]">
            <div class="border-b border-slate-200 bg-white p-5 md:p-8">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">Selected Catalog</p>
              <h3 class="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">Product Pages</h3>
            </div>

            <div class="grid gap-6 bg-slate-100 p-4 sm:grid-cols-2 md:p-6 xl:grid-cols-3">
              <a v-for="(page, index) in activeCatalog.pages" :key="page" :href="page" target="_blank" rel="noopener"
                class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div class="bg-white p-3">
                  <img :src="page" :alt="`${activeCatalog.title} page ${index + 1}`"
                    class="h-auto w-full rounded-2xl bg-white object-contain transition duration-500 group-hover:scale-[1.015]"
                    loading="lazy">
                </div>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.catalog-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 42px 42px;
}
</style>
