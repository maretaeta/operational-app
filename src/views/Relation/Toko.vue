<!-- @format -->

<template>
  <div
    class="pl-0 lg:pl-52 xl:pl-60 w-full min-h-screen p-4 md:p-7 xl:p-10 bg-slate-100 relative"
  >
    <a-spin
      v-if="!isDataLoaded"
      size="large"
      class="flex items-center justify-center min-h-screen w-full h-full"
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
        <p class="text-gray-600">Toko</p>
      </li>
    </ol>

    <div v-if="isDataLoaded" class="bg-white min-h-screen rounded-xl p-7 ml-7">
      <div class="font-poppins font-semibold mb-6">
        <h3 class="text-xl xl:text-2xl font-medium text-gray-700 pl-3">
          Data Toko
        </h3>
        <p class="text-gray-400 text-xs pl-3">
          Berikut ini adalah daftar toko yang telah melakukan transaksi
        </p>
      </div>

      <div class="items-center justify-center p-2">
        <div class="flex gap-3 justify-end items-start pb-7 pt-3">
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
              @click="searchToko"
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
        </div>

        <!-- table -->
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
                        class="py-4 px-4 text-center bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        No
                      </th>
                      <th
                        class="px-5 py-4 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        Nama Toko
                      </th>
                      <th
                        class="px-5 py-4 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        Alamat Toko
                      </th>
                      <th
                        class="px-5 py-4 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        NoTlp Toko
                      </th>
                      <th
                        class="px-5 py-4 bg-cyan-600 text-white text-center text-xs xl:text-sm leading-4 font-medium tracking-wider"
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white divide-y divide-gray-200 border-t border-gray-300"
                  >
                    <tr
                      v-if="displayedToko.length === 0"
                      class="border-b border-gray-200"
                    >
                      <td
                        colspan="9"
                        class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700"
                      >
                        No toko have been made yet.
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(item, index) in displayedToko"
                      :key="index"
                      class="border-b border-gray-200"
                    >
                      <td class="px-3 py-4 text-center">
                        <p
                          class="text-xs xl:text-sm leading-5 font-medium text-gray-900"
                        >
                          {{ startIdx + index + 1 }}
                        </p>
                      </td>
                      <td class="px-5 py-4">
                        <p
                          class="text-xs xl:text-sm leading-5 font-medium text-gray-900"
                        >
                          {{ item.namatoko }}
                        </p>
                      </td>
                      <td class="px-5 py-4">
                        <p
                          class="text-xs xl:text-sm leading-5 font-medium text-gray-900"
                        >
                          {{ item.alamat_toko }}
                        </p>
                      </td>
                      <td class="px-5 py-4">
                        <span
                          class="text-xs xl:text-sm leading-5 font-medium text-gray-900"
                          >{{ item.notlp_toko }}</span
                        >
                      </td>
                      <td
                        class="text-center justify-center py-4 flex items-center gap-3"
                      >
                        <button
                          class="bg-blue-600 py-2 px-4 rounded-md text-white"
                          @click="openEditModal(item)"
                        >
                          Edit
                        </button>
                        <button
                          class="bg-red-600 py-2 px-4 rounded-md text-white"
                          @click="showDeleteConfirmationModal(item)"
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
      </div>

      <!-- Modal for editing Toko data -->
      <div
        v-if="editedToko && !deleteConfirmationModal"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <div
          class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"
        ></div>
        <div
          class="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto"
        >
          <div class="modal-content py-10 text-left px-6">
            <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Edit Toko</h2>
            <form @submit.prevent="submitEdit">
              <div class="mb-4">
                <label
                  for="namatoko"
                  class="block text-xs xl:text-sm font-medium text-gray-700"
                  >Nama Toko</label
                >
                <input
                  v-model="editedToko.namatoko"
                  type="text"
                  id="namatoko"
                  class="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="alamat_toko"
                  class="block text-xs xl:text-sm font-medium text-gray-700"
                  >Alamat Toko</label
                >
                <input
                  v-model="editedToko.alamat_toko"
                  type="text"
                  id="alamat_toko"
                  class="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="notlp_toko"
                  class="block text-xs xl:text-sm font-medium text-gray-700"
                  >NoTlp Toko</label
                >
                <input
                  v-model="editedToko.notlp_toko"
                  id="notlp_toko"
                  class="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div class="mt-6 flex justify-end">
                <button
                  type="submit"
                  class="bg-cyan-700 px-4 py-3 text-white rounded"
                >
                  Simpan
                </button>
                <button
                  @click="closeEditModal"
                  class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Pagination controls -->
      <div class="flex justify-end mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="text-xs cursor-pointer bg-gray-200 p-2 w-20 rounded"
        >
          Previous
        </button>
        <div class="mx-2 p-2 text-xs">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="text-xs cursor-pointer bg-gray-200 p-2 w-20 rounded"
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <AlertDeleteModal
    :showModal="deleteConfirmationModal"
    :onDelete="confirmDelete"
    :onCancel="closeDeleteModal"
  />
