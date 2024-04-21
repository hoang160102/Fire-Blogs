<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
// import { getAuth } from 'firebase/auth';
import { auth } from './state/helpers';
export default {
  computed: {
    ...auth.authComputed
  },
  methods: {
    ...auth.authMethods
  },
  async created() {
    await this.getCurrentUser()
    console.log(this.user)
    // console.log(getAuth().currentUser)
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

body { 
  position: relative;
}

.app {
  min-height: 100px;
}
</style>
