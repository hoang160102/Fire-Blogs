<template>
  <main-content>
    <v-container>
      <h2 class="py-10 title">{{ blogItem.blogTitle }}</h2>
      <div class="d-flex py-10">
        <div class="v-col-3 pr-5">
          <h4>Author: {{ composer }}</h4>
          <h4 class="pb-8 btom">{{ username }}</h4>
          <h4 class="py-8 btom">Posted on: {{ blogItem.createdAt }}</h4>
          <h4 class="pt-8">
            <router-link class="text-green-darken-3" :to="{ name: 'Blogs' }">
              <v-icon>mdi-arrow-left</v-icon>
              Back to the blog
            </router-link>
          </h4>
        </div>
        <div class="pl-5 content">
          <div class="img">
            <img :src="blogItem.blogImg" alt="" />
          </div>
          <div class="post-content ql-editor" v-html="blogItem.blogHTML"></div>
        </div>
      </div>
    </v-container>
  </main-content>
</template>

<script>
import { auth, blogs } from "@/state/helpers";
// import { getAuth } from "firebase/auth";
export default {
  data() {
    return {
      composer: null,
      username: null,
    };
  },
  computed: {
    ...blogs.blogsComputed,
    ...auth.authComputed,
  },
  methods: {
    ...blogs.blogsMethods,
    ...auth.authMethods,
    async intital() {
      await this.getCurrentBlog(this.$route.params.blogid);
    },
    async getAuthor() {
      await this.getAllUsers();
      const author = this.listUsers.filter((user) => {
        return user.id === this.blogItem.author;
      });
      this.composer = `${author[0].firstName} ${author[0].lastName}`;
      this.username = author[0].username;
    },
  },
  async created() {
    await this.getAllBlogs();
    await this.intital();
    await this.getAuthor();
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
  text-align: end;
}
a {
  text-decoration: none;
}
img {
  width: 800px;
  padding-left: 15px;
}
.title {
  border-bottom: 1px solid #ccc;
}
.content {
  border-left: 1px solid #ccc;
}
.btom {
  border-bottom: 1px solid #ccc;
}
.ql-editor {
  height: auto;
}
</style>
