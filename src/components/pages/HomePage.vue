<template>
  <main-content>
    <div class="home">
        <blog-post :post="welcomeScreen"></blog-post>
        <blog-post 
            v-for="(post, index) in sampleBlogPost"
            :post="post"
            :key="index">
        </blog-post>
    </div>
  </main-content>
</template>

<script>
import BlogPost from '../blog/BlogPost.vue';
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
            blogImg: "vue-router-img"
        },
        {
            title: "This is Second Title",
            blogHTML: "Desctiption of Title 2",
            blogImg: "design"
        },
        ]
    };
  },
  components: {
    BlogPost
  }
};
</script>
