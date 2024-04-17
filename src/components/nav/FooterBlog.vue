<template>
  <footer class="bg-blue-grey-darken-4">
    <v-container class="mx-auto py-10">
      <v-row class="d-flex align-center" no-gutters>
        <div class="d-flex flex-wrap v-col-xl-6 v-col-lg-6 v-col-md-6 v-col-sm-12 v-col-xs-12">
          <div class="social d-flex flex-column v-col-xl-6 v-col-lg-6 v-col-md-6 v-col-sm-12 v-col-xs-12">
            <div class="brand d-flex mb-4">
              <router-link class="link" :to="{ name: 'Home' }">FireBlogs</router-link>
            </div>
            <div class="social d-flex">
              <v-icon class="mr-4">mdi-facebook</v-icon>
              <v-icon class="mr-4">mdi-instagram</v-icon>
              <v-icon class="mr-4">mdi-linkedin</v-icon>
              <v-icon class="mr-4">mdi-twitter</v-icon>
            </div>
          </div>
          <div class="direct d-flex flex-column v-col-xl-6 v-col-lg-6 v-col-md-6 v-col-sm-12 v-col-xs-12">
            <router-link class="link px-3" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link px-3" :to="{ name: 'Blog' }">Blogs</router-link>
            <router-link class="link px-3" :to="{ name: 'Login'}">Login/Register</router-link>
          </div>
        </div>
        <div class="right-content d-flex justify-end v-col-xl-6 v-col-lg-6 v-col-md-6 v-col-sm-12 v-col-xs-12">
          <div class="right">Copyright 2024 All Rights Reserved</div>
        </div>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
export default {};
</script>

<style>
.v-container {
  max-width: 1440px;
}

.link {
  text-decoration: none;
  color: #fff;
  font-weight: 700;
}

.right {
    font-weight: 600;
}
.brand > .link {
    font-size: 24px;
}

.direct > .link {
    font-size: 20px;
}

@media screen and (max-width: 960px) {
    .brand, .right-content {
        justify-content: center !important;
    }
    .social {
        justify-content: center;
    }
    .text {
        justify-content: center;
    }
    .direct {
        flex-direction: row !important;
        justify-content: center !important;
    }
    
}
</style>
