<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const pvcRanges = [
  'Air blow compounds',
  'Transparent/crystal compounds',
  'Compounds for manufacturing pipe fittings',
  'Shoes and sandals compounds',
  'Compounds for manufacturing boots',
  'Electric cables compounds',
  'Compounds for manufacturing soles for leather and synthetic footwear',
  'Compounds for manufacturing various types of seals',
  'Compounds for manufacturing decorative articles',
  'Various other PVC applications'
]

const rubberApplications = [
  'Automotive parts',
  'Engine mounts',
  'Seals and closures',
  'Rubber sheets',
  'Footwear',
  'Rubber mats',
  'Construction sector',
  'Seals',
  'Strips',
  'Shoe soles for leather and synthetic footwear'
]

const masterbatchTypes = [
  'Compact color masterbatches',
  'Transparent/crystal masterbatches',
  'Fluorescent masterbatches',
  'Pearlised master batches',
  'Night glow masterbatches',
  'UV resistance color masterbatches',
  'Filler Masterbatches'
]

const fillerApplications = [
  'PP woven sacks',
  'Blown film extrusion',
  'Injected household products',
  'Injection furniture products',
  'PP strips for furniture and packaging',
  'Other PP and PE extrusion and injection applications'
]

const footwearRanges = [
  'Canvas shoes',
  'Ballerina shoes',
  'Sneakers',
  'Jogging shoes',
  'Fabricated slippers',
  'Other casual and fashionable footwear'
]

const evaShowcase = [
  { src: '/eva-1.jpg', alt: 'EVA compound production line' },
  { src: '/eva-2.jpg', alt: 'EVA compound material closeup' }
]

const pvcShowcase = [
  { src: '/pvc-1.jpg', alt: 'PVC compounds production line' },
  { src: '/pvc-2.jpg', alt: 'PVC compounds material showcase' }
]

const sectionLinks = [
  { id: 'plc-intro', label: 'Overview' },
  { id: 'eva', label: 'EVA' },
  { id: 'pvc', label: 'PVC' },
  { id: 'rubber', label: 'Rubber' },
  { id: 'color', label: 'Color MB' },
  { id: 'filler', label: 'Filler MB' },
  { id: 'endure', label: 'Endure' },
  { id: 'sheets', label: 'Sheets' },
  { id: 'footwear', label: 'Footwear' }
]

const activeSection = ref('plc-intro')
const scrollProgress = ref(0)
let observer

const updateProgress = () => {
  const doc = document.documentElement
  const total = doc.scrollHeight - window.innerHeight
  scrollProgress.value = total > 0 ? (window.scrollY / total) * 100 : 0
}

const scrollToSection = (id) => {
  const section = document.getElementById(id)
  if (!section) return
  const top = section.getBoundingClientRect().top + window.scrollY - 110
  window.scrollTo({ top, behavior: 'smooth' })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
          entry.target.classList.add('in-view')
        }
      })
    },
    { threshold: 0.2 }
  )

  sectionLinks.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })

  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  if (observer) observer.disconnect()
})
</script>

