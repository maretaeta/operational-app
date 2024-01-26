<!-- @format -->

<template>
  <div
    class="pl-0 lg:pl-52 xl:pl-60 w-full min-h-screen p-4 md:p-7 xl:p-10 bg-slate-100 relative"
  >
    <a-spin
      v-if="!isDataLoaded"
      size="large"
      class="flex items-center justify-center w-full h-full"
    />
    <ol class="list-none pl-3 inline-flex text-xs ml-7 pt-4 text-gray-400">
      <li class="flex items-center text-purple">
        <p class="text-gray-600">Dashboard</p>
        <svg
          class="fill-cyan-700 w-3 mb-3 h-3 mx-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          />
        </svg>
      </li>
      <li class="flex items-center">
        <p class="text-gray-600">Pengeluaran</p>
      </li>
    </ol>

    <div v-if="isDataLoaded" class="bg-white min-h-screen rounded-xl p-7 ml-7">
      <div class="font-poppins font-semibold mb-6">
        <h3 class="text-xl xl:text-2xl font-medium text-gray-700 pl-3">
          Data Pengeluaran
        </h3>
        <p class="text-gray-400 text-xs pl-3">
          Beriku ini adalah data pengeluaran yang dikeluarkan dalam beberapa hari
        </p>
      </div>

      <div class="items-center justify-center p-2">
        <div class="flex justify-between items-center pt-4 pb-7">
          <div
            @click="openModal"
            class="flex bg-cyan-800 text-white mb-5 md:mb-0 h-10 rounded-xl items-center px-3 text-xs xl:text-sm"
          >
            <vue-feather type="plus" size="18" />
            <p class="m-2">Create</p>
          </div>

          <!-- Filter Section -->
          <div
            class="flex gap-3 items-center justify-center pb-5 text-xs xl:text-sm"
          >
            <div class="relative text-gray-500">
              <input
                v-model="searchKeyword"
                type="search"
                name="search"
                placeholder="Search..."
                class="bg-white h-10 w-full xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
              />
              <button
                type="submit"
                @click="searchPengeluaran"
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
                  style="enable-background: new 0 0 56.966 56.966"
                  xml:space="preserve"
                  width="512px"
                  height="512px"
                >
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                  />
                </svg>
              </button>
            </div>

            <!-- Print Button -->
            <div
              class="flex bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3 text-xs xl:text-sm"
            >
              <vue-feather type="printer" size="17" @click="printPengeluaran" />
              <p class="m-2">Print</p>
            </div>
          </div>
        </div>
        <!-- Table -->
        <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-x-auto sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 text-left">
                  <thead>
                    <tr class="capitalize">
                      <th
                        class="px-4 py-5 bg-cyan-600 text-white text-center text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        No
                      </th>
                      <th
                        class="px-4 py-5 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        Tanggal
                      </th>
                      <th
                        class="px-4 py-5 text-center bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        Detail Pengeluaran
                      </th>

                      <th
                        class="px-4 py-5 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        Total Pengeluaran
                      </th>

                      <th
                        class="px-4 py-5 bg-cyan-600 text-white text-center text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white divide-y divide-gray-200 border-t border-gray-300"
                  >
                    <tr
                      v-if="filteredPengeluaran.length === 0"
                      class="border-b border-gray-200"
                    >
                      <td
                        colspan="9"
                        class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700"
                      >
                        No expenses have been made yet.
                      </td>
                    </tr>
                    <tr
                      v-for="(pengeluaran, index) in filteredPengeluaran"
                      :key="index"
                      class="border-b border-gray-200"
                    >
                      <td class="px-4 py-5 whitespace-no-wrap text-center">
                        <p
                          class="text-xs xl:text-sm leading-5 font-medium text-gray-900"
                        >
                          {{ pageIndex * itemsPerPage + index + 1 }}
                        </p>
                      </td>
                      <td class="px-4 py-5 whitespace-no-wrap">
                        <div
                          class="text-xs xl:text-sm leading-5 font-medium text-gray-900"
                        >
                          {{ formatDate(pengeluaran.date) }}
                        </div>
                      </td>
                      <td class="py-5 px-4 whitespace-no-wrap">
                        <div
                          class="text-xs xl:text-sm font-medium text-gray-900"
                        >
                          <table>
                            <tr
                              v-for="(
                                detail, detailIndex
                              ) in pengeluaran.details"
                              :key="detailIndex"
                              class="flex w-full justify-end gap-7"
                            >
                              <td class="w-1/2">- {{ detail.keterangan }}</td>
                              <td>:</td>
                              <td class="w-1/3">
                                {{ formatHarga(detail.jumlah) }}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                      <td class="px-4 py-5 whitespace-no-wrap">
                        <div
                          class="text-xs xl:text-sm leading-5 font-medium text-gray-900"
                        >
                          {{ formatHarga(pengeluaran.total) }}
                        </div>
                      </td>

                      <td
                        class="px-4 py-5 whitespace-no-wrap text-center flex gap-3 items-center justify-center"
                      >
                        <button
                          class="bg-red-600 py-2 px-4 rounded-md text-white"
                          @click="openDeleteConfirmationModal(pengeluaran.date)"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            @click="prevPage"
            :disabled="pageIndex === 0"
            class="text-xs cursor-pointer bg-gray-300 p-2 w-20 rounded"
          >
            Previous
          </button>
          <div class="mx-2 p-2 text-xs">
            Page {{ pageIndex + 1 }} of {{ totalPages }}
          </div>
          <button
            @click="nextPage"
            :disabled="pageIndex === totalPages - 1"
            class="text-xs cursor-pointer bg-gray-300 p-2 w-20 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->

    <CreatePengeluaranModal
      :isVisible="showModal"
      :formData="formData"
      :submitForm="submitForm"
      :closeCreateModal="closeModal"
    />

    <AlertDelete
      :showDeleteConfirmation="showDeleteConfirmation"
      :deletePengeluaran="deletePengeluaran"
      :closeDeleteConfirmationModal="closeDeleteConfirmationModal"
      :internalItemToDeleteId="internalItemToDeleteId"
      :usepengeluaranStore="usepengeluaranStore"
      :itemToDeleteId="itemToDeleteId"
      @cancel-delete="closeDeleteConfirmationModal"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import VueFeather from "vue-feather";
