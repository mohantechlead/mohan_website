<script setup>
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const featuredArticle = {
  source: 'The Reporter Ethiopia',
  title: 'The 4th Generation Entrepreneur - Interview with Harsh Kothari',
  date: 'Feb 2018',
  url: 'https://www.thereporterethiopia.com/3207/',
  description:
    "A detailed profile of Mohan Group's business activities, CSR work, and the Kothari family's 100+ year legacy in Ethiopia."
}

const mediaGroups = [
  {
    title: 'Articles & News',
    eyebrow: 'Press Coverage',
    description: 'Interviews, investment coverage, company profiles, and public statements from Ethiopian and international media.',
    items: [
      featuredArticle,
      {
        source: 'Ethiopian News Agency',
        title: 'Ease of Doing Business in Ethiopia Flourishing - CEO Harsh Kothari',
        date: 'Jan 2, 2026',
        url: 'https://www.ena.et/web/eng/w/eng_8050332',
        description:
          "CEO comments on Ethiopia's economic reforms, PM Modi's visit, and the country's investment climate."
      },
      {
        source: 'Ethiopian News Agency',
        title: 'Ethiopia Rises as Prime Hub for Indian Investment',
        date: 'Dec 28, 2025',
        url: 'https://www.ena.et/web/eng/w/eng_8017012',
        description:
          'Harsh Kothari quoted on policy reforms, forex improvements, and the Dire Dawa Free Trade Zone.'
      },
      {
        source: 'Ethiopian Press Agency',
        title: 'We Continue to Save Dollars for Ethiopia Through Import Substitution',
        date: 'May 2022',
        url: 'https://press.et/herald/?p=54507',
        description:
          "Interview on polymer manufacturing, footwear production growth, and Mohan PLC's import substitution role."
      },
      {
        source: 'Abren',
        title: "Ethiopia's Business Landscape Thrives: Insights from Mohan Group CEO",
        date: 'Jan 2026',
        url: 'https://abren.org/2026/01/02/eng_8050332/',
        description:
          "Summary of Harsh Kothari's statements on Ethiopia's economic reform agenda and investment momentum."
      },
      {
        source: 'Fairtrade Messe Ethiopia',
        title: 'Mohan PLC Exhibitor Profile',
        date: 'Company Profile',
        url: 'https://ethiopia.fairtrade-messe.de/newfront/exhibitor/mohan-plc',
        description: 'Public exhibitor profile with company overview and product listing.'
      }
    ]
  },
  {
    title: 'Videos',
    eyebrow: 'Interviews & Features',
    description: 'Long-form interviews and public video features covering Mohan Group leadership and investment perspectives.',
    items: [
      {
        source: 'YouTube',
        title: 'From Service Quarter to Industry Leader - Mayur Kothari',
        date: 'Dec 24, 2025',
        url: 'https://www.youtube.com/watch?v=EBVXTmO1HJ0',
        description:
          "Full episode interview with Mayur Kothari on Mohan Group's journey in Ethiopia's plastics and footwear industry."
      },
      {
        source: 'Facebook - Pulse of Africa',
        title: "Harsh Kothari Highlights Africa's Vast Investment Potential",
        date: 'Video',
        url: 'https://www.facebook.com/poaenglish/videos/mohan-group-companies-ceo-harsh-kothari-highlights-africas-vast-investment-poten/1683946036106232/',
        description: "Public video feature on Africa's investment potential and Mohan Group's perspective."
      },
      {
        source: 'Facebook - Raya Press',
        title: "Mohan Group CEO Highlights Africa's Vast Investment Potential",
        date: 'Shared Video',
        url: 'https://www.facebook.com/raya.press.458502/videos/mohan-group-companies-ceo-harsh-kothari-highlights-africas-vast-investment-poten/1929389011273706/',
        description: 'Raya Press share of the public Pulse of Africa feature.'
      }
    ]
  },
  {
    title: 'Photos & Social Media',
    eyebrow: 'Social Channels',
    description: 'Official and related public channels with product photos, company updates, awards, and leadership activity.',
    items: [
      {
        source: 'Instagram',
        title: 'Mohan Group of Companies - @mohan_group_',
        date: 'Official Channel',
        url: 'https://www.instagram.com/mohan_group_/',
        description: 'Official Instagram presence focused on polymer and footwear business updates.'
      },
      {
        source: 'Facebook',
        title: 'Highlander Shoes',
        date: 'Brand Channel',
        url: 'https://web.facebook.com/highlandershoes',
        description: "Mohan PLC's footwear brand page with product photos, updates, and public recognition posts."
      },
      {
        source: 'Facebook',
        title: 'Role Model Taxpayer Award Post',
        date: 'Award Post',
        url: 'https://www.facebook.com/highlandershoes/posts/it-was-an-honour-for-mohanplc-to-be-awarded-for-being-a-role-model-tax-payer-by-/2074604026179506/',
        description: 'Post recognizing Mohan PLC as a role model taxpayer.'
      },
      {
        source: 'Facebook',
        title: 'Highlander Shoes Made in Ethiopia',
        date: 'Product Post',
        url: 'https://www.facebook.com/highlandershoes/posts/highlandershoes-produced-by-mohan-plc-are-fully-made-in-ethiopia-right-from-the-/2811113465861888/',
        description: 'Post highlighting Highlander Shoes as fully made in Ethiopia.'
      },
      {
        source: 'Twitter/X',
        title: 'Harsh Kothari Public Threads',
        date: 'Leadership Voice',
        url: 'https://threadreaderapp.com/user/HarshKothari001',
        description: "Public threads discussing Ethiopia's development and Mohan Group's work."
      },
      {
        source: 'LinkedIn',
        title: 'Mayur Kothari - CEO, Mohan Group',
        date: 'Leadership Profile',
        url: 'https://et.linkedin.com/in/mayur-kothari-1b82271a',
        description: 'Public professional profile for Mohan Group leadership.'
      },
    ]
  },
  {
    title: 'Business Directory Listings',
    eyebrow: 'Public Profiles',
    description: 'Third-party business profiles and directory references for Mohan Group companies.',
    items: [
      {
        source: 'Ezega Business Guide',
        title: 'Mohan International',
        date: 'Directory',
        url: 'https://businessguide.ezega.com/Default.aspx?action=BussinessDetail&bid=1629915',
        description: 'Business directory listing for Mohan International.'
      },
      {
        source: 'Dun & Bradstreet',
        title: 'Mohan PLC',
        date: 'Business Profile',
        url: 'https://www.dnb.com/business-directory/company-profiles.mohan_plc.4828a1e045ad4e6d83b490954f23f30e.html',
        description: 'Third-party company profile for Mohan PLC.'
      },
      {
        source: 'Tracxn',
        title: 'Mohan Group Profile',
        date: 'Company Profile',
        url: 'https://tracxn.com/d/companies/mohan-group/__5Ss_hzntLUnopyMI7ixxhKlMzBLBu46PYkRS7jwn0eI',
        description: 'Public company profile and business intelligence listing.'
      },
      {
        source: 'ZoomInfo',
        title: 'Mohan Group',
        date: 'Company Profile',
        url: 'https://www.zoominfo.com/c/mohan-group/346380025',
        description: 'Public company information profile.'
      }
    ]
  }
]

