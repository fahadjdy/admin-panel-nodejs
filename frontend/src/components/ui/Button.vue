<template>
  <button
    :class="[
      'rounded-lg px-4 py-2 font-medium transition',
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "UiButton",
  props: {
    variant: {
      type: String,
      default: "primary", // primary, secondary, danger
    },
    size: {
      type: String,
      default: "md", // sm, md, lg
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    variantClasses() {
        switch (this.variant) {
            case "secondary":
            return "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400 shadow-sm";
            case "danger":
            return "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md";
            case "success":
            return "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md";
            default: // primary
            return "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md";
        }
    },
    sizeClasses() {
      switch (this.size) {
        case "sm":
          return "text-sm px-3 py-1";
        case "lg":
          return "text-lg px-6 py-3";
        default:
          return "text-base px-4 py-2"; // md
      }
    },
  },
};
</script>
