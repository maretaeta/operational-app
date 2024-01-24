<!-- @format -->

<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
    <div
      class="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="modal-content py-10 text-left px-6">
        <h2 class="text-2xl text-cyan-800 font-semibold mb-4">
          Pilih Barang :
        </h2>
        <ul>
          <li
            v-for="product in products"
            :key="product.id_product"
            class="mb-4"
          >
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="selectedProducts"
                :value="product"
                class="mr-3"
              />
              <div class="grid grid-cols-2">
                <span class="text-base md:text-lg font-semibold text-gray-800"
                  >Jenis</span
                >
                <span class="text-base md:text-lg">{{
                  product.jenis_product
                }}</span>

                <span class="text-base md:text-lg font-semibold text-gray-800"
                  >Nama</span
                >
                <span class="text-base md:text-lg">{{
                  product.nama_product
                }}</span>

                <span class="text-base md:text-lg font-semibold text-gray-800"
                  >Harga</span
                >
                <span class="text-base md:text-lg">{{
                  formatHarga(product.harga_product)
                }}</span>

                <span class="text-base md:text-lg font-semibold text-gray-800"
                  >Stok</span
                >
                <span class="text-base md:text-lg">{{
                  product.stok_product
                }}</span>
              </div>
            </label>
          </li>
        </ul>

        <div class="flex justify-end pt-10">
          <button
            @click="addSelectedProducts"
            class="bg-green-500 px-4 py-2 text-white rounded mr-4"
          >
            Tambah
          </button>
          <button
            @click="closeModal"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showModal", "products"],
  emits: ["close", "add"],
  data() {
    return {
      selectedProducts: [],
    };
  },
  methods: {
    addSelectedProducts() {
      this.$emit("add", this.selectedProducts);
      this.selectedProducts = [];
    },
    closeModal() {
      this.$emit("close");
      this.selectedProducts = [];
    },
  },
  setup() {
    const formatToRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    };

    const formatHarga = (harga) => {
      return formatToRupiah(harga);
    };

    return {
      formatHarga,
    };
  },
};
</script>
