<script setup>
import { ref, onMounted } from "vue";

const checkins = ref([]);
const showForm = ref(false);
const checkinForm = ref({
  yesterday: "",
  today: "",
  blockers: "",
});

const fetchCheckins = async () => {
  // Fetch check-in data from API (mocked for now)
  checkins.value = [
    {
      date: "2025-01-29",
      yesterday: "Completed task A",
      today: "Start task B",
      blockers: "None",
    },
    {
      date: "2025-01-28",
      yesterday: "Reviewed PRs",
      today: "Code refactoring",
      blockers: "Need approval",
    },
  ];
};

const openCheckinForm = () => {
  showForm.value = true;
};

const submitCheckin = () => {
  // Submit the check-in (API integration needed)
  console.log("Submitted Check-in", checkinForm.value);
  showForm.value = false;
};

onMounted(fetchCheckins);
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Check-ins</h1>
    <ul class="bg-white shadow-md rounded-lg p-4">
      <li
        v-for="checkin in checkins"
        :key="checkin.date"
        class="border-b last:border-b-0 py-2"
      >
        <span class="font-semibold">{{ checkin.date }}</span> -
        <span class="text-gray-600">Yesterday: {{ checkin.yesterday }}</span> |
        <span class="text-gray-600">Today: {{ checkin.today }}</span> |
        <span class="text-gray-600">Blockers: {{ checkin.blockers }}</span>
      </li>
    </ul>

    <button
      @click="openCheckinForm"
      class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
    >
      Complete Check-in
    </button>

    <div v-if="showForm" class="mt-6 bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Today's Check-in</h2>
      <div class="space-y-4">
        <input
          v-model="checkinForm.yesterday"
          class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="What did you complete yesterday?"
        />
        <input
          v-model="checkinForm.today"
          class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="What are you planning to do today?"
        />
        <input
          v-model="checkinForm.blockers"
          class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Do you have any blockers?"
        />
      </div>
      <button
        @click="submitCheckin"
        class="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
      >
        Submit
      </button>
    </div>
  </div>
</template>
