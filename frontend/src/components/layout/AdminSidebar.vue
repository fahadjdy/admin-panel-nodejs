<template>
  <aside
    class="admin-sidebar"
    :class="{ 'sidebar-closed': !isOpen, 'sidebar-open': isOpen }"
  >
    <!-- Logo / Title -->
    <div class="sidebar-header">
      <span>Fahad Jadiya</span>
      <button v-if="showClose" @click="$emit('close')" class="close-btn md:hidden">✕</button>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
     <router-link 
        to="/admin/dashboard" 
        class="nav-item" 
        active-class="active"
        exact-active-class="active"
      >
        <i class="fas fa-home"></i> Dashboard
      </router-link>

      <router-link 
        to="/admin/users" 
        class="nav-item" 
        active-class="active"
      >
        <i class="fas fa-users"></i> Users
      </router-link>

      <router-link 
        to="/admin/profile" 
        class="nav-item" 
        active-class="active"
      >
        <i class="fas fa-cog"></i> Profile
      </router-link>


      <!-- Example submenu -->
      <div>
        <button @click="submenuOpen = !submenuOpen" class="nav-item submenu-toggle">
          <div class="flex items-center gap-2">
            <i class="fas fa-layer-group"></i> Menu
          </div>
          <i class="fas fa-chevron-down" :class="{ 'rotate-180': submenuOpen }"></i>
        </button>

        <div v-show="submenuOpen" class="submenu">
          <router-link to="#" class="submenu-item">Submenu 1</router-link>
          <router-link to="#" class="submenu-item">Submenu 2</router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebar',
  props: {
    isOpen: { type: Boolean, required: true },
    showClose: { type: Boolean, default: false },
  },
  data() {
    return { 
      submenuOpen: false 
    };
  },
};
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 16rem; /* 64 */
  height: 100%;
  background-color: var(--primary-color);
  color: var(--white-color);
  display: flex;
  flex-direction: column;
  transform: translateX(0);
  transition: transform 0.3s ease;
  z-index: 50;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.sidebar-closed {
  transform: translateX(-100%);
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--white-color);
  cursor: pointer;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  color: var(--white-color);
  text-decoration: none;
  transition: background 0.2s;
}

.nav-item:hover {
  background-color: var(--primary-hover-color);
}

.submenu-toggle {
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
}

.submenu {
  margin-left: 1.5rem;
  margin-top: 0.25rem;
  border-left: 1px solid rgba(255,255,255,0.2);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 0.5rem;
}

.submenu-item {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: var(--white-color);
  border-radius: 0.25rem;
  transition: background 0.2s;
}

.submenu-item:hover {
  background-color: rgba(255,255,255,0.1);
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s;
}

.nav-item.active{
  background-color: var(--primary-hover-color);
  color: #fff;
  font-weight: bold;
  border-radius: 0.5rem;
}

</style>
