<script setup>

</script>

<template>
    <div class="pb-20">
        <h1 class="text-center text-4xl font-medium">Contact Us</h1>

   

    <section class="flex flex-wrap md:flex-nowrap justify-between items-center p-10">
    <!-- Left Section -->
    <div class="md:w-1/2 max-w-xl p-6 m-20">
        <div class="relative">
        <input type="text" id="floatingInput" placeholder="Name" 
        class="block w-full px-4 py-2 text-lg text-gray-900 bg-transparent 
        border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 peer mb-8" />
        
        <label for="floatingInput" 
        class="absolute text-gray-500 text-lg transform -translate-y-6 scale-75 top-3 left-3 z-10 origin-[0] bg-white px-1 opacity-0 transition-all duration-300 peer-focus:opacity-100 peer-focus:scale-75 peer-focus:-translate-y-6">
        Name </label>

        <input type="text" id="floatingInput" placeholder="Email" 
        class="block w-full px-4 py-2 text-lg text-gray-900 bg-transparent border
         border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 peer mb-8" />
        
        <label for="floatingInput" 
        class="absolute text-gray-500 text-lg transform -translate-y-6 scale-75 top-3 left-3 z-10 origin-[0] bg-white px-1 opacity-0 transition-all duration-300 peer-focus:opacity-100 peer-focus:scale-75 peer-focus:-translate-y-6">
        Email
        </label>

        <input type="text" id="floatingInput" placeholder="Subject" 
        class="block w-full px-4 py-2 text-lg text-gray-900 bg-transparent border border-gray-300 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 peer" />
        
        <label for="floatingInput" 
        class="absolute text-gray-500 text-lg transform -translate-y-6 scale-75 top-3 left-3 z-10 origin-[0]
         bg-white px-1 opacity-0 transition-all duration-300 peer-focus:opacity-100 peer-focus:scale-75 peer-focus:-translate-y-6 mb-4">
        Subject
        </label>

        <textarea type="text" id="floatingInput" placeholder="Message" 
        class="block w-full px-4 py-2 text-lg
         text-gray-900 bg-transparent border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 peer h-32 mb-4" />
        
        <label for="floatingInput" 
        class="absolute text-gray-500 text-lg transform -translate-y-6 scale-75 top-3 left-3 z-10 
        origin-[0] bg-white px-1 opacity-0 transition-all duration-300 peer-focus:opacity-100 peer-focus:scale-75 peer-focus:-translate-y-6">
        Message
        </label>

        <button class="bg-yellow-500 text-white mt-10 py-3 px-10 rounded-tl-[2rem] rounded-br-[2rem] shadow-lg hover:bg-yellow-600 text-sm">
         Submit
        </button>

        </div>

        
    </div>

    <!-- Right Section -->
    <div class="md:w-1/2 p-6  mt-6 md:mt-0">
            <section class="flex flex-col items-center space-y-4">
            <!-- Embedded Google Map -->
            <div class="w-full h-[30rem] overflow-hidden rounded-lg shadow-lg">
        
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.842678994352!2d38.778480975950714!3d8.986620291073027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b84f833c5f24f%3A0xf4bc60b8a246e454!2zTW9oYW4gUGxjIHwgQm9sZSBNaWNoYWVsIHwg4Yie4YiD4YqVIOGNkuGKpOGIjeGIsiB8IOGJpuGIjCDhiJrhiqvhiqThiI0!5e0!3m2!1sen!2set!4v1727492554868!5m2!1sen!2set" 
            width="1000" 
            height="500" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" r
            eferrerpolicy="no-referrer-when-downgrade">
            </iframe>
            </div>
            
        </section>
    </div>
  </section>

    </div>

   


</template>