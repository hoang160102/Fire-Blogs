<template>
  <Teleport to="body">
    <confirm-delete
      v-if="showModal"
      @close-modal="close"
      @delete-card="deletePost"
    ></confirm-delete>
  </Teleport>
  <div class="card mt-5 v-col-xl-3 v-col-lg-3 v-col-md-4 v-col-sm-6 v-col-xs-6">
    <div class="card-content">
        <div v-if="isAllowEdit" class="icon d-flex">
            <div @click="redirectToEdit" class="icon-edit mr-2 mt-2 bg-white">
                <v-icon class="pa-2">mdi-file-edit-outline</v-icon>
            </div>
            <div @click="confirmDelete" class="icon-delete mr-2 mt-2 bg-white">
                <v-icon class="pa-2">mdi-delete-outline</v-icon>
            </div>
        </div>
      <img
        class="w-100"
        :src="photo"
        alt=""
      />
      <div class="title">{{ title }}</div>
      <div class="date">Posted Date {{ date }}</div>
    </div>
    <router-link class="link" :to="{ name: 'BlogDetail', params: { blogid: this.id}}"
      >View the post
      <v-icon>mdi-arrow-right</v-icon>
    </router-link>
  </div>
</template>

<script>
import { auth, toggleEditComputed } from '@/state/helpers';
import { blogs } from '@/state/helpers';
import ConfirmDelete from '../layout/ConfirmDelete.vue';
import { getAuth } from 'firebase/auth';
import router from '@/router';
export default {
  props: ["title", "photo", "date", "id", "author"],
  data() {
    return {
      showModal: false
    }
  },
  components: {
    ConfirmDelete
  },
  computed: {
    ...toggleEditComputed,
    ...blogs.blogsComputed,
    ...auth.authComputed
  },
  methods: {
    ...blogs.blogsMethods,
    ...auth.authMethods,
    confirmDelete() {
      if (this.author === getAuth().currentUser.uid) {
        this.showModal = true
        window.scrollTo(0, 0)
      }
      else {
        alert("You are not the author of blog")
      }
    },
    async deletePost() {
      await this.deleteBlog(this.id)
      this.showModal = false
      this.getAllBlogs()
    },
    close() {
      this.showModal = false
    },
    redirectToEdit() {
      if (this.author === getAuth().currentUser.uid) {
        router.push({ name: 'EditBlog', params: { blogid: this.id }})
      }
      else {
        alert("You are not the author of blog")
      }
    }
  },
  async created() {
    await this.getCurrentUser()
  }
};
</script>

<style scoped>
.card {
  position: relative;
  min-height: 450px;
  border-radius: 8px;
    transition: 0.5s;
}

.link {
  position: absolute;
  text-decoration: none;
  color: black;
  bottom: 0;
}

.title {
  font-size: 20px;
}

.date {
  font-size: 13px;
}

img {
  height: 250px;
}

.card:hover {
  transform: rotate(-1deg) scale(1.01);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.icon {
    position: absolute;
    top: 8px;
    right: 8px;
}

.icon-edit, .icon-delete {
    border-radius: 50%;
    width: 24px;
    text-align: center;
}

.pa-2 {
    font-size: 16px;
    cursor: pointer;
}
</style>