</template>

<script>
import { TokoStore } from "../../store/toko";
import { ref, onMounted, computed } from "vue";
import VueFeather from "vue-feather";
import AlertDeleteModal from "../../modals/toko/AlertDeleteModal.vue";
import { message } from "ant-design-vue";
import { Spin } from "ant-design-vue";

export default {
  setup() {
    const toko = ref([]);
    const tokoStore = TokoStore();
    const editedToko = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = 8;

    const searchKeyword = ref("");

    const deleteConfirmationModal = ref(false);

    const isDataLoaded = ref(false);

    async function fetchToko() {
      try {
        const response = await tokoStore.getToko();
        if (Array.isArray(response)) {
          toko.value = response.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          isDataLoaded.value = true;
        } else {
          console.error("Invalid API response:", response);
        }
      } catch (error) {
        console.error("Failed to get toko:", error);
      }
    }

    //  delete toko
    const deleteToko = async (id_toko) => {
      try {
        await tokoStore.deleteToko(id_toko);
        const index = toko.value.findIndex((item) => item.id_toko === id_toko);
        if (index !== -1) {
          toko.value.splice(index, 1);
        }
      } catch (error) {
        console.error("Error deleting toko:", error);
      }
    };

    const showDeleteConfirmationModal = (toko) => {
      editedToko.value = { ...toko };
      deleteConfirmationModal.value = true;
    };

    const confirmDelete = () => {
      deleteToko(editedToko.value.id_toko);
      deleteConfirmationModal.value = false;
      closeEditModal();
      message.success({
        content: "Deleted successfully",
        duration: 3,
        style: {
          fontSize: "17px",
        },
      });
    };

    const cancelDelete = () => {
      closeDeleteModal();
    };

    const closeDeleteModal = () => {
      deleteConfirmationModal.value = false;
      closeEditModal();
    };

    // modal
    const openEditModal = (toko) => {
      editedToko.value = { ...toko };
    };

    const closeEditModal = () => {
      editedToko.value = null;
    };

    const submitEdit = async () => {
      if (editedToko.value && editedToko.value.id_toko) {
        try {
          const { id_toko, namatoko, alamat_toko, notlp_toko } =
            editedToko.value;
          await tokoStore.updateToko(
            id_toko,
            namatoko,
            alamat_toko,
            notlp_toko
          );

          const index = toko.value.findIndex(
            (item) => item.id_toko === id_toko
          );
          if (index !== -1) {
            toko.value[index].namatoko = namatoko;
            toko.value[index].alamat_toko = alamat_toko;
            toko.value[index].notlp_toko = notlp_toko;
          }

          closeEditModal();
          message.success({
            content: "Toko data successfully updated",
            duration: 3,
            style: {
              fontSize: "17px",
            },
          });
        } catch (error) {
          console.error("Error updating toko:", error);
        }
      }
    };

    const startIdx = computed(() => (currentPage.value - 1) * itemsPerPage);

    const displayedToko = computed(() => {
      return filteredToko.value.slice(
        startIdx.value,
        startIdx.value + itemsPerPage
      );
    });

    const totalPages = computed(() =>
      Math.ceil(filteredToko.value.length / itemsPerPage)
    );

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

    // search
    const searchToko = async () => {
      try {
        await tokoStore.searchToko(searchKeyword.value);
        currentPage.value = 1;
      } catch (error) {
        console.error("Error searching toko:", error);
      }
    };

    const filteredToko = computed(() => {
      const keyword = searchKeyword.value.toLowerCase();
      return toko.value.filter((toko) => {
        try {
          return (
            toko.namatoko.toLowerCase().includes(keyword) ||
            toko.alamat_toko.toLowerCase().includes(keyword) ||
            toko.notlp_toko.toLowerCase().includes(keyword)
          );
        } catch (error) {
          return false;
        }
      });
    });

    onMounted(() => {
      fetchToko();
    });

    return {
      toko,
      deleteToko,
      editedToko,
      openEditModal,
      closeEditModal,
      submitEdit,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      displayedToko,
      confirmDelete,
      cancelDelete,
      deleteConfirmationModal,
      showDeleteConfirmationModal,
      closeDeleteModal,
      searchKeyword,
      searchToko,
      filteredToko,
      isDataLoaded,
      startIdx,
    };
  },
  components: {
    VueFeather,
    AlertDeleteModal,
    Spin,
  },
};
</script>
