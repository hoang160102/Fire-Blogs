<template>
  <div class="modal d-flex align-center justify-center w-100">
    <div v-if="load" class="loading">
        <v-progress-circular
        color="primary"
        indeterminate></v-progress-circular>
    </div>
    <div v-else class="modal-content bg-white" max-width="400">
        <p>Email Sent</p>
        <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['load'],
    methods: {
        closeModal() {
            this.$emit('close-modal')
        }
    }
}
</script>

<style scoped>
.modal {
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
}
</style>
