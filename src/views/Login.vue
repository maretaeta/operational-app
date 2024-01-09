<script>
import { ref } from "vue";
import { AuthStore } from "../store/auth";
import { useRouter } from "vue-router";

export default {
    setup() {
        const store = AuthStore();
        const router = useRouter();
        const loginData = ref({
            username: "",
            password: "",
        });
        const error = ref(null);

        const handleLogin = async () => {
            try {
                const response = await store.login(loginData.value);

                if (response) {
                    router.push("/dashboard");
               } else {
                    const errorMessage = response.data ? response.data.message : "Login failed";
                    error.value = { message: errorMessage };
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    error.value = error.response.data;
                } else {
                    error.value = { message: "Login error" };
                }
                console.error("Login error:", error);
            }
        };

        return {
            loginData,
            handleLogin,
            error,
        };
    },
};
</script>


 <template>
     <div class="font-poppins w-full mx-auto h-full min-h-screen bg-slate-200 items-center justify-center justify-items-center flex p-5">
             <div class="lg:grid grid-cols-2">
                 <div class="flex lg:block">
                 <img src="@/assets/signin.png" class="w-96 lg:w-full lg:h-[650px] mx-auto" />
             </div>
             <div class="mx-auto px-10 flex items-center justify-center justify-items-center">
                 <div class="bg-white rounded-xl w-full p-16">
                     <h1 class="lg:text-3xl text-xl font-bold">Hello Welcome Back Admin,</h1>
                     <p class="pt-2 pb-5 lg:pb-7 text-sm">
                      Welcome Back to Manajement Inventory Application: Easy and Fast Solution to Manage Business
                     </p>
     <form class="mx-auto " @submit.prevent="handleLogin">
                 <div class="mb-3 lg:mb-7">
                   <label>
                     <p class="text-sm">Username</p>
                   </label>
                   <input
                     v-model="loginData.username"
                     type="username"
                     placeholder="Enter Username"
                     name="username"
                     class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800"
                   />
                 </div>

                 <div class="mb-3 lg:mb-7">
                   <label>
                     <p>Password</p>
                   </label>
                   <input
                     v-model="loginData.password"
                     type="password"
                     placeholder="Enter Password"
                     name="password"
                     class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800"
                   />
                 </div>
                 <button type="submit" class="bg-cyan-800 rounded-md text-white w-full mx-auto py-2 ml-2 mt-3 xl:w-[500px]">
                   Login
                 </button>
                 <!-- <p class="text-red-500 mt-2" v-if="error && typeof error === 'string'">{{ error }}</p>
                 <p class="text-red-500 mt-2" v-if="error && error.includes('Username')">{{ error }}</p>
                 <p class="text-red-500 mt-2" v-if="error && error.includes('Password')">{{ error }}</p>
                 -->
                 <p class="text-red-500 mt-2" v-if="error">{{ error.message }}</p>
               </form>
                     <!-- <p class=" text-center pt-7">
                         Don't have an account?
                         <span class="text-cyan-900 pl-1" >Sign up</span>
                     </p> -->
                 </div>
             </div>
         </div>
     </div>
</template>




