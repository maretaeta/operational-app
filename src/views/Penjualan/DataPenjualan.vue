<script>
import { ref, onMounted, computed, watch } from "vue";
import { penjualanStore } from "../../store/penjualan";
import VueFeather from "vue-feather";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DetailPenjualan from "../../modals/penjualan/DetailPenjualan.vue";
import AlertDeletePenjualan from "../../modals/penjualan/AlertDelete.vue"
import { message } from 'ant-design-vue'
import { Spin } from "ant-design-vue";

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
    const jenisProduk = ref('');
    const keyword = ref('');

    const isDataLoaded = ref(false);

    async function getPenjualanData() {
      try {
        const response = await usepenjualanStore.getPenjualan(keyword.value);
        if (Array.isArray(response)) {
          penjualan.value = response;
          isDataLoaded.value = true;
        } else {
          console.error("Response API tidak valid:", response);
        }
      } catch (error) {
        console.error("Gagal mengambil data penjualan:", error);
      }
    }

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
        await getPenjualanData();
        showDeleteConfirmationModal.value = false;
         message.success({
          content: 'Deleted successfully',
          duration: 3,
          style: {
            fontSize: '17px',
          },
        });
      } catch (error) {
        console.error("Error while deleting:", error);
      }
    };

    const cancelDelete = () => {
      showDeleteConfirmationModal.value = false;
    };

    const formatToRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    };

    const formatHarga = (harga) => {
      return formatToRupiah(harga);
    };

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
    };

    const showDetail = (id_Penjualan) => {
      selectedPenjualan.value = id_Penjualan;
      showModal.value = true;
    };

    const closeDetailModal = () => {
      showModal.value = false;
    };

    watch(currentPage, async (newPage) => {
      if (newPage < 1) {
        currentPage.value = 1;
      } else if (newPage > totalPages.value) {
        currentPage.value = totalPages.value;
      } else {
        await getPenjualanData(); 
      }
    });


    const printPenjualanData = () => {
      const doc = new jsPDF({ orientation: 'landscape' });
      const tableData = [['ID', 'Tanggal', 'Jenis Produk', 'Nama Produk', 'Ukuran Produk', 'Jumlah Produk', 'Harga Produk', 'Diskon', 'Total Harga']];

      penjualan.value.forEach((item) => {
        const jenisProduk = item.penjualanItems.map((prod) => prod.product.jenis_product).join(', ');
        const namaProduk = item.penjualanItems.map((prod) => prod.product.nama_product).join(', ');
        const ukuranProduk = item.penjualanItems.map((prod) => prod.product.ukuran_product).join(', ');
        const jumlahProduk = item.penjualanItems.map((prod) => prod.quantity.toString().replace(".", ",")).join(', ');
        const hargaProduk = item.penjualanItems.map((prod) => formatHarga(prod.product.hargaJual)).join(', ');
        const diskon = item.diskon !== null ? formatHarga(item.diskon) : 'Tidak Ada Diskon';
        const totalHarga = formatHarga(item.totalHarga_product);

        tableData.push([item.id_penjualan, formatDate(item.createdAt), jenisProduk, namaProduk, ukuranProduk, jumlahProduk, hargaProduk, diskon, totalHarga]);
      });

      doc.autoTable({
        head: [tableData[0]],
        body: tableData.slice(1),
        startY: 20,
      });

      doc.save('penjualan.pdf');
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', options);
    };

    const sortedPenjualan = computed(() => {
      return [...penjualan.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    });

    const filterPenjualanByJenisProduk = async () => {
      try {
        await usepenjualanStore.getPenjualanByJenisProduk(jenisProduk.value);
      } catch (error) {
        console.error("Error filtering penjualan by jenis produk: ", error);
      }
    };

    const searchPenjualan = async () => {
      try {
        await getPenjualanData();
      } catch (error) {
        console.error("Error searching penjualan:", error);
      }
    };

    const filteredPenjualan = computed(() => {
      return penjualan.value.filter((item) => {
        const searchableFields = ['createdAt', 'nama_toko', 'diskon', 'totalHarga_product'];
        const additionalFields = ['penjualanItems.product.nama_product', 'penjualanItems.product.jenis_product'];

        return searchableFields.concat(additionalFields).some((field) => {
          const value = getField(item, field);

          if (value !== null && typeof value === 'string') {
            return value.toLowerCase().includes(keyword.value.toLowerCase());
          } else if (value !== null && value instanceof Date) {
            const formattedDate = formatDate(value);
            return formattedDate.toLowerCase().includes(keyword.value.toLowerCase());
          } else if (value !== null && typeof value === 'number') {
            return value.toString().includes(keyword.value.toString());
          }

          return false;
        });
      });
    });

    const getField = (obj, path) => {
      const keys = path.split('.');
      return keys.reduce((acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : null), obj);
    };

    onMounted(() => {
      getPenjualanData();
    });

    watch(keyword, () => {
      searchPenjualan();
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
      sortedPenjualan,
      penjualan,
      jenisProduk,
      filterPenjualanByJenisProduk,
      keyword,
      searchPenjualan,
      filteredPenjualan,
       isDataLoaded,
    };
  },

  components: {
    VueFeather,
    DetailPenjualan,
    AlertDeletePenjualan,
    Spin,
  },
};
</script>


