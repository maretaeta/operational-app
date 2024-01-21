<template>
    <div>
        <div class="flex gap-3 justify-between py-4 items-center">
            <h4 class="text-base xl:text-lg font-semibold text-gray-700 pb-4">Akumulasi Keuntungan Harian</h4>
           <!-- Print Button -->
            <div class="flex bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3  text-xs xl:text-sm">
                <vue-feather type="printer" size="17" @click="printSummaryData" />
                <p class="m-2">Print</p>
            </div>
        </div>
        
        <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-x-auto sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 text-left">
                            <thead>
                                <tr class="capitalize">
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-center text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                        No
                                    </th>
                                    <th
                                            class="px-4 py-5 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                            Tanggal
                                    </th>
                                    <th
                                            class="px-4 py-5 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                            Pembelian
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                        Penjualan
                                    </th>
                                   
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                        Keuntungan
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                        Total Pengeluaran
                                    </th>
                                    <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                        Pendapatan Bersih
                                    </th>
                                </tr>
                            </thead>
                        <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                            <tr v-if="sortedSummaryData.length === 0" class="border-b border-gray-200">
                                        <td colspan="9" class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700">
                                            No data recapitulation.
                                        </td>
                                    </tr>
                            <tr v-for="(data, index) in sortedSummaryData" :key="index" class="border-b border-gray-200">
                                <td class="px-4 py-4 whitespace-no-wrap text-center">
                                    <p class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</p>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatDate(data.date) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalPembelianPerDay) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalPenjualanPerDay) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalKeuntunganPerDay) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.totalPengeluaranPerDay) }}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap bg-cyan-50">
                                    <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900 ">{{ formatHarga(data.pendapatanBersih) }}</div>
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
            <button @click="prevPage" :disabled="currentPage === 1" class="cursor-pointer bg-gray-200 p-2 w-20 text-gray-800 text-xs">Previous</button>
                <span class="p-2 text-xs">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0" class="text-xs cursor-pointer bg-gray-200 text-gray-700 p-2 w-20">Next</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import VueFeather from "vue-feather";
import { PendapatanStore } from "../../store/pendapatan";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    components: {
        VueFeather,
           },
    setup() {
        const summaryData = ref([]);
        const usePendapatan = PendapatanStore();
        
        const currentPage = ref(1);
        const itemsPerPage = 10; 

        // diurutkan dari data terbaru
        const sortedSummaryData = computed(() => {
            return summaryData.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage);
        });

        const totalPages = computed(() => Math.ceil(summaryData.value.length / itemsPerPage));

        const getPendapatanHarian = async () => {
            try {
                const response = await usePendapatan.fetchSummaryData();
                if (Array.isArray(response)) {
                    summaryData.value = response.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort in descending order
                } else {
                    console.error("Invalid API response:", response);
                    throw new Error("Invalid API response. Please check the server response format.");
                }
            } catch (error) {
                console.error("Failed to fetch daily income data:", error.message);
            }
        };

        // pagination
        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        // format tanggal
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

        onMounted(() => {
            getPendapatanHarian();
        });

        return {
            summaryData,
            getPendapatanHarian,
            formatDate,
            formatHarga,
            currentPage,
            totalPages,
            sortedSummaryData,
            prevPage,
            nextPage,
            itemsPerPage
        };
        
    },

    methods: {
        printSummaryData() {
            const doc = new jsPDF();
            doc.text('Akumulasi Keuntungan Harian', 20, 10);
            const headers = [
                'No',
                'Tanggal',
                'Pembelian',
                'Penjualan',
                'Keuntungan',
                'Total Pengeluaran',
                'Pendapatan Bersih',
            ];
            const tableData = []; 
            this.summaryData.forEach((data, index) => {
                const rowData = [
                    index + 1,
                    this.formatDate(data.date),
                    this.formatHarga(data.totalPembelianPerDay),
                    this.formatHarga(data.totalPenjualanPerDay),
                    this.formatHarga(data.totalKeuntunganPerDay),
                    this.formatHarga(data.totalPengeluaranPerDay),
                    this.formatHarga(data.pendapatanBersih),
                ];
                tableData.push(rowData); 
            });

            const tableConfig = {
                startY: 20, 
                head: [headers],
                body: tableData, 
            };

            doc.autoTable(tableConfig);

            doc.save('Akumulasi_Keuntungan_Harian.pdf');
        },
    },
};
</script>