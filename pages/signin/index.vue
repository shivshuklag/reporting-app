<template>
  <div
    class="signin-page flex items-center justify-center min-h-screen bg-gray-50"
  >
    <Loader :isLoading="loading" />
    <div class="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">
        Welcome Back
      </h1>

      <!-- Sign In Form -->
      <form @submit.prevent="signin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email Address</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          :disabled="loading"
        >
          <span>Sign In</span>
        </button>
      </form>

      <div class="mt-4 text-center">
        <button
          @click="signInWithGoogle"
          class="w-full py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center"
        >
          <img src="public/google.webp" alt="Google Logo" class="h-6 mr-3" />
          <span class="text-sm font-semibold text-gray-700"
            >Sign In with Google</span
          >
        </button>
      </div>

      <div class="mt-6 text-center text-gray-600">
        Don't have an account?
        <NuxtLink to="/signup" class="text-blue-600 hover:underline"
          >Sign Up</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter();
import Loader from "@/components/Loader.vue";

const { $apiCall } = useNuxtApp();

// Sign In method
const signin = async () => {
  loading.value = true; // Set loading to true when sign-in starts

  const userCredentials = {
    emailId: email.value,
    password: password.value,
  };

  try {
    // Making the API call to sign in the user
    const response = await $apiCall(
      "/auth/login",
      "POST",
      userCredentials,
      "include"
    );

    if (response.status == "success") {
      router.push("/dashboard");
    } else {
      alert(
        response.message || "Failed to sign in. Please check your credentials."
      );
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert(error.message || "An error occurred. Please try again later.");
  } finally {
    loading.value = false; // Set loading to false when sign-in is complete
  }
};

// Sign In with Google
const signInWithGoogle = async () => {
  try {
    await signIn("google"); // Triggers Google OAuth login flow
    router.push("/dashboard"); // Redirect to dashboard after successful Google login
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert("Google Sign-In failed. Please try again.");
  }
};
</script>
