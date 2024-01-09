/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const TokoStore = defineStore("toko", {
  state: () => ({
    toko: [],
    editToko: null,
  }),

  actions: {
    async getToko() {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/toko", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (!response) {
          throw new Error("Failed to fetch toko");
        }

        const data = response.data;
        this.toko = data;
        return data;
      } catch (error) {
        console.error("Fetch toko error : ", error);
        throw error;
      }
    },

    async deleteToko(id_toko) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/v1/toko/delete/${id_toko}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.status === 200) {
          const index = this.toko.findIndex((p) => p.id_toko === id_toko);
          if (index !== -1) {
            this.toko.splice(index, 1);
          }
        } else {
          console.error("Failed to delete toko. Status code:", response.status);
        }
      } catch (error) {
        console.error("Error deleting toko: ", error);
        throw error;
      }
    },

    // Add the updateToko action
    async updateToko(id_toko, nama_toko, alamat_toko, notlp_toko) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/v1/toko/update/${id_toko}`,
          {
            nama_toko,
            alamat_toko,
            notlp_toko,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Failed to update toko");
        }
      } catch (error) {
        console.error("Error updating toko:", error);
        throw error;
      }
    },

    async searchToko(keyword) {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/toko/search?keyword=${keyword}`
        );

        if (!response) {
          throw new Error("Failed to search Toko");
        }

        const data = response.data;
        this.toko = data;
        return data;
      } catch (error) {
        console.error("Search toko error: ", error);
        throw error;
      }
    },
  },
});
