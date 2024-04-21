<template>
  <header class="bg-white px-6">
    <v-container class="d-flex py-7 mx-auto justify-space-between">
      <div class="brand d-flex align-center px-3">
        <router-link class="link text-black" :to="{ name: 'Home' }"
          >FireBlogs</router-link
        >
      </div>
      <div class="nav-links d-flex align-center">
        <ul v-if="!mobile">
          <router-link class="link mr-8" :to="{ name: 'Home' }"
            >Home</router-link
          >
          <router-link class="link mr-8" :to="{ name: 'Blog' }"
            >Blogs</router-link
          >
          <router-link class="link mr-8" to="#">Create Post</router-link>
          <router-link class="link" :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>
        <v-icon v-else @click="toggleNav">mdi-menu</v-icon>
      </div>
    </v-container>
    <transition name="mobileNav" class="mobile-nav pa-5">
      <nav v-show="mobileNav" class="bg-blue-grey-darken-4 pa-5">
        <ul class="d-flex flex-column">
          <router-link class="link py-4 text-white" to="#">Home</router-link>
          <router-link class="link py-4 text-white" to="#">Blogs</router-link>
          <router-link class="link py-4 text-white" to="#"
            >Create Post</router-link
          >
          <router-link class="link py-4 text-white" :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWith: null,
    };
  },
  methods: {
    checkScreen() {
      this.windowWith = window.innerWidth;
      if (this.windowWith <= 960) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },
    toggleNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
};
</script>

<style scoped>
.v-container {
  max-width: 1440px;
}

header {
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  font-size: 20px;
}

.link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
  text-decoration: none;
}

.nav-links .link {
  color: black;
}

.nav-links .link:hover {
  color: #1eb8b8 !important;
}

.v-icon {
  cursor: pointer;
}

.mobile-nav {
  max-width: 250px;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
}

.mobileNav-enter-active {
  transition: all 1s ease;
}
.mobileNav-leave-active {
  transition: all 1s ease;
}
.mobileNav-enter-from {
  transform: translateX(-250px);
}
.mobileNav-enter-to {
  transform: translateX(0);
}
.mobileNav-leave-to {
  transform: translateX(-250px);
}
</style>
