<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Admin 👋</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
          <InputField
            v-model="email"
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
        />

        <InputField
            v-model="password"
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
        />


        <!-- Login Button -->
        <UiButton type="submit" variant="primary" class="w-full py-3 text-lg rounded-lg">Login</UiButton>
      </form>

      <!-- Error message -->
      <p v-if="error" class="mt-4 text-center text-red-500 text-sm">{{ error }}</p>

      <!-- Extra Links -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          Forgot your password?
          <a href="tel:917203070468" class="text-blue-600 font-medium hover:underline">Contact Admin</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../services/authService.js'
import UiButton from "../components/ui/Button.vue";
import InputField from "../components/ui/InputField.vue";

export default {
  components: { UiButton , InputField },
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async handleLogin() {
      this.error = null
      try {
        const data = await login(this.email, this.password)
        localStorage.setItem('token', data.token)
        this.$router.push('/admin/dashboard')
      } catch (err) {
        this.error = err.error || 'Something went wrong. Please try again.'
      }
    }
  }
}
</script>