const quickStats = [
  { value: '4', label: 'Media Categories' },
  { value: '18+', label: 'Public References' },
  { value: '100+', label: 'Years Of Legacy Mentioned' }
]

const highlanderPhotos = [
  {
    src: '/media/photo 1.jpg',
    alt: 'Mohan PLC receiving recognition from Prime Minister Abiy Ahmed',
    caption: 'Mohan PLC Recognition Moment',
    description: 'Mohan PLC leadership receiving public recognition during a national business award ceremony.',
    url: 'https://web.facebook.com/photo.php?fbid=1085702406593391&set=pb.100054609242506.-2207520000&type=3'
  },
  {
    src: '/media/photo 2.jpg',
    alt: 'Mohan PLC representative holding an award',
    caption: 'Award Ceremony Highlight',
    description: 'A Highlander Shoes and Mohan PLC milestone captured during a formal recognition event.',
    url: 'https://web.facebook.com/photo/?fbid=1085702399926725&set=pb.100054609242506.-2207520000'
  },
  {
    src: '/media/photo 3.jpg',
    alt: 'Highlander Shoes office visit with flower presentation',
    caption: 'Highlander Shoes Office Visit',
    description: 'A guest welcome moment at the Highlander Shoes office and showroom space.',
    url: 'https://web.facebook.com/photo/?fbid=2483139618659276&set=pb.100054609242506.-2207520000'
  },
  {
    src: '/media/photo 4.jpg',
    alt: 'Invest in Ethiopia business forum graphic featuring Harsh Kothari',
    caption: 'Invest in Ethiopia Business Forum',
    description:
      'Harsh Kothari featured for the Invest in Ethiopia High Level Business Forum in Addis Ababa.',
    url: 'https://web.facebook.com/photo/?fbid=122114330384827444&set=a.122101787876827444'
  },
  {
    src: '/media/photo 5.jpg',
    alt: 'Mohan PLC footwear display at an exhibition',
    caption: 'Footwear Exhibition Showcase',
    description: 'Highlander Shoes and Mohan PLC products presented at a public industry exhibition.',
    url: 'https://web.facebook.com/photo/?fbid=10226902227334679&set=pcb.10226902229774740'
  }
]
</script>

