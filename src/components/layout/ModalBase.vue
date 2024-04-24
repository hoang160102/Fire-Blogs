<template>
  <div class="modal d-flex align-center justify-center w-100">
    <div v-if="load" class="loading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div
      v-else
      class="modal-content bg-white d-flex flex-column justify-center pa-7"
      max-width="400"
    >
      <p>If your account exists, you will recieve a email!</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["load", "msg"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  height: 100vh;
}

.modal-content {
    border-radius: 8px;
    
}

button {
  transition: all 0.5s ease;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

button:hover {
    background-color: rgba(48,48,48, 0.7);
}
</style>
