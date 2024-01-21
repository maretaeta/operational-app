<template>
    <div class="flex gap-3 justify-between py-4 items-center">
        <h4 class="text-base xl:text-lg font-semibold text-gray-700 pb-4">Akumulasi Keuntungan Tahunan</h4>
        <!-- Print Button -->
        <div class="flex bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3  text-xs xl:text-sm">
            <vue-feather type="printer" size="17" @click="printTahunanData" />
            <p class="m-2">Print</p>
        </div>
    </div>
    <!-- Table -->
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
                                    class="px-4 py-5 bg-cyan-600 text-white text-center text-xs xl:text-sm leading-4 font-medium   tracking-wider">
                                    Tahun
                                </th>
                                <th
                                    class="px-4 py-5 bg-cyan-600 text-white  text-xs xl:text-sm leading-4 font-medium   tracking-wider text-center">
                                    Pendapatan Bersih
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                            <tr v-if="yearData.length === 0" class="border-b border-gray-200">
                                                <td colspan="9" class="px-4 py-3 whitespace-no-wrap text-center text-sm text-gray-700">
                                                    No data recapitulation.
                                                </td>
                                            </tr>
                            <tr v-for="(data, index) in yearData" :key="index" class="border-b border-gray-200">
                                <td class="px-4 py-4 whitespace-no-wrap text-center">
                                    <p class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap">
                                    <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ data.year }}
                                    </div>
                                </td>
                                <td class="px-4 py-4 whitespace-no-wrap text-center bg-cyan-50">
                                    <div class="text-xs xl:text-sm leading-5 font-medium text-gray-900">{{ formatHarga(data.total) }}
                                    </div>
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
import VueFeather from "vue-feather";
import { PendapatanStore } from "../../store/pendapatan";
import { ref, onMounted } from "vue";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    components: {
        VueFeather,
    },
    setup() {
        const usePendapatanMonth = PendapatanStore();
        const yearData = ref([]);

        const getPendapatanTahunan = async () => {
            try {
                const response = await usePendapatanMonth.getPendapatanYear();
                if (Array.isArray(response)) {
                    yearData.value = response;
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

        const printTahunanData = () => {
            const doc = new jsPDF();
            doc.autoTable({
                head: [['No', 'Tahun', 'Pendapatan Bersih']],
                body: yearData.value.map((data, index) => [
                    index + 1,
                    data.year,
                    formatHarga(data.total)
                ]),
            });
            doc.save('Akumulasi_Keuntungan_Tahunan.pdf');
        };

        onMounted(() => {
            getPendapatanTahunan();
        });

        return {
            getPendapatanTahunan,
            yearData,
            formatHarga,
            printTahunanData,
        };
    },
};
</script>
