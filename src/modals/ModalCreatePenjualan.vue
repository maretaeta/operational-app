<template>
    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="showModal">
        <div class="modal-container bg-white w-96 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="modal-content py-4 text-left px-6">
                <div class="modal-header text-center">
                    <div class="modal-title font-semibold text-xl">Success</div>
                </div>
                <div class="modal-body">
                    <p></p>
                </div>
                <div class="modal-footer mt-4" @click="closeModal">
                    <button @click="closeSuccessModal"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['showModal'],
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>
