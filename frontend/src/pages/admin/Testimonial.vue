<template>
  <div class="space-y-6">

    <!-- Add Testimonial Button -->
    <div class="text-end">
      <UiButton @click="openModal" icon="fas fa-plus" variant="primary">
        Add Testimonial
      </UiButton>
    </div>

    <!-- Testimonial Modal -->
    <Modal v-model:show="showModal" title="Testimonial Detail" class="w-full mx-auto">
      <form @submit.prevent="saveTestimonial" class="space-y-4">
        <div class="space-y-4">
          <InputField v-model="testimonial.name" id="name" label="Name" type="text"  />
          <InputField v-model="testimonial.designation" id="designation" label="Designation" type="text"/>
          <TextareaField v-model="testimonial.message" id="message" label="Message" />

          <!-- Image Upload -->
          <fieldset class="border border-gray-300 rounded-md p-4">
            <legend class="text-lg px-2">Image</legend>
            <div class="flex items-center gap-4">
              <div class="overflow-hidden rounded-full w-20 h-20 bg-gray-100">
                <img :src="imagePreview" v-if="imagePreview" alt="testimonial image" class="w-full h-full object-cover" />
              </div>
              <input type="file" @change="onFileChange" />
            </div>
          </fieldset>

          <!-- Status -->
          <fieldset class="border border-gray-300 rounded-md p-4 text-center">
            <legend class="text-lg px-2">Status</legend>
            <select v-model="testimonial.status" class="border rounded-md p-2 w-full">
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </fieldset>

          <!-- Display Order -->
          <InputField v-model="testimonial.display_order" id="display_order" label="Display Order" type="number" placeholder="Enter Display Order" />
        </div>

        <!-- Save Button -->
        <div class="text-end mt-4">
          <UiButton type="submit" icon="fas fa-save" variant="primary" class="text-lg rounded-lg">
            {{ isEdit ? 'Update' : 'Add' }}
          </UiButton>
        </div>

    </form>
</Modal>

<!-- Alerts -->
<alertBox v-if="isSuccess" :message="successMessage" type="success" @close="closeAlert" />
<alertBox v-if="isError" :message="errorMessage" type="error" @close="closeAlert" />

    <!-- Testimonials Table -->
    <fieldset class="border border-gray-300 rounded-md p-4">
      <legend class="text-lg font-semibold px-2">Testimonials List</legend>
      <table class="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">#</th>
            <th class="border px-4 py-2">Image</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Designation</th>
            <th class="border px-4 py-2">Status</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in testimonials" :key="item.id" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">
              <img v-if="item.image" :src="`${imageUrl}/${item.image}`" class="w-12 h-12 rounded-full object-cover" />
            </td>
            <td class="border px-4 py-2">{{ item.name }}</td>
            <td class="border px-4 py-2">{{ item.designation }}</td>
            <td class="border px-4 py-2">
              <span :class="item.status === 'Published' ? 'text-green-600' : 'text-gray-600'">
                {{ item.status }}
              </span>
            </td>
            <td class="border px-4 py-2 ">
              <button @click="editTestimonial(item.id)" class="text-blue-600 hover:underline">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button @click="deleteTestimonial(item.id)" class="text-red-600 hover:underline">
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
          <tr v-if="testimonials.length === 0">
            <td class="border px-4 py-2 text-center" colspan="6">No testimonials found.</td>
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
import TestimonialServices from "../../services/TestimonialServices.js";

export default {
  name: "TestimonialManagement",
  components: { InputField, TextareaField, UiButton, alertBox, Modal },
  data() {
    return {
      testimonials: [],
      testimonial: {
        name: "",
        designation: "",
        message: "",
        status: "Published",
        display_order: 1,
        image: null,
      },
      imagePreview: "",
      imageUrl: import.meta.env.VITE_API_IMAGE_URL,
      isSuccess: false,
      successMessage: "",
      isError: false,
      errorMessage: "",
      isEdit: false,
      showModal: false,
      selectedId: null,
    };
  },
  mounted() {
    this.getTestimonials();
  },
  methods: {
    async getTestimonials() {
      try {
        const response = await TestimonialServices.getAll();
        this.testimonials = response.data || [];
      } catch (err) {
        console.error(err);
      }
    },
    openModal() {
      this.resetForm();
      this.showModal = true;
    },
    resetForm() {
      this.testimonial = { name: "", designation: "", message: "", status: "Published", display_order: 1, image: null };
      this.imagePreview = "";
      this.isEdit = false;
      this.selectedId = null;
      this.isSuccess = false;
      this.isError = false;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.testimonial.image = file;
        const reader = new FileReader();
        reader.onload = ev => this.imagePreview = ev.target.result;
        reader.readAsDataURL(file);
      }
    },
    async saveTestimonial() {
      try {
        let response;
        if (this.isEdit) {
          response = await TestimonialServices.update(this.selectedId, this.testimonial);
        } else {
          response = await TestimonialServices.add(this.testimonial);
        }

        if (response.success) {
          this.isSuccess = true;
          this.successMessage = response.message || "Saved successfully!";
          this.isError = false;
          this.getTestimonials();
          this.showModal = false;
        } else {
          this.isError = true;
          this.errorMessage = response.message || "Failed to save.";
          this.isSuccess = false;
        }
      } catch (err) {
        this.isError = true;
        console.error(err);
        this.errorMessage = err.response?.data?.message || "Something went wrong!";
        this.isSuccess = false;
      }
    },
    editTestimonial(id) {
      const data = this.testimonials.find(t => t.id === id);
      if (data) {
        this.testimonial = { ...data, image: null };
        this.imagePreview = data.image ? `${this.imageUrl}/testimonial/${data.image}` : "";
        this.isEdit = true;
        this.selectedId = id;
        this.showModal = true;
      }
    },
    async deleteTestimonial(id) {
      if (confirm("Are you sure you want to delete this testimonial?")) {
        try {
          const response = await TestimonialServices.delete(id);
          if (response.success) {
            alert(response.message || "Deleted successfully!");
            this.getTestimonials();
          } else {
            alert(response.message || "Failed to delete.");
          }
        } catch (err) {
          alert(err.response?.data?.message || "Something went wrong!");
        }
      }
    },
    closeAlert() {
      this.isSuccess = false;
      this.isError = false;
    },
  }
};
</script>
