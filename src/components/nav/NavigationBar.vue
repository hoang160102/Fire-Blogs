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
          <router-link class="link mr-8" :to="{ name: 'Blogs' }"
            >Blogs</router-link
          >
          <router-link v-if="isLoggedIn" class="link mr-8" :to="{name: 'Create Post'}">Create Post</router-link>
          <router-link v-if="!isLoggedIn" class="link" :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>
        <div v-if="isLoggedIn" class="profile mr-2">
          <div @click="toggleSubnav" class="user-name pa-3 bg-teal-darken-4">{{ standName }}</div>
          <div v-show="showSubnav" class="subnav bg-teal-darken-4">
            <span class="angle"></span>
            <div
              class="d-flex pb-3 pt-5 px-5 justify-space-between profile-info"
            >
              <div class="user-name pa-3 bg-white">{{ standName }}</div>
              <div class="info">
                <div class="name">{{ getName }}</div>
                <div class="username">@{{ user.username }}</div>
                <div class="email">{{ user.email }}</div>
              </div>
            </div>
            <div class="px-5 d-flex flex-column pb-5 pt-3">
              <router-link :to="{ name: 'Profile' }" class="user">
                <v-icon class="icon mr-8 mb-2">mdi-account-outline</v-icon
                >Profile
              </router-link>
              <div @click="signOut" class="sign-out">
                <v-icon class="icon mr-8">mdi-logout</v-icon>Sign Out
              </div>
            </div>
          </div>
        </div>
        <v-icon v-if="mobile" @click="toggleNav">mdi-menu</v-icon>
      </div>
    </v-container>
    <transition name="mobileNav" class="mobile-nav pa-5">
      <nav v-show="mobileNav" class="bg-blue-grey-darken-4 pa-5">
        <ul class="d-flex flex-column">
          <router-link class="link py-4 text-white" to="/">Home</router-link>
          <router-link class="link py-4 text-white" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link v-if="isLoggedIn" class="link py-4 text-white" :to="{ name: 'Create Post'}"
            >Create Post</router-link
          >
          <router-link
            v-if="!isLoggedIn"
            class="link py-4 text-white"
            :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script>
import { auth } from "@/state/helpers";
export default {
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWith: null,
      showSubnav: false
    };
  },
  computed: {
    ...auth.authComputed,
    isLoggedIn() {
      return this.user ? this.user : null;
    },
    standName() {
      if (this.user) {
        return `${this.user.firstName
          .match(/(\b\S)?/g)
          .join("")}${this.user.lastName.match(/(\b\S)?/g).join("")}`;
      }
      return "";
    },
    getName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  methods: {
    ...auth.authMethods,
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
    toggleSubnav() {
      this.showSubnav = !this.showSubnav
    },
    signOut() {
      this.logout()
    }
  },
  async created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
    this.getCurrentUser()
  },
};
</script>

<style scoped>
.v-container {
  max-width: 1440px;
}

header {
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.3),
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

.admin, .user, .sign-out {
  text-decoration: none;
  color: #fff;
}

.nav-links .link {
  color: black;
}

.nav-links .link:hover {
  color: #1eb8b8 !important;
}

.angle {
  position: absolute;
  right: 15px;
  top: -10px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #303030;
}

.v-icon {
  cursor: pointer;
}

.user-name {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 18px;
}

.profile:hover {
  cursor: pointer;
}

.profile {
  position: relative;
}

.subnav {
  position: absolute;
  width: 300px;
  right: 0;
  top: 70px;
  z-index: 1;
}

.username,
.email {
  font-size: 14px;
}

.profile-info {
  border-bottom: 1px solid #fff;
}

.admin,
.user,
.sign-out {
  font-size: 16px;
}

.icon {
  font-size: 30px !important;
}

.mobile-nav {
  max-width: 250px;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
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
