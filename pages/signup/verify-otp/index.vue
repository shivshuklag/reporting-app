<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <Loader :isLoading="loading" />
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Enter OTP
      </h1>

      <p class="text-center text-gray-600 mb-4">
        Enter the OTP sent to <strong>{{ email }}</strong>
      </p>

      <form @submit.prevent="verifyOtp" class="space-y-6">
        <div>
          <input
            v-model="otp"
            type="text"
            placeholder="Enter OTP"
            required
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500"
            maxlength="6"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Verify OTP
        </button>
      </form>

      <div v-if="otpResent">
        <p class="text-center text-green-500 mt-4">
          OTP sent again successfully!
        </p>
      </div>

      <div v-if="otpError">
        <p class="text-center text-red-500 mt-4">{{ otpError }}</p>
      </div>

      <button
        @click="resendOtp"
        class="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200 mt-4"
      >
        Resend OTP
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Loader from "@/components/Loader.vue";

const otp = ref("");
const router = useRouter();
const route = useRoute();
const email = ref("");

// Loading state for OTP verification
const loading = ref(false);
const otpResent = ref(false); // To track if OTP is resent
const otpError = ref(null); // To track any errors during OTP resend

const { $apiCall } = useNuxtApp();

onMounted(() => {
  email.value = route.query.email || "your email";
});

// OTP verification method
const verifyOtp = async () => {
  loading.value = true; // Set loading to true when verifying OTP
  try {
    const response = await $apiCall("/auth/verify", "POST", {
      otp: otp.value,
    });

    console.log({ response });

    // If OTP is verified successfully, redirect to the next page
    if (response && response.status == "success") {
      router.push("/signup/select-team");
    } else {
      alert(response.message || "Invalid OTP. Please try again.");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    alert(error.message || "An error occurred. Please try again later.");
  } finally {
    loading.value = false; // Set loading to false after the request is done
  }
};

// Resend OTP method
const resendOtp = async () => {
  otpResent.value = false; // Reset the success flag
  otpError.value = null; // Reset any previous error

  try {
    const response = await $apiCall("/auth/resend", "POST", {
      emailId: email.value,
    });

    if (response && response.success) {
      otpResent.value = true; // OTP was resent successfully
    } else {
      otpError.value = response.message || "Failed to resend OTP.";
    }
  } catch (error) {
    console.error("Error resending OTP:", error);
    otpError.value = error.message || "An error occurred while resending OTP.";
  }
};
</script>
