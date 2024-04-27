<template>
  <div class="card mt-5 v-col-xl-3 v-col-lg-3 v-col-md-4 v-col-sm-6 v-col-xs-6">
    <div class="card-content">
        <div v-if="isAllowEdit" class="icon d-flex">
            <div class="icon-edit mr-2 mt-2 bg-white">
                <v-icon class="pa-2">mdi-file-edit-outline</v-icon>
            </div>
            <div class="icon-delete mr-2 mt-2 bg-white">
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
import { toggleEditComputed } from '@/state/helpers';
export default {
  props: ["title", "photo", "date", "id"],
  computed: {
    ...toggleEditComputed
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
}
</style>
