<template>
    <div class="pl-0 lg:pl-52 xl:pl-56 w-full min-h-screen p-7 xl:p-10 bg-slate-100 relative">
        <div class="bg-white min-h-screen rounded-xl p-8 ml-10">
        <!-- Navigation -->
            <div class="font-poppins text-sm font-semibold mb-6">
                <ol class="list-none p-0 pl-3 inline-flex">
                    <li class="flex items-center text-purple">
                        <p class="text-gray-700">Home</p>
                        <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path
                                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373-33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                            </path>
                        </svg>
                    </li>
                    <li class="flex items-center">
                        <p class="text-gray-600">Detail Penjualan</p>
                    </li>
                </ol>
            </div>

            <div class="items-center justify-center p-2">
                <div class="w-full mb-8">
                    <h3 class="text-xl md:text-2xl font-medium text-gray-700">Detail Penjualan</h3>
                    <p class="text-xs md:text-sm text-gray-400 mb-6">detail penjualan kayu</p>
                </div>

                <div class="flex justify-center p-4">
                    <img src="../../assets//logo.png" class="w-28 lg:w-32 absolute" />
                </div>
                <div v-if="penjualanDetail" class="items-center border rounded">
                    <div class="bg-slate-200 p-4">
                     
                       <div class="flex gap-5 justify-between pt-5">
                        <p class="text-sm lg:text-lg font-medium">UD. Adi Mulia Profile</p>
                        <p class="text-sm lg:text-lg">{{ formatDate(penjualanDetail.createdAt) }}</p>
                       </div>
                    </div>
                    <div class="p-4">
                        <div class="pb-5 text-cyan-800">
                            <p class="font-semibold">No. {{ penjualanDetail.id_penjualan }}</p>
                            <p>Pembeli : {{ penjualanDetail.nama_toko }}</p>
                        </div>
                        <div class="flex flex-col mb-10 bg-gray-25 rounded-md border">
                            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="overflow-x-auto sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200 text-left">
                                    <thead>
                                        <tr>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kayu</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kayu</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ukuran Kayu</th>
                                             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Kayu</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="item in penjualanDetail.penjualanItems" :key="item.id_penjualanItem">
                                            <td class="px-6 py-4 whitespace-nowrap">{{ item.product.jenis_product }}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">{{ item.product.nama_product }}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">{{ item.product.ukuran_product }}</td>
                                             <td class="px-6 py-4 whitespace-nowrap">{{ item.quantity }}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">{{ formatHarga(item.product.harga_product) }}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-cyan-800 font-medium">
                            <div v-if="penjualanDetail.diskon !== null" class="flex gap-5 justify-end">
                                <p>Diskon :</p>
                                <span> {{ formatHarga(penjualanDetail.diskon) }}</span>
                            </div>
                            <div class="flex gap-5 justify-end py-4">
                                <p>Total Harga :</p>
                                <span>{{ formatHarga(penjualanDetail.totalHarga_product) }}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { penjualanStore } from '../../store/penjualan';

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
    },

    setup(props, { emit }) {
        const penjualanDetail = ref(null);
        const usePenjualanStore = penjualanStore();

        const getPenjualanDetail = async () => {
            try {
                const data = await usePenjualanStore.getDetailPenjualan(props.id);
                penjualanDetail.value = data;
            } catch (error) {
                console.error('Gagal mengambil detail penjualan:', error);
            }
        };

        const closeDetail = () => {
            emit('close');
        };

        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', options);
        };

        const formatHarga = (harga) => {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(harga);
        };

        onMounted(() => {
            getPenjualanDetail();
        });

        return {
            penjualanDetail,
            closeDetail,
            formatDate,
            formatHarga,
        };
    },
};
</script>