import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export const blogsComputed = {
    ...mapState('blogs/blogs', ["sampleBlogCard", 'blogPost', 'blogs', 'blogItem']),
    ...mapGetters('blogs/blogs', ["blogPostsFeed", "blogPostsCards"])
}

export const blogsMutation = {
    ...mapMutations('blogs/blogs', ["previewPost"])
}

export const blogsMethods = {
    ...mapActions('blogs/blogs', ["uploadPost", "getAllBlogs", "getCurrentBlog"])
}