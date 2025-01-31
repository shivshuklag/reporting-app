<template>
    <div class="p-6 flex flex-col items-center justify-center min-h-screen bg-radial-[at_25%_50%] from-white to-zinc-900 to-100%">
      <div class="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center mb-6">
        <span class="text-indigo-500 text-4xl font-extrabold">V</span>
      </div>
  
      <div class="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Profile</h2>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-600">Email</label>
          <p class="mt-1 text-lg text-gray-900 font-semibold">vishnu@v-learning.in</p>
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-600">First Name</label>
          <p class="mt-1 text-lg text-gray-900 font-semibold">Vishnu</p>
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-600">Last Name</label>
          <p class="mt-1 text-lg text-gray-900 font-semibold">Puneeth</p>
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-600">Team</label>
          <p class="mt-1 text-lg text-gray-900 font-semibold">Software</p>
        </div>
  
        <button
          @click="editProfile"
          class="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg px-4 py-2 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md"
        >
          Daily Checkin
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
import { useRouter } from "vue-router";

const router = useRouter();

  definePageMeta({
    layout: "menu",
  });
  const editProfile = () => {
    console.log("Edit Profile clicked");
    router.push("/checkin")
  };
  </script>
  
  <style scoped>
  .shadow-lg {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
  </style>
  