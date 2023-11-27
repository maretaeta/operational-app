<template>
    <div>
        <!-- Modal Create Pembelian -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white w-[90vw] md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="py-10 text-left px-10">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Create Pembelian</h2>
                <div v-if="currentStep === 0">
                    <div class="w-full bg-gray-200 rounded-full">
                        <div class="w-40 p-1 text-xs font-medium leading-none text-center"
                            :class="{ 'text-white bg-cyan-800 rounded-l-full': currentStep === 0, 'text-white  rounded-r-full': currentStep === 1 }">
                            Langkah 1
                        </div>
                    </div>

                    <div class="mt-4 mb-4">
                        <label class="block text-sm">Nama Toko</label>
                        <input
                            type="text"
                            v-model="nama_Toko"
                            class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-cyan-600"
                            placeholder="Nama Toko"
                            />
                    </div>
                    
                    <div class="mb-4">
                        <label class="block mb-2 text-sm">Alamat Toko</label>
                        <input
                            type="text"
                            v-model="alamat_Toko"
                            class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-cyan-600"
                            placeholder="Alamat Toko"
                        />
                    </div>
                    <div class="flex justify-end gap-7">
                        <button @click="closeModal"
                            class="px-6 py-2 mt-4 text-sm font-medium leading-5 text-black transition-colors duration-150 bg-slate-100 border border-transparent rounded-lg hover:bg-cyan-400 focus:outline-none">
                            Cancel
                        </button>
                        <button @click="nextStep"
                            class="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-cyan-700 border border-transparent rounded-lg hover:bg-cyan-400 focus:outline-none">
                            Next
                        </button>
                    </div>
                    </div>

                    <!-- Langkah 2 -->
                    <div v-else-if="currentStep === 1">
                    <div class="w-full bg-gray-200 rounded-full">
                            <div class="ml-36 w-40 p-1 text-xs font-medium leading-none text-center text-white bg-cyan-700 rounded-full">
                                Langkah 2
                            </div>
                        </div>
                        <div class="mt-4 mb-4">
                            <label class="block text-sm">Jenis Kayu</label>
                            <input type="text" v-model="jenis_productSources"
                                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Jenis Kayu" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm">Nama Kayu</label>
                            <input type="text"  v-model="nama_productSources"
                                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Nama Kayu" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm">Ukuran</label>
                            <input v-model="ukuran_productSources"
                                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Ukuran" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm">Jumlah</label>
                            <input v-model="jumlah_productSources"
                                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Jumlah" type="number" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm">Harga</label>
                            <input v-model="pembelian_productSources"
                                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Harga" type="number" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm">Ongkos Kirim</label>
                            <input v-model="ongkosProses_productSources"
                                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Ongkos Kirim" type="number" />
                        </div>
                        <div class="flex justify-end gap-7">
                            <button @click="backStep"
                                class="px-6 py-2 mt-4 text-sm font-medium leading-5 text-black transition-colors duration-150 bg-slate-200 border border-transparent rounded-lg hover:bg-cyan-600 focus:outline-none">
                                Back
                            </button>
                            <button @click="createPurchase"
                            class="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-cyan-700 border border-transparent rounded-lg hover:bg-cyan-600 focus:outline-none">
                                Buat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';

export default {
    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
        onCloseModal: Function,
        onCreatePurchase: Function,
    },

    setup(props, { emit }) {
        const currentStep = ref(0);
        const nama_Toko = ref(''); 
        const alamat_Toko = ref(''); 
        const jenis_productSources = ref(''); 
        const nama_productSources = ref(''); 
        const ukuran_productSources = ref(''); 
        const jumlah_productSources = ref(''); 
        const pembelian_productSources = ref(''); 
        const ongkosProses_productSources = ref(''); 

        const closeModal = () => {
            currentStep.value = 0;
            props.onCloseModal();
        };

        const nextStep = () => {
            if (currentStep.value < 1) {
                currentStep.value += 1;
            }
        };

        const backStep = () => {
            if (currentStep.value > 0) {
                currentStep.value -= 1;
            }
        };

        const createPurchase = () => {
            const purchaseData = {
                nama_Toko: nama_Toko.value,
                alamat_Toko: alamat_Toko.value,
                jenis_productSources: jenis_productSources.value,
                nama_productSources: nama_productSources.value,
                ukuran_productSources: ukuran_productSources.value,
                jumlah_productSources: jumlah_productSources.value,
                pembelian_productSources: pembelian_productSources.value,
                ongkosProses_productSources: ongkosProses_productSources.value,
            };

            emit('purchaseCreated', purchaseData);

            resetFormFields();
        };

        const resetFormFields = () => {
            nama_Toko.value = '';
            alamat_Toko.value = '';
            jenis_productSources.value = '';
            nama_productSources.value = '';
            ukuran_productSources.value = '';
            jumlah_productSources.value = '';
            pembelian_productSources.value = '';
            ongkosProses_productSources.value = '';
        };

        return {
            currentStep,
            closeModal,
            nextStep,
            backStep,
            createPurchase,
            nama_Toko, 
            alamat_Toko,
            jenis_productSources,
            nama_productSources,
            ukuran_productSources,
            jumlah_productSources,
            pembelian_productSources,
            ongkosProses_productSources,
        };
    },
};
</script>
