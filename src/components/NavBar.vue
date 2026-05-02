<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/img/logo.png'

const isMenuOpen = ref(false)
const isProductsOpen = ref(false)
const isMobileProductsOpen = ref(false)
const route = useRoute()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'News', to: '/news' },
  { label: 'Contact', to: '/contact' }
]

const productItems = [
  { label: 'Mohan PLC', to: '/mohan-plc' },
  { label: 'Mohan International', to: '/mohan-international' },
  { label: 'Vina Trade And Industry PLC', to: '/vina-trade-and-industry' },
  { label: 'Mohan Wire Industries', to: '/mohan-wire-industries' }
]

const closeMenu = () => {
  isMenuOpen.value = false
  isProductsOpen.value = false
  isMobileProductsOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 shadow-[0_6px_30px_-24px_rgba(15,23,42,0.55)] backdrop-blur">
    <nav class="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-10">
      <RouterLink to="/" class="flex items-center gap-4" @click="closeMenu">
        <img class="h-11 w-auto" :src="logo" alt="Mohan Logo" />
        <div class="hidden lg:block">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Mohan Group</p>
        </div>
      </RouterLink>

      <div class="hidden items-center gap-1 rounded-full bg-white p-1 md:flex">
        <RouterLink
          v-for="item in navItems.slice(0, 2)"
          :key="item.label"
          :to="item.to"
          class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
          :class="
            route.path === item.to
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          "
        >
          {{ item.label }}
        </RouterLink>

        <RouterLink
          to="/ddftz-operations"
          class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
          :class="
            route.path === '/ddftz-operations'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          "
        >
          DDFTZ
        </RouterLink>

        <div
          class="relative"
          @mouseenter="isProductsOpen = true"
          @mouseleave="isProductsOpen = false"
        >
          <button
            type="button"
            class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
            :class="isProductsOpen ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'"
          >
            Our Products +
          </button>

          <transition name="menu-fade">
            <div
              v-if="isProductsOpen"
              class="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
            >
              <component
                v-for="item in productItems"
                :key="item.label"
                :is="item.to ? 'RouterLink' : 'button'"
                :to="item.to"
                :type="item.to ? undefined : 'button'"
                class="block w-full border-b border-slate-200 px-5 py-3 text-left text-sm font-semibold text-slate-700 transition last:border-b-0 hover:bg-slate-50 hover:text-slate-900"
                @click="item.to ? closeMenu() : null"
              >
                {{ item.label }}
              </component>
            </div>
          </transition>
        </div>

        <RouterLink
          to="/catalog"
          class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
          :class="
            route.path === '/catalog'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          "
        >
          Catalog
        </RouterLink>

        <RouterLink
          to="/csr"
          class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
          :class="
            route.path === '/csr'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          "
        >
          CSR
        </RouterLink>

        <RouterLink
          :to="navItems[2].to"
          class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
          :class="
            route.path === navItems[2].to
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          "
        >
          {{ navItems[2].label }}
        </RouterLink>

        <RouterLink
          :to="navItems[3].to"
          class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
          :class="
            route.path === navItems[3].to
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          "
        >
          {{ navItems[3].label }}
        </RouterLink>

        <RouterLink
          to="/contact"
          class="ml-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-400"
        >
          Get In Touch
        </RouterLink>
      </div>

      <button
        class="inline-flex items-center rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
        type="button"
        aria-label="Toggle menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg v-if="!isMenuOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6l-12 12" />
        </svg>
      </button>
    </nav>

    <transition name="menu-fade">
      <div v-if="isMenuOpen" class="bg-white px-6 py-4 md:hidden">
        <div class="flex flex-col gap-2">
          <RouterLink
            v-for="item in navItems.slice(0, 2)"
            :key="item.label"
            :to="item.to"
            class="rounded-lg px-4 py-2 text-left text-sm font-semibold transition"
            :class="
              route.path === item.to
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            "
            @click="closeMenu"
          >
            {{ item.label }}
          </RouterLink>

          <RouterLink
            to="/ddftz-operations"
            class="rounded-lg px-4 py-2 text-left text-sm font-semibold transition"
            :class="
              route.path === '/ddftz-operations'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            "
            @click="closeMenu"
          >
            DDFTZ
          </RouterLink>

          <button
            type="button"
            class="rounded-lg px-4 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            @click="isMobileProductsOpen = !isMobileProductsOpen"
          >
            Our Products +
          </button>

          <div v-if="isMobileProductsOpen" class="space-y-1 pl-4">
            <component
              v-for="item in productItems"
              :key="item.label"
              :is="item.to ? 'RouterLink' : 'button'"
              :to="item.to"
              :type="item.to ? undefined : 'button'"
              class="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              @click="item.to ? closeMenu() : null"
            >
              {{ item.label }}
            </component>
          </div>

          <RouterLink
            to="/catalog"
            class="rounded-lg px-4 py-2 text-left text-sm font-semibold transition"
            :class="
              route.path === '/catalog'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            "
            @click="closeMenu"
          >
            Catalog
          </RouterLink>

          <RouterLink
            to="/csr"
            class="rounded-lg px-4 py-2 text-left text-sm font-semibold transition"
            :class="
              route.path === '/csr'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            "
            @click="closeMenu"
          >
            CSR
          </RouterLink>

          <RouterLink
            :to="navItems[2].to"
            class="rounded-lg px-4 py-2 text-left text-sm font-semibold transition"
            :class="
              route.path === navItems[2].to
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            "
            @click="closeMenu"
          >
            {{ navItems[2].label }}
          </RouterLink>

          <RouterLink
            :to="navItems[3].to"
            class="rounded-lg px-4 py-2 text-left text-sm font-semibold transition"
            :class="
              route.path === navItems[3].to
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            "
            @click="closeMenu"
          >
            {{ navItems[3].label }}
          </RouterLink>

          <RouterLink
            to="/contact"
            class="mt-1 rounded-full bg-amber-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
            @click="closeMenu"
          >
            Get In Touch
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.2s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>