<template>
  <div class=" pl-0 lg:pl-52 xl:pl-60 w-full min-h-screen p-4 md:p-7 xl:p-10 bg-slate-100 relative">
     <a-spin v-if="!isDataLoaded" size="large" class="flex items-center justify-center min-h-screen w-full h-full" />
      <div v-if="isDataLoaded" class="bg-white min-h-screen rounded-xl p-7 ml-7">
      <div class="font-poppins font-semibold mb-6 pt-3">
          <h3 class="text-xl xl:text-2xl font-medium text-gray-700 pl-3 pb-3">Data Penjualan</h3>
          <ol class="list-none p-0 pl-3 inline-flex text-xs xl:text-sm">
                <li class="flex items-center text-purple">
                    <p class="text-gray-700">Dashboard</p>
                    <svg class="fill-cyan-800 w-3 mb-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373-33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                        </path>
                    </svg>
                </li>
                <li class="flex items-center">
                    <p class="text-gray-600">Penjualan</p>
                </li>
            </ol>
        </div>

        <div class="items-center justify-center p-2">
        
            <div class="flex gap-3 justify-end items-start pb-7 pt-5">
                 <div class="relative text-gray-500">
          <input
            v-model="keyword"
            type="search"
            name="search"
            placeholder="Search..."
            class="bg-white h-10 w-full xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
          />
          <button
            type="submit"
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

              <!-- <button @click="filterPenjualanByJenisProduk" class="bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3">
                <vue-feather type="filter" size="17" />
                <p class="text-sm">Filter</p>
              </button>   -->
              <div class="flex bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3 text-xs xl:text-sm">
                    <vue-feather type="printer" size="17" @click="printPenjualanData" />
                    <p class="m-2">Print</p>
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
                  <tr class="capitalize">
                    <th class="px-4 py-5 bg-cyan-600 text-white text-center  text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                      No
                    </th>
                    <th class="px-6 py-5 bg-cyan-600 text-white   text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                      Tanggal
                    </th>
                    <th class="px-6 py-5 bg-cyan-600 text-white   text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                        Nama Toko
                    </th>
                     <th class=" px-6 py-5 bg-cyan-600 text-white   text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                      Jumlah
                    </th> 
                    <th class=" px-6 py-5 bg-cyan-600 text-white   text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                      Diskon
                    </th>
                    <th class=" px-6 py-5 bg-cyan-600 text-white   text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                      Total Harga
                    </th>
                    <th class="px-6 py-5  bg-cyan-600 text-white text-center  text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                  <tr v-if="filteredPenjualan.length === 0" class="border-b border-gray-200">
                                      <td colspan="9" class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700">
                                          No sales data have been made yet.
                                      </td>
                                  </tr>
                  
                    <tr v-else v-for="(item, index) in filteredPenjualan" :key="item.id_penjualan" class="border-b border-gray-200">
                      <td class="px-6 py-4 whitespace-no-wrap text-center">
                          <p class=" text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                      </td>
                      <td class="px-3 py-4 whitespace-no-wrap ">
                          <div class=" text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatDate(item.createdAt) }}</div>
                      </td>
                      <td class="px-3 py-4 whitespace-no-wrap ">
                          <div class=" text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ item.nama_toko }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap">
                        <div class=" text-xs xl:text-sm leading-5 font-medium text-gray-900">
                          {{ item.penjualanItems.reduce((total, item) => total + item.quantity, 0).toString().replace(".", ",") }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap ">
                        <div class=" text-xs xl:text-sm leading-5 font-medium text-gray-900" v-if="item.diskon !== null">{{ formatHarga(item.diskon) }}</div>
                        <div class=" text-xs xl:text-sm leading-5 font-medium text-gray-900" v-else>Tidak Ada Diskon</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap ">
                        <div class=" text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(item.totalHarga_product) }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap  flex gap-5">
                        <font-awesome-icon icon="trash-can" class="text-red-500 pt-1" @click="deletePenjualan(item.id_penjualan)"  />
                        <!-- <font-awesome-icon icon="print" class="pt-1 text-green-700" /> -->
                       <router-link :to="{ name: 'DetailPenjualan', params: { id: item.id_penjualan } }">
                          <font-awesome-icon icon="ellipsis-vertical" class="text-cyan-800 pt-1" />
                        </router-link>
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
        <button @click="prevPage" :disabled="currentPage.value === 1" class="text-xs cursor-pointer bg-gray-200 p-2 w-20 rounded">
      Previous
  </button>

  <div class="mx-2 p-2 text-xs">
      Page {{ currentPage.value }} of {{ totalPages.value }}
  </div>

  <button @click="nextPage" :disabled="currentPage.value === totalPages.value" class="text-xs cursor-pointer bg-gray-200 p-2 w-20 rounded">
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
