<template>
    <div>
        <!-- Modal untuk create data -->
        <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div class="modal-container bg-white w-[700px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-12 text-left px-10">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Create Pengeluaran</h2>
                    <form @submit.prevent="savePengeluaran">
    <div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Tanggal Pengeluaran</label>
            <input v-model="formData.expenses[0].tanggal" type="date" class="mt-1 p-2 w-full border rounded" />
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Jumlah</label>
            <input v-model="formData.expenses[0].jumlah" class="mt-1 p-2 w-full border rounded" type="number" />
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Keterangan</label>
            <input v-model="formData.expenses[0].keterangan" class="mt-1 p-2 w-full border rounded" />
        </div>
    </div>
    <div class="mt-6 flex justify-end">
        <button type="submit" class="bg-cyan-700 px-4 py-3 text-white rounded ml-4">Save</button>
        <button @click="closeCreateModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4">Cancel</button>
    </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    props: {
        isVisible: Boolean,
        formData: Object,
        submitForm: Function,
        closeCreateModal: Function,
    },

    setup(props) {
        const formData = ref(props.formData);

        const savePengeluaran = async () => {
            try {
                await props.submitForm(formData.value);
                props.closeCreateModal();
            } catch (error) {
                console.error('Error saving pengeluaran:', error);
            }
        };

        watch(() => props.isVisible, (newValue) => {
            if (!newValue) {
                formData.value.expenses[0].tanggal = '';
                formData.value.expenses[0].jumlah = '';
                formData.value.expenses[0].keterangan = '';
            }
        });

        return {
            formData,
            savePengeluaran,
            closeCreateModal: () => props.closeCreateModal(),
        };
    },
};
</script>
