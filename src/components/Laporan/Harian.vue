<template>
    <div>
        <h4 class="text-lg font-semibold text-gray-700 pb-4">Akumulasi Keuntungan Harian</h4>
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
                                            class="px-4 py-5 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                            Tanggal
                                    </th>
                                    <th
                                            class="px-4 py-5 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                            Pembelian
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                        Penjualan
                                    </th>
                                   
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                        Keuntungan
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                        Data Pengeluaran
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                        Total Pengeluaran
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-sm leading-4 font-medium uppercase tracking-wider">
                                        Pendapatan Bersih
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                        <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                            <tr v-for="(data, index) in summaryData" :key="index" class="border-b border-gray-200">
                                <td class="px-4 py-4 whitespace-no-wrap text-center">
                                    <p class="text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">{{ formatDate(data.tanggal) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalPembelianPerDay) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalPenjualanPerDay) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalKeuntunganPerDay) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">
                                        <!-- Display expenses, if available -->
                                            <template v-if="data.expenses && data.expenses.length > 0">
                                                    <ul>
                                                        <li v-for="(expense, expenseIndex) in data.expenses" :key="expenseIndex">
                                                            {{ expense.keterangan }}: {{ formatHarga(expense.jumlah) }} <br/> <br/>
                                                        </li>
                                                    </ul>
                                                </template>
                                                <!-- If no expenses, display a message or leave it empty as needed -->
                                                <template v-else>
                                                    No expenses
                                                </template>
                                    </div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalPengeluaranPerDay) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalPenjualanPerDay - data.totalPengeluaranPerDay) }}</div>
                                </td> 
                                    <td class="px-4 py-4 whitespace-no-wrap text-center flex gap-3 justify-center items-center justify-items-center">
                                        <vue-feather type="plus-circle" size="20" stroke="blue" @click="openModal" />
                                        <vue-feather type="edit" size="20" stroke="green" />
                                        <vue-feather type="trash-2" size="20" stroke="red" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <CreatePengeluaranModal :isVisible="showModal" @closeModal="closeModal" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import VueFeather from "vue-feather";
import { PendapatanStore } from "../../store/pendapatan";
import CreatePengeluaranModal from "../../modals//pendapatan/CreatePengeluaranModal.vue";

export default {
    components: {
        VueFeather,
        CreatePengeluaranModal
    },
    setup() {
         const showModal = ref(false);
        const summaryData = ref([]);
        const usePendapatan = PendapatanStore();

        const getPendapatanHarian = async () => {
            try {
                const response = await usePendapatan.fetchSummaryData();
                if (response.success && Array.isArray(response.createdPendapatan)) {
                    summaryData.value = response.createdPendapatan;
                } else {
                    console.error("Response API tidak valid:", response);
                }
            } catch (error) {
                console.error("Gagal mengambil data pendapatan harian:", error);
            }
        };

         const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', options);
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

        const openModal = () => {
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        // Your existing methods

        onMounted(() => {
            getPendapatanHarian();
        });

        return {
            summaryData,
            getPendapatanHarian,
            formatDate,
            formatHarga,
            openModal,
            closeModal,
            showModal,
            CreatePengeluaranModal
        };
    },
};
</script>