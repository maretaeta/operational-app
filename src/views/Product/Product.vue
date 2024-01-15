<template>
<div class="pl-0 lg:pl-52 xl:pl-64 w-full min-h-screen p-4 md:p-7 xl:p-10 bg-slate-100 relative">
      <a-spin v-if="!isDataLoaded" size="large" class="flex items-center justify-center min-h-screen w-full h-full" />
    <div v-if="isDataLoaded" class="bg-white min-h-screen rounded-xl p-7 ml-7">
    <div class="font-poppins font-semibold mb-6 pt-3">
        <h3 class="text-xl xl:text-2xl font-medium text-gray-700 pl-3 pb-3">Data Produk</h3>
        <ol class="list-none p-0 pl-3 inline-flex text-xs xl:text-sm">
            <li class="flex items-center text-purple">
                <p class="text-gray-700">Dashboard</p>
                <svg class="fill-cyan-800 w-3 mb-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
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
        <!-- Filter Section -->
       <div class="flex gap-3 justify-end items-start pb-8 pt-5">
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
                @click="searchProducts"
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
                                <path
                                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                            </svg>
                        </button>
                    </div>


            <div class="flex bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3  text-xs xl:text-sm">
                <vue-feather type="printer" size="17" @click="printProductData" />
                <p class="m-2">Print</p>
            </div>
        </div>

        <!-- Table -->
        <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-x-auto sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 text-left">
                            <thead>
                                <tr class="capitalize">
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white text-center    text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        No
                                    </th>
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white     text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        Jenis Produk
                                    </th>
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white     text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        Nama Produk
                                    </th>
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white     text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        Ukuran Produk
                                    </th>
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white     text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        Stok Produk
                                    </th>
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white     text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        Harga Per Lembar
                                    </th>
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white     text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        Keuntungan
                                    </th>
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white     text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        Harga Jual
                                    </th>
                                    <th
                                        class="px-4 py-3 bg-cyan-600 text-white text-center    text-xs xl:text-sm leading-4 font-medium    tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                                <tr v-if="displayedProducts.length === 0" class="border-b border-gray-200">
                                    <td colspan="9" class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700">
                                        No products have been made yet.
                                    </td>
                                </tr>
                                <tr v-else v-for="(i, index) in displayedProducts" :key="i.id_product" class="border-b border-gray-200">
                                    <td class="px-4 py-3 whitespace-no-wrap text-center">
                                        <p class="   text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                                    </td>
                                    <td class="px-4 py-3 whitespace-no-wrap">
                                        <div class="   text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ i.jenis_product }}</div>
                                    </td>
                                    <td class="px-4 py-3 whitespace-no-wrap">
                                        <div class="   text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ i.nama_product }}</div>
                                    </td>
                                    <td class="px-4 py-3 whitespace-no-wrap  ">
                                        <div class="   text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ i.ukuran_product }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 whitespace-no-wrap  ">
                                        <div class="   text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ i.stok_product }}</div>
                                    </td>
                                    <td class="px-4 py-3 whitespace-no-wrap  ">
                                        <div class="   text-xs xl:text-sm leading-5 font-medium text-gray-900">{{
                                            formatHarga(i.harga_product) }}</div>
                                    </td>
                                    <td class="px-4 py-3 whitespace-no-wrap  ">
                                        <div class="   text-xs xl:text-sm leading-5 font-medium text-gray-900">{{
                                            formatHarga(i.keuntungan) }}</div>
                                    </td>
                                    <td class="px-4 py-3 whitespace-no-wrap  ">
                                        <div class="   text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(i.hargaJual)
                                        }}</div>
                                    </td>
                                    <td class="px-4 py-3 whitespace-no-wrap text-center flex gap-3">
                                        <vue-feather type="edit" size="20" stroke="green" @click="openEditModal(i)" />
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
        <button @click="prevPage" :disabled="currentPage === 1" class="text-xs cursor-pointer bg-gray-200 p-2 w-20 rounded">
          Previous
        </button>
        <div class="mx-2 p-2 text-xs">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="text-xs cursor-pointer bg-gray-200 p-2 w-20 rounded">
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
import { ref, onMounted, computed, watch } from "vue";
import { ProdukStore } from "../../store/product";
import VueFeather from "vue-feather";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AlertDelete from "../../modals/product/AlertDelete.vue";
import EditKeuntungan from "../../modals/product/EditKeuntungan.vue";
import {message} from 'ant-design-vue'
import { Spin } from "ant-design-vue";

