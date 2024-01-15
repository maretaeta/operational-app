<script>
import { useStore } from "../../store/store"
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import VueFeather from "vue-feather";


export default {
    name: "sidebar",
    setup() {
        const store = useStore();
        const router = useRouter();

        const sideBarOpen = computed(() => store.sideBarOpen);
        const dropdownComprasOpen = ref(false);

        const toggleDropdownCompras = () => {
            dropdownComprasOpen.value = !dropdownComprasOpen.value;
        };

        const handlePembelian = () => {
            router.push({ name: "Buy" });
        };

        const handleAdmin = () => {
            router.push({ name: "Users" })
        };

        const handleToko = () => {
            router.push({ name: "Toko" });
        }

        const handleHome = () => {
            router.push({name: "Dashboard"})
        }

        const handleProduct = () => {
            router.push({name: "Produk"})
        }
        const handlePenjualan = () => {
            router.push({name: "Penjualan"})
        }

        const handleDataPenjualan = () => {
            router.push({name: "DataPenjualan"})
        }

        const handleLaporan = () => {
            router.push({name: "LaporanKeuangan"})
        }

        const handleKaryawan = () => {
            router.push({name: "Karyawan"})
        }

         const handlePengeluaran = () => {
            router.push({ name: "Pengeluaran" })
        }

        return {
            sideBarOpen,
            dropdownComprasOpen,
            toggleDropdownCompras,
            handleProduct,
            handleAdmin,
            handleToko,
            handleHome,
            handlePembelian,
            handlePenjualan,
            handleDataPenjualan,
            handleLaporan,
            handleKaryawan,
            handlePengeluaran
        };

    },
    components: {
        VueFeather,
    },

};
</script>

<template>
    <div class="font-poppins w-1/2 md:w-52 xl:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-white z-30 transition duration-500 ease-in-out"
        :class="sideBarOpen ? '' : 'hidden'" id="main-nav">

        <div  @click="handleHome" class="w-full h-24 flex gap-2 px-5 items-center mb-8 p-5">
        </div>

        <div class="mb-4 px-5 text-gray-800">
            <p class="pl-4 text-xs font-semibold mb-4 text-gray-600">MENU</p>
            <div @click="handleHome"
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="house" class="xl:text-lg"  />
                <span class="pl-2 text-xs xl:text-base">Dashboard</span>
            </div>
             <div @click="handlePembelian"
                    class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                    <font-awesome-icon icon="truck" class="xl:text-lg"  />
                    <span class="text-gray-800 pl-2  text-xs xl:text-base">Pembelian</span>
                </div>
            <div @click="handleProduct"
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="boxes-stacked" class="xl:text-lg" />
                <span class="text-gray-800  pl-2  text-xs xl:text-base">Product</span>
            </div>
            <div class="w-full">
                <button
                    class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150 focus:outline-none"
                    @click="toggleDropdownCompras">
                    <font-awesome-icon icon="cart-shopping" class="xl:text-lg" />
                    <span class="text-gray-800 font-medium pl-2  text-xs xl:text-base">Penjualan</span>
                    <svg class="hidden lg:flex w-4 h-4 ml-16 text-gray-600" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div :class="{ 'hidden': !dropdownComprasOpen }" class="my-1 pl-2 py-1 rounded-lg bg-gray-300">
                    <div  @click="handlePenjualan"
                        class="flex items-center h-10 pl-5 hover:text-gray-900 rounded-lg cursor-pointer transition duration-500 ease-in-out animated focus:outline-none">
                        <font-awesome-icon icon="cart-plus" class="xl:text-lg"  />
                        <span class="pl-2  text-xs xl:text-base" >Create Penjualan</span>
                    </div>
                    <div @click="handleDataPenjualan" 
                        class="flex items-center h-10 pl-5 hover:text-gray-900 rounded-lg cursor-pointer duration-150">
                        <font-awesome-icon icon="tags" class="xl:text-lg"  />
                        <span class=" pl-2  text-xs xl:text-base">Data Penjualan</span>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="mb-4 px-5 text-gray-800 mt-5">
            <p class="pl-4 text-xs font-semibold mb-4 text-gray-600">Relations</p>
            <div @click="handleToko"
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="shop" class="xl:text-lg" />
                <span class="text-gray-800 pl-2  text-xs xl:text-base">Toko</span>
            </div>

        </div>
        <div class="mb-4 px-5 text-gray-800 mt-5">
            <p class="pl-4 text-xs font-semibold mb-4 text-gray-600">MONITORING</p>
            <div  @click="handlePengeluaran"
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="chart-line" class="xl:text-lg"  />
                <span class="text-gray-800 pl-2  text-xs xl:text-base">Pengeluaran</span>
            </div>
            <div @click="handleLaporan"
                    class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                    <font-awesome-icon icon="money-bill-trend-up" class="xl:text-lg"  />
                    <span class="text-gray-800 pl-2  text-xs xl:text-base">Pendapatan</span>
            </div>
        </div>
    </div>
</template>

