import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export const blogsComputed = {
    ...mapState('blogs/blogs', ["sampleBlogCard", 'blogPost']),
    ...mapGetters('blogs/blogs', ["blogPostsFeed", "blogsPostCards"])
}

export const blogsMutation = {
    ...mapMutations('blogs/blogs', ["previewPost"])
}

export const blogsMethods = {
    ...mapActions('blogs/blogs', ["uploadPost", "getAllBlogs"])
}