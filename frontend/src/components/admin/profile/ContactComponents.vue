<template>
    <form @submit.prevent="addContact" class="space-y-4">
        <div class="space-y-4">

            <!-- Contact Numbers -->
            <fieldset class="border border-gray-300 rounded-md p-4">
                <legend class="text-lg px-2">Contact List</legend>

                <div class="flex gap-2 items-stretch h-12">
                    <form @submit.prevent="addContact" class="flex flex-1">
                        <!-- 80% Input -->
                        <div class="flex-[0.8]">
                            <InputField type="text" label="Contact Number" placeholder="Enter mobile number"
                                class="h-full" />
                        </div>

                        <!-- 20% Button -->
                        <div class="flex-[0.2] ml-5">
                            <UiButton type="button" icon="fas fa-plus" variant="primary"
                                class="w-full h-full text-lg rounded-lg px-0" @click="addContact">
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
                            <tr v-for="(contact, index) in profile.contacts" :key="index"
                                class="hover:bg-blue-50 transition-colors duration-200">
                                <td class="px-4 py-2 text-gray-700 font-medium">{{ index + 1 }}</td>
                                <td class="px-4 py-2">
                                    <p> {{ contact }}</p>
                                </td>
                                <td class="px-4 py-2 flex justify-center gap-2">
                                    <UiButton type="button" icon="fas fa-trash" variant="danger"
                                        class="h-10 w-10 p-0 rounded-full" @click="removeContact(index)"></UiButton>
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
    </form>

</template>


<script>
import UiButton from '../../ui/Button.vue';
import InputField from '../../ui/InputField.vue';
export default {
    components: { UiButton, InputField },
    data() {
        return {
            profile: {
                contacts: [
                    '7203070468',
                    '9820185566',
                    '9054953977'
                ]
            },
            successMessage: '',
            errorMessage: '',
            isSuccess: false,
            isError: false
        }
    },
    methods:{
        addContact() {
            this.profile.contacts.push('');
        },
        removeContact(index) {
            this.profile.contacts.splice(index, 1);
        }
    }
}
</script>