/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const PengeluaranStore = defineStore("pengeluaran", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    pengeluaran: [],
  }),

  actions: {
    async getPengeluaranPerDay() {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/pengeluaran/accumulated-expenses-per-day`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.pengeluaran = response.data;
        return response.data;
      } catch (error) {
        console.error("Error fetching pengeluaran:", error);
        throw error;
      }
    },

    async createPengeluaran(newPengeluaran) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/pengeluaran/create`,
          newPengeluaran,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error creating pengeluaran:", error);
        throw error;
      }
    },

    async deletePengeluaran(date) {
      try {
        const response = await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/pengeluaran/delete-akumulasi/${date}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response || response.status !== 200) {
          console.error("Failed to delete pengeluaran. Response:", response);
          throw new Error(
            `Failed to delete pengeluaran. Status: ${response.status}`
          );
        }

        this.pengeluaran = this.pengeluaran.filter(
          (item) => item.date !== date
        );

        return response.data;
      } catch (error) {
        console.error("Error deleting pengeluaran:", error.message);
        throw error;
      }
    },

    async searchPengeluaran(keyword) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/pengeluaran/search?keyword=${keyword}`
        );

        if (!response) {
          throw new Error("Failed to search Penjualan");
        }

        const data = response.data;
        this.pengeluaran = data;
        return data;
      } catch (error) {
        console.error("Search product error: ", error);
        throw error;
      }
    },
  },
});
