<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center modal">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-xl relative">
        <!-- Header -->
        <div class="flex justify-between items-center border-b p-4">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <button @click="$emit('update:show', false)" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="p-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Modal Title"
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.modal:before {
    content: '';
    background: #000;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    opacity: 0.5;
}
</style>
