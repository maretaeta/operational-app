<template>
    <div id="home" class="pl-0 lg:pl-64 w-full min-h-screen p-6">
        <nav class=" font-poppins text-sm font-semibold mb-6">
            <ol class="list-none p-0 pl-3 inline-flex">
                <li class="flex items-center text-purple">
                    <a href="/" class="text-gray-700">Home</a>
                    <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                    </svg>
                </li>
                <li class="flex items-center">
                    <a href="/dashboard" class="text-gray-600">Dashboard</a>
                </li>
            </ol>
        </nav>

        <div class="lg:flex justify-between items-center mb-6 p-2">
            <p class="text-2xl font-semibold mb-2 lg:mb-0 text-gray-800">Selamat datang, Admin!</p>
            <button
                class="bg-purple hover:bg-purple-light focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow duration-150">Lihat Laporan</button>
        </div>
        

        <!-- Cards -->
        <div class="flex flex-wrap -mx-3 mb-16 p-2">

            <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-pink text-white rounded-l-lg">
                        <font-awesome-icon icon="cube" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>

                    <div class="text-gray-700 ml-6 leading-6">
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
                    <p class="font-semibold text-2xl">{{ pembelian.totalPembelian }}</p>
                    <p class="text-sm text-gray-600">Pembelian Barang</p>
                </div>
        </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0  mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-orange text-white rounded-l-lg">
                        <font-awesome-icon icon="truck-fast" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>

                    <div class="text-gray-700 ml-6 leading-6">
                        <p class="font-semibold text-2xl">{{ penjualan.totalPenjualan }}</p>
                        <p class="text-sm text-gray-600">Produk Terjual</p>
                    </div>

                </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-green text-white rounded-l-lg">
                        <font-awesome-icon icon="sack-dollar" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>

                    <div class="text-gray-700 ml-6 leading-6">
                        <p class="font-semibold text-2xl">1,906</p>
                        <p class="text-sm text-gray-600">Pendapatan</p>
                    </div>

                </div>
            </div>

        </div>

        
        <!-- charts -->
        <div class="flex flex-wrap -mx-3">

            <div class="w-full xl:w-1/3 px-3">
                <p class="text-xl font-semibold mb-4 text-gray-700">Recent Sales</p>

                <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
                    <canvas id="buyers-chart" width="600" height="400"></canvas>
                </div>
            </div>

            <div class="w-full xl:w-1/3 px-3">
                <p class="text-xl font-semibold mb-4 text-gray-700">Recent Reviews</p>

                <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
                    <canvas id="reviews-chart" width="600" height="400"></canvas>
                </div>
            </div>

            <div class="w-full xl:w-1/3 px-3">
                <p class="text-xl font-semibold mb-4 text-gray-700">Recent Transactions</p>
                <div class="w-full bg-white border rounded-lg p-4">

                    <div class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                        <div>
                            <p class="font-semibold text-base text-gray-700">Tata</p>
                            <p class="text-sm text-gray-700">Product XYZ-92</p>
                        </div>
                        <span class="text-green-600 font-semibold text-lg">$25.00</span>
                    </div>

                    <div class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                        <div>
                            <p class="font-semibold text-base text-gray-700">Yaya</p>
                            <p class="text-sm text-gray-700">Product XYZ-92</p>
                        </div>
                        <span class="text-pink font-semibold text-lg">$74.99</span>
                    </div>

                    <div class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                        <div>
                            <p class="font-semibold text-base text-gray-700">Rara</p>
                            <p class="text-sm text-gray-700">Product XYZ-92</p>
                        </div>
                        <span class="text-green-600 font-semibold text-lg">$182.00</span>
                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

<!-- <script>
import { Chart } from 'chart.js/auto';

export default {
    name: 'DashboardHome',
    data() {
        return {
            buyersData: {
                type: 'line',
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [{
                        backgroundColor: "rgba(70,20,237,0.4)",
                        strokeColor: "#63b3ed",
                        pointColor: "#fff",
                        pointStrokeColor: "#63b3ed",
                        data: [203, 156, 99, 251, 305, 247, 256]
                    },
                    {
                        backgroundColor: "rgba(60,60,248,0.4)",
                        strokeColor: "#f7fafc",
                        pointColor: "#fff",
                        pointStrokeColor: "#f7fafc",
                        data: [86, 97, 144, 114, 94, 108, 156]
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            },
            reviewsData: {
                type: 'bar',
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [{
                        backgroundColor: "rgba(40,100,255,0.8)",
                        strokeColor: "#63b3ed",
                        pointColor: "#fff",
                        pointStrokeColor: "#63b3ed",
                        data: [203, 156, 99, 251, 305, 247, 256]
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            }
        }
    },
    mounted() {
        new Chart(document.getElementById('buyers-chart'), this.buyersData);
        new Chart(document.getElementById('reviews-chart'), this.reviewsData);
    }
}
</script> -->

<script>
import { onMounted, ref } from "vue";
import { ProdukStore } from "../store/product";
import { useBuyStore } from "../store/pembelian";
import { penjualanStore} from "../store/penjualan"

export default {
    setup() {
        const store = ProdukStore();
        const pembelian = useBuyStore();
        const penjualan = penjualanStore();

        onMounted(async () => {
            await store.getTotalProduct();
        });

        onMounted(async()=> {
            await pembelian.getTotalPembelian();
        });

        onMounted(async() => {
            await penjualan.getTotalPenjualan();
        });

        return {
            store,
            pembelian,
            penjualan,
        };
    },
};
</script>




