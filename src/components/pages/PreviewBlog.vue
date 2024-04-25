<template>
    <v-container>
      <h2>{{ blogPost.blogTitle }}</h2>
      <img :src="blogPost.linkImg" alt="" />
      <div class="post-content ql-editor" v-html="blogPost.blogHTML"></div>
    </v-container>
</template>

<script>
import { blogs } from '@/state/helpers'
export default {
    computed: {
        ...blogs.blogsComputed
    },
}
</script>

<style scoped>
.v-container {
    max-width: 1200px;
    min-height: 100%;
}
h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  img {
    width: 100%;
    margin-bottom: 32px;
  }
</style>