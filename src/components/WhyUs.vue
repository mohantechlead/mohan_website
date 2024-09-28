<script setup>

import building from '@/assets/img/mohan.jpg'

</script>

<template>

  <div class="pb-20">

  <div class="max-w-[96rem] mx-auto bg-gray-200 rounded-[2rem] p-8 shadow-md mt-16 mb-24">
    <div class="flex justify-between">
      <h2 class="text-2xl font-semibold text-yellow-500">MOHAN INTERNATIONAL</h2>
      <h2 class="text-2xl font-semibold text-yellow-500">MOHAN PLC</h2>
      <h2 class="text-2xl font-semibold text-yellow-500">VINA TRADE AND INDUSTRY PLC</h2>
      <h2 class="text-2xl font-semibold text-yellow-500">MOHAN WIRE INDUSTRIES</h2>
    </div>
  </div>




  <section class="flex justify-between bg-white pl-28 pr-36">
  <!-- Left Div -->
  <div class="flex-1 flex items-center justify-center p-4 pr-16 ">
    <div class="text-left">

      <p class="text-lg text-gray-500">
        Mayur Suryakant Kothari, the founder of the Mohan Group of Companies started his business with a small trading firm, which he named Mohan
        International in fond memory of his late father, Mr. Suryakant Chhotalal Kothari,
        who was popularly known by his nickname, “Mohan”. Today, the small trading firm has transformed into a group of companies, popularly known
        as 'The Mohan Group of Companies'.
      </p>

      <button class="bg-yellow-500 text-white mt-10 py-3 px-10 rounded-tl-[2rem] rounded-br-[2rem] shadow-lg hover:bg-yellow-600 text-sm">
        Read More
      </button>
      
    </div>
  </div>

  </section>



    <section class="flex flex-wrap md:flex-nowrap items-center justify-between bg-white pl-36 pr-32 pt-24">
      <!-- Right Section (Image) -->
      <div class="md:w-[36rem] w-72 h-[42rem] rounded-tr-[15rem] overflow-hidden flex items-center justify-center">
        <img :src="building" alt="Image" class="w-full h-full object-cover">
      </div>
  
      <!-- Left Section -->
      <div class="md:w-1/2 text-left space-y-8 mt-8 md:mt-0">
       <h1 class="text-5xl font-medium text-center pb-20">Why Choose Us</h1>
       <li class="relative flex items-center px-4 py-2 bg-gray-100 rounded-lg">
        <div class="absolute top-0 left-0 h-full w-10 bg-yellow-500 rounded-lg rounded-bl-lg"></div>
        <span class="text-black-500 font-bold">01</span>
        <p class="ml-4">Mayur Suryakant Kothari, the founder of the Mohan Group of Companies started his business with a small trading firm.</p>
        </li>

        <li class="relative flex items-center px-4 py-2 bg-gray-100 rounded-lg">
        <div class="absolute top-0 left-0 h-full w-10 bg-yellow-500 rounded-lg rounded-bl-lg"></div>
        <span class="text-black-500 font-bold">01</span>
        <p class="ml-4">Mayur Suryakant Kothari, the founder of the Mohan Group of Companies started his business with a small trading firm.</p>
        </li>

        <li class="relative flex items-center px-4 py-2 bg-gray-100 rounded-lg">
        <div class="absolute top-0 left-0 h-full w-10 bg-yellow-500 rounded-lg rounded-bl-lg"></div>
        <span class="text-black-500 font-bold">01</span>
        <p class="ml-4">Mayur Suryakant Kothari, the founder of the Mohan Group of Companies started his business with a small trading firm.</p>
        </li>

        <li class="relative flex items-center px-4 py-2 bg-gray-100 rounded-lg">
        <div class="absolute top-0 left-0 h-full w-10 bg-yellow-500 rounded-lg rounded-bl-lg"></div>
        <span class="text-black-500 font-bold">01</span>
        <p class="ml-4">Mayur Suryakant Kothari, the founder of the Mohan Group of Companies started his business with a small trading firm.</p>
        </li>

      </div>

    </section>

  </div>
</template>
  
