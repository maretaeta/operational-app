/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const PendapatanStore = defineStore("pendapatan", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    summaryData: [],
    pengeluaranMonth: [],
    pendapatanYear: [],
  }),

  actions: {
    async fetchSummaryData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pendapatan/summary`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.summaryData = response.data;
        return response.data;
      } catch (error) {
        console.error("Error fetching summary data:", error);
        throw error;
      }
    },

    async getPengeluaranPerMonth() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pendapatan/total-per-month`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.pengeluaranMonth = response.data;
        return response.data;
      } catch (error) {
        console.error("Error fetching pengeluaran:", error);
        throw error;
      }
    },

    async getPendapatanYear() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pendapatan/tahun `,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.pendapatanYear = response.data;
        return response.data;
      } catch (error) {
        console.error("Error fetching pendapatan tahunan:", error);
        throw error;
      }
    },
  },
});
