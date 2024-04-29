<template>
  <main-content>
    <div class="home">
      <blog-post v-if="!user" :post="welcomeScreen"></blog-post>
      <blog-post
        v-for="(post, index) in blogPostsFeed"
        :post="post"
        :key="index"
      >
      </blog-post>
    </div>
    <v-container class="mt-8">
      <div class="blog-card-wrapper pb-15">
        <div class="title">View More Recent Blogs</div>
        <div class="blogs d-flex flex-wrap">
          <blog-card
            v-for="(card, index) in blogPostsCards"
            :key="index"
            :title="card.blogTitle"
            :photo="card.blogImg"
            :date="card.createdAt"
            :author="card.author"
            :id="card.blogId"
          >
          </blog-card>
        </div>
      </div>
      <div
      v-if="!user"
        class="my-15 py-15 register-section d-flex flex-wrap justify-space-between"
      >
        <div
          class="left pa-0 v-col-xl-6 v-col-lg-6 v-col-md-6 v-col-sm-12 v-col-xs-12"
        >
          <div class="pa-0 left-content v-col-8">
            NEVER MISS A POST. REGISTER FOR YOUR FREE ACCOUNT TODAY!
          </div>
        </div>
        <div
          class="right d-flex justify-end v-col-xl-6 v-col-lg-6 v-col-md-6 v-col-sm-12 v-col-xs-12"
        >
          <div class="right-content">
            <router-link
              class="bg-blue-grey-darken-4 register-btn link pa-4"
              :to="{ name: 'Register' }"
            >
              REGISTER FOR FIREBLOG
              <v-icon>mdi-arrow-right</v-icon>
            </router-link>
          </div>
        </div>
      </div>
    </v-container>
  </main-content>
</template>

<script>
import BlogCard from "../blog/BlogCard.vue";
import BlogPost from "../blog/BlogPost.vue";
import { blogs } from "@/state/helpers";
import { auth } from "@/state/helpers";
export default {
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "This is First Title",
          blogHTML: "Desctiption of Title 1",
          blogImg: "vue-router-img",
        },
        {
          title: "This is Second Title",
          blogHTML: "Desctiption of Title 2",
          blogImg: "design",
        },
      ],
    };
  },
  components: {
    BlogPost,
    BlogCard,
  },
  computed: {
    ...blogs.blogsComputed,
    ...auth.authComputed,
  },
  methods: {
    ...blogs.blogsMethods,
  },
  async created() {
    await this.getAllBlogs();
  },
};
</script>

<style scoped>
.v-container {
  max-width: 1440px;
}

.title {
  font-size: 28px;
}

.register-btn {
  border-radius: 30px;
}

.left-content {
  font-size: 30px;
}

.register-btn:hover {
  background-color: rgba(48, 48, 48, 0.7) !important;
}
</style>
