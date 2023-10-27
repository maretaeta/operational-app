/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const penjualanStore = defineStore("penjualan", {
  state: () => ({
    penjualan: [],
    totalPenjualan: [],
  }),

  actions: {
    async getPenjualan() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/penjualan",
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
          `http://localhost:4000/api/v1/penjualan/${id_penjualan}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to delete Penjualan");
        }

        // If the deletion was successful, remove the deleted penjualan from the store.
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
          "http://localhost:4000/api/v1/penjualan/total"
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
  },
});
