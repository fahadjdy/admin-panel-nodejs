<template>
  <button
    :class="['ui-button', variant, size]"
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
      default: "primary", // primary, secondary, danger, success
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
};
</script>

<style scoped>
.ui-button {
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

/* Variants using CSS variables */
.ui-button.primary {
  background: var(--primary-color);
  color: var(--white-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.ui-button.primary:hover:not(:disabled) {
  background: var(--primary-hover-color);
}

.ui-button.secondary {
  background: var(--secondary-color);
  color: var(--secondary-text-color);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.ui-button.secondary:hover:not(:disabled) {
  background: var(--secondary-hover-color);
}

.ui-button.danger {
  background: var(--danger-color);
  color: var(--white-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.ui-button.danger:hover:not(:disabled) {
  background: var(--danger-hover-color);
}

.ui-button.success {
  background: var(--success-color);
  color: var(--white-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.ui-button.success:hover:not(:disabled) {
  background: var(--success-hover-color);
}

/* Sizes */
.ui-button.sm {
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
}
.ui-button.md {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
.ui-button.lg {
  font-size: 1.125rem;
  padding: 0.75rem 1.5rem;
}

/* Disabled */
.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
