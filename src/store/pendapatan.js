/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const PendapatanStore = defineStore("pendapatan", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    summaryData: [],
  }),

  actions: {
    async fetchSummaryData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/pendapatan/akumulasi",
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
  },
});
