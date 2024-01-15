<template>
    <div>
        <!-- Modal untuk create data -->
        <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div class="modal-container bg-white w-[700px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-12 text-left px-10 ">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Create Karyawan</h2>
                    <form @submit.prevent="createKaryawan">
                        <div class="mb-4">
                            <label for="nama_karyawan" class="block text-sm font-medium text-gray-700">Nama Karyawan
                                <span class="text-red-600">*</span>
                            </label>
                            <input v-model="formData.nama_karyawan" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="jabatan" class="block text-sm font-medium text-gray-700">Jabatan
                                <span class="text-red-600">*</span>
                            </label>
                            <input v-model="formData.jabatan" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="gaji" class="block text-sm font-medium text-gray-700">Gaji
                                <span class="text-red-600">*</span>
                            </label>
                            <input v-model="formData.gaji" class="mt-1 p-2 w-full border rounded" type="number" />
                        </div>
                        <div class="mb-4">
                            <label for="tanggal_masuk" class="block text-sm font-medium text-gray-700">Tanggal Masuk
                                <span class="text-red-600">*</span>
                            </label>
                            <input v-model="formData.tanggal_masuk" type="date" id="tanggal" name="tanggal"
                                class="mt-1 p-2 w-full border rounded" />
                        </div>

                        <div v-if="validationError" class="text-red-600 mb-4 text-sm pt-4">
                            {{ validationError }}
                        </div>

                        <div class="mt-6 flex justify-end">
                            <button type="submit" class="bg-cyan-700 px-4 py-3 text-white rounded">Simpan</button>
                            <button @click="closeCreateModal"
                                class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        karyawanStore: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            formData: {
                nama_karyawan: '',
                jabatan: '',
                gaji: '',
                tanggal_masuk: '',
            },
        };
    },
    methods: {
        async createKaryawan() {
            if (!this.formData.nama_karyawan || !this.formData.jabatan || !this.formData.gaji || !this.formData.tanggal_masuk) {
                this.validationError = "Semua kolom dengan tanda * harus diisi.";
                return;
            }

            try {
                await this.karyawanStore.createKaryawan(this.formData);
                this.closeCreateModal();
                this.formData = {
                    nama_karyawan: '',
                    jabatan: '',
                    gaji: '',
                    tanggal_masuk: '',
                };
                this.validationError = null;
            } catch (error) {
                console.error('Error creating Karyawan:', error);
            }
        },
        closeCreateModal() {
            this.$emit('closeModal');
        },
    },
    computed: {
        validationError() {
            return (!this.formData.nama_karyawan || !this.formData.jabatan || !this.formData.gaji || !this.formData.tanggal_masuk)
                ? " * harus diisi."
                : null;
        },
    },
};
</script>
