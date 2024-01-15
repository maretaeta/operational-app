/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const AuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    users: [],
  }),

  actions: {
    async register(registerData) {
      try {
        const response = await axios.post(
          `${import.meta.env.VUE_APP_BASE_URL}/auth/register`,
          registerData
        );

        if (!response) {
          throw new Error("Registration failed");
        }

        const data = response.data;
        return data;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },

    async login(loginData) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
          loginData
        );

        if (!response) {
          throw new Error("Login failed");
        }

        if (
          response.data &&
          response.data.result &&
          response.data.result.token
        ) {
          const { token } = response.data.result;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          this.token = token;
          return response.data;
        } else {
          console.error("Token not found in the response");
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.token = null;
      this.role = null;
      this.tokenExpiration = null;
      delete axios.defaults.headers.common["Authorization"];
    },

    async getUsers() {
      try {
        const response = await axios.get(
          `${import.meta.env.VUE_APP_BASE_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (!response) {
          throw new Error("Failed to fetch users");
        }

        const data = response.data;
        this.users = data;
        return data;
      } catch (error) {
        console.error("Fetch users error:", error);
        throw error;
      }
    },
  },
});
