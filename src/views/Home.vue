<template>
   <div class="pl-0 lg:pl-52 xl:pl-56 w-full min-h-screen p-7 xl:p-10 bg-slate-100 relative">
    <div class="bg-white min-h-screen rounded-xl p-8 ml-10">
        <!-- <nav class="font-poppins text-sm font-semibold mb-6">
            <ol class="list-none p-0 pl-3 inline-flex">
                <li class="flex items-center text-purple">
                    <router-link to="/">Home</router-link>
                    <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                    </svg>
                </li>
                <li class="flex items-center">
                    <router-link to="">Dashboard</router-link>
                </li>
            </ol>
        </nav> -->

        <div class="lg:flex justify-between items-center mb-8 p-2 pt-8 pb-5">
            <p class="text-2xl font-semibold mb-2 lg:mb-0 text-gray-800">Selamat datang, Admin!</p>
            <button @click="handleLaporan"
                class="bg-purple hover:bg-purple-light focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow duration-150">
                Lihat Laporan
            </button>
        </div>

        <!-- Cards -->
        <div class="flex flex-wrap -mx-3 mb-16 p-2">

            <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-5 lg:px-5 lg:py-5 bg-pink text-white rounded-l-lg">
                        <font-awesome-icon icon="cube" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>
                    <div class="text-gray-700 ml-4 leading-6">
                        <div class="flex justify-end pb-2 pt-1">
                            <span class="text-xs text-gray-400">{{ store.month }}</span>
                        </div>
                        <p class="font-semibold text-2xl">{{ store.totalProduct }}</p>
                        <p class="text-sm text-gray-600">Total Barang</p>
                    </div>
                </div>
            </div>


            <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-purple text-white rounded-l-lg">
                        <font-awesome-icon icon="cart-shopping" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>
                    <div class="text-gray-700 ml-6 leading-6">
                         <div class="flex justify-end pb-2 pt-1">
                                <span class="text-xs text-gray-400">{{ pembelian.month }}</span>
                            </div>
                        <p class="font-semibold text-2xl">{{ pembelian.totalPembelian }}</p>
                        <p class="text-sm text-gray-600">Pembelian Kayu</p>
                    </div>
                </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-orange text-white rounded-l-lg">
                        <font-awesome-icon icon="truck-fast" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>
                    <div class="text-gray-700 ml-6 leading-6">
                        <div class="flex justify-end pb-2 pt-1">
                                    <span class="text-xs text-gray-400">{{ pembelian.month }}</span>
                                </div>
                        <p class="font-semibold text-2xl">{{ penjualan.totalPenjualan }}</p>
                        <p class="text-sm text-gray-600">Penjualan Kayu</p>
                    </div>
                </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-green text-white rounded-l-lg">
                        <font-awesome-icon icon="sack-dollar" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>
                    <div class="text-gray-700 ml-6 leading-6">
                        <div class="flex justify-end pb-2 pt-1">
                                    <span class="text-xs text-gray-400">{{ pembelian.month }}</span>
                                </div>
                        <p class="font-semibold text-2xl">1,906</p>
                        <p class="text-sm text-gray-600">Pendapatan</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- charts -->
        <div class="flex flex-wrap -mx-6 p-6 ">
            <div class="w-full xl:w-1/2 px-3">
                <p class="text-xl font-semibold mb-4 text-gray-700">Recent Income</p>
                <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
                    <select v-model="selectedYear" @change="loadDataBasedOnYear">
                        <option v-for="year in availableYears" :value="year">{{ year }}</option>
                    </select>
                    <canvas ref="chartCanvas"></canvas>
                </div>
            </div>
            
            <div class="w-full xl:w-1/2 px-3">
                <p class="text-xl font-semibold mb-4 text-gray-700">Recent Transactions</p>
                <div class="w-full bg-white border rounded-lg p-4">
                    <div v-for="(transaction, index) in top3Transactions" :key="index" class="w-full bg-slate-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                        <div>
                            <p class="font-medium text-base ">{{ transaction.nama_toko }}</p>
                            <p class="text-sm text-cyan-800">{{ transaction.totalPenjualan }} kayu</p>
                        </div>
                        <span :class="transaction.totalHarga > 0 ? 'text-green-500' : 'text-pink'" class="font-semibold text-lg">{{ formatHarga(transaction.totalHarga)}}</span>
                    </div>
                </div>
            </div>

            <!-- <div class="w-full xl:w-1/2 px-3 pt-10">
                <p class="text-xl font-semibold mb-4 text-gray-700">Recent Purchases</p>
                 <div class="w-full bg-white border rounded-lg p-4"></div>
            </div>

            <div class="w-full xl:w-1/2 px-3 pt-10">
                    <p class="text-xl font-semibold mb-4 text-gray-700">Recent Sales</p>
                     <div class="w-full bg-white border rounded-lg p-4"></div>
            </div>
             -->
        </div>
        </div>
    </div>
</template>


<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useBuyStore } from "../store/pembelian";
import { penjualanStore } from "../store/penjualan";
import { ProdukStore } from "../store/product";
import Chart from "chart.js/auto";
import { useRouter } from "vue-router";
 
export default {
    setup() {
        const router = useRouter()

        const store = ProdukStore();
        const pembelian = useBuyStore();
        const penjualan = penjualanStore();

        const recentTransactions = ref([]);

        const handleLaporan = () => {
            router.push({ name: "LaporanKeuangan" })
        }

        const selectedYear = ref(new Date().getFullYear());
        const availableYears = ref([2022, 2023, 2024]);
        const chartData = ref({
            labels: [],
            datasets: [
                {
                    label: "Pembelian Kayu",
                    backgroundColor: "rgba(0, 172, 193, 0.4)",
                    borderColor: "#00838F",
                    data: [],
                },
            ],
        });

        const chartOptions = ref({
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        });

        const fetchChartData = async (year) => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/v1/pembelian/sales/${year}`
                );
                const data = response.data;
                chartData.value.labels = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",                    
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
                chartData.value.datasets[0].data = data;
            } catch (error) {
                console.error("Error fetching chart data: ", error);
            }
        };

        const loadDataBasedOnYear = () => {
            fetchChartData(selectedYear.value);
        };

        const top3Transactions = computed(() => {
            const sortedTransactions = [...recentTransactions.value].sort((a, b) => b.totalHarga - a.totalHarga);
            return sortedTransactions.slice(0, 4);
        });

        const fetchRecentTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/penjualan/top`);
                recentTransactions.value = response.data;
            } catch (error) {
                console.error("Error fetching recent transactions: ", error);
            }
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


        onMounted(async () => {
            await store.getTotalProduct();
            await pembelian.getTotalPembelian();
            await penjualan.getTotalPenjualan();

            await fetchChartData(selectedYear.value);

            await fetchRecentTransactions();

            const chartCanvas = document.querySelector("canvas");
            new Chart(chartCanvas, {
                type: "line",
                data: chartData.value,
                options: chartOptions.value,
            });
        });

        return {
            store,
            pembelian,
            penjualan,
            chartData,
            chartOptions,
            selectedYear,
            availableYears,
            loadDataBasedOnYear,
            recentTransactions,
            fetchRecentTransactions,
            top3Transactions,
            formatHarga,
            handleLaporan,
        };
    },
};
</script>