<template>
  <main>
    <NaVBar />
    <div class="progress-wrap">
      <div class="progress-bar" :style="{ width: `${scrollProgress}%` }"></div>
    </div>

    <section class="py-16 md:py-20">
      <div class="container-section">
        <div
          class="sticky top-24 z-30 mb-8 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-md backdrop-blur">
          <div class="flex flex-wrap gap-2">
            <button v-for="item in sectionLinks" :key="item.id" type="button"
              class="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition" :class="activeSection === item.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                " @click="scrollToSection(item.id)">
              {{ item.label }}
            </button>
          </div>
        </div>

        <article id="plc-intro" class="surface-card plc-intro section-block tilt-left">
          <p class="section-eyebrow">Mohan PLC</p>
          <p class="mt-2 text-sm font-medium text-slate-500">Mohan &gt; Mohan PLC</p>
          <h1 class="section-title mt-4">Mohan Plc</h1>

          <div class="body-copy mt-8 space-y-6">
            <p>
              With the growth of the industrial sector due to the rapid development of the Ethiopian economy, the Mohan
              Group of Companies decided to fortify its position as a leading supplier of plastic raw materials in the
              country. In 2006, Mohan PLC became the first manufacturer of ethylene-vinyl-acetate [EVA] based compound
              granules in Ethiopia.
            </p>
            <p>
              Since then, Mohan PLC has added to its product range and can supply not only different grades of EVA
              compounds for the footwear and automotive industry but also different types of PVC compounds that can be
              used in various applications including footwear, cables, pipes, garden hoses, profiling, construction
              sector, automotive sector etc. We further added value to our market base by manufacturing Rubber Compounds
              and ENDURE® Compounds [a type of thermoplastic rubber], which cater mostly to the footwear, automotive and
              construction sectors.
            </p>
            <p>
              In order to further satisfy our customers' growing demands, Mohan PLC started manufacturing different
              types of color master-batches for various applications. As the packaging and household furniture industry
              grew in Ethiopia, Mohan PLC became the first to commercially manufacture and supply filler master-batches
              in Ethiopia.
            </p>
            <p>
              In 2014, Mohan PLC entered the leather and synthetic footwear manufacturing industry with a unique
              advantage of linkage. Mohan PLC manufactures compounds and components used in the footwear industry. We
              also support other export oriented footwear industries in Ethiopia by supplying various components to
              them.
            </p>
            <p>
              Mohan PLC is playing an important role in furthering the government policy of import substitution by
              manufacturing all the above products, which were earlier imported from countries like India, China,
              Taiwan, Singapore etc.
            </p>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div class="metric-pill">
              <p class="text-3xl font-bold">2006</p>
              <p class="mt-1 text-xs font-semibold uppercase tracking-[0.14em]">EVA Pioneer</p>
            </div>
            <div class="metric-pill">
              <p class="text-3xl font-bold">2014</p>
              <p class="mt-1 text-xs font-semibold uppercase tracking-[0.14em]">Footwear Entry</p>
            </div>
            <div class="metric-pill">
              <p class="text-3xl font-bold">10+</p>
              <p class="mt-1 text-xs font-semibold uppercase tracking-[0.14em]">Core Segments</p>
            </div>
          </div>
        </article>

        <article id="eva" class="surface-card section-block tilt-right mt-8 eva-section">
          <div class="section-head">
            <span class="section-code">01</span>
            <h2 class="section-subtitle">EVA Compounds</h2>
          </div>
          <div class="body-copy mt-6 space-y-5">
            <p>
              The EVA compound granules that we produce are primary focused for the footwear industry in Ethiopia. These
              compounds are suitable for high quality foamed injection molded slippers, sandals, mid soles, boots,
              automobile components, toys, and various other applications.
            </p>
            <p>
              The EVA compounds that we manufacture are expandable and cross-likable. We also modify them with rubber,
              thermoplastic elastomers, impact modifiers, and other specialty polymers so that our customers get
              enhanced mechanical and processing qualities.
            </p>
            <p>
              We choose the best quality of raw materials from internationally well-known companies to ensure the
              highest quality standards of our products. We can customize our compounds to meet any special requirements
              of our customers and provide technical support to ensure they get the best results from our materials.
            </p>
          </div>

          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <div v-for="item in evaShowcase" :key="item.src"
              class="overflow-hidden rounded-2xl border border-white/20 bg-white/5">
              <img :src="item.src" :alt="item.alt"
                class="h-56 w-full object-cover transition duration-500 hover:scale-105">
            </div>
          </div>
        </article>

        <article id="pvc" class="surface-card section-block tilt-left mt-8 pvc-section">
          <div class="section-head">
            <span class="section-code">02</span>
            <h2 class="section-subtitle">PVC Compounds</h2>
          </div>
          <p class="body-copy mt-6">
            We produce Poly Vinyl Chloride (PVC) compounds applicable in diverse product ranges, including footwear,
            pipes, cables, garden hoses, and profiling. The compounds are suitable for both injection and extrusion
            machines and are produced in our modern manufacturing plant using state-of-the-art technology.
          </p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in pvcRanges" :key="item" class="interactive-card">
              <p class="text-sm font-semibold text-slate-700">{{ item }}</p>
            </div>
          </div>

          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <div v-for="item in pvcShowcase" :key="item.src"
              class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img :src="item.src" :alt="item.alt"
                class="h-56 w-full object-cover transition duration-500 hover:scale-105">
            </div>
          </div>
        </article>

        <article id="rubber" class="surface-card section-block tilt-right mt-8 rubber-section">
          <div class="section-head">
            <span class="section-code">03</span>
            <h2 class="section-subtitle">Rubber Compound</h2>
          </div>
          <p class="body-copy mt-6">
            We produce high quality rubber compounds for key sectors of the economy. Our compounds support important and
            sensitive applications including:
          </p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in rubberApplications" :key="item" class="interactive-card">
              <p class="text-sm font-semibold text-slate-700">{{ item }}</p>
            </div>
          </div>
        </article>

        <article id="color" class="surface-card section-block tilt-left mt-8 color-section">
          <div class="section-head">
            <span class="section-code">04</span>
            <h2 class="section-subtitle">Color Masterbatches</h2>
          </div>
          <p class="body-copy mt-6">
            We produce quality color master batches customized to the needs of convertors of PE, PP and PVC products.
            The different types include:
          </p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in masterbatchTypes" :key="item" class="interactive-card">
              <p class="text-sm font-semibold text-slate-700">{{ item }}</p>
            </div>
          </div>
        </article>

        <article id="filler" class="surface-card section-block tilt-right mt-8 filler-section">
          <div class="section-head">
            <span class="section-code">05</span>
            <h2 class="section-subtitle">Filler Masterbatches</h2>
          </div>
          <p class="body-copy mt-6">
            Mohan PLC manufactures quality filler masterbatches for packaging and furniture industries for both
            extrusion and injection applications. We provide support for:
          </p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in fillerApplications" :key="item" class="interactive-card">
              <p class="text-sm font-semibold text-slate-700">{{ item }}</p>
            </div>
          </div>
          <p class="body-copy mt-6">
            Our filler masterbatch compounds are made with unique and innovative formulations that enhance customer
            quality, production speed, and processing/mechanical properties.
          </p>
        </article>

        <article id="endure" class="surface-card section-block tilt-left mt-8 endure-section">
          <div class="section-head">
            <span class="section-code">06</span>
            <h2 class="section-subtitle">Endure / PPR Compunds</h2>
          </div>
          <p class="body-copy mt-6">
            Mohan PLC has recently started production of ENDURE, a type of Thermoplastic Rubber used in footwear,
            automotive parts, and construction. The latest ENDURE compound for footwear is light, flexible, and
            comfortable.
          </p>
          <p class="body-copy mt-5">
            Customers may also use ENDURE for seals, automotive components, and related applications. We use high
            quality raw materials, state-of-the-art technology, and qualified experts to solve application-based
            problems for thermoplastic rubbers and thermoplastic elastomers.
          </p>
          <p class="body-copy mt-5">
            We can customize our compounds to our customers' needs.
          </p>
        </article>

        <article id="sheets" class="surface-card section-block tilt-right mt-8 sheet-section">
          <div class="section-head">
            <span class="section-code">07</span>
            <h2 class="section-subtitle">EVA/Rubber Sheets</h2>
          </div>
          <p class="body-copy mt-6">
            We also produce EVA/Rubber sheets that serve as expansion joints in important construction projects.
          </p>
          <p class="body-copy mt-5">
            Our sheets have been tested in international laboratories and are considered special for footwear
            applications. The specialty of our formulas enables the cellular structures of sheets to entrap air
            naturally, making end applications light, bouncy and comfortable.
          </p>
        </article>

        <article id="footwear" class="surface-card section-block tilt-left mt-8 footwear-section">
          <div class="section-head">
            <span class="section-code">08</span>
            <h2 class="section-subtitle">Footwear</h2>
          </div>
          <p class="body-copy mt-6">
            Mohan PLC has a state-of-the-art leather and synthetic footwear manufacturing plant and has established a
            respected brand, "Highlander Shoes". We have a skilled and innovative team to design and finish high quality
            leather and synthetic footwear including:
          </p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in footwearRanges" :key="item" class="interactive-card">
              <p class="text-sm font-semibold text-slate-700">{{ item }}</p>
            </div>
          </div>
          <p class="body-copy mt-6">
            Highlander Shoes uses innovative solutions to make comfortable and trendy footwear with the advantage of
            backward linkage to compounding the basic building block of a shoe.
          </p>
        </article>

        <article class="soft-card mt-8">
          <p class="body-copy">
            The Mohan Group has engaged in diverse business activities and has specialized in the raw material business
            especially for plastics, packaging, footwear and plastic based construction industries.
          </p>

        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.progress-wrap {
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 40;
  height: 3px;
  width: 100%;
  background: rgba(148, 163, 184, 0.2);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #fb7185);
  transition: width 0.12s linear;
}

