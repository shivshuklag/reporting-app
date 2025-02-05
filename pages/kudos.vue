<template>
  <div class="p-6 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div class="flex items-center space-x-4 w-full max-w-4xl">
      <div>
        <h2 class="text-3xl font-bold">{{ user.first_name }} {{ user.last_name }}</h2>
        <p class="text-gray-400 text-lg flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 10.882l7.997-4.998a1 1 0 10-1-1.732l-7.003 4.383L3 4.152a1 1 0 10-1 1.732z"></path>
          </svg>
          {{ user.email_id }}
        </p>
      </div>

      <div class="ml-auto flex items-center space-x-2">
        <span class="bg-indigo-600 px-4 py-2 rounded-lg text-lg font-semibold">{{ user.team?.name }}</span>
        <button class="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition">
          <svg class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM3 10h14"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-4xl mt-8 flex flex-col items-center">
      <h3 class="text-2xl font-semibold mb-6">Kudos & Achievements</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div class="bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow-lg">
          <img src="../assets/images/vpr.png" class="w-20 h-20 rounded-full object-cover mb-4">
          <h4 class="text-xl font-bold">Top Performer</h4>
          <p class="text-gray-400 text-center">Consistently exceeding expectations</p>
        </div>
        
        <div class="bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow-lg">
          <img src="../assets/images/vpr.png" class="w-20 h-20 rounded-full object-cover mb-4">
          <h4 class="text-xl font-bold">Team Excellence</h4>
          <p class="text-gray-400 text-center">Outstanding contribution to team success</p>
        </div>

        <div class="bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow-lg">
          <img src="../assets/images/vpr.png" class="w-20 h-20 rounded-full object-cover mb-4">
          <h4 class="text-xl font-bold">Innovation Champion</h4>
          <p class="text-gray-400 text-center">Driving creative solutions</p>
        </div>
      </div>

      <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-3 mt-6 transition-all shadow-md text-lg">
        + Give Kudos
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

definePageMeta({ layout: "menu" });

const { $apiCall } = useNuxtApp();

const user = ref({});

const fetchUserData = async () => {
  try {
    const response = await $apiCall("/user/get", "GET");
    if (response) user.value = response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

onMounted(fetchUserData);
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.4);
}
</style>
