<template>
    <div class="space-y-4">

        <!-- Contact Numbers -->
        <fieldset class="border border-gray-300 rounded-md p-4">
            <legend class="text-lg px-2">Contact List</legend>

            <div class="flex gap-2 items-stretch h-12">
                <form @submit.prevent="addContact" class="flex flex-1">
                    <!-- 80% Input -->
                    <div class="flex-[0.8]">
                        <InputField type="text" v-model="mobile" name="mobile" label="Contact Number"  class="h-full" />
                    </div>

                    <!-- 20% Button -->
                    <div class="flex-[0.2] ml-5">
                        <UiButton type="submit" icon="fas fa-plus" variant="primary"
                            class="w-full h-full text-lg rounded-lg px-0">
                            Add
                        </UiButton>
                    </div>
                </form>
            </div>

            <div class="space-y-2 mt-2">
                <table class="w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
                    <thead class="bg-blue-50 border-b border-gray-200">
                        <tr>
                            <th class="px-4 py-2 w-1/12 text-left text-gray-600">#</th>
                            <th class="px-4 py-2 w-7/12 text-left text-gray-600">Mobile Number</th>
                            <th class="px-4 py-2 w-4/12 text-center text-gray-600">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(contact, index) in profile.contacts" :key="contact.id"
                            class="hover:bg-blue-50 transition-colors duration-200">

                            <!-- Serial number -->
                            <td class="px-4 py-2 text-gray-700 font-medium">{{ index + 1 }}</td>

                            <!-- Mobile number -->
                            <td class="px-4 py-2">
                                <p>{{ contact.mobile }}</p>
                            </td>

                            <!-- Delete button -->
                            <td class="px-4 py-2 flex justify-center gap-2">
                                <UiButton type="button" icon="fas fa-trash" variant="danger"
                                    class="h-10 w-10 p-0 rounded-full" @clickBtn="removeContact(contact.id, index)">
                                </UiButton>
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>


        </fieldset>

    </div>

    <!-- Alerts -->
    <alertBox v-if="isSuccess" :message="successMessage" type="success" @close="closeAlert" />
    <alertBox v-if="isError" :message="errorMessage" type="error" @close="closeAlert" />


</template>


<script>
import UiButton from '../../ui/Button.vue';
import InputField from '../../ui/InputField.vue';
import alertBox from '../../ui/alertBox.vue';
import ContactServices from '../../../services/ContactServices.js';

export default {
    components: { UiButton, InputField, alertBox },
    data() {
        return {
            profile: {
                contacts: [],
            },
            mobile: "",
            successMessage: '',
            errorMessage: '',
            isSuccess: false,
            isError: false
        }
    },
    mounted() {
        this.getContacts(); // fetch on load
    },
    methods: {
        async removeContact(id, index) {
            try {
                await ContactServices.delete(id);

                await this.getContacts();
                this.successMessage = 'Contact deleted successfully';
                this.isSuccess = true;
            } catch (error) {
                this.errorMessage = 'Failed to delete contact';
                this.isError = true;
            }
        },
        async getContacts() {
            try {
                const data = await ContactServices.getAll();
                this.profile.contacts = data.contacts || data; // depends on API response structure
            } catch (error) {
                this.errorMessage = 'Failed to load contacts';
                this.isError = true;
            }
        },
        async addContact() {

            this.mobile = this.mobile.replace(/\s/g, '').trim();
            if (this.mobile.length !== 10) { this.errorMessage = 'Invalid mobile number'; this.isError = true; return; }
            if (!this.mobile) return;
            try {
                
                this.closeAlert();
                await ContactServices.add(this.mobile);
                await this.getContacts();
                this.successMessage = 'Contact added successfully';
                this.isSuccess = true;
                this.mobile = '';
            } catch (error) {
                
                if (error.response && error.response.data && error.response.data.error) {
                this.errorMessage = error.response.data.error; 
                } else {
                this.errorMessage = 'Failed to add contact';
                }
                this.isError = true;
            }
        },

        closeAlert() {
            this.isSuccess = false;
            this.isError = false;
        }
    }
}
</script>