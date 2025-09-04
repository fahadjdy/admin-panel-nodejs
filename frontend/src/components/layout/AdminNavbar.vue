<template>
  <header class="admin-navbar">
    <!-- Mobile toggle button -->
    <button v-if="showToggle" @click="$emit('openSidebar')" class="toggle-btn">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Page Title -->
    <h1 class="page-title">
      <i class="fas fa-home"></i>
      {{ currentRouteName }}
    </h1>

    <!-- Profile Dropdown -->
    <div class="profile-dropdown">
      <button @click="toggleProfileMenu" class="profile-btn">
        <img src="https://i.pravatar.cc/40" alt="Admin" class="profile-img">
        <i class="fas fa-caret-down"></i>
      </button>

      <div v-show="isProfileMenuOpen" class="dropdown-menu">
        <router-link to="/admin/profile" class="dropdown-item">
          <i class="fas fa-user mr-2"></i> Profile
        </router-link>
        <button @click="$emit('logout')" class="dropdown-item logout-btn">
          <i class="fas fa-sign-out-alt"></i> Logout
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

<style scoped>
.admin-navbar {
  background-color: var(--tertiary-color);
  color: var(--black-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 30;
}

/* Toggle button */
.toggle-btn {
  color: var(--black-color);
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* Page title */
.page-title {
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--black-color);
}

.page-title i {
  color: var(--primary-color);
}

/* Profile dropdown */
.profile-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--black-color);
}

.profile-img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 2px solid var(--secondary-color);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.profile-btn i {
  margin-left: 0.5rem;
  color: var(--black-color);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 3.5rem;
  width: 10rem;
  background-color: var(--tertiary-color);
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 0.25rem 0;
  z-index: 9990;
  display: block;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--black-color);
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background-color: var(--secondary-color);
}

.logout-btn i {
  color: var(--danger-color);
  margin-right: 0.5rem;
}


</style>
