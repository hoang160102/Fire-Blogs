import { blogsComputed, blogsMutation, blogsMethods } from "./modules/blogs"
import { authComputed, authMethods } from "./modules/users"
import { mapState } from "vuex"
export const toggleEditComputed = {
    ...mapState("toggleEdit", ["isAllowEdit"]),
}
export const auth = { authComputed, authMethods }
export const blogs = { blogsComputed, blogsMutation, blogsMethods }

