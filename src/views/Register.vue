<script>
import { ref } from "vue";
import { AuthStore } from "../store/auth";
import {useRouter} from "vue-router"

export default{
    setup(){
        const store = AuthStore()
        const router = useRouter()
        const registrationData = ref({
            nama: '',
            username: '',
            password: ''
        })
    const handleRegis = async () => {
        try{
            await store.register(registrationData.value);
            router.push('/login')
        } catch(error){
            console.error('Registration error: ', error)
        }
    }

    return {
        registrationData, handleRegis
    }
    }
}

</script>


<template>
    <div class="font-poppins w-full mx-auto h-full min-h-screen bg-slate-200 items-center justify-center justify-items-center flex p-5">
        <div class="lg:grid grid-cols-2">
            <div class="flex lg:block">
                <img src="@/assets/signin.png" class="w-96 lg:w-full lg:h-[650px] mx-auto" />
            </div>
                 <div class="mx-auto px-10 flex items-center justify-center justify-items-center">
                     <div class="bg-white rounded-xl w-full p-16">  
                    <h1 class="md:text-3xl text-xl font-bold">Welcome</h1>
                    <p class="pt-2 pb-5 lg:pb-7 text-sm">
                        Welcome to Manajement Inventory Application: Easy and Fast Solution to Manage Business
                    </p>
                    <form class="mx-auto" @submit.prevent="handleRegis">
                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p>Nama Lengkap</p>
                            </label>
                            <input v-model="registrationData.nama" type="text" placeholder="Enter Nama Lengkap" name="nama"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800 required" />
                        </div>
                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p>Username</p>
                            </label>
                            <input v-model="registrationData.username" type="text" placeholder="Enter Username" name="username"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                        </div>

                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p>Password</p>
                            </label>
                            <input v-model="registrationData.password"  type="password" placeholder="Enter Password" name="password"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                        </div>
                        <button type="submit" class="xl:w-[500px] pl-2 h-10 text-lg bg-cyan-800 rounded-md text-white w-full mx-auto py-2 ml-2 mt-3">
                            Register
                        </button>
                    </form>
                    <p class="text-center mt-7 mb-7">
                        Have an account?
                        <span class="text-cyan-800 pl-1" @click.prevent="">Login</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>





