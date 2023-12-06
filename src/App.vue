<template>
  <div id="app">
    <div class="font-poppins leading-normal tracking-normal">
      <div class="flex flex-wrap">
        <sidebar v-if="showSidebarFrame" />
        <div class="w-full" :class="isSideBarOpen ? 'overlay' : ''" >
          <navbar v-if="showNavbar" />
          <div class="">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "./store/store";

import sidebar from "./components/Layout/sidebar.vue"
import navbar from "./components/Layout/navbar.vue"

export default {
  name: 'App',
  computed: {
    isSideBarOpen() {
      return useStore().isSideBarOpen;
    },
    showNavbar() {
      return !["Login", "Register", "EmptyLayout"].includes(this.$route.name);
    },
    showSidebarFrame() {
      return !["Login", "Register", "EmptyLayout"].includes(this.$route.name);
    },
  },
  components: {
    sidebar,
    navbar,
  }
}
</script>
