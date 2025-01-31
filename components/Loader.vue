<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50"
  >
    <div class="flex flex-col items-center space-y-4">
      <!-- Spinner -->
      <div
        class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>

      <!-- Optional Message -->
      <p v-if="message" class="text-gray-700 text-lg">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isLoading: Boolean, // Controls visibility
  message: "Loading...", // Optional loading message
});
</script>

<style scoped>
/* Ensures the loader is full-screen */
</style>
