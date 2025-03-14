<template>
  <div class="container mx-auto p-6 bg-gray-900 bg-gradient-to-b from-gray-900 to-black text-white">
    <Loader :isLoading="loading" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Check-ins Dashboard</h1>
      <div class="flex items-center space-x-2">
        <span class="text-black-700">Welcome, Engineers</span>
        <span class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 18a8 8 0 1116 0H2z" clip-rule="evenodd"></path>
          </svg>
        </span>
      </div>
    </div>

    <!-- Create Check-in Form or Thank You Card -->
    <div v-if="showForm" class="bg-gray shadow-lg rounded-2xl p-8 max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold mb-4">Create a New Check-in</h2>
      
      <div class="space-y-4">
        <textarea v-model="checkinForm.prev_day_work" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" rows="3" placeholder="What did you complete yesterday?"></textarea>
        <textarea v-model="checkinForm.current_day_work" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" rows="3" placeholder="What are you planning to do today?"></textarea>
        <textarea v-model="checkinForm.blocker" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Do you have any blockers?"></textarea>
      </div>

      <button @click="submitCheckin" class="mt-6 w-full bg-sky-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-sky-700">
        Submit Check-in
      </button>
    </div>
    <div v-else class="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-2xl mx-auto text-center">
      <div class="mb-4">
        <svg class="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold mb-4 text-gray-100">Thank You!</h2>
      <p class="text-gray-300 mb-6">Your check-in has been recorded successfully.</p>
    </div>

    <div class="text-center mt-6">
      <NuxtLink to="/checkin" class="text-black-800 hover:underline flex items-center justify-center">
        <svg class="w-5 h-5 mr-2 text-blue-600" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M17.414 2.586a2 2 0 00-2.828 0L3 14.172V17h2.828l11.586-11.586a2 2 0 000-2.828zM5 15H4v-1l10.586-10.586 1 1L5 15z" clip-rule="evenodd"></path>
        </svg>
        Update Check-in
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { $apiCall } = useNuxtApp();

definePageMeta({ layout: "menu" });

const checkinForm = ref({ prev_day_work: "", current_day_work: "", blocker: "" });
const showThankYouModal = ref(false);
const loading = ref(false);
const showForm = ref(true);

// Submit a new check-in
const submitCheckin = async () => {
  if (!checkinForm.value.prev_day_work || !checkinForm.value.current_day_work) {
    alert("Please fill in all required fields.");
    return;
  }
  loading.value = true;
  try {
    const response = await $apiCall("/checkins/create", "POST", checkinForm.value);
    if (response.status === "success") {
      checkinForm.value = { prev_day_work: "", current_day_work: "", blocker: "" };
      showThankYouModal.value = true;

      // After successful check-in, call the status API to check if the form should be hidden
      const statusResponse = await $apiCall("/checkins/status", "GET");
      if (statusResponse.status === "success") {
        showForm.value = false; // Hide the form if the status is "success"
      }
    }
  } catch (error) {
    console.error("Error submitting check-in:", error);
  } finally {
    loading.value = false;
  }
};

// Close the Thank You Modal
const closeThankYouModal = () => {
  showThankYouModal.value = false;
};

// Check the status of the check-in on component mount
const checkCheckinStatus = async () => {
  try {
    const statusResponse = await $apiCall("/checkins/status", "GET");
    if (statusResponse.status === "success") {
      showForm.value = false; // Hide the form if the status is "success"
    }
  } catch (error) {
    console.error("Error fetching check-in status:", error);
  }
};

// Check the check-in status on component mount
onMounted(() => {
  checkCheckinStatus();
  if (localStorage.getItem("thankYouModalShown")) {
    showThankYouModal.value = true;
  }
});
</script>

<style scoped>
textarea {
  resize: none;
}
.bg-gray-900 {
  background-color: #1a1a2e;
}
</style>
