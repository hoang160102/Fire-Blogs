<template>
  <div class="modal d-flex align-center justify-center w-100">
    <div
      class="modal-content bg-white d-flex flex-column justify-center pa-7"
    >
      <h1 class="text-center">Are you sure to delete the blog?</h1>
      <div class="d-flex justify-space-around">
        <button class="bg-grey-lighten-1" @click="cancel">Cancel</button>
        <button class="bg-red-darken-2" @click="deletePost">Delete</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    cancel() {
      this.$emit("close-modal");
    },
    deletePost() {
      this.$emit("delete-card");
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
  max-width: 400px;
}

button {
  transition: all 0.5s ease;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

button:first-child:hover {
    background-color: #E0E0E0 !important;
}

button:last-child:hover {
    background-color: #EF5350 !important;
}
</style>
