/** @format */

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Buy from "../components/Buy.vue";
import Register from "../views/Register.vue";
import Users from "../components/Users.vue";
import Toko from "../components/Toko.vue";
import Produk from "../components/product.vue";
import Penjualan from "../components/Penjualan.vue";
import DataPenjualan from "../components/DataPenjualan.vue";
import detailPembelian from "../components/Pembelian/detailPembelian.vue";
import EmptyLayout from "../views/EmptyLayout.vue";

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
  { path: "/users", name: "Users", component: Users },
  { path: "/toko", name: "Toko", component: Toko },
  { path: "/produk", name: "Produk", component: Produk },
  { path: "/penjualan", name: "Penjualan", component: Penjualan },
  { path: "/dataPenjualan", name: "DataPenjualan", component: DataPenjualan },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
