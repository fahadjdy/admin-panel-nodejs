<template>
  <div class="input-container">
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      required
      rows="4"
    ></textarea>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "TextareaField",
  props: {
    modelValue: String,
    label: { type: String, required: true },
    id: { type: String, required: true },
  },
};
</script>

<style scoped>
.input-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-container textarea {
  width: 100%;
  padding: 1.2rem 0.8rem 0.4rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  font-size: 1rem;
  transition: border-color 0.2s;
  resize: vertical; /* user can resize */
}

.input-container textarea:focus {
  border-color: var(--primary-color);
}

.input-container label {
  position: absolute;
  left: 0.8rem;
  top: 1.2rem;
  color: #888;
  font-size: 1rem;
  pointer-events: none;
  transition: 0.2s ease all;
  background: white;
  padding: 0 0.2rem;
}

/* When textarea is focused or has content, float the label */
.input-container textarea:focus + label,
.input-container textarea:not(:placeholder-shown) + label,
.input-container textarea[value]:not([value=""]) + label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: var(--primary-color);
}
</style>
