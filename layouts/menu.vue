<template>
    <div class="min-h-screen flex bg-radial-[at_25%_20%] from-white to-zinc-900 to-100%">
      <!-- Sidebar -->
      <div class="w-64 bg-white shadow-lg">
        <div class="p-6">
          <h1 class="text-2xl font-bold text-gray-800">Hey, Vishnu</h1>
        </div>
        <nav class="mt-6">
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/dashboard" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <HomeIcon class="h-5 w-5 mr-3" />
                <span>Home</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/checkin" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <QuestionMarkCircleIcon class="h-5 w-5 mr-3" />
                <span>Checkin</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/edit" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <UserCircleIcon class="h-5 w-5 mr-3" />
                <span>Personalize your profile</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kudos" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <BookOpenIcon class="h-5 w-5 mr-3" />
                <span>Kudos</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
  
      <!-- Main Content -->
      <main class="flex-1">
        <slot /> <!-- This will render the page content -->
      </main>
    </div>
  </template>
  
  <script setup>
  import {
    HomeIcon,
    UserCircleIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
  } from '@heroicons/vue/24/outline';
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>