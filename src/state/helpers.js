import { blogsComputed } from "./modules/blogs"
import { authComputed, authMethods } from "./modules/users"
import { mapState } from "vuex"
export const blogs = { blogsComputed }
export const toggleEditComputed = {
    ...mapState("toggleEdit", ["isAllowEdit"]),
}
export const auth = { authComputed, authMethods }

