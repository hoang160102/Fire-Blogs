<template>
    <v-container>
      <h2 class="mb-3">{{ blogPost.blogTitle }}</h2>
      <div class="img mb-3 d-flex justify-center">
        <img :src="blogPost.linkImg" alt="" />
      </div>
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
    text-align: center;
    font-size: 40px;
    font-weight: 700;
  }
  img {
    width: 800px;
  }
</style>