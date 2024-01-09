<template>
                <h4 class="text-lg font-semibold text-gray-700 pb-4">Akumulasi Keuntungan Bulanan</h4>
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
                                                class="px-4 py-5 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                                    Bulan
                                                </th>
                                            <th
                                                class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                                Penjualan
                                            </th>
                                            <th
                                                class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                                Pembelian
                                            </th>
                                            <th
                                                class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                                Keuntungan
                                            </th>
                                            <th
                                                class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                                Total Pemgeluaran
                                            </th>
                                            <th
                                                class="px-4 py-5 bg-cyan-600 text-white  text-sm leading-4 font-medium uppercase tracking-wider">
                                                Pendapatan Bersih
                                            </th>
                                            <th
                                                class="px-4 py-5 bg-cyan-600 text-white text-center text-sm leading-4 font-medium uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                                        <tr v-for="(data, index) in dailyReports" :key="index" class="border-b border-gray-200">
                                            <td class="px-4 py-4 whitespace-no-wrap text-center">
                                                <p class="text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                                            </td>
                                            <td class="px-4 py-4 whitespace-no-wrap">
                                                <div class="text-sm leading-5 font-medium text-gray-900">{{ data.jumlahPenjualan }}</div>
                                            </td>
                                            <td class="px-4 py-4 whitespace-no-wrap">
                                                <div class="text-sm leading-5 font-medium text-gray-900">{{ data.jumlahPembelian }}</div>
                                            </td>
                                            <td class="px-4 py-4 whitespace-no-wrap  ">
                                                <div class="text-sm leading-5 font-medium text-gray-900">{{ data.totalKeuntungan }}
                                                </div>
                                            </td>
                                            <td class="px-4 py-4 whitespace-no-wrap  ">
                                                <div class="text-sm leading-5 font-medium text-gray-900">{{ data.dataPengeluaran }}</div>
                                            </td>
                                            <td class="px-4 py-4 whitespace-no-wrap  ">
                                                <div class="text-sm leading-5 font-medium text-gray-900">{{ data.totalPengeluaran }}</div>
                                            </td>
                                            <td class="px-4 py-4 whitespace-no-wrap  ">
                                                    <div class="text-sm leading-5 font-medium text-gray-900">{{ data.pendapatan }}</div>
                                                </td>
                                            <td class="px-4 py-4 whitespace-no-wrap text-center flex gap-3">
                                                 <vue-feather type="trash-2"
                                                    size="20"
                                                    stroke="red"
                                                    
                                                />
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

export default {
    data() {
        return {
            dailyReports: [
                {
                    jumlahPenjualan: "maret",
                    jumlahPembelian: 50,
                    totalKeuntungan: 50,
                    dataPengeluaran: "Pengeluaran 1",
                    totalPengeluaran: 20,
                    pendapatan: 10000,
                },
            ],
        };
    },
    methods: {
        deleteDailyReport(index) {
            this.dailyReports.splice(index, 1);
        },
    },
    components: {
        VueFeather,
    }
};
</script>

