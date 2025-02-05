<template>
    <div class="p-6 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      
      <!-- Profile Header -->
      <div class="flex items-center space-x-4">
        <!-- Avatar -->
        <div class="relative w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center shadow-lg">
          <span class="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-lg font-semibold text-gray-300">
            {{ userInitials }}
          </span>
          <span class="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900"></span>
        </div>
  
        <!-- User Details -->
        <div>
          <h2 class="text-2xl font-bold">{{ user.first_name }} {{ user.last_name }}</h2>
          <p class="text-gray-400 text-sm flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 10.882l7.997-4.998a1 1 0 10-1-1.732l-7.003 4.383L3 4.152a1 1 0 10-1 1.732z"></path>
            </svg>
            {{ user.email_id }}
          </p>
        </div>
  
        <!-- Team Badge & Settings -->
        <div class="ml-auto flex items-center space-x-2">
          <span class="bg-indigo-600 px-3 py-1 rounded-lg text-sm font-semibold">{{ user.team?.name }}</span>
          <button class="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
            <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM3 10h14"></path>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Profile Card -->
      <div class="bg-gray-800 shadow-lg rounded-2xl p-6 max-w-lg w-full mt-6">
        <h3 class="text-lg font-semibold mb-4">Profile Settings</h3>
  
        <div class="flex justify-between items-center">
          <div>
            <h4 class="text-xl font-bold">{{ user.first_name }} {{ user.last_name }}</h4>
            <p class="text-gray-400">{{ user.email_id }}</p>
            <p class="text-gray-500">{{ user.team?.name }}</p>
          </div>
          <div class="flex items-center space-x-1 text-green-400 text-sm">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12l4-4m0 4l-4-4"></path>
            </svg>
            <span>Security Verified</span>
          </div>
        </div>
  
        <button @click="toggleEdit" class="w-full bg-sky-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-4 py-2 mt-4 transition-all shadow-md">
          Edit Profile
        </button>
      </div>
  
      <!-- Edit Mode -->
      <div v-if="isEditing" class="bg-gray-900 shadow-lg rounded-2xl p-6 max-w-lg w-full mt-4">
        <h3 class="text-lg font-semibold mb-4">Edit Profile</h3>
  
        <label class="block text-sm text-gray-400">First Name</label>
        <input v-model="editUser.first_name" type="text" class="w-full bg-gray-700 text-white px-3 py-2 rounded-lg mt-1 mb-3 focus:ring-2 focus:ring-indigo-500">
  
        <label class="block text-sm text-gray-400">Last Name</label>
        <input v-model="editUser.last_name" type="text" class="w-full bg-gray-700 text-white px-3 py-2 rounded-lg mt-1 mb-3 focus:ring-2 focus:ring-indigo-500">
  
        <div class="flex justify-between mt-4">
          <button @click="toggleEdit" class="w-1/2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all">
            Cancel
          </button>
          <button @click="saveProfile" class="w-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all ml-2">
            Save
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  definePageMeta({ layout: "menu" });
  
  const router = useRouter();
  const { $apiCall } = useNuxtApp();
  
  const user = ref({});
  const editUser = ref({ first_name: "", last_name: "" });
  const isEditing = ref(false);
  
  const userInitials = computed(() => {
    return user.value.first_name?.charAt(0).toUpperCase() + user.value.last_name?.charAt(0).toUpperCase() || "U";
  });
  
  const fetchUserData = async () => {
    try {
      const response = await $apiCall("/user/get", "GET");
      if (response) user.value = response;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  
  const toggleEdit = () => {
    isEditing.value = !isEditing.value;
    editUser.value = { ...user.value };
  };
  
  const saveProfile = async () => {
    try {
      const response = await $apiCall("/user/update", "POST", editUser.value);
      if (response.status === "success") {
        user.value = { ...editUser.value };
        alert("Profile updated successfully!");
        isEditing.value = false;
      } else {
        alert(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  onMounted(fetchUserData);
  </script>
  
  <style scoped>
  .shadow-lg {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
  </style>
  