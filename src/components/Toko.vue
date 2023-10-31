<template>
  <div class="pl-0 lg:pl-64 w-full min-h-screen p-6">
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
        <p class="text-gray-600">Toko</p>
      </li>
    </ol>
  </div>

  <div class="items-center justify-center p-2">
    <div class="w-full mb-8">
      <h3 class="text-2xl font-medium text-gray-600">Data Toko</h3>
      <p class="text-sm text-gray-400">Data Toko yang melakukan transaksi jual beli</p>
    </div>

    <!-- table -->
    <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-x-auto sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 text-left">
              <thead>
                <tr>
                  <th
                    class="py-4 text-center bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                    Id
                  </th>
                  <th class="px-5 py-4 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                    Nama Toko
                  </th>
                  <th class="px-5 py-4 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                    Alamat Toko
                  </th>
                  <th class="px-5 py-4 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                    NoTlp Toko
                  </th>
                  <th class="px-5 py-4 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                <tr v-for="(item, index) in displayedToko" :key="index" class="border-b border-gray-200">
                  <td class="px-3 py-4 text-center">
                    <p class="text-sm leading-5 font-medium text-gray-900">{{ item.id_toko }}</p>
                  </td>
                  <td class="px-5 py-4">
                    <p class="text-sm leading-5 font-medium text-gray-900">{{ item.namatoko }}</p>
                  </td>
                  <td class="px-5 py-4">
                    <p class="text-sm leading-5 font-medium text-gray-900">{{ item.alamat_toko }}</p>
                  </td>
                  <td class="px-5 py-4">
                    <span class="text-sm leading-5 font-medium text-gray-900">{{ item.notlp_toko }}</span>
                  </td>
                  <td class="px-4 py-4 flex gap-3">
                    <vue-feather type="edit" size="20" stroke="green" @click="openEditModal(item)" />
                    <vue-feather type="trash-2" size="20" stroke="red" @click="deleteToko(item.id_toko)" />
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
  <div v-if="editedToko" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
    <div class="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-content py-10 text-left px-6">
        <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Edit Toko</h2>
        <form @submit.prevent="submitEdit">
          <div class="mb-4">
            <label for="namatoko" class="block text-sm font-medium text-gray-700">Nama Toko</label>
            <input v-model="editedToko.namatoko" type="text" id="namatoko" class="mt-1 p-2 w-full border rounded">
          </div>
          <div class="mb-4">
            <label for="alamat_toko" class="block text-sm font-medium text-gray-700">Alamat Toko</label>
            <input v-model="editedToko.alamat_toko" type="text" id="alamat_toko" class="mt-1 p-2 w-full border rounded">
          </div>
          <div class="mb-4">
            <label for="notlp_toko" class="block text-sm font-medium text-gray-700">NoTlp Toko</label>
            <input v-model="editedToko.notlp_toko" id="notlp_toko" class="mt-1 p-2 w-full border rounded">
          </div>
          <div class="mt-6 flex justify-end">
            <button type="submit" class="bg-cyan-700 px-4 py-3 text-white rounded">Simpan</button>
            <button @click="closeEditModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4">Batal</button>
          </div>
        </form>
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
</div>
</template>

<script>
import { TokoStore } from "../store/toko";
import { ref, onMounted, computed } from "vue";
import VueFeather from "vue-feather"

export default {
  setup() {
    const toko = ref([]);
    const tokoStore = TokoStore();
    const editedToko = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = 5; 

    async function fetchToko() {
      try {
        const response = await tokoStore.getToko();
        if (Array.isArray(response)) {
          toko.value = response;
        } else {
          console.error('Invalid API response:', response);
        }
      } catch (error) {
        console.error('Failed to get toko:', error);
      }
    }

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

    const openEditModal = (toko) => {
      editedToko.value = { ...toko };
    };

    const closeEditModal = () => { 
      editedToko.value = null;
    };

    const submitEdit = async () => {
      if (editedToko.value && editedToko.value.id_toko) {
        try {
          const { id_toko, namatoko, alamat_toko, notlp_toko } = editedToko.value;
          await tokoStore.updateToko(id_toko, namatoko, alamat_toko, notlp_toko);

          const index = toko.value.findIndex((item) => item.id_toko === id_toko);
          if (index !== -1) {
            toko.value[index].namatoko = namatoko;
            toko.value[index].alamat_toko = alamat_toko;
            toko.value[index].notlp_toko = notlp_toko;
          }

          closeEditModal();
        } catch (error) {
          console.error("Error updating toko:", error);
        }
      }
    };

    const totalPages = computed(() => Math.ceil(toko.value.length / itemsPerPage));

    const startIdx = computed(() => (currentPage.value - 1) * itemsPerPage);

    const displayedToko = computed(() => {
      return toko.value.slice(startIdx.value, startIdx.value + itemsPerPage);
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
    };
  },
  components: {
    VueFeather,
  }
};
</script>
