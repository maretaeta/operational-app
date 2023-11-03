<script>
import { useStore } from "../store/store"
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
            router.push({name: "Home"})
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
            router.push({name: "Laporan"})
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
        };

    },
    components: {
        VueFeather,
    },

};
</script>



<template>
    <div class="font-poppins w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-white z-30 transition duration-500 ease-in-out"
        :class="sideBarOpen ? '' : 'hidden'" id="main-nav">

        <div  @click="handleHome" class="w-full h-24 flex gap-2 px-5 items-center mb-8 p-5">
            <img src="../assets//logo.png" class="w-20 h-12" />
            <p class="font-semibold text-md text-gray-800">UD ADI MULIA PROFILE</p>
        </div>

        <div class="mb-4 px-4 text-gray-800">
            <p class="pl-4 text-xs font-semibold mb-4 text-gray-600">MENU</p>
            <div @click="handleHome"
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="house"  />
                <span class="text-gray-800 font-medium pl-2">Dashboard</span>
            </div>
             <div @click="handlePembelian"
                    class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                    <font-awesome-icon icon="truck"  />
                    <span class="text-gray-800 font-medium pl-2">Pembelian</span>
                </div>
            <div @click="handleProduct"
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="boxes-stacked" />
                <span class="text-gray-800 font-medium pl-2">Product</span>
            </div>
            <div class="w-full">
                <button
                    class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150 focus:outline-none"
                    @click="toggleDropdownCompras">
                    <font-awesome-icon icon="cart-shopping" />
                    <span class="text-gray-800 font-medium pl-2">Penjualan</span>
                    <svg class="hidden lg:flex w-4 h-4 ml-16 text-gray-600" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div :class="{ 'hidden': !dropdownComprasOpen }" class="my-1 pl-2 py-1 rounded-lg bg-gray-300">
                    <div  @click="handlePenjualan"
                        class="flex items-center h-10 pl-5 hover:text-gray-900 rounded-lg cursor-pointer transition duration-500 ease-in-out animated focus:outline-none">
                        <font-awesome-icon icon="cart-plus" />
                        <span class="font-medium pl-2">Create Penjualan</span>
                    </div>
                    <div @click="handleDataPenjualan" 
                        class="flex items-center h-10 pl-5 hover:text-gray-900 rounded-lg cursor-pointer duration-150">
                        <font-awesome-icon icon="tags" />
                        <span class="font-medium pl-2">Data Penjualan</span>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="mb-4 px-4 text-gray-800 mt-5">
            <p class="pl-4 text-xs font-semibold mb-4 text-gray-600">Relations</p>
            <div @click="handleToko"
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="shop" />
                <span class="text-gray-800 font-medium pl-2">Toko</span>
            </div>
        </div>
        <div class="mb-4 px-4 text-gray-800 mt-5">
            <p class="pl-4 text-xs font-semibold mb-4 text-gray-600">MONITORING</p>
            <div @click="handleLaporan"
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="chart-line" />
                <span class="text-gray-800 font-medium pl-2">Laporan</span>
            </div>
        </div>
    </div>
</template>

