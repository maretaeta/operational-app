<template>
    <div>
        <!-- Modal untuk mengedit data -->
        <div v-if="editedProduct" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div class="modal-container bg-white w-[700px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-12 text-left px-10">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Edit Pembelian</h2>
                    <form @submit.prevent="submitEdit">
                        <div class="mb-4">
                            <label for="nama_toko" class="block text-sm font-medium text-gray-700">Nama Toko</label>
                            <input v-model="editedProduct.nama_toko" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="alamat_toko" class="block text-sm font-medium text-gray-700">Alamat Toko</label>
                            <input v-model="editedProduct.alamat_toko" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="jenis_productSources" class="block text-sm font-medium text-gray-700">Jenis
                                Produk</label>
                            <input v-model="editedProduct.jenis_productSources" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="nama_productSources" class="block text-sm font-medium text-gray-700">Nama
                                Produk</label>
                            <input v-model="editedProduct.nama_productSources" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="ukuran_productSources" class="block text-sm font-medium text-gray-700">Ukuran
                                Produk</label>
                            <input v-model="editedProduct.ukuran_productSources" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="jumlah_productSources"
                                class="block text-sm font-medium text-gray-700">Jumlah</label>
                            <input v-model="editedProduct.jumlah_productSources" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="pembelian_productSources" class="block text-sm font-medium text-gray-700">Harga
                                Beli</label>
                            <input v-model="editedProduct.pembelian_productSources"
                                class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="ongkosProses_productSources"
                                class="block text-sm font-medium text-gray-700">Ongkos</label>
                            <input v-model="editedProduct.ongkosProses_productSources"
                                class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mt-6 flex justify-end">
                            <button type="submit" class="bg-cyan-700 px-4 py-3 text-white rounded">Simpan</button>
                            <button @click="closeEditModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4">Batal</button>
                            </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useBuyStore } from '../store/pembelian';

export default {
    props: {
        editedProduct: {
            type: Object,
            default: null,
        },
    },
    methods: {
        async submitEdit() {
            console.log("editedProduct:", this.editedProduct);
            try {
                const store = useBuyStore();
                const updatedData = {
                    nama_toko: this.editedProduct.nama_toko,
                    alamat_toko: this.editedProduct.alamat_toko,
                    jenis_productSources: this.editedProduct.jenis_productSources,
                    nama_productSources: this.editedProduct.nama_productSources,
                    ukuran_productSources: this.editedProduct.ukuran_productSources,
                    jumlah_productSources: this.editedProduct.jumlah_productSources,
                    pembelian_productSources: this.editedProduct.pembelian_productSources,
                    ongkosProses_productSources: this.editedProduct.ongkosProses_productSources
                };
                await store.updatePembelian(updatedData); 

                this.closeEditModal();
            } catch (error) {
                console.error("Update error:", error);
            }
        },
        closeEditModal() {
            this.editedProduct = null;
        },
        closeEditModal() {
            this.$emit("close");
        },
    },
};
</script>