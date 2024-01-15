/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const ProdukStore = defineStore("produk", {
  state: () => ({
    product: [],
    editProduct: null,
    totalProduct: 0,
    type: [],
  }),

  actions: {
    // Get Product
    async getProduct() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/product`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to get product");
        }

        const data = response.data;
        this.product = data;
        return data;
      } catch (error) {
        console.error("Get data product error : ", error);
        throw error;
      }
    },

    // Modal update
    openEditModal(product) {
      this.editedProduct = { ...product };
    },

    closeEditModal() {
      this.editedProduct = null;
    },

    async updateProduct(updatedData) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_APP_BASE_URL}/product/update/${
            updatedData.id_product
          }`,
          {
            harga_product: updatedData.harga_product,
            keuntungan: updatedData.keuntungan,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to update product");
        }

        this.closeEditModal();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },

    // delete product
    async deleteProduct(id) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to delete product");
        }
        const index = this.product.findIndex((p) => p.id_product === id);
        if (index !== -1) {
          this.product.splice(index, 1);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
    },

    async getTotalProduct() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/product/total`
        );
        if (!response) {
          throw new Error("Gagal mendapatkan total produk");
        }
        this.totalProduct = response.data.total;
        this.month = response.data.month;
      } catch (error) {
        console.error("Kesalahan dalam mendapatkan total produk:", error);
        throw error;
      }
    },

    async filterProductsType(type) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/product/filter/${type}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to get filtered products");
        }

        const { data, status } = response;

        if (status !== 200) {
          throw new Error(`Failed to get filtered products. Status: ${status}`);
        }

        this.type = data;
        return data;
      } catch (error) {
        console.error("Filter products error: ", error.message);
        throw error;
      }
    },

    async searchPenjualan(query) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/product/search?query=${query}`
        );

        if (!response) {
          throw new Error("Failed to search Penjualan");
        }

        const data = response.data;
        this.produk = data;
        return data;
      } catch (error) {
        console.error("Search product error: ", error);
        throw error;
      }
    },
  },
});
