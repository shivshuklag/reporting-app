<template>
  <div class="profile-container min-h-screen bg-gray-50 p-8">
    <h1 class="text-3xl font-semibold text-gray-800 mb-6">My Profile</h1>

    <div class="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
      <h2 class="text-xl font-semibold mb-4">Profile Information</h2>

      <div v-if="!isEditing" class="space-y-4">
        <p><strong>First Name:</strong> {{ userProfile.first_name }}</p>
        <p><strong>Last Name:</strong> {{ userProfile.last_name }}</p>
        <p><strong>Email:</strong> {{ userProfile.email_id }}</p>
        <p><strong>Team:</strong> {{ userProfile.team_id }}</p>
        <button
          @click="isEditing = true"
          class="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 w-full"
        >
          Edit Profile
        </button>
      </div>

      <div v-else class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >First Name</label
          >
          <input
            v-model="userProfile.first_name"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Last Name</label
          >
          <input
            v-model="userProfile.last_name"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="userProfile.email_id"
            type="email"
            disabled
            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Team</label>
          <input
            v-model="userProfile.team_id"
            type="text"
            disabled
            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <button
          @click="updateProfile"
          class="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200 w-full"
        >
          Save Changes
        </button>
        <button
          @click="isEditing = false"
          class="mt-2 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { $apiCall } = useNuxtApp();
const userProfile = ref({
  first_name: "",
  last_name: "",
  email_id: "",
  team_id: "",
});
const isEditing = ref(false);

// Fetch User Profile
const fetchUserProfile = async () => {
  try {
    const response = await $apiCall("/user/get", "GET");
    if (response) {
      userProfile.value = response;
    }

    console.log({ userProfile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

// Update User Profile
const updateProfile = async () => {
  try {
    const response = await $apiCall("/user/update", "POST");
    if (response.success) {
      alert("Profile updated successfully");
      isEditing.value = false;
    } else {
      alert("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("An error occurred. Please try again.");
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
