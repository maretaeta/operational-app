<template>
    <div class=" pl-0 lg:pl-52 xl:pl-60 w-full min-h-screen p-4 md:p-7 xl:p-10 bg-slate-100 relative">
        <div class="bg-white min-h-screen rounded-xl p-7 ml-7">
        <div class="font-poppins font-semibold mb-6 pt-3">
            <h3 class="text-xl xl:text-2xl font-medium text-gray-700 pl-3 pb-3">Create Penjualan</h3>
            <ol class="list-none p-0 pl-3 inline-flex text-xs xl:text-sm">
                <li class="flex items-center text-purple">
                    <p class="text-gray-700">Dashboard</p>
                    <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                        </path>
                    </svg>
                </li>
                <li class="flex items-center">
                    <p class="text-gray-600">Create Penjualan</p>
                </li>
            </ol>
        </div>

        <div class="items-center justify-center p-2 pt-5">
            <!-- Form Penjualan -->
            <form @submit.prevent="submitPenjualan">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm xl:text-base font-medium">Nama Toko 
                        <span class="text-red-600">*</span>
                    </label>
                    <input v-model="nama_toko" class="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm xl:text-base font-medium pb-2">Pilih Barang :
                        <span class="text-red-600">*</span>
                    </label>
                    <div class="flex bg-cyan-700 p-1 w-20 xl:w-28 gap-1 text-white rounded text-xs xl:text-sm justify-center">
                        <font-awesome-icon icon="plus" class="p-1" />
                        <button @click="showModal = true">Barang</button>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm xl:text-base font-medium pt-6 pb-3">Barang yang Dipilih :
                        <span class="text-red-600">*</span>
                    </label>
                    <div class="flex flex-wrap gap-6">
                        <div v-for="(product, index) in selectedProducts" :key="index" class="flex items-center justify-between w-full">
                            <div class="w-1/2">
                                <p>{{ index + 1 }}. {{ product.nama_product }}</p>
                            </div>
                            <div class="w-1/2 flex justify-end items-center">
                                <button @click="decrementQuantity(product)" class="bg-slate-200 text-gray-800 text-sm font-semibold rounded-md w-20">-</button>
                                <input v-model="product.quantity" type="number" class="w-16 mx-2 border rounded-md text-center" />
                                <button @click="incrementQuantity(product)" class="bg-slate-200 text-gray-800 text-sm font-semibold rounded-md w-20">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-10">
                    <label class="block text-gray-700 text-sm xl:text-base font-medium pt-6 mb-2 ">Diskon </label>
                    <input v-model="diskon" class="w-full px-3 py-2 border rounded-lg" type="number" />
                </div>

                <div v-if="error" class="text-red-500 mb-4 italic text-sm">
                {{ error }} !!
            </div>

               <button @click="createPenjualan" class="bg-cyan-700 text-xs xl:text-sm hover-bg-blue-700 text-white font-medium py-2 px-4 rounded">Create Penjualan</button>
          </form>
        </div>

        <SelectProductModals 
            :showModal="showModal" 
            :products="produk" 
            @close="showModal = false" 
            @add="addToPenjualan" 
        />
      
        </div>
    </div>
</template>


<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { ProdukStore } from "../../store/product";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import SelectProductModals from "../../modals/penjualan/selectproductmodals.vue"
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue'

export default {
    setup() {
        const router = useRouter();

        const produk = ref([]);
        const produkStore = ProdukStore();
        const nama_toko = ref();
        const diskon = ref(0);
        const error = ref(null);
        const showModal = ref(false);
        const selectedProducts = ref([]);
        const localSelectedProducts = ref([]);

        // get produk
        async function getProduk() {
            try {
                const response = await produkStore.getProduct();

                if (Array.isArray(response)) {
                    produk.value = response
                        .filter(product => product.stok_product > 0)
                        .map((product) => ({
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


       // create penjualan
        const createPenjualan = async () => {
            if (!nama_toko.value || selectedProducts.value.length === 0) {
                error.value = "Nama toko dan barang harus diisi.";
                return;
            }

            const postPenjualan = {
                nama_toko: nama_toko.value,
                diskon: diskon.value,
            };

            const selectedProductsArray = selectedProducts.value
                .filter((product) => product.quantity > 0)
                .map((product) => ({
                    id: product.id_product,
                    quantity: product.quantity,
                }));

            if (selectedProductsArray.length > 0) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/penjualan/create`, {
                        postPenjualan,
                        selectedProducts: selectedProductsArray,
                    });
                  
                    error.value = null;
                    message.success({
                        content: 'Sales data successfully created',
                        duration: 3,  
                        style: {
                            fontSize: '17px',  
                        },
                    });
                     router.push({ name: "DataPenjualan" });

                } catch (error) {
                    console.error("Gagal membuat penjualan:", error);
                    error.value = "Gagal membuat penjualan";
                }
            }
        };

        // toastify
        // const CreateNotif = () => {
        //     toast.success("Penjualan berhasil dibuat", {
        //         position: 'top-right',
        //         duration: 3000,
        //     });
        // };


        // add dari modal ke barang yang dipilih
        const addToPenjualan = (selectedProductsToAdd) => {
            selectedProductsToAdd.forEach((selectedProduct) => {
            const existingProduct = selectedProducts.value.find(product => product.id_product === selectedProduct.id_product);
                if (!existingProduct) {
                    selectedProduct.selected = true;
                    selectedProducts.value.push(selectedProduct);
                }
            });
            showModal.value = false;
        };

        // 
        const removeFromSelected = (productToRemove) => {
            const index = selectedProducts.value.findIndex(product => product.id_product === productToRemove.id_product);
            if (index !== -1) {
                selectedProducts.value.splice(index, 1);
                // Setel kembali properti selected produk yang sesuai di daftar produk utama menjadi false
                const mainProductIndex = produk.value.findIndex(product => product.id_product === productToRemove.id_product);
                if (mainProductIndex !== -1) {
                    produk.value[mainProductIndex].selected = false;
                }
            }
        };

        const addToLocalSelected = (selectedProductsToAdd) => {
            selectedProductsToAdd.forEach((selectedProduct) => {
                const existingProduct = localSelectedProducts.value.find(product => product.id_product === selectedProduct.id_product);
                if (!existingProduct) {
                    selectedProduct.selected = true;
                    localSelectedProducts.value.push(selectedProduct);
                }
            });
        };

        
       const incrementQuantity = (product) => {
            const index = selectedProducts.value.findIndex((p) => p.id_product === product.id_product);
            if (index !== -1) {
                selectedProducts.value[index].quantity++;
            }
        };

        const decrementQuantity = (product) => {
            const index = selectedProducts.value.findIndex((p) => p.id_product === product.id_product);
            if (index !== -1 && selectedProducts.value[index].quantity > 0) {
                selectedProducts.value[index].quantity--;
            }
        };



        onMounted(() => {
            getProduk();
        });
        return {
            produk,
            diskon,
            nama_toko,
            createPenjualan,
            error,
            showModal,
            // CreateNotif,
            addToPenjualan,
            selectedProducts,
            incrementQuantity,
            decrementQuantity,
             localSelectedProducts,
            addToLocalSelected,
      
        };
    },
    components: { 
        SelectProductModals 
    }
};
</script>