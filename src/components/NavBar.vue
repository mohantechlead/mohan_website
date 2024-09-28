<script setup>
    import { RouterLink } from 'vue-router';
    import logo from '@/assets/img/logo.png'
</script>

<template>
    <nav class="">
      <div class="mx-auto px-2 sm:px-6 lg:px-8 pt-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <!-- Logo -->
            <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
              <img class="h-20 w-auto pl-20" :src="logo" alt="Mohan Logo" />
            </RouterLink>
            <div class="md:ml-auto pt-2 text-xl font-medium pr-44">
              <div class="flex space-x-2">
                <RouterLink
                  to="/"
                  class=" hover:bg-yellow-500 text-grey rounded-md px-3 py-2"
                  >
                  Home
                </RouterLink>

                <RouterLink
                  to="/about-us"
                  class="text-grey hover:bg-yellow-500 hover:text-white rounded-md px-3 py-2"
                  >About Us
                  </RouterLink>

                  <RouterLink
                  to="/about-us"
                  class="text-grey hover:bg-yellow-500 hover:text-white rounded-md px-3 py-2"
                  >News
                  </RouterLink>

                  <RouterLink
                  to="/about-us"
                  class="text-grey hover:bg-yellow-500 hover:text-white rounded-md px-3 py-2"
                  >Services
                  </RouterLink>

                <RouterLink
                  to="/contact"
                  class="text-grey hover:bg-yellow-500 hover:text-white rounded-md px-3 py-2"
                  >Contact
                  </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

</template>