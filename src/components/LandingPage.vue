<script setup>

import building from '@/assets/img/mohan.jpg'

</script>


<template>
    <section class="flex flex-wrap md:flex-nowrap items-center justify-between bg-white pl-36 pr-32 pt-24 pb-20">
      <!-- Left Section -->
      <div class="md:w-1/2 text-left space-y-20">
        <h1 class="text-6xl font-bold leading-tight text-gray-900">
            Powered by  <br /> <span class="text-yellow-500">Four Generations </span> of Goodwill.
        </h1>
        <p class="text-gray-600">
           The Mohan Group is one of the most respectable and trusted names in <br /> Polymer and Footwear business in Ethiopia. 
        </p>
        <div class="flex space-x-4">
        <button class="bg-yellow-500 text-white py-3 px-10 rounded-tl-[2rem] rounded-br-[2rem] shadow-lg hover:bg-yellow-600 text-sm">
          Explore
        </button>

    <button class="border border-yellow-500 text-yellow-500 py-3 px-10 rounded-tl-[2rem] rounded-br-[2rem] hover:bg-yellow-50 text-sm">
    Contact Us
    </button>

        </div>
       </div>
  
     <!-- Right Section (Image) -->
     <div class="md:w-[42rem] mt-8 md:mt-0 w-72 h-[42rem] rounded-bl-[15rem] overflow-hidden flex items-center justify-center">
    <img :src="building" alt="Image" class="w-full h-full object-cover">
  </div>

    </section>
  </template>
  

  
  <style scoped>
  /* Additional styles if needed */
  </style>
  