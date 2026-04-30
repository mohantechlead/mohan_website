<script setup>
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <main>
    <NaVBar />

    <section class="py-16 md:py-20">
      <div class="container-section">
        <article class="surface-card">
          <p class="section-eyebrow">News</p>
          <p class="mt-2 text-sm font-medium text-slate-500">News &gt; The 3rd round Federal Taxpayers’ Recognition Ceremony</p>
          <h1 class="section-title mt-4">The 3rd round Federal Taxpayers’ Recognition Ceremony</h1>

          <div class="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <img src="/news-2.jpg" alt="Federal Taxpayers Recognition Ceremony" class="h-full w-full object-cover">
          </div>

          <div class="body-copy mt-8 space-y-6">
            <p>
              The 3rd round Federal Taxpayers’ Recognition Ceremony was held this afternoon in the presence of PM Abiy Ahmed. Held at Unity Park, the program recognized 300 registered businesses that have maintained transparent conduct and paid their taxes in a timely manner. The recognition program is intended to encourage the business community to follow the lead in abiding by the law.
            </p>
            <p>
              It is a matter of honor for MohanPlc to receive an award in the silver category. This recognition will further encourage us to work harder and continue to make our modest contribution to the Ethiopian economy.
            </p>
          </div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>
