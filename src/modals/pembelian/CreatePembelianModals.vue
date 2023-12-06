<template>
    <div>
        <!-- Modal Create Pembelian -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 ">
            <div class="bg-white w-[90vw] md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto ">
                <div class="py-8 text-left px-9">
                    <h2 class="text-lg lg:text-xl text-cyan-800 font-semibold mb-7">Create Pembelian</h2>
                <div v-if="currentStep === 0">
                    <div class="w-full bg-gray-200 rounded-full">
                        <div class="w-1/2 rounded-full p-1 text-xs font-medium leading-none text-center"
                            :class="{ 'text-white bg-cyan-800 rounded-l-full': currentStep === 0, 'text-white  rounded-r-full': currentStep === 1 }">
                            Langkah 1
                        </div>
                    </div>

                    <div class="mt-8 mb-5">
                        <label class="block text-xs md:text-sm">Nama Toko</label>
                        <input
                            type="text"
                            v-model="purchaseData.nama_toko"
                            class="w-full px-4 py-2 text-xs md:text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-cyan-600"
                            placeholder="Nama Toko"
                            />
                    </div>
                    
                    <div class="mb-5">
                        <label class="block mb-2 text-xs md:text-sm">Alamat Toko</label>
                        <input
                            type="text"
                            v-model="purchaseData.alamat_toko"
                            class="w-full px-4 py-2 text-xs md:text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-cyan-600"
                            placeholder="Alamat Toko"
                        />
                    </div>
                    <div class="flex justify-end  gap-7">
                        <button @click="closeModal"
                            class="px-6 py-2 mt-4 text-xs md:text-sm font-medium leading-5 text-black transition-colors duration-150 bg-slate-100 border border-transparent rounded-lg hover:bg-cyan-400 focus:outline-none">
                            Cancel
                        </button>
                        <button @click="nextStep"
                            class="px-6 py-2 mt-4 text-xs md:text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-cyan-700 border border-transparent rounded-lg hover:bg-cyan-400 focus:outline-none">
                            Next
                        </button>
                    </div>
                    </div>

                    <!-- Langkah 2 -->
                    <div v-else-if="currentStep === 1"> 
                        <div class="w-full bg-gray-200 rounded-full flex justify-end">
                            <div class="w-1/2 rounded-full p-1 text-xs font-medium leading-none text-center"
                                :class="{ 'text-white bg-cyan-800 rounded-l-full w-1/2': currentStep === 1, 'text-white  rounded-r-full': currentStep === 2 }">
                                Langkah 2
                            </div>
                        </div>
                        <div class="mt-9 mb-5">
                            <label class="block text-xs md:text-sm">Jenis Kayu</label>
                            <input type="text" v-model="purchaseData.jenis_productSources"
                                class="w-full px-4 py-2 text-xs md:text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Jenis Kayu" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-xs md:text-sm">Nama Kayu</label>
                            <input type="text" v-model="purchaseData.nama_productSources"
                                class="w-full px-4 py-2 text-xs md:text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Nama Kayu" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-xs md:text-sm">Ukuran</label>
                            <input v-model="purchaseData.ukuran_productSources"
                                class="w-full px-4 py-2 text-xs  md:text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Ukuran" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-xs md:text-sm">Jumlah</label>
                            <input v-model="purchaseData.jumlah_productSources"
                                class="w-full px-4 py-2 text-xs md:text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Jumlah" type="number" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-xs md:text-sm">Harga</label>
                            <input v-model="purchaseData.pembelian_productSources"
                                class="w-full px-4 py-2 text-xs md:text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Harga" type="number" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-xs md:text-sm">Ongkos Kirim</label>
                            <input v-model="purchaseData.ongkosProses_productSources"
                                class="w-full px-4 py-2 text-xs md:text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Ongkos Kirim" type="number" />
                        </div>
                        <div class="flex justify-end gap-7">
                            <button @click="backStep"
                                class="px-6 py-2 mt-4 text-xs md:text-sm font-medium leading-5 text-black transition-colors duration-150 bg-slate-200 border border-transparent rounded-lg hover:bg-cyan-600 focus:outline-none">
                                Back
                            </button>
                            <button @click="createPurchase"
                            class="px-6 py-2 mt-4 text-xs md:text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-cyan-700 border border-transparent rounded-lg hover:bg-cyan-600 focus:outline-none">
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
import { ref,} from 'vue';
import { useBuyStore } from '../../store/pembelian';

export default {
    props: {
        pembelian: Array,
        showModal: Boolean,
        onCloseModal: Function,
        onCreatePurchase: Function,
        purchaseData: Object,
        currentStep: Number,
        updateDisplayedData:Function,
        notify: Function
    },

    setup(props, { emit }) {
        const currentStep = ref(0);
        const buyStore = useBuyStore();
        
        const purchaseData = ref({
            nama_toko: '',
            alamat_toko: '',
            jenis_productSources: '',
            nama_productSources: '',
            ukuran_productSources: '',
            jumlah_productSources: '',
            pembelian_productSources: '',
            ongkosProses_productSources: '',
        });

       const createPurchase = async () => {
            try {
                const response = await buyStore.createPurchase({
                    nama_toko: purchaseData.value.nama_toko,
                    alamat_toko: purchaseData.value.alamat_toko,
                    jenis_productSources: purchaseData.value.jenis_productSources,
                    nama_productSources: purchaseData.value.nama_productSources,
                    ukuran_productSources: purchaseData.value.ukuran_productSources,
                    jumlah_productSources: parseInt(purchaseData.value.jumlah_productSources),
                    pembelian_productSources: parseInt(purchaseData.value.pembelian_productSources),
                    ongkosProses_productSources: parseInt(purchaseData.value.ongkosProses_productSources)
                });

               if (response) {
                    console.log('Purchase creation successful:', response);
                    props.pembelian.push(response);
                    props.updateDisplayedData()
                    props.onCloseModal();
                    props.notify();
                   
                }

            } catch (error) {
                console.error('Purchase creation error:', error);
            }
        };

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

        return {
            currentStep,
            purchaseData,
            closeModal,
            nextStep,
            backStep,
            createPurchase,
        };
    },
};
</script>
