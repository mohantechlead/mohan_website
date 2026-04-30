<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const posts = [
  {
    title: 'Time to invest in Ethiopia',
    image: '/news-1.jpg',
    to: '/news/time-to-invest-in-ethiopia',
    excerpt:
      'World class conference & exhibition organised by EthioInvestment under the leadership of Lelise Neme on investment opportunities in Ethiopia. It was an honor for Mohan Plc to participate at this event. Presentations by dignitaries were exceptional and inspiring!'
  },
  {
    title: 'The 3rd round Federal Taxpayers’ Recognition Ceremony',
    image: '/news-2.jpg',
    to: '/news/federal-taxpayers-recognition-ceremony',
    excerpt:
      'The 3rd round Federal Taxpayers’ Recognition Ceremony was held in the presence of PM Abiy Ahmed at Unity Park, recognizing 300 registered businesses for transparent conduct and timely tax payments. The recognition program is intended to encourage businesses.'
  }
]

const searchQuery = ref('')

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return posts

  return posts.filter((post) => {
    const title = post.title.toLowerCase()
    const excerpt = post.excerpt.toLowerCase()
    return title.includes(query) || excerpt.includes(query)
  })
})
</script>

<template>
  <main>
    <NaVBar />

    <section class="py-16 md:py-20">
      <div class="container-section">
        <div class="mb-10 text-center">
          <p class="section-eyebrow">News</p>
          <h1 class="section-title mt-3">Engaged in diverse business activities</h1>
        </div>

        <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div class="space-y-8">
            <article v-for="post in filteredPosts" :key="post.title" class="surface-card">
              <RouterLink :to="post.to" class="block overflow-hidden rounded-2xl border border-slate-200">
                <img :src="post.image" :alt="post.title" class="h-full w-full object-cover transition duration-500 hover:scale-105">
              </RouterLink>
              <p class="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-amber-500">News</p>
              <RouterLink :to="post.to" class="mt-2 block text-2xl font-bold text-slate-900 hover:text-amber-600">
                {{ post.title }}
              </RouterLink>
              <p class="mt-4 text-sm leading-7 text-slate-700 md:text-base">{{ post.excerpt }}</p>
              <RouterLink :to="post.to" class="btn-secondary mt-6">Read More</RouterLink>
            </article>

            <article v-if="filteredPosts.length === 0" class="surface-card text-center">
              <p class="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">No Results</p>
              <p class="mt-3 text-base text-slate-700">
                No news matched "<span class="font-semibold">{{ searchQuery }}</span>". Try another keyword.
              </p>
            </article>
          </div>

          <aside class="space-y-6">
            <article class="soft-card">
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                v-model="searchQuery"
              >
            </article>

            <article class="soft-card">
              <h3 class="text-lg font-bold text-slate-900">Recent Posts</h3>
              <div class="mt-4 space-y-3 text-sm font-medium text-slate-700">
                <RouterLink to="/news/time-to-invest-in-ethiopia" class="block hover:text-amber-600">Time to invest in Ethiopia</RouterLink>
                <RouterLink to="/news/federal-taxpayers-recognition-ceremony" class="block hover:text-amber-600">The 3rd round Federal Taxpayers’ Recognition Ceremony</RouterLink>
              </div>
            </article>

            <article class="soft-card">
              <h3 class="text-lg font-bold text-slate-900">Archives</h3>
              <p class="mt-4 text-sm font-medium text-slate-700">November 2021</p>
            </article>

            <article class="soft-card">
              <h3 class="text-lg font-bold text-slate-900">Popular Feeds</h3>
              <div class="mt-4 space-y-3 text-sm font-medium text-slate-700">
                <RouterLink to="/news/time-to-invest-in-ethiopia" class="block hover:text-amber-600">Time to invest in Ethiopia</RouterLink>
                <RouterLink to="/news/federal-taxpayers-recognition-ceremony" class="block hover:text-amber-600">The 3rd round Federal Taxpayers’ Recognition Ceremony</RouterLink>
              </div>
            </article>

            <article class="soft-card">
              <h3 class="text-lg font-bold text-slate-900">Categories</h3>
              <p class="mt-4 text-sm font-medium text-slate-700">News2</p>
            </article>

            <article class="soft-card">
              <h3 class="text-lg font-bold text-slate-900">Never Miss News</h3>
              <div class="mt-4 flex gap-2">
                <input type="email" placeholder="Your email" class="form-control">
                <button type="button" class="btn-primary">Join</button>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>
