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
                        <p class="text-gray-600">Karyawan</p>
                    </li>
                </ol>
            </div>

         <div class="items-center justify-center p-2">
            <div class="w-full">
              <h3 class="text-2xl font-medium text-gray-600">Data Karyawan</h3>
              <p class="text-sm text-gray-400 mb-6">Data karyawan yang bekerja</p>
              <div class="flex gap-3 justify-end items-start pb-5">
                <div @click="openCreateModal" class="flex gap-2 bg-cyan-800 text-white w-38 h-10 rounded-xl items-center text-center px-5">
                  <font-awesome-icon icon="plus" />
                  <p class="text-sm">karyawan</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
              <div v-for="employee in karyawan" :key="employee.id_karyawan" class="border p-2 text-center  relative">
                <div class="flex justify-end px-2">
                  <font-awesome-icon icon="ellipsis-vertical" class="p-1 h-5 text-cyan-700 cursor-pointer" @click="toggleDropdown(employee.id_karyawan)" />
                </div>
                <div class="flex gap-5">
                     <div class="flex justify-center">
                      <img src="../../assets//user.png" class="w-20" />
                    </div>
                    <div class="flex flex-col justify-start">
                        <p class="text-lg text-cyan-800 font-medium"> {{ employee.nama_karyawan }}</p>
                        <p class="text-sm text-gray-800 py-2">{{ employee.jabatan }}</p>
                        <p class="text-sm font-medium text-gray-900 pb-5">Rp. {{ employee.gaji }}/bln</p>

                    </div>
                    
                </div>
               

                <!-- Dropdown Menu -->
                <div v-if="employee.showDropdown" class="absolute right-5 top-0 mt-10 bg-white border rounded-md overflow-hidden shadow-md">
                    <div class="px-5 py-3">
                        <div class="flex px-5  gap-3 text-green-600 hover:bg-gray-200">
                            <font-awesome-icon icon="pen-to-square" class="p-1" />
                            <p class="block " >Update</p>
                        </div>
                        <div class="flex px-5 py-2 gap-3 text-red-600 hover:bg-gray-200">
                            <font-awesome-icon icon="trash" class="p-1" />
                            <p class="block" >Delete</p>
                        </div>
                        <div class="flex px-5 gap-3 text-cyan-700 hover:bg-gray-200">
                            <font-awesome-icon icon="info" class=" p-1 pt-1 pr-2" />
                            <p class="block " >Detail</p>
                        </div>
                        
                        
                    </div>
                </div>
                </div>
              </div>
            </div>
        </div>
    </div>

    <ModalCreateKaryawan :isVisible="isCreateModalVisible" :karyawanStore="karyawanStore" @closeModal="closeCreateModal" />

</template>

<script>
import { onMounted, ref } from "vue";
import { useKaryawan } from "../../store/karyawan.js";
import ModalCreateKaryawan from "../../modals/karyawan/ModalCreateKaryawan.vue"

export default {
    setup() {
        const karyawanStore = useKaryawan();
        const karyawan = ref([]);
        const isCreateModalVisible = ref(false);

        async function getKaryawan() {
            try {
                const response = await karyawanStore.getKaryawan();
                if (Array.isArray(response)) {
                    karyawan.value = response;
                    
                } else {
                    console.log("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Failed to fetch karyawan data:", error);
            }
        }

        function toggleDropdown(employeeId) {
            const employee = karyawanStore.karyawan.find(emp => emp.id_karyawan === employeeId);
            if (employee) {
                employee.showDropdown = !employee.showDropdown;
                console.log(`Toggled dropdown for employee with ID: ${employeeId}`);
            }
        }
        function openCreateModal() {
            isCreateModalVisible.value = true;
        }

        function closeCreateModal() {
            isCreateModalVisible.value = false;
        }


        onMounted(() => {
            getKaryawan()
        });

        return {
            getKaryawan,
            toggleDropdown,
            openCreateModal,
            closeCreateModal,
            isCreateModalVisible,
            karyawan,
            karyawanStore,
        };
    },

    components: {
        ModalCreateKaryawan,
    }
}
</script>           