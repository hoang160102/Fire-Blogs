<template>
  <main-content>
    <v-container class="mx-auto px-15 py-10">
      <h1 class="text-center mb-5">Account Settings</h1>
      <div class="form bg-green-lighten-5 px-15 py-10">
        <div class="ava d-flex justify-center">
          <div class="user-name bg-teal-darken-4">{{ standName }}</div>
        </div>
        <form class="mt-5" @submit.prevent="saveChanges">
          <div class="form-control mb-5">
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
          <div class="form-control mb-5">
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
          <div class="form-control mb-5">
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
          <div class="form-control mb-5">
            <v-text-field
              disabled
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
        </form>
        <div class="d-flex justify-center">
          <button @click="saveChanges" class="px-3 py-2 bg-teal-darken-4">
            Save Changes
          </button>
        </div>
        <div v-if="msg" class="mt-3 d-flex justify-center">
          <span class="text-green">Changes are saved. Please refresh the page</span>
        </div>
      </div>
    </v-container>
  </main-content>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
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
      msg: false,
      showModal: false,
      submitted: false,
    };
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      username: { required },
      email: { required, email },
    };
  },
  computed: {
    ...auth.authComputed,
    standName() {
      if (this.user) {
        return `${this.user.firstName
          .match(/(\b\S)?/g)
          .join("")}${this.user.lastName.match(/(\b\S)?/g).join("")}`;
      }
      return "";
    },
  },
  methods: {
    ...auth.authMethods,
    checkError(isError, isRequired, msg) {
      if (isError && isRequired) {
        return msg;
      }
    },
    async saveChanges() {
      this.submitted = true;
      const isFormCorrect = this.v$.$validate();
      isFormCorrect.then((result) => {
        if (!result) {
          return
        }
        else {
          const { firstName, lastName, username, email } = this
          this.updateAccount({
            firstName,
            lastName,
            username,
            email
          })
          this.msg = true
        }
      })
    },
    close() {
      this.showModal = false;
    },
  },
  async created() {
    await this.getCurrentUser();
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.username = this.user.username;
    this.email = this.user.email;
  },
};
</script>

<style scoped>
.v-container {
  max-width: 900px;
}
.user-name {
  border-radius: 50%;
  width: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
}
.form {
  border-radius: 15px;
}
button {
  border-radius: 10px;
}
</style>