import CreatePengeluaranModal from "../../modals/pengeluaran/CreatePengeluaranModal.vue";
import { PengeluaranStore } from "../../store/pengeluaran";
import AlertDelete from "../../modals/pengeluaran/AlertDelete.vue";
import { message } from "ant-design-vue";
import { Spin } from "ant-design-vue";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  components: {
    VueFeather,
    CreatePengeluaranModal,
    AlertDelete,
    Spin,
  },

  setup() {
    const usepengeluaranStore = PengeluaranStore();
    const showModal = ref(false);
    const pageIndex = ref(0);
    const itemsPerPage = 10;
    const searchKeyword = ref("");
    const isDataLoaded = ref(false);

    // modal
    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    // pagination
    const nextPage = () => {
      const lastPageIndex = totalPages.value - 1;
      if (pageIndex.value < lastPageIndex) {
        pageIndex.value++;
      }
    };

    const prevPage = () => {
      if (pageIndex.value > 0) {
        pageIndex.value--;
      }
    };

    // Format Rupiah
    function formatToRupiah(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    }

    function formatHarga(harga) {
      return formatToRupiah(harga);
    }

    // format tanggal
    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      };
      const formattedDate = new Date(dateString).toLocaleString(
        "id-ID",
        options
      );

      return formattedDate;
    };

    // create data pengeluaran
    const formData = ref({
      expenses: [
        {
          tanggal: "",
          keterangan: "",
          jumlah: "",
        },
      ],
    });

    async function submitForm() {
      try {
        if (formData.value.expenses) {
          for (const expense of formData.value.expenses) {
            const isValidDate = /\d{4}-\d{2}-\d{2}/.test(expense.tanggal);

            if (!isValidDate) {
              console.error("Invalid date format");
              return;
            }

            const newPengeluaranData = {
              tanggal: expense.tanggal,
              jumlah: expense.jumlah,
              keterangan: expense.keterangan,
            };

            await usepengeluaranStore.createPengeluaran(newPengeluaranData);
          }
        }

        await usepengeluaranStore.getPengeluaranPerDay();

        closeModal();
        message.success({
          content: "expense data successfully created",
          duration: 3,
          style: {
            fontSize: "17px",
          },
        });
      } catch (error) {
        console.error("Error creating pengeluaran:", error);
      }
    }

    // fungsi delete pengeluaran
    const internalItemToDeleteId = ref(null);
    const showDeleteConfirmation = ref(false);
    const itemToDeleteId = ref(null);

    const openDeleteConfirmationModal = (date) => {
      internalItemToDeleteId.value = date;
      showDeleteConfirmation.value = true;
    };

    const closeDeleteConfirmationModal = () => {
      showDeleteConfirmation.value = false;
      itemToDeleteId.value = null;
    };

    const confirmDeleteAction = ref(() => {});

    const deletePengeluaran = async (date) => {
      try {
        await usepengeluaranStore.deletePengeluaran(date);
        message.success({
          content: "Deleted successfully",
          duration: 3,
          style: {
            fontSize: "17px",
          },
        });
      } catch (error) {
        console.error("Error deleting pengeluaran:", error);
      }

      const cancelDeleteAction = () => {
        closeDeleteConfirmationModal();
      };
    };

    // search function
    const searchPengeluaran = async () => {
      try {
        await usepengeluaranStore.searchPengeluaran(searchKeyword.value);
      } catch (error) {
        console.error("Error searching pengeluaran:", error);
      }
    };

    const totalPages = computed(() =>
      Math.ceil(usepengeluaranStore.pengeluaran.length / itemsPerPage)
    );

    const filteredPengeluaran = computed(() => {
      const keyword = searchKeyword.value.toLowerCase();
      const startIndex = pageIndex.value * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const sortedPengeluaran = usepengeluaranStore.pengeluaran.filter(
        (pengeluaran) => {
          return (
            pengeluaran.details.some((detail) =>
              detail.keterangan.toLowerCase().includes(keyword)
            ) ||
            pengeluaran.details.some((detail) =>
              detail.jumlah.toString().includes(keyword)
            ) ||
            pengeluaran.total.toString().includes(keyword)
          );
        }
      );

      const copySortedPengeluaran = [...sortedPengeluaran];

      return copySortedPengeluaran.slice(startIndex, endIndex);
    });

    const fetchData = async () => {
      try {
        await usepengeluaranStore.getPengeluaranPerDay();
        isDataLoaded.value = true;
      } catch (error) {
        console.error("Error fetching pengeluaran:", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      VueFeather,
      openModal,
      closeModal,
      showModal,
      formData,
      submitForm,
      usepengeluaranStore,
      formatHarga,
      formatDate,
      searchKeyword,
      searchPengeluaran,
      filteredPengeluaran,
      showDeleteConfirmation,
      openDeleteConfirmationModal,
      closeDeleteConfirmationModal,
      internalItemToDeleteId,
      itemToDeleteId,
      nextPage,
      prevPage,
      pageIndex,
      deletePengeluaran,
      isDataLoaded,
      totalPages,
      itemsPerPage,
    };
  },

  // cetak pengeluaran
  methods: {
    printPengeluaran() {
      const doc = new jsPDF();
      doc.text("Data Pengeluaran", 20, 10);
      // Table header
      const headers = [
        "No",
        "Tanggal",
        "Detail Pengeluaran",
        "Total Pengeluaran",
      ];
      const data = [];
      // Populate data for the table
      this.filteredPengeluaran.forEach((pengeluaran, index) => {
        const rowData = [
          index + 1,
          this.formatDate(pengeluaran.date),
          pengeluaran.details
            .map(
              (detail) =>
                `- ${detail.keterangan}: ${this.formatHarga(detail.jumlah)}`
            )
            .join("\n"),
          this.formatHarga(pengeluaran.total),
        ];
        data.push(rowData);
      });
      // AutoTable configuration
      const tableConfig = {
        startY: 20,
        head: [headers],
        body: data,
      };

      doc.autoTable(tableConfig);
      doc.save("Data Pengeluaran.pdf");
    },
  },
};
</script>
