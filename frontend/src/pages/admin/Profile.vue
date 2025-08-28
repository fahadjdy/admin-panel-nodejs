<template>
  <!-- Example alert -->
  <alertBox v-if="isSuccess" :message="successMessage" type="success" @close="isSuccess = false" />
  <alertBox v-if="isError" :message="errorMessage" type="error" @close="isError = false" />

  <div class="bg-white p-6 rounded-md shadow-md w-full md:w-1/2 mt-3">
    <form class="space-y-6" @submit.prevent="updateProfile">
      <fieldset class="border border-gray-300 rounded-md p-4">
        <legend class="text-lg font-semibold px-2">Profile Detail</legend>
        <div class="space-y-4">
          <div>
            <InputField v-model="profile.owner_name" id="owner_name" label="Owner Name" type="owner_name"
              placeholder="Enter Owner Name" />
          </div>

          <div class="bg-white rounded-md  flex item-end">

            <div class="flex items-center gap-4">
              <fieldset class="border border-gray-300 rounded-md p-4">
                <legend class="text-lg px-2">Logo</legend>
                <div class="relative">
                  <div class="overflow-hidden rounded-full w-20 h-20 bg-gray-100">
                    <img src="" alt="logo" class="w-full h-full object-cover">
                  </div>
                  <label for="logo"
                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
                    <i class="fas fa-camera text-2xl"></i>
                  </label>
                  <input type="file" name="logo" id="logo" class="hidden">
                </div>
              </fieldset>
            </div>

            <div class="flex items-center gap-4 ml-5">
              <fieldset class="border border-gray-300 rounded-md p-4">
                <legend class="text-lg px-2">favicon</legend>
                <div class="relative">
                  <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-100">
                    <img src="" alt="favicon" class="w-full h-full object-cover">
                  </div>
                  <label for="favicon"
                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
                    <i class="fas fa-camera text-2xl"></i>
                  </label>
                  <input type="file" name="favicon" id="favicon" class="hidden">
                </div>
              </fieldset>
            </div>

            <div class="flex items-center gap-4 ml-5 text-center">
              <fieldset class="border border-gray-300 rounded-md p-4 ">
                <legend class="text-lg px-2">Maintenance Mode</legend>
                <ToggleSwitch v-model="profile.is_maintainance" name="is_maintainance" />
              </fieldset>
            </div>

          </div>
          <div class="mt-5">
            <InputField v-model="profile.company_name" id="company_name" label="Company Name" type="company_name"
              name="company_name" placeholder="Enter Company Name" />
          </div>

          <div>
            <InputField v-model="profile.slogan" id="slogan" label="Company Slogan" type="slogan" name="slogan"
              placeholder="Enter Company Slogan" />
          </div>

          <div>
            <InputField v-model="profile.email" id="email" label="Company Email" type="email" name="email"
              placeholder="Enter Company Email" />
          </div>

          <div>
            <TextareaField v-model="profile.about_company" id="about_company" label="About Company" />
          </div>

        </div>
        <div class="sapce-y-4 text-end mt-4">
          <!-- <i class="fas fa-save"></i> -->
          <UiButton type="submit" icon="fas fa-save" variant="primary" class="text-lg rounded-lg">Update</UiButton>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import InputField from "../../components/ui/InputField.vue";
import TextareaField from "../../components/ui/TextareaField.vue";
import ToggleSwitch from "../../components/ui/ToggleSwitch.vue";
import UiButton from "../../components/ui/Button.vue";
import alertBox from "../../components/ui/alertBox.vue";
import ProfileServices from "../../services/ProfileServices.js";

export default {
  name: "Pofile",
  components: { InputField, TextareaField, ToggleSwitch, UiButton, alertBox },
  data() {
    return {
      profile: {
        owner_name: 'Fahad',
        company_name: 'Fahad',
        slogan: 'Fahad',
        email: 'fahad@gmail.com',
        about_company: 'Fahad',
        is_maintainance: false,
      },
      isSuccess: false,
      successMessage: '',
      isError: false,
      errorMessage: ''
    }
  },
  methods: {
    async updateProfile() {
      try {
        const response = await ProfileServices.updateProfile(this.profile);

        // if backend responds successfully
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

<style>
.item-end {
  align-items: end;
}
</style>