export default {
    setup() {
        const produk = ref([]);
        const produkStore = ProdukStore();
        const editedProduct = ref(null);
        const itemsPerPage = 10;
        const currentPage = ref(1);
        const showDeleteConfirmation = ref(false);
        const selectedProductId = ref(null);
        const searchQuery = ref('');
          const isDataLoaded = ref(false);

        // Get Product
        async function getProduct() {
            try {
                const response = await produkStore.getProduct();
                if (Array.isArray(response)) {
                    produk.value = response;
                    isDataLoaded.value = true;
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
       // pagination
        const displayedProducts = computed(() => {
            const startIndex = (currentPage.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return filteredProducts.value.slice(startIndex, endIndex);
        });


       const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

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

                message.success({
                    content: 'Profit data successfully created',
                    duration: 3,  
                    style: {
                        fontSize: '17px',  
                    },
                });
                closeEditModal();
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
                     message.success({
                        content: 'Deleted successfully',
                        duration: 3,
                        style: {
                            fontSize: '17px',
                        },
                    });
                } catch (error) {
                    console.error("Error deleting product:", error);
                }
            }
        };

        const cancelDelete = () => {
            showDeleteConfirmation.value = false;
            editedProduct.value = null;
        };


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

        const woodTypes = computed(() => produkStore.woodTypes);
        const selectedWoodType = ref('');

        const filterProductsByWoodType = async () => {
            try {
                const selectedWoodTypeValue = selectedWoodType.value.trim();

                if (!selectedWoodTypeValue) {
                    console.error("Selected wood type is empty");
                    return;
                }

                const filteredProducts = await produkStore.filterProductsByType(selectedWoodTypeValue);

                produk.value = filteredProducts;
                currentPage.value = 1;
            } catch (error) {
                console.error("Error filtering products:", error);
            }
        };


        const onMounted = async () => {
            await produkStore.filterProductsType();
            selectedWoodType.value = ''; 
            getProduct();
        };


        onMounted(() => {
            selectedWoodType.value = '';
            getProduct();
        });


        watch(selectedWoodType, (newValue, oldValue) => {
            console.log("Selected Wood Type changed:", newValue);
        });

        onMounted(() => {
            getProduct();
        });

        onMounted(() => {
            selectedWoodType.value = '';
            getProduct();

        });

        // search
        const searchProducts = async () => {
            try {
                await searchPenjualan(searchQuery.value);
                currentPage.value = 1;
            } catch (error) {
                console.error('Error searching products:', error);
            }
        };


         const filteredProducts = computed(() => {
            const query = searchQuery.value.toLowerCase();
            return produk.value.filter((product) => {
                return (
                    product.jenis_product.toLowerCase().includes(query) ||
                    product.nama_product.toLowerCase().includes(query) ||
                    product.ukuran_product.toLowerCase().includes(query) ||
                    product.stok_product.toString().includes(query)||
                    product.harga_product.toString().includes(query) ||
                    product.keuntungan.toString().includes(query) ||
                    product.hargaJual.toString().includes(query)

                );
            });
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
            displayedProducts,
    
            printProductData,
            showDeleteConfirmation,
            selectedProductId,
            deleteProductConfirmation,
            confirmDelete,
            cancelDelete,
            sortedProduk,
            woodTypes,
            selectedWoodType,
            filterProductsByWoodType,
            searchQuery,
            searchProducts,
            filteredProducts,
             isDataLoaded,

        };
    },

    components: {
        VueFeather,
        AlertDelete,
        EditKeuntungan,
        Spin,
    },
};
</script>
