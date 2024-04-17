import { mapState } from "vuex";
export const blogsComputed = {
    ...mapState('blogs/blogs', ["sampleBlogCard"])
}