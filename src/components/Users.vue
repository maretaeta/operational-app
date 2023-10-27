<script>
import { AuthStore } from '../store/auth';
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const users = ref([]);
        const authStore = new AuthStore();

        async function fetchData() {
            try {
                const response = await authStore.getUsers();
                console.log('Users data:', response);
                users.value = response.data;
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }

        onMounted(() => {
            fetchData();
        });

        return {
            users,
        };
    },
};
</script>

<template>
    <div class="font-poppins text-sm font-semibold mb-6">
        <ol class="list-none p-0 inline-flex">
            <li class="flex items-center text-purple">
                <a href="/" class="text-gray-700">Home</a>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
            </li>
            <li class="flex items-center">
                <a href="/dashboard" class="text-gray-600">Users</a>
            </li>
        </ol>
    </div>

    <div class="items-center justify-center p-2">
        <div class="w-full">
          <h3 class="mb-4 text-xl font-bold text-cyan-700">Daftar Admin</h3>
        </div>
        <!-- table -->
        <div class="flex flex-col mb-12 bg-gray-25 rounded-md border border-gray-300">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Nama
                      </th>
                      <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Username
                      </th>
                      <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Password
                      </th>
                      <!-- <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Status
                      </th> -->
                      <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                    <tr v-for="(user, index) in users" :key="index" class="border-b border-gray-200">
                      <td class="px-6 py-4 whitespace-no-wrap">
                        <div class="flex items-center">
                          <div
                            class="h-3 w-3 mr-2 rounded-full"
                            :class="user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'"
                          ></div>
                          <div class="ml-4">
                            <div class="text-sm leading-5 font-medium text-gray-900">{{ user.nama }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap">
                        <div class="text-sm leading-5 text-gray-900">{{ user.username }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                          {{ user.password }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        Edit
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

