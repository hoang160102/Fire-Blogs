import { blogsComputed } from "./modules/blogs"
import { mapState } from "vuex"
export const blogs = { blogsComputed }
export const toggleEditComputed = {
    ...mapState("toggleEdit", ["isAllowEdit"]),
}

