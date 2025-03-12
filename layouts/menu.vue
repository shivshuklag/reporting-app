<template>
  <div class="min-h-screen flex bg-gradient-to-b from-gray-900 to-black text-white">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-lg">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800">Hey, Guys</h1>
      </div>
      <nav class="mt-6">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/dashboard" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <HomeIcon class="h-5 w-5 mr-3" />
              <span>Home</span>
            </NuxtLink>
          </li>
          <!-- <NuxtLink to="/update" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <BookOpenIcon class="h-5 w-5 mr-3" />
              <span>Update Checkin</span>
            </NuxtLink> -->
          <li>
            <NuxtLink to="/checkin" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <QuestionMarkCircleIcon class="h-5 w-5 mr-3" />
              <span>Checkin / UpdateCheckin</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/edit" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <UserCircleIcon class="h-5 w-5 mr-3" />
              <span>Personalize your profile</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/kudos" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <BookOpenIcon class="h-5 w-5 mr-3" />
              <span>Kudos</span>
            </NuxtLink>
            <button @click="handleLogout" class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full">
              <LogoutIcon class="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <main class="flex-1">
      <slot /> <!-- This will render the page content -->
    </main>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  UserCircleIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
} from '@heroicons/vue/24/outline';

const router = useRouter();

const handleLogout = () => {
  if (confirm('Are you sure you want to log out?')) {
    const accessToken = useCookie('accessToken');
    accessToken.value = null;
    router.push('/signin');
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>