import { mapState, mapMutations, mapActions } from "vuex";
export const blogsComputed = {
    ...mapState('blogs/blogs', ["sampleBlogCard", 'blogPost'])
}

export const blogsMutation = {
    ...mapMutations('blogs/blogs', ["previewPost"])
}

export const blogsMethods = {
    ...mapActions('blogs/blogs', ["uploadPost"])
}
