<template>
  <header class="bg-white shadow flex items-center justify-between px-6 py-4 sticky top-0 z-30">
    <!-- Mobile toggle button -->
    <button v-if="showToggle" @click="$emit('openSidebar')" class="text-gray-800 focus:outline-none">
      <i class="fas fa-bars text-2xl"></i>
    </button>

    <!-- Page Title -->
    <h1 class="text-xl font-semibold text-gray-700 flex items-center gap-2">
      <i class="fas fa-home text-gray-800"></i>
      {{ currentRouteName }}
    </h1>

    <!-- Profile Dropdown -->
    <div class="relative flex items-center space-x-4">
      <button @click="toggleProfileMenu" class="flex items-center focus:outline-none">
        <img src="https://i.pravatar.cc/40" alt="Admin" class="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm">
        <i class="fas fa-caret-down ml-2 text-gray-700"></i>
      </button>

      <div v-show="isProfileMenuOpen" class="absolute right-0 top-14 mt-2 w-40 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
        <router-link to="/admin/profile" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <i class="fas fa-user mr-2"></i> Profile
        </router-link>
        <button @click="$emit('logout')" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
          <i class="fas fa-sign-out-alt mr-2 text-red-500"></i> Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AdminNavbar',
  props: {
    showToggle: { type: Boolean, default: true },
  },
  data() {
    return { isProfileMenuOpen: false };
  },
  methods: {
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name || 'Dashboard';
    },
  },
};
</script>
