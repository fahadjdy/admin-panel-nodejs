<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <!-- Hidden checkbox -->
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <!-- Track -->
    <div
      class="w-14 h-7 bg-gray-300 rounded-full peer-focus:ring-2 peer-focus:ring-indigo-500 
             peer-checked:bg-green-500 transition-colors duration-300"
    ></div>

    <!-- Thumb -->
    <div
      class="absolute left-0.5 top-0.5 w-6 h-6 bg-white rounded-full shadow-md 
             transition-transform duration-300 peer-checked:translate-x-7"
    ></div>
  </label>
</template>

<script>
export default {
  name: "ToggleSwitch",
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  }
};
</script>
