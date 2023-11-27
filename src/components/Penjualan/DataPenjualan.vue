<script>
import { ref, onMounted, computed, watch } from "vue";
import { penjualanStore } from "../../store/penjualan";
import VueFeather from "vue-feather";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DetailPenjualan from "../../modals/penjualan/DetailPenjualan.vue";
import AlertDeletePenjualan from "../../modals/penjualan/AlertDelete.vue"

export default {
  setup() {
    const penjualan = ref([]);
    const usepenjualanStore = penjualanStore();
    const currentPage = ref(1);
    const itemsPerPage = 8;
    const showModal = ref(false);
    const selectedPenjualan = ref(null);
    const showDeleteConfirmationModal = ref(false);
    const selectedDeleteId = ref(null);

    // get all penjualan
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

    // delete penjualan
    async function deletePenjualan(id_penjualan) {
      try {
        selectedDeleteId.value = id_penjualan;
        showDeleteConfirmationModal.value = true;
      } catch (error) {
        console.error("Error while preparing to delete:", error);
      }
    }

    const deleteConfirmed = async () => {
      try {
        await usepenjualanStore.deletePenjualan(selectedDeleteId.value);
        await getPenjualan();
        showDeleteConfirmationModal.value = false;
      } catch (error) {
        console.error("Error while deleting:", error);
      }
    };

    const cancelDelete = () => {
      showDeleteConfirmationModal.value = false;
    };


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

    // pagination
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
        
    function showDetail(id_Penjualan) {
      selectedPenjualan.value = id_Penjualan;
      showModal.value = true;
    }

    function closeDetailModal() {
      showModal.value = false;
    }

    // Menambahkan watch untuk memantau perubahan currentPage
    watch(currentPage, (newPage) => {
      if (newPage < 1) {
        currentPage.value = 1;
      } else if (newPage > totalPages.value) {
        currentPage.value = totalPages.value;
      }
    });

    const printPenjualanData = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const tableData = [];
    const columns = [
        'ID',
        'Tanggal',
        'Jenis Produk',
        'Nama Produk',
        'Ukuran Produk',
        'Jumlah Produk',
        'Harga Produk',
        'Diskon',
        'Total Harga',
    ];

    tableData.push(columns);

    // Data tabel
    penjualan.value.forEach((item) => {
      const jenisProduk = item.penjualanItems.map((item) => item.product.jenis_product).join(', ');
      const namaProduk = item.penjualanItems.map((item) => item.product.nama_product).join(', ');
      const ukuranProduk = item.penjualanItems.map((item) => item.product.ukuran_product).join(', ');
      const jumlahProduk = item.penjualanItems.map((item) => item.quantity.toString().replace(".", ",")).join(', ');
      const hargaProduk = item.penjualanItems.map((item) => formatHarga(item.product.hargaJual)).join(', ');
      const diskon = item.diskon !== null ? formatHarga(item.diskon) : 'Tidak Ada Diskon';
      const totalHarga = formatHarga(item.totalHarga_product);

      tableData.push([
        item.id_penjualan,
        item.createdAt,
        jenisProduk,
        namaProduk,
        ukuranProduk,
        jumlahProduk,
        hargaProduk,
        diskon,
        totalHarga,
      ]);
    });

      doc.autoTable({
        head: [tableData[0]],  
        body: tableData.slice(1),  
        startY: 20,
      });

      doc.save('penjualan.pdf');
    };

    
    // format tanggal
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', options);
    };

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
            printPenjualanData,
            formatDate,
            showDetail,
            closeDetailModal,
            showModal,
            selectedPenjualan,
            showDeleteConfirmationModal,
           
            deleteConfirmed,
            cancelDelete,
          };
    },

     methods: {
        showDetail(id_Penjualan) {
          this.selectedPenjualanId = id_Penjualan;
          this.showDetailModal = true; 
        },
        closeDetailModal() {
          this.showDetailModal = false; 
        },
  },

    components: {
        VueFeather,
        DetailPenjualan,
        AlertDeletePenjualan,
    },
};
</script>


