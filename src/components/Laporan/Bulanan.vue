<template>
                <h4 class="text-base xl:text-lg font-semibold text-gray-700 pb-4">Akumulasi Keuntungan Bulanan</h4>
                <!-- Table -->
                <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-x-auto sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200 text-left">
                                    <thead>
                                        <tr class="capitalize">
                                            <th
                                                class="px-4 py-5 bg-cyan-600 text-white text-center  text-xs xl:text-smleading-4 font-medium   tracking-wider">
                                                No
                                            </th>
                                             <th
                                                class="px-4 py-5 bg-cyan-600 text-white text-center  text-xs xl:text-smleading-4 font-medium   tracking-wider">
                                                    Bulan
                                                </th>
                                            <th
                                                class="px-4 py-5 text-center bg-cyan-600 text-white   text-xs xl:text-smleading-4 font-medium   tracking-wider">
                                                Pendapatan Bersih
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                                        <tr v-if="monthData.length === 0" class="border-b border-gray-200">
                                            <td colspan="9" class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700">
                                                No data recapitulation.
                                            </td>
                                        </tr>
                                        <tr v-for="(data, index) in monthData" :key="index" class="border-b border-gray-200">
                                            <td class="px-4 py-4 whitespace-no-wrap text-center">
                                                <p class=" text-xs xl:text-smleading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                                            </td>
                                            <td class="px-4 py-4 whitespace-no-wrap  ">
                                                <div class=" text-xs xl:text-smleading-5 font-medium text-gray-900">{{ data.month }}</div>
                                            </td>
                                            <td class="px-4 py-4 whitespace-no-wrap text-center bg-cyan-50 ">
                                                    <div class=" text-xs xl:text-smleading-5 font-medium text-gray-900">{{ formatHarga(data.totalPendapatan) }}</div>
                                                </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
</template>

<script>
import VueFeather from "vue-feather"
import { PendapatanStore } from "../../store/pendapatan";
import { ref, onMounted } from "vue";

export default {
    components: {
        VueFeather,
    },

    setup(){
        const usePendapatanMonth = PendapatanStore();
        const monthData = ref([]);

        const getPendapatanBulanan = async () => {
            try {
                const response = await usePendapatanMonth.getPengeluaranPerMonth();
                if (Array.isArray(response)) {
                    monthData.value = response;
                } else {
                    console.error("Invalid API response:", response);
                    throw new Error("Invalid API response. Please check the server response format.");
                }
            } catch (error) {
                console.error("Failed to fetch pendapatan data:", error.message);
                console.error("Full error details:", error);
            }
        };

        function formatToRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }

        function formatHarga(harga) {
            return formatToRupiah(harga);
        }

        const formatDate = (dateString) => {
            const options = { month: 'long', year: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', options);
        };

         onMounted(() => {
            getPendapatanBulanan();
        });

        return {
           getPendapatanBulanan,
           monthData,
           formatHarga,
           formatDate
        };
    }
};
</script>

