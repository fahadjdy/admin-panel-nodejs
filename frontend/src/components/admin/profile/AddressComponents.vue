<template>
  <div class="space-y-4">

    <!-- Add Address Form -->
    <fieldset class="border border-gray-300 rounded-md p-4">
      <legend class="text-lg px-2">Address List</legend>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-2 items-stretch mb-4">
        <InputField v-model="newAddress.address" placeholder="Address" />
        <InputField v-model="newAddress.city" placeholder="City" />
        <InputField v-model="newAddress.state" placeholder="State" />
        <InputField v-model="newAddress.pincode" placeholder="Pincode" />
        <UiButton type="button" @click="addAddress" variant="primary">Add</UiButton>
      </div>

      <!-- Address Table -->
      <div class="overflow-x-auto">
        <table class="w-full border border-gray-300 rounded-md shadow-sm">
          <thead class="bg-blue-50 border-b border-gray-200">
            <tr>
              <th class="px-4 py-2 w-1/12 text-left text-gray-600">#</th>
              <th class="px-4 py-2 w-3/12 text-left text-gray-600">Address</th>
              <th class="px-4 py-2 w-2/12 text-left text-gray-600">City</th>
              <th class="px-4 py-2 w-2/12 text-left text-gray-600">State</th>
              <th class="px-4 py-2 w-2/12 text-left text-gray-600">Pincode</th>
              <th class="px-4 py-2 w-2/12 text-center text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(address, index) in addresses" :key="address.id" class="hover:bg-blue-50 transition-colors">
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">{{ address.address }}</td>
              <td class="px-4 py-2">{{ address.city }}</td>
              <td class="px-4 py-2">{{ address.state }}</td>
              <td class="px-4 py-2">{{ address.pincode }}</td>
              <td class="px-4 py-2 flex justify-center gap-2">
                <UiButton icon="fas fa-trash" variant="danger" @click="removeAddress(address.id, index)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </fieldset>

    <!-- Alerts -->
    <alertBox v-if="isSuccess" :message="successMessage" type="success" @close="closeAlert" />
    <alertBox v-if="isError" :message="errorMessage" type="error" @close="closeAlert" />

  </div>
</template>

<script>
import UiButton from '../../ui/Button.vue';
import InputField from '../../ui/InputField.vue';
import alertBox from '../../ui/alertBox.vue';
import AddressServices from '../../../services/AddressServices.js';

export default {
  components: { UiButton, InputField, alertBox },
  data() {
    return {
      addresses: [],
      newAddress: { address: 'b', city: 'b', state: 'b', pincode: '1' },
      successMessage: '',
      errorMessage: '',
      isSuccess: false,
      isError: false,
    };
  },
  mounted() {
    this.getAddresses();
  },
  methods: {
    async getAddresses() {
      try {
        const data = await AddressServices.getAll();
        this.addresses = data.addresses || data; // adjust if API wraps response
      } catch (error) {
        this.errorMessage = 'Failed to load addresses';
        this.isError = true;
      }
    },

   async addAddress() {
        try {
            this.closeAlert();
            const { address, city, state, pincode } = this.newAddress;
            if (!address || !city || !state || !pincode) {
            this.errorMessage = 'All fields are required';
            this.isError = true;
            return;
            }

            const response = await AddressServices.add(this.newAddress);

            this.addresses.push(response.address || this.newAddress);

            this.newAddress = { address: '', city: '', state: '', pincode: '' };
            this.successMessage = 'Address added successfully';
            this.isSuccess = true;
        } catch (error) {
            this.errorMessage = 'Failed to add address';
            this.isError = true;
        }
    },

    async removeAddress(id, index) {
      try {
        await AddressServices.delete(id);

        await this.getAddresses();
        this.successMessage = 'Address deleted successfully';
        this.isSuccess = true;
      } catch (error) {
        this.errorMessage = 'Failed to delete address';
        this.isError = true;
      }
    },

    closeAlert() {
      this.isSuccess = false;
      this.isError = false;
    },
  },
};
</script>
