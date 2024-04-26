<template>
  <div class="blog-wrapper d-flex flex-wrap">
    <div class="blog-content v-col-xl-5 v-col-lg-5 v-col-md-5 v-col-sm-12 v-col-xs-12 pa-0">
      <div class="d-flex flex-column justify-center h-100 pa-15 align-center">
        <h1 v-if="post.welcomeScreen">{{ post.title }}</h1>
        <h1 v-else>{{ post.blogTitle}}</h1>
        <p class="py-8" v-if="post.welcomeScreen">{{ post.blogPost }}</p>
        <router-link class="link text-white" to="#" v-if="post.welcomeScreen">
          Login/Register
          <v-icon>mdi-arrow-right</v-icon>
        </router-link>
        <router-link class="link text-black" to="#" v-else>
          View the post
          <v-icon>mdi-arrow-right</v-icon>
        </router-link>
      </div>
    </div>
    <div class="blog-photo v-col-xl-7 v-col-lg-7 v-col-md-7 v-col-sm-12 v-col-xs-12 pa-0">
      <img
        class="w-100 h-100"
        v-if="post.welcomeScreen"
        :src="require(`../../img/${post.photo}.jpg`)"
        alt=""
      />
      <img
        class="w-100 h-100"
        v-else
        :src="post.blogImg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style scoped>
h1 {
    text-transform: uppercase;
}
p {
    width: 400px;
    text-align: center;
}
.blog-photo {
  max-height: 600px;
}

.blog-wrapper:first-child > .blog-content {
  background-color: #303030;
  color: #fff
}
.blog-wrapper:nth-child(even) > .blog-content {
    order: 1
}
.link {
    text-decoration: none;
}
@media screen and (max-width: 960px) {
    .blog-content {
        order: 2 !important
    }
}
</style>
