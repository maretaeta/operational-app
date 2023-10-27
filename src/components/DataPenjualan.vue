<script>
import { ref, onMounted, computed, watch } from "vue";
import { penjualanStore } from "../store/penjualan";
import VueFeather from "vue-feather";

export default {
    setup() {
        const penjualan = ref([]);
        const usepenjualanStore = penjualanStore();
        const currentPage = ref(1);
        const itemsPerPage = 5;

        async function getPenjualan() {
            try {
                const response = await usepenjualanStore.getPenjualan();
                if (Array.isArray(response)) {
                    penjualan.value = response;
                } else {
                    console.error("Response API tidak valid:", response);
                }
            } catch (error) {
                console.error("Gagal mengambil data penjualan:", error);
            }
        }

        async function deletePenjualan(id_penjualan) {
            try {
                await usepenjualanStore.deletePenjualan(id_penjualan);
                await getPenjualan(); 
            } catch (error) {
                console.error("Gagal menghapus penjualan:", error);
            }
        }

        // Fungsi Rupiah
        function formatToRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(number);
        }

        function formatHarga(harga) {
            return formatToRupiah(harga);
        }

        const totalPages = computed(() => Math.ceil(penjualan.value.length / itemsPerPage));

        const startIdx = computed(() => (currentPage.value - 1) * itemsPerPage);

        const displayedPenjualan = computed(() => {
            return penjualan.value.slice(startIdx.value, startIdx.value + itemsPerPage);
        });

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        }

        // Menambahkan watch untuk memantau perubahan currentPage
        watch(currentPage, (newPage) => {
            if (newPage < 1) {
                currentPage.value = 1;
            } else if (newPage > totalPages.value) {
                currentPage.value = totalPages.value;
            }
        });

        onMounted(() => {
            getPenjualan();
        });

        return {
            penjualan,
            formatHarga,
            deletePenjualan,
            currentPage,
            totalPages,
            prevPage,
            nextPage,
            displayedPenjualan,
        };
    },
    components: {
        VueFeather,
    },
};
</script>


<template>
<div class="pl-0 lg:pl-64 w-full min-h-screen p-6">
    <!-- navigasi -->
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
                <p class="text-gray-600">Data Penjualan</p>
            </li>
        </ol>
    </div>

    <div class="items-center justify-center p-2">
        <div class="w-full mb-8">
            <h3 class=" text-2xl font-medium text-gray-600">Data Penjualan</h3>
            <p class="text-sm text-gray-400 mb-6">Data barang yang telah terjual</p>
        </div>

        <div  class="flex gap-3 justify-end items-start pb-5">
                 <div class="flex gap-2 bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3">
                        <vue-feather type="printer" size="17" />
                        <p class="text-sm">Cetak</p>
                     </div>
            </div>
    </div>

    <!-- tabel data pembelian -->
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
                                class="px-5 py-3 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                Tanggal
                            </th>
                            <th
                                class="px-6 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                Jenis Produk
                            </th>
                            <th
                                class="px-6 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                Nama Produk
                            </th>
                            <th
                                class="px-6 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                Ukuran Produk
                            </th>
                            <th
                                class="px-6 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                JUmlah Produk
                            </th>
                             <th
                                class="px-6 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                    Harga Produk
                                </th>
                            <th
                            class="px-6 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                            Diskon
                        </th>
                            <th
                                class="px-6 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                               Total Harga
                            </th>
                            
                            <th
                                class="px-10 py-4 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
        <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
             <tr v-for="(item, index) in displayedPenjualan" :key="item.id_penjualan" class="border-b border-gray-200">

            <td class="px-5 py-3 whitespace-no-wrap text-center">
                <div class="ml-4">
                    <p class="text-sm leading-5 font-medium text-gray-900">{{ item.id_penjualan }}</p>
                </div>
            </td>
            <td class="px-5 py-3 whitespace-no-wrap text-center"> 
                <div class="text-sm leading-5 font-medium text-gray-900">{{ item.createdAt }}</div>
            </td>
            <td class="px-6 py-3 whitespace-no-wrap text-center">  
                <div class="w-full text-sm leading-5 font-medium text-gray-900">
                    {{ item.products.map(product => product.jenis_product).join(', \n') }}
                </div>
            </td>
            <td class=" py-3 whitespace-no-wrap text-center">  
                <div class="w-full text-sm leading-5 font-medium text-gray-900">
                    {{ item.products.map(product => product.nama_product).join(', \n') }}
                </div>
            </td>
            <td class="px-5 py-3 whitespace-no-wrap text-center">  
                <div class="text-sm leading-5 font-medium text-gray-900">
                    {{ item.products.map(product => product.ukuran_product).join(', \n') }}
                </div>
            </td>
            <td class="px-5 py-3 whitespace-no-wrap text-center">  
                <div class="text-sm leading-5 font-medium text-gray-900">{{ item.products.map((product) => product.jumlah_product).join(',  ') }}</div>
            </td>
            <td class="px-5 py-3 whitespace-no-wrap text-center">  
                <div class="text-sm leading-5 font-medium text-gray-900">  {{ item.products.map(product => formatHarga(product.hargaJual )).join(', ') }}</div>
            </td>
            <td class="px-5 py-3 whitespace-no-wrap text-center">  
                <div class="text-sm leading-5 font-medium text-gray-900" v-if="item.diskon !== null">{{ formatHarga(item.diskon) }}</div>
            </td>
            <td class="px-5 py-3 whitespace-no-wrap text-center">  
                <div class="text-sm leading-5 font-medium text-gray-900" v-if="item.totalHarga_product !== null">{{ formatHarga(item.totalHarga_product) }}</div>
            </td>
            <td class="px-5 py-3 whitespace-no-wrap text-center flex gap-3">  
                <vue-feather type="edit" size="20" stroke="green" />
                <vue-feather type="trash-2" size="20" stroke="red" @click="deletePenjualan(item.id_penjualan)" />
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
    <button @click="nextPage" :disabled="currentPage === totalPages" class="text-xs cursor-pointer bg-gray-300 p-2 w-20 rounded ">
            Next
          </button>
        </div>
</div>
</template>