/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const useBuyStore = defineStore("buy", {
  state: () => ({
    nama_toko: "",
    alamat_toko: "",
    jenis_kayu: "",
    nama_kayu: "",
    ukuran: "",
    satuan: "",
    jumlah: "",
    pembelian: "",
    ongkos: "",
    currentStep: 0,
    pembelian: [],
    editPembelian: null,

    totalPembelian: 0,
    jenisKayu: [],
    totalKeuntungan: 0,
  }),

  mutations: {
    setCurrentStep(state, step) {
      state.currentStep = step;
    },
  },
  actions: {
    updateCurrentStep({ commit }, step) {
      commit("setCurrentStep", step);
    },
  },

  actions: {
    async createPurchase(purchaseData) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/pembelian/create`,
          purchaseData
        );

        if (!response) {
          throw new Error("Purchase creation failed");
        }

        const data = response.data;
        return data;
      } catch (error) {
        console.error("Purchase creation error:", error);
        throw error;
      }
    },

    async getPembelian() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pembelian`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to get data pembelian");
        }

        const data = response.data;
        this.pembelian = data;
        return data;
      } catch (error) {
        console.error("Get data pemebelian error :", error);
        throw error;
      }
    },

    async deletePembelian(id_productSources) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/pembelian/${id_productSources}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to delete pembelian");
        }

        this.pembelian = this.pembelian.filter(
          (Item) => Item.id_productSources !== id_productSources
        );

        return response.data;
      } catch (error) {
        console.error("Error deleting pembelian : ", error);
        throw error;
      }
    },

    async updatePembelian(updatedData) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_APP_BASE_URL}/pembelian/update/${updatedData.id_productSources}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Update failed");
        }

        const data = response.data;
        return data;
      } catch (error) {
        console.error("Update error:", error);
        throw error;
      }
    },

    async getTotalPembelian() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pembelian/total`,
        );

        if (!response) {
          throw new Error("Gagal mendapatkan total pembelian");
        }

        this.totalPembelian = response.data.total;
        this.month = response.data.month;
      } catch (error) {
        console.error("Error find total product sources");
        throw Error;
      }
    },

    async filterJenisKayu(jenisKayu) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pembelian/filter-jenis-kayu`,
          {
            params: {
              jenisKayu: jenisKayu,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to filter by jenis kayu");
        }

        const data = response.data;
        this.jenisKayu = data;
        return data;
      } catch (error) {
        console.error("Filter by jenis kayu error:", error);
        throw error;
      }
    },

    async searchPembelian(query) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pembelian/search?query=${query}`,
        );

        if (!response) {
          throw new Error("Failed to search Pembelian");
        }

        const data = response.data;
        this.pembelian = data;
        return data;
      } catch (error) {
        console.error("Search pembelian error: ", error);
        throw error;
      }
    },

    async getTotalKeuntungan() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pembelian/monthly-profit`,
        );

        if (!response || !response.data) {
          throw new Error("Gagal mendapatkan total keuntungan");
        }

        const { profit, month } = response.data[0];
        this.totalKeuntungan = profit;
        this.month = month;
      } catch (error) {
        console.error("Error dalam mendapatkan total keuntungan:", error);
        throw error;
      }
    },
  },
});
