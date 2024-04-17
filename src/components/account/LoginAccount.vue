<template>
    <div class="form-wrap d-flex align-center">
        <div class="px-15 form-login v-col-xl-4 v-col-lg-4 v-col-md-5 v-col-sm-8 v-col-xs-8">
            <p class="mb-6">Don't have an account?
                <router-link :to="{ name: 'Register' }">Register</router-link>
            </p>
            <h1 class="mb-6">Login to FireBlog</h1>
            <form class="mb-3">
                <div class="form-control">
                    <v-text-field
                    v-model="email"
                    label="Email"
                    prepend-inner-icon="mdi-email-outline">
                    </v-text-field>
                </div>
                <div class="form-control">
                    <v-text-field
                    v-model="password"
                    label="Password"
                    prepend-inner-icon="mdi-lock">
                    </v-text-field>
                </div>
            </form>
            <p class="mb-10">
                <router-link :to="{ name: 'Forgot Password'}">Forgot your password ?</router-link>
            </p>
            <p>
                <button class="bg-black px-5 py-2">Sign In</button>
            </p>
        </div>
        <div class="background">
            <img src="../../img/background.png" alt="">
        </div>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            email: '',
            password: ''
        }
    }
}
</script>

<style scoped>
.form-wrap {
    height: 100vh;
}

p, h1 {
    text-align: center;
}

p {
    font-weight: 600;
}

a {
    color: black;
}

img {
    transform: rotate(3deg);
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