/** @format */

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Buy from "../components/Pembelian/Buy.vue";
import Register from "../views/Register.vue";
import Toko from "../components/Toko.vue";
import Produk from "../components/product.vue";
import Penjualan from "../components/Penjualan/Penjualan.vue";
import DataPenjualan from "../components/Penjualan/DataPenjualan.vue";
import EmptyLayout from "../views/EmptyLayout.vue";
import Laporan from "../components/Laporan.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      default: Login,
      layout: EmptyLayout,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      default: Register,
      layout: EmptyLayout,
    },
  },
  { path: "/buy", name: "Buy", component: Buy },
  { path: "/toko", name: "Toko", component: Toko },
  { path: "/produk", name: "Produk", component: Produk },
  { path: "/penjualan", name: "Penjualan", component: Penjualan },
  { path: "/dataPenjualan", name: "DataPenjualan", component: DataPenjualan },
  { path: "/laporan", name: "Laporan", component: Laporan },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
