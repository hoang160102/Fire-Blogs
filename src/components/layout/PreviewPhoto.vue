<template>
  <div class="modal d-flex align-center justify-center w-100">
    <div
      class="modal-content bg-white d-flex flex-column align-end pa-7"
    >
      <v-icon @click="closeModal">mdi-window-close</v-icon>
      <img class="w-100" :src="link" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["link"],
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
  width: 500px;
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
  background-color: rgba(48, 48, 48, 0.7);
}
</style>
