/** @format */

import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Home.vue";
import Login from "../views/Login.vue";
import Buy from "../components/Pembelian/Buy.vue";
import Register from "../views/Register.vue";
import Toko from "../components/Relation/Toko.vue";
import Produk from "../components/Product/product.vue";
import Penjualan from "../components/Penjualan/Penjualan.vue";
import DataPenjualan from "../components/Penjualan/DataPenjualan.vue";
import EmptyLayout from "../views/EmptyLayout.vue";
import LaporanKeuangan from "../components/Laporan/Keuangan.vue";
import Karyawan from "../components/Relation/Karyawan.vue";
import DetailPenjualan from "../modals/penjualan/DetailPenjualan.vue";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      views: {
        default: Login,
        layout: EmptyLayout,
      },
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      views: {
        default: Register,
        layout: EmptyLayout,
      },
    },
  },
  {
    path: "/buy",
    name: "Buy",
    component: Buy,
  },
  {
    path: "/toko",
    name: "Toko",
    component: Toko,
  },

  {
    path: "/karyawan",
    name: "Karyawan",
    component: Karyawan,
  },

  { path: "/produk", name: "Produk", component: Produk },
  { path: "/penjualan", name: "Penjualan", component: Penjualan },
  { path: "/dataPenjualan", name: "DataPenjualan", component: DataPenjualan },
  { path: "/keuangan", name: "LaporanKeuangan", component: LaporanKeuangan },
  {
    path: "/detail-penjualan/:id",
    name: "DetailPenjualan",
    component: DetailPenjualan,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
