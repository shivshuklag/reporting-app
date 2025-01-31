<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <Loader :isLoading="loading" />

    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Complete Your Profile
      </h1>

      <form @submit.prevent="updateProfile" class="space-y-6">
        <!-- First Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >First Name</label
          >
          <input
            v-model="firstName"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Last Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Last Name</label
          >
          <input
            v-model="lastName"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Team Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Select a Team</label
          >
          <select
            v-model="selectedTeam"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a team</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loader from "@/components/Loader.vue";

// Router instance
const router = useRouter();

// Form Data
const firstName = ref("");
const lastName = ref("");
const selectedTeam = ref("");

// Teams & Loading state
const teams = ref([]);
const loading = ref(false);

const { $apiCall } = useNuxtApp(); // Using the apiCall method from the composable

// Fetch Teams from API using the base URL from runtime config
const fetchTeams = async () => {
  loading.value = true;
  try {
    const response = await $apiCall("/team", "GET"); // Fetch teams from API
    teams.value = response || [];
  } catch (error) {
    console.error("Failed to fetch teams:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch teams when the component is mounted
onMounted(fetchTeams);

// Handle Profile update submission
const updateProfile = async () => {
  if (!firstName.value || !lastName.value || !selectedTeam.value) {
    alert("Please fill in all fields.");
    return;
  }

  loading.value = true; // Set loading state to true while updating profile

  const userDetails = {
    first_name: firstName.value,
    last_name: lastName.value,
    team_id: selectedTeam.value,
    onboarding_state: "completed",
  };

  console.log({ userDetails });

  try {
    // Use the apiCall composable to make the PUT request to update the user profile
    const response = await $apiCall("/user/update", "POST", userDetails);

    if (response.status == "success") {
      // Redirect to the dashboard after successful profile update
      router.push("/dashboard");
    } else {
      alert(response.message || "Failed to update profile.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert(error.message || "An error occurred. Please try again later.");
  } finally {
    loading.value = false; // Set loading to false after the request is done
  }
};
</script>
