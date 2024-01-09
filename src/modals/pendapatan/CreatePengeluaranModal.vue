<template>
    <div>
        <!-- Modal untuk create data -->
        <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div class="modal-container bg-white w-[700px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-12 text-left px-10">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Create Expenses</h2>
                    <form>
                        <div >
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700">Expense Date</label>
                                <input  type="date" class="mt-1 p-2 w-full border rounded" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700">Description</label>
                                <input  class="mt-1 p-2 w-full border rounded" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700">Amount</label>
                                <input class="mt-1 p-2 w-full border rounded" type="number" />
                            </div>
                        </div>
                        <div class="mt-6 flex justify-end">
                            <button type="button" @click="addExpenseEntry" class="bg-cyan-700 px-4 py-3 text-white rounded">
                                Add Expense
                            </button>
                            <button type="submit" class="bg-cyan-700 px-4 py-3 text-white rounded ml-4">Save</button>
                            <button @click="closeCreateModal"
                                class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            formData: {
                expenses: [
                    {
                        tanggal: '',
                        keterangan: '',
                        jumlah: '',
                    },
                ],
            },
        };
    },
    methods: {
        closeCreateModal() {
            this.$emit('closeModal');
        },
        addExpenseEntry() {
            this.formData.expenses.push({
                tanggal: '',
                keterangan: '',
                jumlah: '',
            });
        },
    },
};
</script>
