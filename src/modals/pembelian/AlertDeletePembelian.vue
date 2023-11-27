<template>
    <div v-if="showDeleteConfirmation" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
        <div class="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="modal-content py-10 text-left px-6">
                <h2 class="text-2xl text-cyan-800 font-semibold mb-4">Hapus Data Pembelian?</h2>
                <p class="mb-6">Data pembelian ini akan dihapus dari aset anda!</p>
                <div class="flex justify-end">
                    <button @click="cancelDeleteAction"
                        class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-4">Cancel</button>
                    <button @click="confirmDeleteAction" class="bg-red-500 px-4 py-2 text-white rounded mr-4">Hapus</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    props: {
        showDeleteConfirmation: Boolean,
    },
    emits: ['confirm-delete', 'cancel-delete'],
    setup(props, { emit }) {
        const confirmDeleteAction = () => {
            emit('confirm-delete');
        };

        const cancelDeleteAction = () => {
            emit('cancel-delete');
        };

        return {
            confirmDeleteAction,
            cancelDeleteAction,
        };
    },
});
</script>