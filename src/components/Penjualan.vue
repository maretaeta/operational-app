<template>
    <div class="pl-0 lg:pl-64 w-full min-h-screen p-6">
        <!-- Navigasi -->
        <div class="font-poppins text-sm font-semibold mb-6">
            <ol class="list-none p-0 pl-3 inline-flex">
                <li class="flex items-center text-purple">
                    <p class="text-gray-700">Beranda</p>
                    <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                        </path>
                    </svg>
                </li>
                <li class="flex items-center">
                    <p class="text-gray-600">Produk</p>
                </li>
            </ol>
        </div>

        <div class="items-center justify-center p-2">
            <div class="w-full">
                <h3 class="mb-8 text-2xl font-bold text-cyan-700">Create Penjualan</h3>
            </div>

            <!-- Form Penjualan -->
            <form @submit.prevent="submitPenjualan">
                <div class="mb-4">
                    <label class="block text-gray-700 text-lg font-bold mb-2">Pilih Produk:</label>
                    <div v-for="product in produk" :key="product.id_product">
                        <label class="block text-gray-700 text-base pt-6 mb-1">
                            {{ product.nama_product }} :
                        </label>
                        <input v-model="product.quantity" type="number" class="w-full px-3 py-2 border rounded-lg" />
                        <input type="hidden" :name="'selectedProducts[' + product.id_product + '][id]'"
                            :value="product.id_product" />
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-lg font-bold mb-2 ">Diskon :</label>
                    <input v-model="diskon" class="w-full px-3 py-2 border rounded-lg" type="number" />
                </div>

                <button type="submit" class="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Penjualan</button>
          </form>
        </div>
      </div>
      <!-- <Modal :showModal="showModal" @close="showModal = false" /> -->
</template>


<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { ProdukStore } from "../store/product";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    // components: {
    //     Modal, 
    // },
    setup() {
        const produk = ref([]);
        const produkStore = ProdukStore();
        const diskon = ref(0);
        const error = ref(null);
        const showModal = ref(false);

        async function getProduk() {
            try {
                const response = await produkStore.getProduct();
                if (Array.isArray(response)) {
                    produk.value = response.map((product) => ({
                        id_product: product.id_product,
                        nama_product: product.nama_product,
                        quantity: 0,
                    }));
                } else {
                    console.error("Respon API tidak valid:", response);
                    error.value = "Gagal mendapatkan data produk";
                }
            } catch (error) {
                console.error("Gagal mendapatkan data produk:", error);
                error.value = "Gagal mendapatkan data produk";
            }
        }

        const submitPenjualan = async () => {
            const postPenjualan = {
                diskon: diskon.value,
            };

            const selectedProductsArray = produk.value
                .filter((product) => product.quantity > 0)
                .map((product) => ({
                    id: product.id_product,
                    quantity: product.quantity,
                }));

            if (selectedProductsArray.length > 0) {
                try {
                    const response = await axios.post("http://localhost:4000/api/v1/penjualan/create", {
                        postPenjualan,
                        selectedProducts: selectedProductsArray,
                    });
                    console.log("Penjualan berhasil:", response.data);
                    error.value = null;
                    CreateNotif();
                    // showModal.value = true; //
                } catch (error) {
                    console.error("Gagal membuat penjualan:", error);
                    error.value = "Gagal membuat penjualan";
                }
            }
        };

        // toastify
        const CreateNotif = () => {
            toast.success("Penjualan berhasil dibuat", {
                position: 'top-right',
                duration: 3000,
            });
        }

        onMounted(() => {
            getProduk();
        });

        return {
            produk,
            diskon,
            submitPenjualan,
            error,
            showModal,
            CreateNotif,
        };
    },
};
</script>