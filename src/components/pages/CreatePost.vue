<template>
  <Teleport to="body">
    <preview-photo
      v-if="isPreview"
      :link="linkImg"
      @close-modal="close"
    ></preview-photo>
    <div
      v-if="isLoading"
      class="loading w-100 d-flex justify-center align-center"
    >
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
  </Teleport>
  <main-content>
    <v-container class="d-flex flex-column justify-center">
      <h1 class="mb-3">Upload Your Post</h1>
      <div class="w-100">
        <div
          :class="{ invisible: error }"
          class="err-message w-100 mb-2 pa-3 bg-blue-grey-darken-3"
        >
          <p><span>Error: </span>{{ errorMsg }}</p>
        </div>
        <div class="blog-info d-flex mb-8">
          <v-text-field
            class="v-col-4"
            label="Enter Blog Title"
            v-model="title"
          ></v-text-field>
          <div class="upload-file d-flex align-center v-col-8">
            <v-file-input
              @change="fileChange"
              label="Upload Cover Photo"
              id="blog-photo"
              accept=".png, .jpg, .jpeg"
              v-model="file"
            ></v-file-input>
            <div class="mr-4">
              <button
                @click="watchPreview"
                :class="{ inactive: !this.file }"
                class="preview px-4 py-2 ml-3 bg-teal-darken-4 btn"
              >
                Preview Photo
              </button>
            </div>
          </div>
        </div>
        <div class="editor pa-2">
          <quill-editor
            :modules="modules"
            useCustomImageHandler
            ref="html"
            v-model:content="content"
            toolbar="full"
          />
        </div>
        <div class="blog-action my-15">
          <button
            @click="publishBlog"
            class="btn px-5 py-3 mr-4 bg-teal-darken-4"
          >
            Publish Blog
          </button>
          <router-link
            @click="postReview"
            :to="{ name: 'Blog Preview' }"
            class="router-btn w-100 px-5 py-3 bg-teal-darken-4 btn"
            >Post Review</router-link
          >
        </div>
      </div>
    </v-container>
  </main-content>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import PreviewPhoto from "../layout/PreviewPhoto.vue";
import { blogs } from "@/state/helpers";
export default {
  name: "CreatePost",
  components: {
    QuillEditor,
    PreviewPhoto,
  },
  setup() {
    const modules = {
      name: "blotFormatter",
      module: BlotFormatter,
      options: {},
    };
    return { modules };
    // const myEditor= ref(null)
    // onMounted(()=> {
    //   console.log(myEditor.value.getEditor())
    // })
    // return { myEditor }
  },
  data() {
    return {
      error: null,
      errorMsg: null,
      file: null,
      linkImg: null,
      isPreview: null,
      title: "",
      content: null,
      isLoading: false,
    };
  },
  methods: {
    ...blogs.blogsMutation,
    ...blogs.blogsMethods,
    fileChange() {
      this.linkImg = URL.createObjectURL(this.file);
    },
    watchPreview() {
      this.isPreview = true;
    },
    close() {
      this.isPreview = false;
    },
    postReview() {
      const getHtml = this.$refs.html.getHTML();
      this.previewPost({
        blogTitle: this.title,
        linkImg: this.linkImg,
        blogHTML: getHtml,
      });
    },
    publishBlog() {
      if (this.content && this.title.length !== 0) {
        if (this.file) {
          const getHtml = this.$refs.html.getHTML();
          this.uploadPost({
            blogTitle: this.title,
            linkImg: this.linkImg,
            blogHTML: getHtml,
          });
        } else {
          this.error = true;
          this.errorMsg = "Please ensure you uploaded a cover photo!";
          setTimeout(() => {
            this.error = false;
          }, 3000);
        }
      } else {
        this.error = true;
        this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 1000px;
  position: relative;
  min-height: 700px;
}

.router-btn {
  text-decoration: none;
  color: #fff;
}

.btn {
  border-radius: 15px;
  transition: 0.5s ease-in-out all;
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.8) !important;
}

.invisible {
  display: block !important;
}

.err-message {
  border-radius: 8px;
  display: none;
  transition: 0.5s ease all;
}

p {
  font-size: 14px;
}

p > span {
  font-weight: 600;
}

.inactive {
  background-color: rgba(0, 0, 0, 0.4) !important;
  pointer-events: none;
}

.loading {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  height: 100vh;
}
</style>
