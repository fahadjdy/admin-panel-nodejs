<template>
  <div class="flex min-h-screen">

    <!-- Overlay for mobile -->
    <div
      v-if="!isDesktop"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-40"
      :class="{ 'opacity-0 pointer-events-none': !isSidebarOpen, 'opacity-100': isSidebarOpen }"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <AdminSidebar
      :isOpen="isSidebarOpen"
      :showClose="!isDesktop"
      class="z-40"
      @close="closeSidebar"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen transition-all duration-300"
      :class="{ 'md:ml-64': isSidebarOpen && isDesktop, 'ml-0': !isSidebarOpen || !isDesktop }">

      <!-- Navbar -->
      <AdminNavbar 
        :showToggle="!isDesktop"
        @openSidebar="openSidebar"
        @logout="logout"
      />

      <!-- Page content -->
      <main class="flex-1 p-6">
        <router-view></router-view>
      </main>
    </div>

  </div>
</template>

<script>
import AdminSidebar from './AdminSidebar.vue';
import AdminNavbar from './AdminNavbar.vue';

export default {
  name: 'AdminBase',
  data() {
    return {
      isSidebarOpen: false,
      isDesktop: false,
    };
  },
  mounted() {
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen);
    if (!localStorage.getItem('token')) {
      this.$router.push('/login');
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  },
  methods: {
    checkScreen() {
      this.isDesktop = window.outerWidth >= 768;
      this.isSidebarOpen = this.isDesktop;
    },
    openSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  components: { AdminSidebar, AdminNavbar },
};
</script>
