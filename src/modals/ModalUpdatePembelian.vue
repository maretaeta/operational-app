<template>
    <div>
        <!-- Modal untuk mengedit data -->
        <div v-if="editedProduct" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div class="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-10 text-left px-6">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Edit Pembelian</h2>
                    <form @submit.prevent="submitEdit">
                        <div class="mb-4">
                            <label for="harga_product" class="block text-sm font-medium text-gray-700">Nama Toko</label>
                            <input
                                class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="keuntungan" class="block text-sm font-medium text-gray-700">Alamat Toko</label>
                            <input 
                                class="mt-1 p-2 w-full border rounded" />
                        </div>
                         <div class="mb-4">
                                <label for="keuntungan" class="block text-sm font-medium text-gray-700">Jenis Kayu</label>
                                <input 
                                    class="mt-1 p-2 w-full border rounded" />
                            </div>
                             <div class="mb-4">
                                <label for="keuntungan" class="block text-sm font-medium text-gray-700">Nama Produk</label>
                                <input 
                                    class="mt-1 p-2 w-full border rounded" />
                            </div>
                             <div class="mb-4">
                                <label for="keuntungan" class="block text-sm font-medium text-gray-700">Ukuran Produk</label>
                                <input 
                                    class="mt-1 p-2 w-full border rounded" />
                            </div>
                             <div class="mb-4">
                                <label for="keuntungan" class="block text-sm font-medium text-gray-700">Jumlah</label>
                                <input 
                                    class="mt-1 p-2 w-full border rounded" />
                            </div>
                             <div class="mb-4">
                                <label for="keuntungan" class="block text-sm font-medium text-gray-700">Harga Beli</label>
                                <input 
                                    class="mt-1 p-2 w-full border rounded" />
                            </div>
                             <div class="mb-4">
                                <label for="keuntungan" class="block text-sm font-medium text-gray-700">Ongkos</label>
                                <input 
                                    class="mt-1 p-2 w-full border rounded" />
                            </div>


                        <div class="mt-6 flex justify-end">
                            <button type="submit" class="bg-cyan-700 px-4 py-3 text-white rounded">Simpan</button>
                            <button @click="closeEditModal"
                                class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        editedProduct: {
            type: Object,
            default: null,
        },
    },
    methods: {
        submitEdit() {
            
        },
        closeEditModal() {
            
        },
    },
};
</script>
