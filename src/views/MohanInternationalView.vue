<script setup>
import { computed, ref } from 'vue'
import NaVBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const focusAreas = [
  {
    id: 'resins',
    title: 'Polymer Resins',
    detail: 'Reliable local stock of PE and PP grades for consistent manufacturing and supply continuity.',
    points: ['HDPE', 'LDPE', 'LLDPE', 'PP', 'Exceed', 'Various other industrial chemicals']
  },
  {
    id: 'industrial',
    title: 'Industrial Inputs',
    detail: 'Broad material support for PVC and other industrial processing requirements.',
    points: ['PVC resins', 'Heat stabilizers', 'Specialty industrial raw materials']
  },
  {
    id: 'consumer',
    title: 'Consumer Portfolio',
    detail: 'Mohan International provides strong distribution support and market reach across Ethiopia.',
    points: ['Distribution support', 'Market reach across Ethiopia', 'Customer service excellence']
  }
]

const activeFocus = ref(focusAreas[0].id)

const activeFocusArea = computed(
  () => focusAreas.find((item) => item.id === activeFocus.value) ?? focusAreas[0]
)
</script>

<template>
  <main>
    <NaVBar />

    <section class="py-16 md:py-20">
      <div class="container-section">
        <article class="surface-card intl-card">
          <p class="section-eyebrow">Mohan International</p>
          <p class="mt-2 text-sm font-medium text-slate-500">Mohan &gt; Mohan International</p>
          <h1 class="section-title mt-4">Mohan International</h1>

          <div class="mt-10 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div class="body-copy space-y-6">
              <p>
                Mohan International is synonymous to the supply of plastic raw materials in Ethiopia. It is probably the
                oldest supplier of plastic raw materials in Ethiopia.
              </p>
              <p>
                It keeps local stocks of HDPE, LDPE, LLDPE, PP, Exceed, and various other industrial chemicals.
              </p>
              <p>
                Mohan International also stocks industrial raw materials such as heat stabilizers for PVC applications,
                PVC resins, and other specialty industrial inputs.
              </p>

              <div class="mt-8 flex flex-wrap gap-3">
                <span class="feature-chip">Oldest Raw Material Supplier</span>
                <span class="feature-chip">Local Stock Availability</span>
                <span class="feature-chip">Industrial Chemicals Supply</span>
              </div>

              <div class="mt-8 grid gap-3 sm:grid-cols-3">
                <button v-for="item in focusAreas" :key="item.id" type="button" class="focus-pill text-left"
                  :class="activeFocus === item.id ? 'focus-pill-active' : ''" @click="activeFocus = item.id">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Focus</p>
                  <p class="mt-1 text-sm font-bold text-slate-900">{{ item.title }}</p>
                </button>
              </div>

              <div class="focus-panel mt-4">
                <p class="text-sm font-semibold uppercase tracking-[0.14em] text-amber-600">
                  {{ activeFocusArea.title }}
                </p>
                <p class="mt-2 text-base leading-7 text-slate-700">
                  {{ activeFocusArea.detail }}
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-for="point in activeFocusArea.points" :key="point" class="mini-chip">
                    {{ point }}
                  </span>
                </div>
              </div>
            </div>

            <div class="photo-stage">
              <div class="aura aura-one"></div>
              <div class="aura aura-two"></div>

              <div class="photo-wrap">
                <img src="/mohan_int.jpg" alt="Mohan International" class="photo-img">
              </div>

              <div class="photo-badge badge-top">Legacy Supplier</div>
              <div class="photo-badge badge-bottom">Trusted in Ethiopia</div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

<style scoped>
.intl-card {
  background:
    radial-gradient(circle at 0% 0%, rgba(245, 158, 11, 0.09), transparent 38%),
    radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.07), transparent 36%),
    linear-gradient(145deg, #ffffff, #f8fafc);
  border: 1px solid #e2e8f0;
  box-shadow: 0 26px 60px -42px rgba(15, 23, 42, 0.6);
}

.feature-chip {
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 0.45rem 0.85rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #334155;
  transition: all 0.25s ease;
}

.feature-chip:hover {
  transform: translateY(-2px);
  border-color: #f59e0b;
  color: #0f172a;
}

.focus-pill {
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  padding: 0.75rem;
  transition: all 0.25s ease;
}

.focus-pill:hover {
  transform: translateY(-2px);
  border-color: #cbd5e1;
  box-shadow: 0 10px 25px -22px rgba(15, 23, 42, 0.75);
}

.focus-pill-active {
  border-color: #f59e0b;
  background: linear-gradient(145deg, #fff7ed, #ffffff);
  box-shadow: 0 14px 28px -24px rgba(245, 158, 11, 0.75);
}

.focus-panel {
  border-radius: 1rem;
  border: 1px solid #fed7aa;
  background: linear-gradient(145deg, #fff7ed, #ffffff);
  padding: 1rem;
}

.mini-chip {
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 0.3rem 0.7rem;
  font-size: 0.73rem;
  font-weight: 700;
  color: #334155;
}

.photo-stage {
  position: relative;
  padding: 0.9rem;
  border-radius: 1.8rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.92));
  border: 1px solid #e2e8f0;
  box-shadow: 0 22px 48px -36px rgba(15, 23, 42, 0.65);
}

.photo-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 1.35rem;
  border: 1px solid #dbeafe;
}

.photo-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
  transform-origin: center;
}

.photo-wrap:hover .photo-img {
  transform: scale(1.04);
}

.photo-badge {
  position: absolute;
  z-index: 3;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.75rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
}

.badge-top {
  top: -0.55rem;
  right: 1rem;
}

.badge-bottom {
  bottom: -0.65rem;
  left: 1rem;
}

.aura {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  filter: blur(6px);
}

.aura-one {
  top: -16px;
  left: -18px;
  height: 84px;
  width: 84px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.35), rgba(245, 158, 11, 0));
  animation: floaty 5s ease-in-out infinite;
}

.aura-two {
  right: -20px;
  bottom: -20px;
  height: 76px;
  width: 76px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.3), rgba(56, 189, 248, 0));
  animation: floaty 5.4s ease-in-out infinite reverse;
}

@keyframes floaty {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>
