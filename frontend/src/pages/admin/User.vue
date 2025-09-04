<template>
  
  <div class="space-y-6">

    <!-- Add User Button -->
    <div class="text-end">
      <UiButton @click="openModal" icon="fas fa-user-plus" variant="primary">
        Add User
      </UiButton>
    </div>

    <!-- User Modal -->
    <Modal v-model:show="showModal" title="User Detail" class="mx-auto">
      <form @submit.prevent="saveUser" class="space-y-4">
        <div class="space-y-4">
          <InputField v-model="user.name" id="name" label="Name" type="text" placeholder="Enter User Name" />
          <InputField v-model="user.email" id="email" label="Email" type="email" placeholder="Enter User Email" />
          <InputField v-model="user.password" id="password" label="Password" type="password" placeholder="Enter Password" :required="!isEdit" />

          <!-- Status Select -->
            <fieldset class="border border-gray-300 rounded-md p-4 text-center">
            <legend class="text-lg px-2">Status</legend>
            <select v-model="user.status" class="border rounded-md p-2 w-full">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            </fieldset>

          <TextareaField v-model="user.remark" id="remark" label="Remark" placeholder="Enter remark" />
        </div>

        <div class="text-end mt-4">
          <UiButton type="submit" icon="fas fa-save" variant="primary" class="text-lg rounded-lg">
            {{ isEdit ? 'Update' : 'Add' }}
          </UiButton>
        </div>

      </form>
    </Modal>
    <alertBox v-if="isSuccess" :message="successMessage" type="success" @close="closeAlert" />
    <alertBox v-if="isError" :message="errorMessage" type="error" @close="closeAlert" />

    <!-- Users Table -->
    <fieldset class="border border-gray-300 rounded-md p-4">
      <legend class="text-lg font-semibold px-2">Users List</legend>
      <table class="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">#</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Status</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(userItem, index) in users" :key="userItem.id" class="hover:bg-gray-50 text-center">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ userItem.name }}</td>
            <td class="border px-4 py-2">{{ userItem.email }}</td>
            <td class="border px-4 py-2">
                <span :class="userItem.status === 'Active' ? 'bg-green-200 px-3 py-1 rounded text-green-800' : 'bg-gray-200 text-gray-800 px-7 py-1 rounded'">
                    {{ userItem.status }}
                </span>
            </td>
            <td class="border px-4 py-2 ">
              <button @click="editUser(userItem.id)" class="text-primary-600 hover:underline mx-4">
                <i class="fas fa-edit"></i> 
              </button>
              <button @click="deleteUser(userItem.id)" class="text-red-600 hover:underline">
                <i class="fas fa-trash"></i> 
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td class="border px-4 py-2 text-center" colspan="5">No users found.</td>
          </tr>
        </tbody>
      </table>
    </fieldset>

  </div>
</template>

<script>
import InputField from "../../components/ui/InputField.vue";
import TextareaField from "../../components/ui/TextareaField.vue";
import UiButton from "../../components/ui/Button.vue";
import alertBox from "../../components/ui/alertBox.vue";
import Modal from "../../components/ui/Modal.vue";
import UserServices from "../../services/UserServices.js";

export default {
  name: "UserManagement",
  components: { InputField, TextareaField,  UiButton, alertBox, Modal },
  data() {
    return {
      users: [],
      user: {
        name: "",
        email: "",
        password: "",
        status: false,
        remark: ""
      },
      isSuccess: false,
      successMessage: "",
      isError: false,
      errorMessage: "",
      isEdit: false,
      showModal: false,
      selectedUserId: null
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    openModal() {
      this.resetForm();
      this.showModal = true;
    },
    resetForm() {
      this.user = { name: "", email: "", password: "", status: false, remark: "" };
      this.isEdit = false;
      this.selectedUserId = null;
      this.isSuccess = false;
      this.isError = false;
    },
    async getUsers() {
      try {
        const response = await UserServices.getAll();
        this.users = response || [];
      } catch (err) {
        console.log(err);
      }
    },
    async saveUser() {
      try {
        let response;
        if (this.isEdit) {
          response = await UserServices.updateUser(this.selectedUserId, this.user);
        } else {
          response = await UserServices.addUser(this.user);
        }

        if (response.success) {
          this.isSuccess = true;
          this.successMessage = response.message || "User saved successfully!";
          this.isError = false;
          this.getUsers();
          this.showModal = false;
        } else {
          this.isError = true;
          this.errorMessage = response.message || "Failed to save user.";
          this.isSuccess = false;
        }
      } catch (err) {
        this.isError = true;
        this.errorMessage = err.response?.data?.message || "Something went wrong!";
        this.isSuccess = false;
      }
    },
    editUser(id) {
      const userData = this.users.find(u => u.id === id);
      if (userData) {
        this.user = { ...userData, password: ""}; 
        this.isEdit = true;
        this.selectedUserId = id;
        this.showModal = true;
      }
    },
    async deleteUser(id) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          const response = await UserServices.deleteUser(id);
          if (response.success) {
            this.isSuccess = true;
            this.isError = false;
            this.successMessage = response.message || "User deleted successfully!";
            this.getUsers();
          } else {
             this.isSuccess = false;
            this.isError = true;
            this.errorMessage = response.message || "Failed to delete user.";
          }
        } catch (err) {
          alert(err.response?.data?.message || "Something went wrong!");
        }
      }
    },
    closeAlert() {
      this.isSuccess = false;
      this.isError = false;
    }
  }
};
</script>
