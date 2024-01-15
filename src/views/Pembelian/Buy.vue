<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useBuyStore } from "../../store/pembelian"
import VueFeather from "vue-feather";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ModalPembelian from "../../modals/pembelian/CreatePembelianModals.vue"
import ModalUpdatePembelian from '../../modals/pembelian/ModalUpdatePembelian.vue';
import AlertDeletePembelian from '../../modals/pembelian/AlertDeletePembelian.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { message } from 'ant-design-vue'
import { Spin } from "ant-design-vue";

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
        const jumlah_productSources = ref('');
        const pembelian_productSources = ref('');
        const ongkosProses_productSources = ref('');

        const showModal = ref(false);
        const success = ref(false);
        const selectedPembelian = ref(null);

        const isDeleteConfirmationVisible = ref(false);
        const selectedDeleteId = ref(null);

        const pembelian = ref([]);

        const selectedJenisKayu = ref(null);

        const isDataLoaded = ref(false);

        const closeModal = () => {
            showModal.value = false;
        };

        // create pembelian
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

        // create pembelian
        const createPurchase = async () => {
            if (
                !purchaseData.value.nama_toko ||
                !purchaseData.value.alamat_toko ||
                !purchaseData.value.jenis_productSources ||
                !purchaseData.value.nama_productSources ||
                !purchaseData.value.ukuran_productSources ||
                !purchaseData.value.jumlah_productSources ||
                !purchaseData.value.pembelian_productSources ||
                !purchaseData.value.ongkosProses_productSources
            ) {
                toast.error("Semua data harus diisi", {
                    position: 'top-right',
                    duration: 3000,
                });
                return;
            }

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
                    pembelian.value.push(response);
                    calculateTotalPages();
                    updateDisplayedData();
                }

                // Reset purchaseData after successful creation
                purchaseData.value = {
                    nama_toko: '',
                    alamat_toko: '',
                    jenis_productSources: '',
                    nama_productSources: '',
                    ukuran_productSources: '',
                    jumlah_productSources: '',
                    pembelian_productSources: '',
                    ongkosProses_productSources: '',
                };

                showModal.value = false;
                notify();

            } catch (error) {
                console.error('Purchase creation error:', error);

                if (error?.code === 'P2025') {
                    toast.error("Toko dengan nama tersebut sudah ada", {
                        position: 'top-right',
                        duration: 3000,
                    });
                } else {
                    toast.error("Terjadi kesalahan saat membuat pembelian", {
                        position: 'top-right',
                        duration: 3000,
                    });
                }
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
            if (currentStep.value < 1) {
                currentStep.value += 1;
            }
        };

         const backStep = () => {
            if (currentStep.value > 0) {
                currentStep.value -= 1;
            }
        };

        // get product
        const getPembelian = async () => {
            try {
                const response = await buyStore.getPembelian();
                if (Array.isArray(response)) {
                    pembelian.value = response;
                    calculateTotalPages();
                    updateDisplayedData();
                    getUniqueJenisKayu();
                    isDataLoaded.value = true;
                } else {
                    console.error("Respon API tidak valid:", response);
                }
            } catch (error) {
                console.error("Gagal mendapatkan data produk:", error);
            }
        };

        // delete produk
        const deleteProduct = async (id_productSources) => {
            try {
                await buyStore.deletePembelian(id_productSources);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        };

        const showDeleteConfirmationModal = (id) => {
            selectedDeleteId.value = id;
            isDeleteConfirmationVisible.value = true;
        };

        const deleteConfirmed = async () => {
            try {
                await deleteProduct(selectedDeleteId.value);
                const index = pembelian.value.findIndex(item => item.id_productSources === selectedDeleteId.value);
                if (index !== -1) {
                    pembelian.value.splice(index, 1);
                    
                    calculateTotalPages();
                    updateDisplayedData();
                     message.success({
                        content: 'Deleted successfully',
                        duration: 3,
                        style: {
                            fontSize: '17px',
                        },
                    });
                }
                isDeleteConfirmationVisible.value = false;
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        };


        const cancelDelete = () => {
            selectedDeleteId.value = null;
            isDeleteConfirmationVisible.value = false;
        };



        const editPembelian = (pembelianData) => {
            selectedPembelianForEdit.value = pembelianData;
            showEditModal.value = true;
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
        const itemsPerPage = 10;
        const totalPages = ref(1);
        const displayPembelian = ref([]);

        const updateDisplayedData = () => {
            const startIndex = (currentPage.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            displayPembelian.value = pembelian.value.slice(startIndex, endIndex);
        };

        // preview page
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
                    totalPages.value = Math.ceil(filteredAndSearchedPembelian.value.length / itemsPerPage);
                };


        // format date
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', options);
        };

        const sortedPembelian = computed(() => {
            return [...pembelian.value].sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        });

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

        const openBuyModal = () => {
            showModal.value = true;
        };

        // filter jenis
        const uniqueJenisKayu = ref([]);

        const getUniqueJenisKayu = () => {
            const uniqueValues = [...new Set(pembelian.value.map(item => item.jenis_productSources))];
            uniqueJenisKayu.value = uniqueValues;
        };

        const filteredPembelian = computed(() => {
            if (selectedJenisKayu.value) {
                return pembelian.value.filter(item => item.jenis_productSources === selectedJenisKayu.value);
            } else {
                return pembelian.value;
            }
        });

        const filterByJenisKayu = () => {
            updateDisplayedData();
        };

        // search
        const searchQuery = ref('');

        const searchPembelian = () => {
            const query = searchQuery.value.toLowerCase().trim();

            if (!query) {
                getPembelian();
            } else {
                filteredPembelian.value = pembelian.value.filter((item) => {
                    return Object.values(item).some((value) => {
                        if (value !== null && value !== undefined) {
                            return value.toString().toLowerCase().includes(query);
                        }
                        return false;
                    });
                });
                currentPage.value = 1; 
                calculateTotalPages(); 
                updateDisplayedData();
            }
        };


        const filteredAndSearchedPembelian = computed(() => {
            const query = searchQuery.value.toLowerCase().trim();

            if (query && selectedJenisKayu.value) {
                // If both search query and jenis kayu are selected, filter based on both
                return filteredPembelian.value.filter((item) => {
                    return (
                        item.nama_toko.toLowerCase().includes(query) ||
                        item.alamat_toko.toLowerCase().includes(query) ||
                        item.jenis_productSources.toLowerCase().includes(query) ||
                        item.nama_productSources.toLowerCase().includes(query) ||
                        item.ukuran_productSources.toLowerCase().includes(query) ||
                        item.jumlah_productSources.toString().toLowerCase().includes(query) ||
                        item.pembelian_productSources.toString().toLowerCase().includes(query) ||
                        item.ongkosProses_productSources.toString().toLowerCase().includes(query) ||
                        item.totalPembelian_productSources.toString().toLowerCase().includes(query) ||
                        item.hargaPerLembar.toString().toLowerCase().includes(query)
                    );
                });
            } else if (query) {
                // If only the search query is selected
                return pembelian.value.filter((item) => {
                    return (
                        item.nama_toko.toLowerCase().includes(query) ||
                        item.alamat_toko.toLowerCase().includes(query) ||
                        item.jenis_productSources.toLowerCase().includes(query) ||
                        item.nama_productSources.toLowerCase().includes(query) ||
                        item.ukuran_productSources.toLowerCase().includes(query) ||
                        item.jumlah_productSources.toString().toLowerCase().includes(query) ||
                        item.pembelian_productSources.toString().toLowerCase().includes(query) ||
                        item.ongkosProses_productSources.toString().toLowerCase().includes(query) ||
                        item.totalPembelian_productSources.toString().toLowerCase().includes(query) ||
                        item.hargaPerLembar.toString().toLowerCase().includes(query)
                    );
                });
            } else {
                return filteredPembelian.value;
            }
        });

        
       onMounted(() => {
            getPembelian();
            calculateTotalPages();
            calculateTotalPages();
            updateDisplayedData();
            getUniqueJenisKayu();
        });


        watch(() => buyStore.pembelian, () => {
            pembelian.value = [...buyStore.pembelian];
            calculateTotalPages();
            updateDisplayedData();
            getUniqueJenisKayu();
        });

         watch(() => buyStore.currentStep, (newStep) => {
            currentStep.value = newStep;
        });

        watch(() => filteredPembelian.value, () => {
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
            editPembelian,
            getPembelian,
            openBuyModal,
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
            showEditModal,
            selectedPembelianForEdit,
            printPurchaseData,
            formatDate,
            sortedPembelian,
            isDeleteConfirmationVisible,
            selectedDeleteId,
            showDeleteConfirmationModal,
            deleteConfirmed,
            cancelDelete,
            purchaseData,
            filterByJenisKayu,
            uniqueJenisKayu,
            getUniqueJenisKayu,
            selectedJenisKayu,
            filteredPembelian,
            searchQuery,
            searchPembelian,
            filteredAndSearchedPembelian,
            isDataLoaded,
            
        };
    },
    methods: {
        openBuyModal() {
            this.showModal = true;
        },

         showDeleteConfirmationModal(id) {
            this.selectedDeleteId = id;
            this.isDeleteConfirmationVisible = true;
        },

        

    },
    components: {
        VueFeather,
        ModalUpdatePembelian,
        ModalPembelian,
        AlertDeletePembelian,
        Spin,

    }

};
</script>

<template>
    <div class=" pl-0 lg:pl-52 xl:pl-60 w-full min-h-screen p-4 md:p-7 xl:p-10 bg-slate-100 relative">
         <a-spin v-if="!isDataLoaded" size="large" class="flex items-center justify-center min-h-screen" />
    <div v-if="isDataLoaded" class="bg-white min-h-screen rounded-xl p-7 ml-7">
    <div class="font-poppins font-semibold mb-6 pt-3">
        <h3 class="text-xl xl:text-2xl font-medium text-gray-700 pl-3 pb-3">Data Pembelian</h3>
        <ol class="list-none p-0 pl-3 inline-flex text-sm">
            <li class="flex items-center text-purple">
                <p class="text-gray-700">Dashboard</p>
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
           <div class="flex flex-col lg:flex-row lg:justify-between pb-7 pt-5">

        <div class="flex flex-col md:flex-row gap-3 justify-between pb-8 lg:pb-5">
            <div @click="openBuyModal" class="flex bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3 text-xs xl:text-sm">
                <vue-feather type="plus" size="17" />
                <p class="m-2">Create</p>
            </div>

            
        </div>

        <div class="flex flex-col md:flex-row gap-2 justify-end pb-5">
            <div class="relative text-gray-500">
                   <input
                        v-model="searchQuery"
                        type="search"
                        name="search"
                        placeholder="Search..."
                        class="bg-white h-10 w-full xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
                    />

                    <button
                        type="submit"
                        @click="searchPembelian"
                        class="absolute right-0 top-0 mt-3 mr-4 focus:outline-none hover:text-purple-600"
                    >
                        <svg
                            class="h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            id="Capa_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 56.966 56.966"
                            style="enable-background:new 0 0 56.966 56.966;"
                            xml:space="preserve"
                            width="512px"
                            height="512px"
                        >
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>

            <div class="bg-cyan-800 px-4 flex rounded-xl items-center text-center text-xs xl:text-sm" @click="filterByJenisKayu">
                <vue-feather type="filter" size="17" class="text-white " />
                <p class=" text-white m-1 ">Filter</p>
                <select v-model="selectedJenisKayu" @change="filterByJenisKayu" class="bg-transparent focus:outline-none text-white ">
                    <option v-for="jenisKayu in uniqueJenisKayu" :value="jenisKayu" class="text-black text-sm">{{ jenisKayu }}</option>
                </select>
            </div>

            <div class="bg-cyan-800 text-white px-4 flex rounded-xl items-center text-center text-xs xl:text-sm" @click="printPurchaseData">
                <vue-feather type="printer" size="16" />
                <p class="m-2">Print</p>
            </div>
        </div>
    </div>


    <!-- tabel data pembelian -->
    <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-x-auto sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 text-left">
                <thead>
                    <tr class="capitalize">
                         <th
                            class="px-5 py-3 bg-cyan-600 text-white text-center text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                            No
                        </th>
                        <th
                            class="px-8 py-3 bg-cyan-600 text-white  text-xs xl:text-sm leading-4 font-medium tracking-wider">
                            Tanggal
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                            Nama Toko
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                            Alamat Toko
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                            Jenis Produk
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                            Nama Produk
                        </th>
                         <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                                Ukuran Produk
                            </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                           Jumlah
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                            Harga Beli
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                                Ongkos
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                           Total Harga
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                                Harga PerLembar
                        </th>
                        <th
                            class="px-6 py-3 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium  tracking-wider">
                            Aksi
                        </th>
                    </tr>
                </thead>
               <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                    <tr v-if="filteredAndSearchedPembelian.length === 0" class="border-b border-gray-200">
                        <td colspan="13" class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700">
                        purches data have been made yet.
                        </td>
                    </tr>
                    <tr v-else v-for="(pembelianData, index) in filteredAndSearchedPembelian" :key="pembelianData.id_productSources" class="border-b border-gray-200">
                        <td class="px-6 py-4 whitespace-no-wrap text-center">
                            <p class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                        </td>
                        <td class="px-3 py-3 text-center whitespace-no-wrap"> 
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatDate(pembelianData.createdAt) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap"> 
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ pembelianData.nama_toko }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ pembelianData.alamat_toko }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ pembelianData.jenis_productSources }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ pembelianData.nama_productSources }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap ">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ pembelianData.ukuran_productSources }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ pembelianData.jumlah_productSources}}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(pembelianData.pembelian_productSources) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(pembelianData.ongkosProses_productSources) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{formatHarga(pembelianData.totalPembelian_productSources) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap">  
                            <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(pembelianData.hargaPerLembar)}}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-center flex gap-3">  
                            <vue-feather type="edit" size="20" stroke="green" @click="editPembelian(pembelianData)" />
                           <vue-feather type="trash-2" size="20" stroke="red" @click="showDeleteConfirmationModal(pembelianData.id_productSources)" />
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
        <button @click="prevPage" :disabled="currentPage === 1" class="cursor-pointer bg-gray-200 p-2 w-20 text-gray-800 text-xs">Previous</button>
            <span class="p-2 text-xs">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="text-xs cursor-pointer bg-gray-200 text-gray-700 p-2 w-20">Next</button>
        </div>
            </div>
        </div>
    </div>
</div>

    <ModalPembelian
          :showModal="showModal"
          :onCloseModal="closeModal"
          :onCreatePurchase="createPurchase"
          :purchaseData="purchaseData"
          :currentStep="currentStep"
          :pembelian="pembelian"
          :updateDisplayedData="updateDisplayedData" 
          :notify="notify"
          @nextStep="nextStep"
          @backStep="backStep"
        />
    

    <ModalUpdatePembelian
      v-if="showEditModal"
      :editedProduct="selectedPembelianForEdit"
      @close="showEditModal = false"
    />

     <AlertDeletePembelian 
        :showDeleteConfirmation="isDeleteConfirmationVisible"
        @confirm-delete="deleteConfirmed"
        @cancel-delete="cancelDelete"
      />

</template>

