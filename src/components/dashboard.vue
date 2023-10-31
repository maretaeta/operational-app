<script>
import { useStore } from '../store/store';

import sidebar from "../components/sidebar.vue";
import navbar from "../components/navbar.vue"

export default {
    name: 'Dashboard',
    computed: {
        isSideBarOpen() {
            return useStore().isSideBarOpen;
        },
    },
    components: {
        sidebar,
        navbar,
    }
}
</script>



<template>
    <div class="font-poppins leading-normal tracking-normal" id="main-body">
        <div class="flex flex-wrap">
            <sidebar />
            <div class="w-full bg-white pl-0 lg:pl-64 min-h-screen" :class="isSideBarOpen ? 'overlay' : ''" id="main-content">
                <navbar />
                <div class="p-6 bg-white mb-20">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>