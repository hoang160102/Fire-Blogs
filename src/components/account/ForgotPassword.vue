<template>
  <teleport to="body">
    <modal-base :load="isLoading" v-if="showModal" @close-modal="close"></modal-base>
  </teleport>
  <div class="form-wrap d-flex align-center justify-space-between pa-0">
    <div
      class="px-15 form-login v-col-xl-4 v-col-lg-4 v-col-md-5 v-col-sm-8 v-col-xs-8"
    >
      <h1 class="mb-6">Reset Password</h1>
      <p class="mb-6">Forgot your passowrd? Enter your email to reset it</p>
      <form class="mb-3">
        <div class="form-control">
          <v-text-field
            v-model="email"
            label="Email"
            prepend-inner-icon="mdi-email-outline"
          >
          </v-text-field>
        </div>
      </form>
      <p>
        <button @click="resetPass" class="bg-black px-5 py-2">Reset</button>
      </p>
    </div>
    <div class="background">
      <img src="../../img/background.png" alt="">
    </div>
  </div>
</template>

<script>
import ModalBase from "../layout/ModalBase.vue";
import { useVuelidate } from "@vuelidate/core";
export default {
  data() {
    return {
      showModal: false,
      isLoading: false,
      email: "",
    };
  },
  components: {
    ModalBase,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  methods: {
    resetPass() {
      this.showModal = true
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    close() {
      this.showModal = false
    }
  }
};
</script>

<style scoped>
.form-wrap {
  height: 100vh;
}

p,
h1 {
  text-align: center;
}

p {
  font-weight: 600;
}

a {
  color: black;
}

button {
  border-radius: 20px;
}

/* .background {
  width: 100%;
  height: 100vh;
  border-left: 3vw solid transparent;
  border-bottom: 100vh solid rgba(0, 0, 0, 0.2);
} */



@media screen and (max-width: 960px) {
  .form-login {
    margin: auto;
  }
  .background {
    display: none;
  }
}
</style>
