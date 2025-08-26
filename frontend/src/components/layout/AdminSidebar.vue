<template>
  <aside
    class="fixed z-50 top-0 left-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 flex flex-col shadow-xl"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
  >
    <!-- Logo / Title -->
    <div class="p-6 text-2xl font-bold flex items-center justify-between border-b border-white/10">
      <span>Fahad Jadiya</span>
      <button v-if="showClose" @click="$emit('close')" class="text-white md:hidden">
        ✕
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-4 space-y-2">

      <router-link to="/admin/dashboard"
        class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-gray-700 transition-colors">
        <i class="fas fa-home"></i> Dashboard
      </router-link>

      <router-link to="/admin/users"
        class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-gray-700 transition-colors">
        <i class="fas fa-users"></i> Users
      </router-link>

      <router-link to="/admin/profile"
        class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-gray-700 transition-colors">
        <i class="fas fa-cog"></i> Profile
      </router-link>

      <!-- Example submenu -->
      <div>
        <button @click="submenuOpen = !submenuOpen"
          class="w-full text-left py-2 px-3 rounded hover:bg-gray-700 flex items-center justify-between gap-2 transition-colors">
          <div class="flex items-center gap-2">
            <i class="fas fa-layer-group"></i> Menu
          </div>
          <i class="fas fa-chevron-down transition-transform" :class="{ 'rotate-180': submenuOpen }"></i>
        </button>

        <div v-show="submenuOpen" class="ml-6 mt-1 space-y-1 border-l border-gray-600 pl-2">
          <router-link to="#" class="block py-1 px-2 rounded hover:bg-gray-700 text-sm">Submenu 1</router-link>
          <router-link to="#" class="block py-1 px-2 rounded hover:bg-gray-700 text-sm">Submenu 2</router-link>
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
    return { submenuOpen: false };
  },
};
</script>
