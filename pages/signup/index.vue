<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <Loader :isLoading="loading" />
    <div class="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create Your Account
      </h1>

      <!-- Sign Up Form -->
      <form @submit.prevent="signup" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Email Address</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>

      <!-- Google Signup Button -->
      <div class="mt-4 text-center">
        <button
          @click="signUpWithGoogle"
          class="w-full py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center"
        >
          <img src="public/google.webp" alt="Google Logo" class="h-6 mr-3" />
          <span class="text-sm font-semibold text-gray-700"
            >Sign Up with Google</span
          >
        </button>
      </div>

      <div class="mt-6 text-center text-gray-600">
        Already have an account?
        <NuxtLink to="/signin" class="text-blue-600 hover:underline"
          >Sign In</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "@/components/Loader.vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false); // Add loading state
const router = useRouter();

const { $apiCall } = useNuxtApp();

const signup = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    loading.value = true;

    const response = await $apiCall(
      `/auth/register`,
      "POST",
      {
        emailId: email.value,
        password: password.value,
      },
      "include"
    );

    console.log({ response });

    if (response.status == "success") {
      router.push({
        path: "/signup/verify-otp",
        query: { email: email.value },
      });
    } else {
      alert("Sign up failed");
    }
  } catch (error) {
    console.error("Sign up failed:", error);
    alert("An error occurred while signing up.");
  } finally {
    loading.value = false;
  }
};

const signUpWithGoogle = async () => {
  try {
    await signIn("google");
    router.push("/dashboard");
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};
</script>

<style scoped>
/* Add some global styles for your loader */
</style>
