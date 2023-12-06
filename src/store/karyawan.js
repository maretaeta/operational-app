import { defineStore } from "pinia";
import axios from "axios";

export const useKaryawan = defineStore("karyawan", {
  state: () => ({
    karyawan: [],
    editKaryawan: null,
  }),

  actions: {
    async getKaryawan() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/karyawan",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to get data karyawan");
        }

        const data = response.data;
        this.karyawan = data;
        return data;
      } catch (error) {
        console.error("Get data karyawan error:", error);
        throw error;
      }
    },

    async createKaryawan(newKaryawan) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/karyawan/create",
          newKaryawan,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to create new Karyawan");
        }

        const createdKaryawan = response.data;
        this.karyawan.push(createdKaryawan);

        return createdKaryawan;
      } catch (error) {
        console.error("Create Karyawan error:", error);
        throw error;
      }
    },
  },
});
