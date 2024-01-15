<template>
    <div>
        <h4 class="text-base xl:text-lg font-semibold text-gray-700 pb-4">Akumulasi Keuntungan Harian</h4>
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
                                    <!-- <th
                                        class="px-4 py-5 bg-cyan-600 text-white text-center text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                        Aksi
                                    </th> -->
                                </tr>
                            </thead>
                        <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                            <tr v-if="summaryData.length === 0" class="border-b border-gray-200">
                                        <td colspan="9" class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700">
                                            No data recapitulation.
                                        </td>
                                    </tr>
                            <tr v-for="(data, index) in summaryData" :key="index" class="border-b border-gray-200">
                                <td class="px-4 py-4 whitespace-no-wrap text-center">
                                    <p class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
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
                                    <!-- <td class="px-4 py-4 whitespace-no-wrap text-center flex gap-3 justify-center items-center justify-items-center">
                                        
                                        <vue-feather type="edit" size="20" stroke="green" />
                                        <vue-feather type="trash-2" size="20" stroke="red" />
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import VueFeather from "vue-feather";
import { PendapatanStore } from "../../store/pendapatan";

export default {
    components: {
        VueFeather,
           },
    setup() {
        const summaryData = ref([]);
        const usePendapatan = PendapatanStore();
        
        const getPendapatanHarian = async () => {
            try {
                const response = await usePendapatan.fetchSummaryData();
                if (Array.isArray(response)) {
                    summaryData.value = response;
                } else {
                    console.error("Invalid API response:", response);
                    throw new Error("Invalid API response. Please check the server response format.");
                }
            } catch (error) {
                console.error("Failed to fetch daily income data:", error.message);
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

        onMounted(() => {
            getPendapatanHarian();
        });

        return {
            summaryData,
            getPendapatanHarian,
            formatDate,
            formatHarga,
        };
    },
};
</script>