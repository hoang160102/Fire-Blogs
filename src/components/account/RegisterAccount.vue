<template>
  <div class="form-wrap d-flex align-center">
    <div
      class="px-15 form-login v-col-xl-5 v-col-lg-5 v-col-md-5 v-col-sm-8 v-col-xs-8"
    >
      <p class="mb-6">
        Already have account?
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h1 class="mb-6">Create Your FireBlog Account</h1>
      <form @submit.prevent="registerUser" class="mb-3">
        <div class="form-control">
          <v-text-field
            v-model="firstName"
            label="First Name"
            prepend-inner-icon="mdi-account-outline"
            :error-messages="
              checkError(
                submitted && v$.firstName.$error,
                v$.firstName.required,
                'Please enter your first name'
              )
            "
          >
          </v-text-field>
        </div>
        <div class="form-control">
          <v-text-field
            v-model="lastName"
            label="Last Name"
            prepend-inner-icon="mdi-account-outline"
            :error-messages="
              checkError(
                submitted && v$.lastName.$error,
                v$.lastName.required,
                'Please enter your last name'
              )
            "
          >
          </v-text-field>
        </div>
        <div class="form-control">
          <v-text-field
            v-model="username"
            label="username"
            prepend-inner-icon="mdi-account-outline"
            :error-messages="
              checkError(
                submitted && v$.username.$error,
                v$.username.required,
                'Please enter your username'
              )
            "
          >
          </v-text-field>
        </div>
        <div class="form-control">
          <v-text-field
            v-model="email"
            label="Email"
            prepend-inner-icon="mdi-email-outline"
            :error-messages="
              checkError(
                submitted && v$.email.$error,
                v$.email.required,
                'Please enter a valid email'
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
      <p>
        <button @click="registerUser" class="bg-black px-5 py-2">
          Sign Up
        </button>
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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      submitted: false,
    };
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      username: { required },
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
    async registerUser() {
      this.submitted = true;
      const isFormCorrect = this.v$.$validate();
      isFormCorrect.then((result) => {
        if (!result) {
          return;
        } else {
          const { firstName, lastName, username, email, password } = this;
          this.register({
            firstName,
            lastName,
            username,
            email,
            password,
          });
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

button {
  border-radius: 20px;
}

.background {
  height: 100vh;
  overflow: hidden;
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
