<template>
  <div class="p-6 flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
    <div class="w-full max-w-4xl p-6 bg-gray-800 rounded-2xl shadow-lg text-white">
      <div class="flex justify-between mb-4">
        <input type="date" v-model="startDate" class="px-4 py-2 bg-gray-700 text-white rounded-lg" />
        <input type="date" v-model="endDate" class="px-4 py-2 bg-gray-700 text-white rounded-lg" />
        <button @click="filterCheckins" class="px-4 py-2 bg-sky-500/40 text-white rounded-lg hover:bg-sky-500/20">Apply Filter</button>
        <button @click="clearFilter" class="px-4 py-2 bg-sky-500/40 text-white rounded-lg hover:bg-sky-500/20">Clear Filter</button>
        <button @click="downloadCSV" class="px-4 py-2 bg-sky-500/40 text-white rounded-lg hover:bg-sky-500/20">Download CSV</button>
      </div>

      <div v-if="loading" class="text-center">Loading check-ins...</div>
      <div v-if="error" class="text-center text-red-400">{{ error }}</div>

      <div v-if="!loading && !error">
        <div v-for="checkin in paginatedCheckins" :key="checkin.id" class="p-4 bg-gray-700 rounded-lg mb-4">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold">{{ formatDate(checkin.created_at) }}</h3>
              <p class="text-gray-400">Yesterday's Work: {{ checkin.prev_day_work }}</p>
              <p class="text-gray-400">Today's Plan: {{ checkin.current_day_work }}</p>
            </div>
            <span class="px-3 py-1 text-sm font-semibold bg-sky-600 rounded-lg">{{ checkin.blocker }}</span>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center mt-4">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const { $apiCall } = useNuxtApp();

definePageMeta({ layout: "menu" });

const checkins = ref([]);
const filteredCheckins = ref([]);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = 5;
const startDate = ref("");
const endDate = ref("");

const fetchCheckins = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await $apiCall("/checkins/fetch", "GET");
    if (response && response.status === "success") {
      checkins.value = response.checkins;
      filteredCheckins.value = checkins.value; // Default: No filters applied
    } else {
      throw new Error("Failed to fetch check-ins");
    }
  } catch (err) {
    error.value = err.message || "Failed to fetch check-ins.";
  } finally {
    loading.value = false;
  }
};

const filterCheckins = () => {
  if (!startDate.value || !endDate.value) {
    filteredCheckins.value = checkins.value;
  } else {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    end.setHours(23, 59, 59, 999); // Ensure the end date includes the full day

    filteredCheckins.value = checkins.value.filter(checkin => {
      const checkinDate = new Date(checkin.created_at);
      return checkinDate >= start && checkinDate <= end;
    });
  }
  currentPage.value = 1; // Reset to first page after filtering
};
const clearFilter = () => {
  startDate.value = "";
  endDate.value = "";
  filteredCheckins.value = [...checkins.value];
  currentPage.value = 1;
};

const paginatedCheckins = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCheckins.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredCheckins.value.length / itemsPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const downloadCSV = () => {
  if (!filteredCheckins.value.length) {
    alert("No check-ins available to download.");
    return;
  }

  const headers = ["Date", "Yesterday's Work", "Today's Plan", "Blockers"];
  const rows = filteredCheckins.value.map(checkin => [
    formatDate(checkin.created_at),
    checkin.prev_day_work,
    checkin.current_day_work,
    checkin.blocker
  ]);

  const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = `checkins_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

onMounted(() => {
  fetchCheckins();
});
</script>

<style scoped>
.bg-gray-900 {
  background-color: #1a1a2e;
}
</style>
