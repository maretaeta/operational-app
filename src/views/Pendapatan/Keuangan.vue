<template>
        <div class=" pl-0 lg:pl-52 xl:pl-60 w-full min-h-screen p-4 md:p-7 xl:p-10 bg-slate-100 relative">
             <a-spin v-if="!isDataLoaded" size="large" class="flex items-center justify-center min-h-screen w-full h-full" />
              <ol class="list-none pl-3 inline-flex text-xs ml-7 pt-4 text-gray-400">
                        <li class="flex items-center text-purple">
                            <p class="text-gray-600">Dashboard</p>
                            <svg class="fill-cyan-700 w-3 mb-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path
                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                            </svg>
                        </li>
                        <li class="flex items-center">
                            <p class="text-gray-600">Pendapatan</p>
                        </li>
                    </ol>

        <div v-if="isDataLoaded" class="bg-white min-h-screen rounded-xl p-7 ml-7">
            <div class="font-poppins font-semibold mb-6 ">
                <h3 class="text-xl xl:text-2xl font-medium text-gray-700 pl-3">Data Pendapatan</h3>
                <p class="text-gray-400 text-xs pl-3">Berikut ini adalah data pendapatan yang diperoleh secara harian, bulanan, dan tahunan</p>
            </div>

         <div class="flex justify-end mb-4 pt-5">
          <button
            @click="changeTimeFrame('daily')"
            :class="{ 'bg-cyan-700 text-white': selectedTimeFrame === 'daily' }"
            class="py-2 px-4 rounded-md  text-xs xl:text-sm"
          >
            Harian
          </button>
          <button
            @click="changeTimeFrame('monthly')"
            :class="{ 'bg-cyan-700 text-white': selectedTimeFrame === 'monthly' }"
            class="py-2 px-4 border  text-xs xl:text-sm"
          >
            Bulanan
          </button>
          <button
            @click="changeTimeFrame('yearly')"
            :class="{ 'bg-cyan-700 text-white': selectedTimeFrame === 'yearly' }"
            class="py-2 px-4  text-xs xl:text-sm"
          >
            Tahunan
          </button>
        </div>

        <div class="p-4">
            <component :is="selectedReportComponent" />
        </div>
        
      </div>
      </div>
</template>

<script>
import { ref } from "vue";
import Harian from "../../components/Laporan/Harian.vue";
import Bulanan from "../../components/Laporan/Bulanan.vue";
import Tahunan from "../../components/Laporan/Tahunan.vue";
import { Spin } from "ant-design-vue";

export default {
    data() {
         const isDataLoaded = ref(false);

        return {
            selectedTimeFrame: "daily",
            isDataLoaded,
        };
    },

    mounted() {
        setTimeout(() => {
            this.isDataLoaded = true;
        }, 1000);
    },

    computed: {
        selectedReportComponent() {
            switch (this.selectedTimeFrame) {
                case "daily":
                    return Harian;
                case "monthly":
                    return Bulanan;
                case "yearly":
                    return Tahunan;
                default:
                    return Harian;
            }
        },
    },
    
    methods: {
        changeTimeFrame(timeFrame) {
            this.selectedTimeFrame = timeFrame;
        },
    },

    components:{
        Spin,
    }
};
</script>