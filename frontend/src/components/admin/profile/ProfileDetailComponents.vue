<template>
  <form @submit.prevent="updateProfile" class="space-y-4">
  <fieldset class="border border-gray-300 rounded-md p-4">
    <legend class="text-lg font-semibold px-2">Profile Detail</legend>

    <div class="space-y-4">
      <!-- Owner Name -->
      <InputField v-model="profile.owner_name" id="owner_name" label="Owner Name" type="text"
        placeholder="Enter Owner Name" />

      <div class="bg-white rounded-md flex items-end gap-4">
        <!-- Logo Upload -->
        <fieldset class="border border-gray-300 rounded-md p-4">
          <legend class="text-lg px-2">Logo</legend>
          <div class="relative">
            <div class="overflow-hidden rounded-full w-20 h-20 bg-gray-100">
              <img :src="logoPreview" v-if="logoPreview" alt="logo" class="w-full h-full object-cover" />
            </div>
            <label for="logo" class="absolute inset-0 flex items-center justify-center text-white cursor-pointer">
              <i class="fas fa-camera text-2xl" v-if="!logoPreview"></i>
            </label>
            <input type="file" id="logo" class="hidden" @change="onFileChange($event, 'logo')" />
          </div>
        </fieldset>

        <!-- Favicon Upload -->
        <fieldset class="border border-gray-300 rounded-md p-4 ml-5">
          <legend class="text-lg px-2">Favicon</legend>
          <div class="relative">
            <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-100">
              <img :src="faviconPreview" v-if="faviconPreview" alt="favicon" class="w-full h-full object-cover" />
            </div>
            <label for="favicon" class="absolute inset-0 flex items-center justify-center text-white cursor-pointer">
              <i class="fas fa-camera text-xl" v-if="!faviconPreview"></i>
            </label>
            <input type="file" id="favicon" class="hidden" @change="onFileChange($event, 'favicon')" />
          </div>
        </fieldset>

        <!-- Maintenance Mode -->
        <fieldset class="border border-gray-300 rounded-md p-4 ml-5 text-center">
          <legend class="text-lg px-2">Maintenance Mode</legend>
          <ToggleSwitch v-model="profile.is_maintainance" name="is_maintainance" />
        </fieldset>
      </div>

      <!-- Company Name -->
      <InputField v-model="profile.company_name" id="company_name" label="Company Name" type="text"
        placeholder="Enter Company Name" />

      <!-- Company Slogan -->
      <InputField v-model="profile.slogan" id="slogan" label="Company Slogan" type="text"
        placeholder="Enter Company Slogan" />

      <!-- Company Email -->
      <InputField v-model="profile.email" id="email" label="Company Email" type="email"
        placeholder="Enter Company Email" />

      <!-- About Company -->
      <TextareaField v-model="profile.about_company" id="about_company" label="About Company" />
    </div>

    <!-- Update Button -->
    <div class="text-end mt-4">
      <UiButton type="submit" icon="fas fa-save" variant="primary" class="text-lg rounded-lg" @click="updateProfile">
        Update
      </UiButton>
    </div>

    <!-- Alerts -->
    <alertBox v-if="isSuccess" :message="successMessage" type="success" @close="closeAlert" />
    <alertBox v-if="isError" :message="errorMessage" type="error" @close="closeAlert" />
  </fieldset>
</form>
</template>

<script>
import InputField from "../../ui/InputField.vue";
import TextareaField from "../../ui/TextareaField.vue";
import ToggleSwitch from "../../ui/ToggleSwitch.vue";
import UiButton from "../../ui/Button.vue";
import alertBox from "../../ui/alertBox.vue";
import ProfileServices from "../../../services/ProfileServices.js";

export default {
  name: "ProfileDetail",
  components: { InputField, TextareaField, ToggleSwitch, UiButton, alertBox },
  data() {
    return {
      profile: { 
        owner_name: "",
        logo: "",
        favicon: "",
        is_maintainance: false,
        company_name: "",
        slogan: "",
        email: "",
        about_company: ""
       },
      logoPreview: "",
      faviconPreview: "",
      isSuccess: false,
      successMessage: "",
      isError: false,
      errorMessage: ""
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
        const response = await ProfileServices.getProfile();
        const image_url = import.meta.env.VITE_API_IMAGE_URL;
        if (response) this.profile = response;
        if (this.profile.logo) this.logoPreview = image_url + "/profile/" + this.profile.logo;
        if (this.profile.favicon) this.faviconPreview = image_url + "/profile/" + this.profile.favicon;
      } catch (err) {
        console.log(err);
      }
    },
    onFileChange(event, field) {
      const file = event.target.files[0];
      if (file) {
        this.profile[field] = file;
        const reader = new FileReader();
        reader.onload = e => {
          if (field === "logo") this.logoPreview = e.target.result;
          if (field === "favicon") this.faviconPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async updateProfile() {
      try {
        const response = await ProfileServices.updateProfile(this.profile);
        if (response.success) {
          this.isSuccess = true;
          this.successMessage = response.message || "Profile updated successfully!";
          this.isError = false;
        } else {
          this.isError = true;
          this.errorMessage = response.message || "Failed to update profile.";
          this.isSuccess = false;
        }
      } catch (err) {
        this.isError = true;
        this.errorMessage = err.response?.data?.message || "Something went wrong!";
        this.isSuccess = false;
      }
    },
    closeAlert() {
      this.isSuccess = false;
      this.isError = false;
    }
  }
};
</script>
