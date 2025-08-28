<template>
  <div class="w-full flex">
    <div class="bg-white p-6 rounded-md shadow-md w-full md:w-1/2 mt-3 mx-5">
      <ProfileDetailComponents :profileData="profile" />
    </div>
    <div class="bg-white p-6 rounded-md shadow-md w-full md:w-1/2 mt-3 mx-5">
      <ContactComponents />
    </div>
  </div>
</template>

<script>
import ProfileDetailComponents from "../../components/admin/profile/ProfileDetailComponents.vue";
import ContactComponents from "../../components/admin/profile/ContactComponents.vue";

export default {
  name: "Profile",
  components: { ProfileDetailComponents ,ContactComponents}
};
</script>
