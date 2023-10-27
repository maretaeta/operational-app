<template>
    <div class="pl-0 lg:pl-64 w-full min-h-screen p-6">
    <div class="font-poppins text-sm font-semibold mb-6">
        <!-- Navigation -->
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
        <div  class="flex gap-3 justify-end items-start pb-5">
             <div class="flex gap-2 bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3">
                    <vue-feather type="printer" size="17" />
                    <p class="text-sm">Cetak</p>
                 </div>
        </div>

        <!-- Table -->
        <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th
                                        class="px-6 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th
                                        class="px-6 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Jenis Produk
                                    </th>
                                    <th
                                        class="px-6 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Nama Produk
                                    </th>
                                    <th
                                        class="px-6 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Ukuran Produk
                                    </th>
                                    <th
                                        class="px-6 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Stok Produk
                                    </th>
                                    <th
                                        class="px-6 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Harga Per Lembar
                                    </th>
                                    <th
                                        class="px-6 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Keuntungan
                                    </th>
                                    <th
                                        class="px-6 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Harga Jual
                                    </th>
                                    <th
                                        class="px-6 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                                <tr v-for="(i, index) in displayedProducts" :key="i.id_product"
                                    class="border-b border-gray-200">
                                    <td class="px-5 py-3 whitespace-no-wrap text-center">
                                        <div class="ml-4">
                                            <p class="text-sm leading-5 font-medium text-gray-900">{{ i.id_product }}</p>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.createdAt }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.jenis_product }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.nama_product }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.ukuran_product }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ i.stok_product }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{
                                            formatHarga(i.harga_product) }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{
                                            formatHarga(i.keuntungan) }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                                        <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(i.hargaJual)
                                        }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center flex gap-3">
                                        <vue-feather type="edit" size="20" stroke="green" @click="openEditModal(i)" />
                                        <vue-feather type="trash-2" size="20" stroke="red"
                                            @click="deleteProduct(i.id_product)" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal for editing data -->
        <div v-if="editedProduct" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div class="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-10 text-left px-6">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Edit Keuntungan</h2>
                    <form @submit.prevent="submitEdit">
                        <div class="mb-4">
                            <label for="harga_product" class="block text-sm font-medium text-gray-700">Harga Product</label>
                            <input v-model="editedProduct.harga_product" type="number"
                                class="mt-1 p-2 w-full border rounded">
                        </div>
                        <div class="mb-4">
                            <label for="keuntungan" class="block text-sm font-medium text-gray-700">Keuntungan</label>
                            <input v-model="editedProduct.keuntungan" type="number" class="mt-1 p-2 w-full border rounded">
                        </div>
                        <div class="mt-6 flex justify-end">
                            <button @click="submitEdit" class="bg-cyan-700 px-4 py-3 text-white rounded">Simpan</button>
                            <button @click="closeEditModal"
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4">Batal</button>
                    </div>
                </form>
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
</template>


<script>
import { ref, onMounted, computed } from "vue";
import { ProdukStore } from "../store/product";
import VueFeather from "vue-feather";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    setup() {
        const produk = ref([]);
        const produkStore = ProdukStore();
        const editedProduct = ref(null);
        const itemsPerPage = 5;
        const currentPage = ref(1);

        // Function to fetch and update products
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

        // Computed property to slice the displayed products
        const displayedProducts = computed(() => {
            const startIndex = (currentPage.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return produk.value.slice(startIndex, endIndex);
        });

        // Computed property to calculate the total number of pages
        const totalPages = computed(() => Math.ceil(produk.value.length / itemsPerPage));

        // Method to change the current page to the next page
        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        // Method to change the current page to the previous page
        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        // Function to open the edit modal
        const openEditModal = (product) => {
            editedProduct.value = { ...product };
        };

        // Function to close the edit modal
        const closeEditModal = () => {
            editedProduct.value = null;
        };

        // Function to submit the edited product
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

        // Function to delete a product
        const deleteProduct = async (id) => {
            try {
                await produkStore.deleteProduct(id);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        };

        // Function to display a success toast for keuntungan creation
        const keuntunganNotif = () => {
            toast.success("Keuntungan berhasil dibuat", {
                position: 'top-right',
                duration: 3000,
            });
        }

        // Function to format a number to Indonesian Rupiah
        function formatToRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }

        // Function to format harga in Indonesian Rupiah
        function formatHarga(harga) {
            return formatToRupiah(harga);
        }

        // Fetch products when the component is mounted
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
        };
    },
    components: {
        VueFeather,
    },
};
</script>
