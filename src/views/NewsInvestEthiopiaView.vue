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
          <p class="mt-2 text-sm font-medium text-slate-500">News &gt; Time to invest in Ethiopia</p>
          <h1 class="section-title mt-4">Time to invest in Ethiopia</h1>

          <div class="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <img src="/news-1.jpg" alt="Time to invest in Ethiopia" class="h-full w-full object-cover">
          </div>

          <div class="body-copy mt-8 space-y-6">
            <p>
              World class conference & exhibition organised by EthioInvestment under the leadership of Lelise_Neme on investment opportunities in #Ethiopia.
            </p>
            <p>
              It was an honor for MohanPlc to participate at this event. Presentations by dignitaries were exceptional & inspiring!
            </p>
          </div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>
