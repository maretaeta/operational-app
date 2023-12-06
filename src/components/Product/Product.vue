<template>
<div class="pl-0 lg:pl-52 xl:pl-56 w-full min-h-screen p-7 xl:p-10 bg-slate-100 relative">
    <div class="bg-white min-h-screen rounded-xl p-8 ml-10">
    <div class="font-poppins text-sm font-semibold mb-6">
        <ol class="list-none p-0 pl-3 inline-flex">
            <li class="flex items-center text-purple">
                <p class="text-gray-700">Home</p>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                    </path>
                </svg>
            </li>
            <li class="flex items-center">
                <p class="text-gray-600">Produk</p>
            </li>
        </ol>
    </div>

    <div class="items-center justify-center p-2">
        <div class="w-full mb-8">
            <h3 class=" text-2xl font-medium text-gray-600">Data Produk</h3>
            <p class="text-sm text-gray-400">Ketersedian produk kayu saat ini</p>
        </div>
        <div class="flex gap-3 justify-end items-start pb-5">
            <div class="flex gap-2 bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3">
            <vue-feather type="printer" size="17" @click="printProductData" />
            <p class="text-sm">Cetak</p>
            </div>
        </div>

        <!-- Table -->
        <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-x-auto sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 text-left">
                            <thead>
                                <tr>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        No
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Jenis Produk
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Nama Produk
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Ukuran Produk
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Stok Produk
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Harga Per Lembar
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Keuntungan
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                        Harga Jual
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                                <tr v-for="(i, index) in sortedProduk" :key="i.id_product" class="border-b border-gray-200">
                                    <td class="px-4 py-4 whitespace-no-wrap text-center">
                                        <p class="text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                                    </td>
                                    <td class="px-4 py-4 whitespace-no-wrap">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.jenis_product }}</div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-no-wrap">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.nama_product }}</div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-no-wrap  ">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.ukuran_product }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-no-wrap  ">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.stok_product }}</div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-no-wrap  ">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{
                                            formatHarga(i.harga_product) }}</div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-no-wrap  ">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{
                                            formatHarga(i.keuntungan) }}</div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-no-wrap  ">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(i.hargaJual)
                                        }}</div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-no-wrap text-center flex gap-3">
                                        <vue-feather type="edit" size="20" stroke="green" @click="openEditModal(i)" />
                                        <!-- <vue-feather type="trash-2" size="20" stroke="red"
                                            @click="deleteProduct(i.id_product)" />
                                         -->
                                         <vue-feather type="trash-2"
                                            size="20"
                                            stroke="red"
                                            @click="deleteProductConfirmation(i.id_product)"
                                        />
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
            <button @click="prevPage" :disabled="currentPage === 1" class="text-xs cursor-pointer bg-gray-300 p-2 w-20 rounded">
              Previous
            </button>
            <div class="mx-2 p-2 text-xs">
              Page {{ currentPage }} of {{ totalPages }}
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="text-xs cursor-pointer bg-gray-300 p-2 w-20 rounded">
              Next
            </button>
          </div>
        </div>

        <AlertDelete
            :showDeleteConfirmation="showDeleteConfirmation"
            @confirm-delete="confirmDelete"
            @cancel-delete="cancelDelete"
        />

            <EditKeuntungan
            :editedProduct="editedProduct"
            :openEditModal="openEditModal"
            :closeEditModal="closeEditModal"
            :submitEdit="submitEdit"
        />

    </div>
</div>


</template>


<script>
import { ref, onMounted, computed } from "vue";
import { ProdukStore } from "../../store/product";
import VueFeather from "vue-feather";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AlertDelete from "../../modals/product/AlertDelete.vue";
import EditKeuntungan from "../../modals/product/EditKeuntungan.vue";

