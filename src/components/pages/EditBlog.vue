<template>
  <Teleport to="body">
    <preview-photo
      v-if="isPreview"
      :link="linkImg"
      @close-modal="close"
    ></preview-photo>
  </Teleport>
  <main-content>
    <v-container class="d-flex flex-column justify-center">
      <h1 class="my-3">Edit Post</h1>
      <div class="w-100">
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
              style="overflow: hidden"
              :clearable="false"
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
        <div class="blog-action v-col-5 d-flex my-5">
          <button
            :class="{ inactive: !this.user }"
            @click="updatePost"
            class="btn v-col-6 d-flex align-center justify-center px-5 py-3 mr-4 bg-teal-darken-4"
          >
            Update Blog
            <v-progress-circular
              v-if="isLoading"
              class="ml-2"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </button>
          <router-link
            @click="postReview"
            :to="{ name: 'Blog Preview' }"
            class="router-btn w-100 px-5 py-3 d-flex align-center justify-center bg-teal-darken-4 btn"
            >Post Review</router-link
          >
        </div>
        <div
          :class="{ invisible: error }"
          class="err-message w-100 mb-2 pa-3 bg-blue-grey-darken-3"
        >
          <p><span>Error: </span>{{ errMsg }}</p>
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
import { auth } from "@/state/helpers";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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
  },
  data() {
    return {
      error: null,
      errMsg: null,
      file: null,
      linkImg: null,
      isPreview: null,
      title: "",
      content: null,
      isLoading: false,
    };
  },
  computed: {
    ...blogs.blogsComputed,
    ...auth.authComputed,
  },
  methods: {
    ...blogs.blogsMutation,
    ...blogs.blogsMethods,
    ...auth.authMethods,
    fileChange() {
      this.linkImg = URL.createObjectURL(this.file);
    },
    watchPreview() {
      this.isPreview = true;
      console.log(this.$refs.html.getText());
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
    async updatePost() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      if (this.content && this.title.length > 0) {
        if (this.file) {
          this.error = false;
          const storage = getStorage();
          const docRef = ref(storage, "/images" + this.file.name);
          const uploadTask = uploadBytesResumable(docRef, this.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              return snapshot;
            },
            (err) => {
              console.log(err);
            },
            async () => {
              const getHtml = this.$refs.html.getHTML();
              await getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL) => {
                  this.updateBlog({
                    blogImg: downloadURL,
                    blogTitle: this.title,
                    blogHTML: getHtml,
                    linkId: this.$route.params.blogid,
                  });
                }
              );
            }
          );
        } else {
          this.error = true;
          this.errMsg = "Please ensure you uploaded a cover photo!";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else {
        this.error = true;
        this.errMsg = "Please ensure Blog Title & Blog Post has been filled!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
    async intital() {
      await this.getCurrentBlog(this.$route.params.blogid);
    },
  },
  async created() {
    await this.getCurrentUser();
    await this.getAllBlogs();
    this.intital();
    this.title = this.blogItem.blogTitle;
    this.$refs.html.setHTML(this.blogItem.blogHTML);
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

.v-field__clearable {
  opacity: 0 !important;
}

.mdi-close-circle {
  opacity: 0 !important;
}
.v-progress-circular {
  width: 25px;
}
</style>
