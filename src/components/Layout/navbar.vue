<script>
import { useStore } from "../../store/store"
import { AuthStore } from "../../store/auth";
import VueFeather from 'vue-feather'
import {useRouter} from "vue-router"

export default {
    name: 'navbar',
    setup(){
        const store = AuthStore();
        const router = useRouter();

         const handleLogout = async () => {
            try {
                await store.logout();
                router.push('/');

            } catch (error) {
                console.error('An error occurred during logout:', error);
            }
        };

    
        return {
            handleLogout,
           
        }
    },

    
    computed: {
        isSideBarOpen() {
            return useStore().sideBarOpen;
        },
    },
    data() {
        return {
            dropDownOpen: false,
        };
    },
    methods: {
        toggleSidebar() {
            useStore().toggleSidebar();
        },
        
    },
    components:{
        VueFeather,
    }
};
</script>


<template>
    <div class="font-poppins sticky top-0 z-50 pl-0 ">
        <div class="w-full h-20 px-9 bg-white flex items-center justify-between shadow-md">
            <div class="flex">
                <div class="lg:hidden flex items-center mr-4 text-gray-700">
                    <button class="hover:text-purple-600 hover:border-white focus:outline-none navbar-burger"
                        @click="toggleSidebar()">
                        <vue-feather type="menu" class="pt-2 text-black items-center"/>
                    </button>
                </div>
                 <div class="w-full justify-center items-center hidden md:flex">
                <img src="../../assets//logo.png" class="w-12 xl:w-[65px]" />
                <p class="font-semibold text-sm xl:text-base text-gray-800">UD. ADI MULIA PROFILE</p>
            </div>
                <!-- <div class="relative text-gray-500">
                    <input type="search" name="serch" placeholder="Product..."
                        class="bg-white h-10 w-full xl:w-64 px-5 rounded-lg border text-sm focus:outline-none">
                    <button type="submit" class="absolute right-0 top-0 mt-3 mr-4 focus:outline-none hover:text-purple-600">
                        <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;"
                            xml:space="preserve" width="512px" height="512px">
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div> -->
            </div>

            <div class="flex items-center relative pr-9">
                <!-- <button
                    class="p-1 mr-4 rounded-full text-gray-700 hover:bg-purple-100 hover:text-purple duration-150 focus:outline-none">
                    <div class="flex leading-3 px-0">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"
                            class="fill-current">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                        </svg>
                        <div class="h-2 w-2 rounded-full bg-pink z-10 -ml-1"></div>
                    </div>
                </button> -->
                <button class="p-0 focus:outline-none duration-150 flex" @click="dropDownOpen = !dropDownOpen">
                    <font-awesome-icon icon="circle-user"  class="w-5 xl:w-7 h-5 xl:h-7 mt-2 xl:mt-1 rounded-full shadow-lg border-2  hover:border-purple-600 duration-150"/>
                    <p class="items-center text-center p-2 pt-3 text-xs xl:text-sm">Hi, Admin</p>
                </button>
            </div>
        </div>

        <div class="absolute border bg-white border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 right-0 mr-6 p-2"
            :class="dropDownOpen ? '' : 'hidden'">
            <p class="block px-4 py-2" @click="handleLogout">Logout</p>
        </div>
    </div>
</template>

