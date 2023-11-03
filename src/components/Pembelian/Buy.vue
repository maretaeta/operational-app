<script>
import { ref, onMounted, watch } from 'vue';
import { useBuyStore } from "../../store/pembelian"
import VueFeather from "vue-feather";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ModalUpdatePembelian from "../../modals/ModalUpdatePembelian.vue"
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default {
    setup() {
        const steps = ["step1", "step2"];
        const selectedPembelianForEdit = ref(null);
        const showEditModal = ref(false);
        const buyStore = useBuyStore();

        const nama_toko = ref('');
        const alamat_toko = ref('');
        const jenis_productSources = ref('');
        const nama_productSources = ref('');
        const ukuran_productSources = ref('');
        const satuan_productSources = ref('');
        const jumlah_productSources = ref('');
        const pembelian_productSources = ref('');
        const ongkosProses_productSources = ref('');

        const showModal = ref(false);
        const success = ref(false);
        const selectedPembelian = ref(null);

        const closeModal = () => {
            showModal.value = false;
        };

        const editPembelian = (pembelianData) => {
            selectedPembelianForEdit.value = { ...pembelianData };
            showEditModal.value = true;
        };

        const createPurchase = async () => {
            const purchaseData = {
                nama_toko: nama_toko.value,
                alamat_toko: alamat_toko.value,
                jenis_productSources: jenis_productSources.value,
                nama_productSources: nama_productSources.value,
                ukuran_productSources: ukuran_productSources.value,
                satuan_productSources: satuan_productSources.value,
                jumlah_productSources: jumlah_productSources.value,
                pembelian_productSources: pembelian_productSources.value,
                ongkosProses_productSources: ongkosProses_productSources.value,
            };

            try {
                const response = await buyStore.createPurchase(purchaseData);
                console.log('Purchase creation successful:', response);
                notify();
                showModal.value = false;
            } catch (error) {
                console.error('Purchase creation error:', error);
            }
        };

        const notify = () => {
            toast.success("Pembelian berhasil dibuat", {
                position: 'top-right',
                duration: 3000,
            });
        };

        // modal pagination
        const currentStep = ref(buyStore.currentStep);

        const nextStep = () => {
            if (buyStore.currentStep < steps.length - 1) {
                currentStep.value = buyStore.currentStep + 1;
            }
        };

        const backStep = () => {
            if (currentStep.value > 0) {
                currentStep.value -= 1;
            }
        };

        // get product
        const pembelian = ref([]);
        async function getPembelian() {
            try {
                const response = await buyStore.getPembelian();
                if (Array.isArray(response)) {
                    pembelian.value = response;
                    calculateTotalPages();
                    updateDisplayedData();
                } else {
                    console.error("Respon API tidak valid:", response);
                }
            } catch (error) {
                console.error("Gagal mendapatkan data produk:", error);
            }
        }

        // delete produk
        const deleteProduct = async (id_productSources) => {
            try {
                await buyStore.deletePembelian(id_productSources);
                const index = pembelian.value.findIndex((item) => item.id_productSources === id_productSources);
                if (index !== -1) {
                    pembelian.value.splice(index, 1);
                }
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        };

        // Format rupiah
        function formatToRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }

        function formatHarga(harga) {
            return formatToRupiah(harga);
        }

        // Pagination variables
        const currentPage = ref(1);
        const itemsPerPage = 5;
        const totalPages = ref(1);
        const displayPembelian = ref([]);

        const updateDisplayedData = () => {
            const startIndex = (currentPage.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            displayPembelian.value = pembelian.value.slice(startIndex, endIndex);
        };


        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
                updateDisplayedData();
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
                updateDisplayedData();
            }
        };


        const calculateTotalPages = () => {
            totalPages.value = Math.ceil(pembelian.value.length / itemsPerPage);
        };

        const printPurchaseData = () => {
            const doc = new jsPDF({ orientation: 'landscape' });

            const tableData = [];
            const tableColumns = [
                'Id',
                'Tanggal',
                'Nama Toko',
                'Alamat Toko',
                'Jenis Produk',
                'Nama Produk',
                'Ukuran Produk',
                'Jumlah',
                'Harga Beli',
                'Ongkos',
                'Total Harga',
                'Harga PerLembar',
            ];

            tableData.push(tableColumns);

            pembelian.value.forEach((item) => {
                tableData.push([
                    item.id_productSources,
                    item.createdAt,
                    item.nama_toko,
                    item.alamat_toko,
                    item.jenis_productSources,
                    item.nama_productSources,
                    item.ukuran_productSources,
                    item.jumlah_productSources,
                    formatHarga(item.pembelian_productSources),
                    formatHarga(item.ongkosProses_productSources),
                    formatHarga(item.totalPembelian_productSources),
                    formatHarga(item.hargaPerLembar),
                ]);
            });

            doc.autoTable({
                head: [tableColumns],
                body: tableData.slice(1),
                startY: 20,
            });

            doc.save('pembelian.pdf');
        };


        onMounted(() => {
            getPembelian();
            calculateTotalPages();
            updateDisplayedData();
        });


        return {
            currentStep,
            nama_toko,
            alamat_toko,
            jenis_productSources,
            nama_productSources,
            ukuran_productSources,
            satuan_productSources,
            jumlah_productSources,
            pembelian_productSources,
            ongkosProses_productSources,
            createPurchase,
            steps,
            nextStep,
            success,
            showModal,
            closeModal,
            pembelian,
            backStep,
            closeModal(){
                showModal.value = false;
                 this.success = false;
            },
            getPembelian,
            openBuyModal() {
                showModal.value = true;
            },
            deleteProduct,
            formatHarga,
            notify,
            currentPage,
            itemsPerPage,
            displayPembelian,
            totalPages,
            updateDisplayedData,
            prevPage,
            nextPage,
            showModal,
            closeModal,
            selectedPembelian,
            editPembelian,
                  editPembelian,
            showEditModal,
            selectedPembelianForEdit,
            printPurchaseData,
        };
    },
    methods: {
        openBuyModal() {
            this.showModal = true;
        },
        
    },
    components: {
        VueFeather,
        ModalUpdatePembelian,

    }

};
</script>


