<template>
  <div
    v-if="visible"
    :class="['alert', `alert-${type}`]"
    class="fixed top-5 right-5 min-w-[250px] rounded px-4 py-3 shadow-md flex items-center justify-between"
  >
    <span>{{ message }}</span>
    <button
      type="button"
      class="ml-4 font-bold"
      @click="close"
    >
      ×
    </button>
  </div>
</template>

<script>
export default {
  name: "AlertBox",
  props: {
    message: { type: String, required: true },
    type: { type: String, default: "success" }, // success | error | warning
    autoClose: { type: Boolean, default: true },
    duration: { type: Number, default: 3000 }
  },
  data() {
    return {
      visible: true,
      timer: null
    };
  },
  mounted() {
    if (this.autoClose) {
      this.timer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    }
  },
  beforeUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }
};
</script>


<style>
.alert {
      position: fixed;
      top: 80px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
      min-width: 250px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: fadeIn 0.5s ease;
    }

    /* Variants */
    .alert-success { background-color: #4caf50; }
    .alert-error { background-color: #f44336; }
    .alert-warning { background-color: #ff9800; }

    /* Close button */
    .alert button {
      background: none;
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      margin-left: 10px;
    }

    /* Fade-in animation */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }</style>