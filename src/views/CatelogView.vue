<script setup>
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const catalogs = [
  { title: 'Catalog 1', url: '/pdf/mohan%201.pdf#view=FitH&toolbar=0&navpanes=0' },
  { title: 'Catalog 2', url: '/pdf/mohan%202.pdf#view=FitH&toolbar=0&navpanes=0' },
  { title: 'Catalog 3', url: '/pdf/mohan%203.pdf#view=FitH&toolbar=0&navpanes=0' },
  { title: 'Catalog 4', url: '/pdf/mohan%204.pdf#view=FitH&toolbar=0&navpanes=0' }
]
</script>

<template>
  <main>
    <NaVBar />

    <section class="py-16 md:py-20">
      <div class="container-section">
        <article class="surface-card">
          <p class="section-eyebrow">Catelog</p>
          <p class="mt-2 text-sm font-medium text-slate-500">Mohan &gt; Catelog</p>
          <h1 class="section-title mt-4">Product Catelog</h1>

          <p class="body-copy mt-4">
            Explore our latest product catalog below.
          </p>

          <div class="mt-8 space-y-8">
            <section v-for="catalog in catalogs" :key="catalog.title">
              <p class="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-amber-600">
                {{ catalog.title }}
              </p>
              <div class="overflow-hidden rounded-2xl border-b border-x border-slate-200 bg-white shadow-sm">
                <iframe
                  :src="catalog.url"
                  :title="`Mohan Product ${catalog.title}`"
                  class="viewer-frame h-[82vh] w-full"
                  loading="lazy"
                ></iframe>
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.viewer-frame {
  border: 0;
}
</style>