export default {
    setup() {
        const produk = ref([]);
        const produkStore = ProdukStore();
        const editedProduct = ref(null);
        const itemsPerPage = 10;
        const currentPage = ref(1);
        const showDeleteConfirmation = ref(false);
        const selectedProductId = ref(null);    

        // Get Product
        async function getProduct() {
            try {
                const response = await produkStore.getProduct();
                if (Array.isArray(response)) {
                    produk.value = response;
                } else {
                    console.error("Respon API tidak valid:", response);
                }
            } catch (error) {
                console.error("Gagal mendapatkan data produk:", error);
            }
        }

        // descending
        const sortedProduk = computed(() => {
            return [...produk.value].sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        });

        // pagination
        const displayedProducts = computed(() => {
            const startIndex = (currentPage.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return produk.value.slice(startIndex, endIndex);
        });

        const totalPages = computed(() => Math.ceil(produk.value.length / itemsPerPage));

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        // modal
        const openEditModal = (product) => {
            editedProduct.value = { ...product };
        };

        const closeEditModal = () => {
            editedProduct.value = null;
        };

        // edit keuntungan produk
        const submitEdit = async () => {
            if (editedProduct.value) {
                const hargaProduct = parseFloat(editedProduct.value.harga_product);
                const keuntungan = parseInt(editedProduct.value.keuntungan);
                await produkStore.updateProduct(editedProduct.value, {
                    harga_product: hargaProduct,
                    keuntungan: keuntungan,
                });
                closeEditModal();
                keuntunganNotif();
                getProduct();
            }
        };
        

        // Delete produk
        const deleteProductConfirmation = (productId) => {
            selectedProductId.value = productId;
            showDeleteConfirmation.value = true; 
        };


        const deleteProduct = async (id) => {
            selectedProductId.value = id; 
            showDeleteConfirmation.value = true; 
        };

        const confirmDelete = async () => {
            if (selectedProductId.value) {
                try {
                    await produkStore.deleteProduct(selectedProductId.value);
                    showDeleteConfirmation.value = false;
                    getProduct();
                    selectedProductId.value = null;
                } catch (error) {
                    console.error("Error deleting product:", error);
                }
            }
        };

        const cancelDelete = () => {
            showDeleteConfirmation.value = false;
            editedProduct.value = null;
        };


        // Notif Keuntungan
        const keuntunganNotif = () => {
            toast.success("Keuntungan berhasil dibuat", {
                position: 'top-right',
                duration: 1000,
            });
        }

        // Format Rupiah
        function formatToRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }

        function formatHarga(harga) {
            return formatToRupiah(harga);
        }

        // print data
        const printProductData = () => {
            const doc = new jsPDF({ orientation: 'landscape' });

            const tableData = [];
            const columns = [
                'ID',
                'Jenis Produk',
                'Nama Produk',
                'Ukuran Produk',
                'Stok Produk',
                'Harga Per Lembar',
                'Keuntungan',
                'Harga Jual',
            ];

            tableData.push(columns);

            // Data tabel
            produk.value.forEach((product) => {
                tableData.push([
                    product.id_product,
                    product.jenis_product,
                    product.nama_product,
                    product.ukuran_product,
                    product.stok_product,
                    formatHarga(product.harga_product),
                    formatHarga(product.keuntungan),
                    formatHarga(product.hargaJual),
                ]);
            });

            doc.autoTable({
                head: [tableData[0]],  
                body: tableData.slice(1),  
                startY: 20,
            });

            doc.save('produk.pdf');
        };


        onMounted(() => {
            getProduct();
        });

        return {
            produk,
            displayedProducts,
            editedProduct,
            openEditModal,
            closeEditModal,
            submitEdit,
            deleteProduct,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
            formatHarga,
            keuntunganNotif,
            printProductData, 
            showDeleteConfirmation,
            selectedProductId,
            deleteProductConfirmation,
            confirmDelete,
            cancelDelete,
            sortedProduk,

        };
    },
    
    components: {
        VueFeather,
        AlertDelete,
        EditKeuntungan,
    },
};
</script>