<template>
  <main>
    <NaVBar />

    <section class="relative overflow-hidden bg-slate-950 py-16 text-white md:py-24">
      <div class="media-grid absolute inset-0 opacity-30"></div>
      <div class="absolute -left-24 top-12 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl"></div>
      <div class="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"></div>

      <div class="container-section relative">
        <div class="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Media & Press</p>
            <p class="mt-3 text-sm font-medium text-slate-300">Mohan &gt; Media</p>
            <h1 class="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Public coverage, interviews, videos, and company profiles.
            </h1>
            <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              A curated media library for Mohan Group of Companies in Ethiopia, organized for quick access to public
              articles, videos, social channels, and business listings.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div v-for="stat in quickStats" :key="stat.label"
              class="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p class="text-4xl font-bold text-white">{{ stat.value }}</p>
              <p class="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 py-14 md:py-20">
      <div class="container-section">
        <article
          class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_-46px_rgba(15,23,42,0.6)]">
          <div class="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div class="bg-slate-950 p-8 text-white md:p-10">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Featured Article</p>
              <h2 class="mt-5 text-3xl font-bold leading-tight md:text-4xl">{{ featuredArticle.title }}</h2>
              <p class="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                {{ featuredArticle.source }} / {{ featuredArticle.date }}
              </p>
            </div>

            <div class="p-8 md:p-10">
              <p class="text-base leading-8 text-slate-700">{{ featuredArticle.description }}</p>
              <a :href="featuredArticle.url" target="_blank" rel="noopener"
                class="mt-8 inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-400">
                Read Featured Story
              </a>
            </div>
          </div>
        </article>

        <section class="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div class="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <div class="bg-gradient-to-br from-slate-950 to-slate-800 p-8 text-white md:p-10">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Photo Gallery</p>
              <h2 class="mt-5 text-3xl font-bold leading-tight md:text-4xl">Highlander Shoes Media</h2>
              <p class="mt-5 text-sm leading-7 text-slate-300">
                Public product media pulled from the Highlander Shoes Facebook photos page.
              </p>
              <a href="https://web.facebook.com/highlandershoes" target="_blank" rel="noopener"
                class="mt-8 inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-400">
                Visit Facebook Page
              </a>
            </div>

            <div class="grid gap-5 bg-slate-100 p-5 sm:grid-cols-2 md:p-6">
              <a v-for="photo in highlanderPhotos" :key="photo.url" :href="photo.url" target="_blank" rel="noopener"
                class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div v-if="photo.src" class="aspect-[4/3] overflow-hidden bg-white">
                  <img :src="photo.src" :alt="photo.alt"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy">
                </div>
                <div v-else
                  class="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-center">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Facebook Photo</p>
                    <p class="mt-3 text-lg font-bold text-white">View Source Image</p>
                  </div>
                </div>
                <div class="p-4">
                  <p class="text-sm font-semibold text-slate-900">{{ photo.caption }}</p>
                  <p class="mt-2 text-sm leading-6 text-slate-600">{{ photo.description }}</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <div class="mt-12 space-y-14">
          <section v-for="group in mediaGroups" :key="group.title">
            <div class="mb-6 max-w-3xl">
              <p class="section-eyebrow">{{ group.eyebrow }}</p>
              <h2 class="section-title mt-3">{{ group.title }}</h2>
              <p class="body-copy mt-4">{{ group.description }}</p>
            </div>

            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <a v-for="item in group.items" :key="`${group.title}-${item.title}`" :href="item.url" target="_blank"
                rel="noopener"
                class="group flex min-h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                <div class="flex items-start justify-between gap-4">
                  <p
                    class="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                    {{ item.source }}
                  </p>
                  <p class="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{{ item.date }}
                  </p>
                </div>

                <h3 class="mt-5 text-xl font-bold leading-snug text-slate-950 transition group-hover:text-amber-600">
                  {{ item.title }}
                </h3>
                <p class="mt-4 flex-1 text-sm leading-7 text-slate-600">{{ item.description }}</p>
                <p class="mt-6 text-sm font-bold text-slate-950 transition group-hover:text-amber-600">
                  Open Link
                </p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.media-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 42px 42px;
}
</style>
