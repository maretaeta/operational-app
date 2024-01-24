<!-- @format -->

<script>
import { ref, reactive } from "vue";
import { AuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

export default {
  setup() {
    const store = AuthStore();
    const router = useRouter();
    const loginData = reactive({
      username: "",
      password: "",
    });
    const error = ref(null);

    const handleLogin = async () => {
      try {
        if (!loginData.username) {
          error.value = { message: "Username is required!." };
          return;
        }

        if (!loginData.password) {
          error.value = { message: "Password is required!." };
          return;
        }

        const response = await store.login(loginData);

        if (!response) {
          message.error(
            "Login failed. Please check your username and password and try again!."
          );
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message || "Login failed";
          if (
            error.response.status === 400 ||
            errorMessage.toLowerCase().includes("invalid password")
          ) {
            error.value = { message: "Invalid username or password." };
          } else if (errorMessage.toLowerCase().includes("user not found")) {
            error.value = { message: "User not found." };
          } else {
            error.value = { message: errorMessage };
          }
          message.error(error.response.data.message || "Login failed");
        } else if (error.message.includes("Username")) {
          error.value = { message: "Username is required." };
        } else if (error.message.includes("Password")) {
          error.value = { message: "Password is required." };
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
  <div
    class="font-poppins w-full mx-auto h-full min-h-screen bg-slate-200 items-center justify-center justify-items-center flex p-5"
  >
    <div class="lg:grid grid-cols-2">
      <div class="flex lg:block">
        <img
          src="@/assets/signin.png"
          class="w-96 lg:w-full lg:h-[650px] mx-auto"
        />
      </div>
      <div
        class="mx-auto px-10 flex items-center justify-center justify-items-center"
      >
        <div class="bg-white rounded-xl w-full p-16">
          <h1 class="lg:text-3xl text-xl font-bold">Selamat Datang Admin,</h1>
          <p class="pt-2 pb-5 lg:pb-7 text-sm">
            Selamat Datang di aplikasi manajemen operasional : Welcome Back to
            Manajement Operational Application: Mudah dan Cepat Solusi untuk
            Mengelola Bisnis
          </p>
          <form class="mx-auto" @submit.prevent="handleLogin">
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
            <button
              type="submit"
              class="bg-cyan-800 rounded-md text-white w-full mx-auto py-2 ml-2 mt-3 xl:w-[500px]"
            >
              Login
            </button>
            <p class="text-red-500 mt-3 text-center" v-if="error">
              {{ error.message }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
