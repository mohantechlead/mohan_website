<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-950 text-slate-300">
    <div class="container-section py-12">
      <div class="grid gap-8 md:grid-cols-3">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">Mohan Group</p>
          <p class="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Trusted name in polymer and footwear industries in Ethiopia with decades of manufacturing and trading expertise.
          </p>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Quick Links</p>
          <div class="mt-4 flex flex-col gap-2 text-sm">
            <RouterLink to="/" class="transition hover:text-amber-300">Home</RouterLink>
            <RouterLink to="/about" class="transition hover:text-amber-300">About Us</RouterLink>
            <RouterLink to="/news" class="transition hover:text-amber-300">News</RouterLink>
            <RouterLink to="/csr" class="transition hover:text-amber-300">CSR</RouterLink>
            <RouterLink to="/contact" class="transition hover:text-amber-300">Contact</RouterLink>
          </div>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Head Office</p>
          <p class="mt-4 text-sm leading-7 text-slate-400">
            Around Bole Japan Embassy, Addis Ababa, Ethiopia
          </p>
          <div class="mt-4 flex gap-2">
            <span class="muted-pill !bg-slate-800 !text-slate-200">Facebook</span>
            <span class="muted-pill !bg-slate-800 !text-slate-200">LinkedIn</span>
            <span class="muted-pill !bg-slate-800 !text-slate-200">Instagram</span>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
        Copyright © Mohan All Right Reserved.
      </div>
    </div>
  </footer>
</template>
