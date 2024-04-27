<template>
  <main-content>
    <v-container class="blog-cards my-15 pb-15">
      <div class="toggle-edit">
        <span class="mr-4">Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost"/>
      </div>
      <div class="blogs d-flex pb-15 flex-wrap">
        <blog-card
          v-for="(card, index) in blogs"
          :key="index"
          :title="card.blogTitle"
          :photo="card.blogImg"
          :date="card.blogDate"
          :id="card.blogId"
        >
        </blog-card>
      </div>
    </v-container>
  </main-content>
</template>

<script>
import BlogCard from "../blog/BlogCard.vue";
import { blogs } from "@/state/helpers";
export default {
  components: {
    BlogCard,
  },
  computed: {
    ...blogs.blogsComputed,
  
    editPost: {
      get() {
        return this.$store.state.isAllowEdit
      },
      set(payload) {
        this.$store.commit('toggleEdit/toggleAllowEdit', payload)
      }
    },
  },
  methods: {
    ...blogs.blogsMethods
  },
  created() {
    this.getAllBlogs()
  }
};
</script>

<style scoped>
.blog-cards {
  position: relative;
}

.toggle-edit {
  display: flex;
  align-items: center;
  position: absolute;
  top: -20px;
  right: 30px;
}

input[type="checkbox"] {
  position: relative;
  border: none;
  -webkit-appearance: none;
  background: #ccc;
  outline: none;
  width: 80px;
  height: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: #303030;
  transform: scale(1.1);
  transition: 750ms ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input:checked[type="checkbox"]:before {
  background: #fff;
  left: 52px;
}
</style>
