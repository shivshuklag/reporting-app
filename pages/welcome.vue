<template>
    <div>
      <h2 class="text-xl font-bold text-gray-800">Have a great day! These are your activities for today</h2>
      <div class="mt-4">
        <div class="flex items-center justify-between">
          <span class="text-gray-600">Daily Check-In</span>
          <span class="text-gray-400">0% done</span>
        </div>
        <div class="mt-2 bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-500 h-2.5 rounded-full" style="width: 0%;"></div>
        </div>
      </div>
  
      <!-- Recent Updates Section -->
      <div class="mt-8">
        <h2 class="text-xl font-bold text-gray-800">Recent Updates</h2>
        <div class="mt-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <CheckCircleIcon class="h-5 w-5 text-green-500" />
              <span class="text-gray-600">You have 1 active check-in</span>
            </div>
            <span class="text-gray-400">Last response on January 28, 2022 at 16:26</span>
          </div>
        </div>
      </div>
  
      <!-- Quick Actions Section -->
      <div class="mt-8">
        <h2 class="text-xl font-bold text-gray-800">Quick actions</h2>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-lg p-4">
            <HandThumbUpIcon class="h-5 w-5" />
            <span>Give kudos</span>
          </button>
          <button class="flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-lg p-4">
            <UserPlusIcon class="h-5 w-5" />
            <span>Invite your team</span>
          </button>
          <button class="flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-lg p-4">
            <CogIcon class="h-5 w-5" />
            <span>Set org settings</span>
          </button>
          <button class="flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-lg p-4">
            <UserCircleIcon class="h-5 w-5" />
            <span>Set your personal preferences</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {
    CheckCircleIcon,
    HandThumbUpIcon,
    UserPlusIcon,
    CogIcon,
    UserCircleIcon,
  } from '@heroicons/vue/24/solid';

  definePageMeta({
    layout: "menu"
  });
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>