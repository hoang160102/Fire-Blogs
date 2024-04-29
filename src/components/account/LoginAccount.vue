<template>
  <div class="form-wrap d-flex align-center">
    <div
      class="px-15 form-login v-col-xl-5 v-col-lg-5 v-col-md-5 v-col-sm-8 v-col-xs-8"
    >
      <p class="mb-6">
        Don't have an account?
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h1 class="mb-6">Login to FireBlog</h1>
      <form @submit.prevent="loginUser" class="mb-3">
        <div class="form-control">
          <v-text-field
            v-model="email"
            label="Email"
            prepend-inner-icon="mdi-email-outline"
            :error-messages="
              checkError(
                submitted && v$.email.$error,
                v$.email.required,
                'Your email is not valid'
              )
            "
          >
          </v-text-field>
        </div>
        <div class="form-control">
          <v-text-field
            v-model="password"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :error-messages="
              checkError(
                submitted && v$.password.$error,
                v$.password.required,
                'Your password must have at least 6 characters'
              )
            "
          >
          </v-text-field>
        </div>
      </form>
      <span v-if="errorMsg.length > 1" class="mb-2 text-red">{{
        errorMsg
      }}</span>
      <p class="mb-10">
        <router-link :to="{ name: 'Forgot Password' }"
          >Forgot your password ?</router-link
        >
      </p>
      <p>
        <button @click="loginUser" class="bg-black px-5 py-2">Sign In</button>
      </p>
    </div>
    <div class="background">
      <img src="../../img/background.png" alt="" />
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { auth } from "@/state/helpers";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      email: "",
      password: "",
      submitted: true,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLengthValue: minLength(6) },
    };
  },
  computed: {
    ...auth.authComputed,
  },
  methods: {
    ...auth.authMethods,
    checkError(isError, isRequired, msg) {
      if (isError && isRequired) {
        return msg;
      }
    },
    async loginUser() {
      this.submitted = true;
      const isFormCorrect = this.v$.$validate();
      isFormCorrect.then((result) => {
        if (!result) {
          return;
        } else {
          const { email, password } = this;
          this.login({
            email,
            password,
          })
        }
      });
    },
  },
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

.background {
  height: 100vh;
  overflow: hidden;
}

button {
  border-radius: 20px;
}

@media screen and (max-width: 960px) {
  .form-login {
    margin: auto;
  }
  .background {
    display: none;
  }
}
</style>