<template>
  <div class="pl-0 lg:pl-52 xl:pl-56 w-full min-h-screen p-7 xl:p-10 bg-slate-100 relative">
      <div class="bg-white min-h-screen rounded-xl p-8 ml-10">
        <!-- Navigation -->
        <div class="font-poppins text-sm font-semibold mb-6">
            <ol class="list-none p-0 pl-3 inline-flex">
                <li class="flex items-center text-purple">
                    <p class="text-gray-700">Home</p>
                    <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373-33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
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
                <h3 class="text-2xl font-medium text-gray-600">Data Penjualan</h3>
                <p class="text-sm text-gray-400 mb-6">Data barang yang telah terjual</p>
            </div>

            <div class="flex gap-3 justify-end items-start pb-5">
                <div class="flex gap-2 bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3">
                    <vue-feather type="printer" size="17" @click="printPenjualanData" />
                    <p class="text-sm">Cetak</p>
                </div>  
            </div>
        </div>

    <!-- Data Penjualan Table -->
  <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
         <div class="overflow-x-auto sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 text-left">
              <thead>
                  <tr>
                    <th class="px-4 py-5 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                      ID
                    </th>
                    <th class="px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th class="px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                        Nama Toko
                    </th>
                    <!-- <th class="px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                      Jenis Produk
                    </th>
                    <th class=" px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                      Nama Produk
                    </th>
                    <th class=" px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                      Ukuran Produk
                    </th> -->
                     <th class=" px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                      Jumlah
                    </th> 
                     <!-- <th class=" px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                      Harga Produk
                    </th>  -->
                    <th class=" px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                      Diskon
                    </th>
                    <th class=" px-6 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                      Total Harga
                    </th>
                    <th class="px-6 py-5  bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                  <template v-for="item in displayedPenjualan" :key="item.id_penjualan">
                    <tr v-if="item.penjualanItems.length > 0" class="border-b border-gray-200">
                      <td class="px-6 py-4 whitespace-no-wrap text-center">
                          <p class="text-sm leading-5 font-medium text-gray-900">{{ item.id_penjualan }}</p>
                      </td>
                      <td class="px-3 py-4 whitespace-no-wrap ">
                          <div class="text-sm leading-5 font-medium text-gray-900">{{ formatDate(item.createdAt) }}</div>
                      </td>
                      <td class="px-3 py-4 whitespace-no-wrap ">
                          <div class="text-sm leading-5 font-medium text-gray-900">{{ item.nama_toko }}</div>
                      </td>
                      <!-- <td class=" px-3 py-4 whitespace-no-wrap">
                        <div class=" text-sm leading-5 font-medium text-gray-900">
                          <ol style="white-space: pre-wrap; margin: 0;">
                            <li>
                              {{ item.penjualanItems.map((item) => item.product.jenis_product).join('\n') }} 
                            </li>
                          </ol>
                        </div>
                      </td>

                      <td class="px-3 py-4  whitespace-no-wrap">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                          <ol style="white-space: pre-wrap; margin: 0;">
                            <li>
                              {{ item.penjualanItems.map((item) => item.product.nama_product).join('\n') }}
                            </li>
                          </ol>
                          
                        </div>
                      </td>

                      <td class="px-6 py-4 whitespace-no-wrap ">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                          <ol style="white-space: pre-wrap; margin: 0;">
                            <li>
                          {{ item.penjualanItems.map((item) => item.product.ukuran_product).join('\n') }}
                          </li>
                          </ol>
                        </div>
                      </td> -->
                      <td class="px-6 py-4 whitespace-no-wrap ">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                          <ol style="white-space: pre-wrap; margin: 0;">
                            <li>{{ item.penjualanItems.map((item) => item.quantity.toString().replace(".", ",")).join('\n') }}
                            </li>
                          </ol>
                        </div>
                      </td>

                      <!-- <td class="px-6 py-4 whitespace-no-wrap ">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                          <ol style="white-space: pre-wrap; margin: 0;">
                          <li>
                            {{ item.penjualanItems.map((item) => formatHarga(item.product.hargaJual)).join('\n') }}
                          </li>
                        </ol> 
                        </div>
                      </td> -->

                      <td class="px-6 py-4 whitespace-no-wrap ">
                        <div class="text-sm leading-5 font-medium text-gray-900" v-if="item.diskon !== null">{{ formatHarga(item.diskon) }}</div>
                        <div class="text-sm leading-5 font-medium text-gray-900" v-else>Tidak Ada Diskon</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap ">
                        <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(item.totalHarga_product) }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap  flex gap-3">
                        <font-awesome-icon icon="trash-can" class="text-red-500 pt-1" @click="deletePenjualan(item.id_penjualan)"  />
                        <!-- <vue-feather type="trash-2" size="20" stroke="red" @click="deletePenjualan(item.id_penjualan)" /> -->
                        <font-awesome-icon icon="print" class="pt-1 text-green-700" />
                       <router-link :to="{ name: 'DetailPenjualan', params: { id: item.id_penjualan } }">
                          <font-awesome-icon icon="ellipsis-vertical" class="text-cyan-800 pt-1" />
                        </router-link>
                      </td>
                    </tr>
                  </template> 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    <!-- Pagination controls -->
    <div class="flex justify-end mt-4">
        <button @click="prevPage" :disabled="currentPage === 1"
            class="text-xs cursor-pointer bg-gray-300 p-2 w-20 rounded">
            Previous
        </button>
        <div class="mx-2 p-2 text-xs">
            Page {{ currentPage }} of {{ totalPages }}
        </div>
        <button @click="nextPage" :disabled="currentPage === totalPages"
            class="text-xs cursor-pointer bg-gray-300 p-2 w-20 rounded ">
            Next
        </button>
    </div>

    <DetailPenjualan
      v-if="showModal"
      :id_Penjualan="selectedPenjualan" 
      @close="closeDetailModal"
    />

    <AlertDeletePenjualan
    :showDeleteConfirmation="showDeleteConfirmationModal"
    @confirm-delete="deleteConfirmed"
    @cancel-delete="cancelDelete"
  />


</div>
</div>
</template>