<template>
    <div id="home" class="pl-0 lg:pl-64 w-full min-h-screen p-10 bg-slate-100 relative">
    <div class="bg-white min-h-screen rounded-xl p-8 ml-10">
    <div class="font-poppins text-sm font-semibold mb-6 ">
        <ol class="list-none p-0 pl-3 inline-flex">
            <li class="flex items-center text-purple">
                <p class="text-gray-700">Home</p>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
            </li>
            <li class="flex items-center">
                <p class="text-gray-600">Pembelian</p>
            </li>
        </ol>
    </div>
    <div class="items-center justify-center p-2">
        <div class="w-full">
            <h3 class="text-2xl font-medium text-gray-600">Data Pembelian</h3>
            <p class="text-sm text-gray-400 mb-6">Data pembelian kayu dari berbagai toko</p>
        <div  class="flex gap-3 justify-end items-start pb-5">
            <div class="flex gap-2 bg-cyan-800 text-white w-38 h-10 rounded-xl items-center text-center px-5" @click="openBuyModal">
                <vue-feather type="plus" size="17" />
                <p class="text-sm">Pembelian</p>
            </div>
        <div class="flex gap-2 bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3" @click="printPurchaseData">
            <vue-feather type="printer" size="17" />
            <p class="text-sm">Cetak</p>
        </div>
                
        </div>

    <!-- tabel data pembelian -->
    <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-x-auto sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 text-left">
                <thead>
                    <tr>
                        <th
                            class="px-5 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                            Id
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                            Tanggal
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                            Nama Toko
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                            Alamat Toko
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                            Jenis Produk
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                            Nama Produk
                        </th>
                         <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                Ukuran Produk
                            </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                           Jumlah
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                            Harga Beli
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                Ongkos
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                           Total Harga
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                Harga PerLembar
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                     <tr v-for="pembelianData in displayPembelian" :key="pembelianData.id_productSources" class="border-b border-gray-200">
                        <td class="px-6 py-4 whitespace-no-wrap text-center">
                            <p class="text-sm leading-5 font-medium text-gray-900">{{ pembelianData.id_productSources }}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap"> 
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ pembelianData.createdAt }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap"> 
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ pembelianData.nama_toko }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ pembelianData.alamat_toko }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ pembelianData.jenis_productSources }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ pembelianData.nama_productSources }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap ">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ pembelianData.ukuran_productSources }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ pembelianData.jumlah_productSources}}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(pembelianData.pembelian_productSources) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(pembelianData.ongkosProses_productSources) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{formatHarga(pembelianData.totalPembelian_productSources) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(pembelianData.hargaPerLembar)}}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-center flex gap-3">  
                            <vue-feather type="edit" size="20" stroke="green" @click="editPembelian(pembelianData)" />
                            <vue-feather type="trash-2" size="20" stroke="red" @click="deleteProduct(pembelianData.id_productSources)"  />

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>
    
      <!-- Pagination controls -->
      <div class="flex justify-end mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="cursor-pointer bg-gray-300 p-2 w-20 text-gray800 text-xs">Previous</button>
        <span class="p-2 text-xs">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="text-xs cursor-pointer bg-gray-300 text-gray-700 p-2 w-20">Next</button>
      </div>


    </div>

    

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
                <input type="text" v-model="nama_toko"
                     class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    placeholder="Nama Toko" />
            </div>
            <div class="mb-4">
                <label class="block mb-2 text-sm">Alamat Toko</label>
                <input type="text" v-model="alamat_toko"
                    class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    placeholder="Alamat Toko" />
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
                    <input type="text" v-model="nama_productSources"
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
                <div @click="backStep" class="flex justify-end gap-7">
                    <button 
                    class="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-black transition-colors duration-150 bg-slate-200 border border-transparent rounded-lg hover:bg-cyan-600 focus:outline-none">
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
    </div>
</div>

    <ModalUpdatePembelian
      v-if="showEditModal"
      :editedProduct="selectedPembelianForEdit"
      @close="showEditModal = false"
    />


</template>

