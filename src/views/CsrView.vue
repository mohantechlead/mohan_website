<script setup>
import { computed, ref } from 'vue'
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const images = [
  { src: '/csr-1.png', label: 'CSR Programs' },
  { src: '/csr-2.png', label: 'Community Partnerships' }
]

const activeImage = ref(images[0])
const activeCategory = ref('all')

const initiatives = [
  {
    category: 'community',
    text: 'Sustainable cooperative water well, energy and food production in rural Ethiopia with hygiene and healthcare training for youth and schools, in collaboration with ARS Foundation and S.M.A.R.T NGO.'
  },
  {
    category: 'community',
    text: 'Feeding program at Alpha Special School for the Deaf in collaboration with Ye Enat Weg Charitable Association and Mohan PLC.'
  },
  { category: 'health', text: 'Blood donation drive organized by Mohan PLC.' },
  { category: 'health', text: 'Support to Operation Smile for cleft-lip and palate surgery campaign.' },
  { category: 'relief', text: 'Donation to International Organization for Migration to support returnees from Saudi Arabia.' },
  { category: 'relief', text: 'Support to a home building program for internally displaced people.' },
  { category: 'capacity', text: 'Internship program for children with hearing impairment for on-the-job training.' },
  { category: 'capacity', text: 'Fire, safety and skill upgrading training programs for employees.' },
  { category: 'community', text: 'Participation in area cleaning programs.' },
  { category: 'community', text: 'Financial support for various public interest infrastructures.' },
  { category: 'community', text: 'Various other feeding programs.' },
  { category: 'health', text: 'Donation of Covid-19 related supplies to medical facilities.' },
  { category: 'relief', text: 'Donation for Covid-19 relief fund.' },
  { category: 'community', text: 'Participation in "Dine for Sheger" and "Dine for Ethiopia".' },
  { category: 'community', text: 'Various many other csr programs.' }
]

const categoryButtons = [
  { id: 'all', label: 'All Initiatives' },
  { id: 'community', label: 'Community' },
  { id: 'health', label: 'Health' },
  { id: 'relief', label: 'Relief' },
  { id: 'capacity', label: 'Capacity Building' }
]

const filteredInitiatives = computed(() =>
  activeCategory.value === 'all'
    ? initiatives
    : initiatives.filter((item) => item.category === activeCategory.value)
)
</script>

<template>
  <main>
    <NaVBar />

    <section class="py-16 md:py-20">
      <div class="container-section">
        <article class="surface-card">
          <p class="section-eyebrow">CSR</p>
          <p class="mt-2 text-sm font-medium text-slate-500">Mohan &gt; Corporate Social Responsibility</p>
          <h1 class="section-title mt-4">Corporate Social Responsibility</h1>

          <div class="mt-8 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div class="body-copy space-y-6">
                <p>
                  Mohan Group of Companies intrinsically believes that it is our duty to contribute to the well-being and the
                  development of our society. With this in mind, we have embarked on various CSR activities.
                </p>
                <p>
                  To help our CSR activities get the necessary organizational structure, we have built a dedicated CSR
                  division within Mohan PLC focused on measurable community impact and long-term social value creation.
                </p>
                <p>
                  Various CSR initiatives have been taken by our organization, which include the following:
                </p>
              </div>

              <div class="mt-6 flex flex-wrap gap-2">
                <button
                  v-for="category in categoryButtons"
                  :key="category.id"
                  type="button"
                  class="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition"
                  :class="
                    activeCategory === category.id
                      ? 'border-amber-500 bg-amber-500 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-amber-300 hover:text-slate-900'
                  "
                  @click="activeCategory = category.id"
                >
                  {{ category.label }}
                </button>
              </div>

              <div class="mt-6 grid gap-3">
                <article
                  v-for="(item, idx) in filteredInitiatives"
                  :key="item.text"
                  class="initiative-card"
                  :style="{ transitionDelay: `${idx * 20}ms` }"
                >
                  <p class="text-sm leading-7 text-slate-700 md:text-base">{{ item.text }}</p>
                </article>
              </div>
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
                  v-for="image in images"
                  :key="image.src"
                  type="button"
                  class="overflow-hidden rounded-xl border-2 transition"
                  :class="activeImage.src === image.src ? 'border-amber-500 shadow-md' : 'border-transparent hover:border-slate-300'"
                  @click="activeImage = image"
                >
                  <img :src="image.src" :alt="image.label" class="h-24 w-full object-cover">
                </button>
              </div>

              <div class="rounded-2xl bg-slate-900 p-5 text-slate-100">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">CSR Focus</p>
                <p class="mt-3 text-sm leading-7 text-slate-200">
                  Structured community programs, health interventions, emergency relief, and long-term social impact partnerships.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.initiative-card {
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 0.9rem 1rem;
  transition: all 0.25s ease;
}

.initiative-card:hover {
  transform: translateY(-2px);
  border-color: #f59e0b;
  box-shadow: 0 12px 28px -20px rgba(15, 23, 42, 0.8);
}
</style>
