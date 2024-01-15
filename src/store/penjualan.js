/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const penjualanStore = defineStore("penjualan", {
  state: () => ({
    penjualan: [],
    totalPenjualan: 0,
  }),

  actions: {
    async getPenjualan() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/penjualan`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to get Penjualan");
        }

        const data = response.data;
        this.penjualan = data;
        return data;
      } catch (error) {
        console.error("Get data penjualan error : ", error);
        throw error;
      }
    },

    async deletePenjualan(id_penjualan) {
      try {
        const response = await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/penjualan/delete/${id_penjualan}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to delete Penjualan");
        }

        this.penjualan = this.penjualan.filter(
          (item) => item.id_penjualan !== id_penjualan
        );

        return response.data;
      } catch (error) {
        console.error("Delete penjualan error: ", error);
        throw error;
      }
    },

    async getTotalPenjualan() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/penjualan/total`
        );

        if (!response) {
          throw new Error("Gagal mendapatkan total pembelian");
        }

        this.totalPenjualan = response.data.total;
      } catch (error) {
        console.error("Error find data penjualan");
        throw Error;
      }
    },

    async getDetailPenjualan(id_penjualan) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/penjualan/detail/${id_penjualan}`
        );

        if (!response || !response.data) {
          throw new Error("Failed to get Penjualan detail");
        }

        return response.data;
      } catch (error) {
        console.error("Get penjualan detail error: ", error);
        throw error;
      }
    },

    async getPenjualanByJenisProduk(jenisProduk) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/penjualan/byJenisProduk/${jenisProduk}`
        );

        if (!response) {
          throw new Error("Failed to get Penjualan by jenis produk");
        }

        const data = response.data.data;
        this.penjualan = data;
        return data;
      } catch (error) {
        console.error("Get penjualan by jenis produk error: ", error);
        throw error;
      }
    },

    // search
    async searchPenjualan(keyword) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/penjualan/search?keyword=${keyword}`
        );

        if (!response) {
          throw new Error("Failed to search Penjualan");
        }

        const data = response.data;
        this.penjualan = data;
        return data;
      } catch (error) {
        console.error("Search penjualan error: ", error);
        throw error;
      }
    },
  },
});