.section-block {
  opacity: 0;
  transform: translateY(28px) scale(0.99);
  transition: opacity 0.65s ease, transform 0.65s ease, box-shadow 0.35s ease;
}

.section-block.in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.section-block:hover {
  box-shadow: 0 22px 50px -36px rgba(15, 23, 42, 0.75);
}

.tilt-left.in-view {
  transform: translateY(0) scale(1) rotate(-0.2deg);
}

.tilt-right.in-view {
  transform: translateY(0) scale(1) rotate(0.2deg);
}

.section-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-code {
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: #0f172a;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.plc-intro {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-top: 4px solid #f59e0b;
}

.metric-pill {
  border-radius: 1rem;
  background: linear-gradient(145deg, #0f172a, #1e293b);
  padding: 1rem;
  color: #fff;
  box-shadow: 0 10px 25px -18px rgba(15, 23, 42, 0.9);
}

.eva-section {
  background: linear-gradient(140deg, #0f172a 0%, #1e293b 100%);
}

.eva-section :deep(h2),
.eva-section :deep(p) {
  color: #f8fafc;
}

.pvc-section {
  border-left: 6px solid #f59e0b;
  background: #ffffff;
}

.rubber-section {
  background:
    radial-gradient(circle at 90% 10%, rgba(14, 116, 144, 0.12), transparent 45%),
    #f8fafc;
}

.color-section {
  background:
    linear-gradient(90deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0)),
    #ffffff;
}

.filler-section {
  background: linear-gradient(135deg, #fff 0%, #f1f5f9 100%);
  border: 1px solid #cbd5e1;
}

.endure-section {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

.endure-section :deep(h2),
.endure-section :deep(p) {
  color: #f8fafc;
}

.sheet-section {
  background:
    radial-gradient(circle at 10% 10%, rgba(245, 158, 11, 0.1), transparent 38%),
    #ffffff;
}

.footwear-section {
  background:
    linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(2, 132, 199, 0)),
    #ffffff;
  border-bottom: 4px solid #0ea5e9;
}
</style>
