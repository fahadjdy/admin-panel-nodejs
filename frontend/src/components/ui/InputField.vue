<template>
  <div class="input-container">
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      required
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    modelValue: {type:[String, Number], default:""},
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    label: { type: String},
    id: { type: String},
  },
};
</script>

<style scoped>
.input-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-container input {
  width: 100%;
  padding: 1.2rem 0.8rem 0.4rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-container input:focus {
  border-color: var(--primary-color); /* blue */
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

/* When input is focused or has value, move label up */
.input-container input:focus + label,
.input-container input:not(:placeholder-shown) + label,
.input-container input[value]:not([value=""]) + label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: var(--primary-color);
}
</style>
