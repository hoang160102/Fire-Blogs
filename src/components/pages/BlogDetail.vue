<template>
  <main-content>
    <v-container>
      <h2 class="mb-3">{{ blogItem.blogTitle }}</h2>
      <h4 class="mb-3">Posted on: {{ blogItem.createdAt }}</h4>
      <h4 class="mb-3">Author: {{ getAuthor }}</h4>
      <div class="img mb-3 d-flex justify-center">
        <img :src="blogItem.blogImg" alt="" />
      </div>
      <div
        class="post-content ql-editor"
        v-html="blogItem.blogHTML"
      ></div>
    </v-container>
  </main-content>
</template>

<script>
import { auth, blogs } from "@/state/helpers";
export default {
  computed: {
    ...blogs.blogsComputed,
    ...auth.authComputed,
    getAuthor() {
      const author = this.listUsers.filter((user) => {
        return user.id === this.blogItem.author
      })
      return `${author[0].firstName} ${author[0].lastName}`
    }
  },
  methods: {
    ...blogs.blogsMethods,
    ...auth.authMethods,
    async intital() {
      await this.getCurrentBlog(this.$route.params.blogid)
    },
  },
  async created() {
    await this.getAllBlogs()
    await this.intital()
    await this.getAllUsers()
  },
};
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
h4 {
  text-align: center;
}
img {
  width: 800px;
}
</style>
