<template>
    <div class="p-6 flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div class="w-full max-w-4xl p-6 bg-gray-800 rounded-2xl shadow-lg text-white">
        <h1 class="text-2xl font-bold mb-6 text-center">Update Check-in</h1>
  
        <!-- Update Form -->
        <form @submit.prevent="handleUpdate" class="space-y-6">
          <div>
            <label for="prevDayWork" class="block text-sm font-medium text-gray-400">Yesterday's Work</label>
            <textarea
              id="prevDayWork"
              v-model="form.prev_day_work"
              rows="3"
              class="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="What did you work on yesterday?"
            ></textarea>
          </div>
  
          <div>
            <label for="currentDayWork" class="block text-sm font-medium text-gray-400">Today's Plan</label>
            <textarea
              id="currentDayWork"
              v-model="form.current_day_work"
              rows="3"
              class="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="What is your plan for today?"
            ></textarea>
          </div>
  
          <div>
            <label for="blocker" class="block text-sm font-medium text-gray-400">Blockers</label>
            <input
              type="text"
              id="blocker"
              v-model="form.blocker"
              class="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Any blockers?"
            />
          </div>
  
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="cancelUpdate"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Check-ins Report
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
            >
              Update Check-in
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  const { $apiCall } = useNuxtApp();
  
  definePageMeta({ layout: "menu" });
  
  const router = useRouter();
  const checkinId = router.currentRoute.value.params.id;
  
  const form = ref({
    prev_day_work: "",
    current_day_work: "",
    blocker: ""
  });
  
  const fetchCheckinDetails = async () => {
  try {
    const response = await $apiCall(`/checkins/fetch`, "GET");
    if (response && response.status === "success") {
      console.log("checkinId:", checkinId);
      console.log("checkins:", response.checkins);

      const latestCheckin = response.checkins.find(checkin => checkin.id === String(checkinId));
      if (latestCheckin) {
        form.value = {
          prev_day_work: latestCheckin.prev_day_work,
          current_day_work: latestCheckin.current_day_work,
          blocker: latestCheckin.blocker
        };
      } else {
        throw new Error("Check-in not found");
      }
    } else {
      throw new Error("Failed to fetch check-in details");
    }
  } catch (err) {
    console.error("Error fetching check-in details:", err);
    alert("Failed to fetch check-in details. Please try again.");
  }
};
  const handleUpdate = async () => {
    try {
      const response = await $apiCall("/checkins/update", "PUT", {
        id: checkinId,
        ...form.value
      });
      if (response && response.status === "success") {
        alert("Check-in updated successfully!");
        router.push("/checkin");
      } else {
        throw new Error("Failed to update check-in");
      }
    } catch (err) {
      console.error("Error updating check-in:", err);
      alert("Failed to update check-in. Please try again.");
    }
  };
  
  const cancelUpdate = () => {
    router.push("/checkin");
  };
  
  onMounted(() => {
    fetchCheckinDetails();
  });
  </script>
  
  <style scoped>
  .bg-gray-900 {
    background-color: #1a1a2e;
  }
  </style>