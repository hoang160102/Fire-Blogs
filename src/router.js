import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/pages/HomePage.vue";
import BlogsPage from "./components/pages/BlogsPage.vue";
import RegisterAccount from "./components/account/RegisterAccount.vue"
import LoginAccount from "./components/account/LoginAccount.vue"
import ForgotPassword from "./components/account/ForgotPassword.vue"
import ProfilePage from "./components/pages/ProfilePage.vue";
import CreatePost from "./components/pages/CreatePost.vue";
import PreviewBlog from "./components/pages/PreviewBlog.vue";
import BlogPage from "./components/pages/BlogDetail.vue";
import EditBlog from "./components/pages/EditBlog.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: HomePage, meta: { title: 'Home'} },
    { path: "/blog", name: "Blogs", component: BlogsPage, meta: { title: 'Blogs'} },
    { path: "/register", name: "Register", component: RegisterAccount, meta: { title: 'Register'} },
    { path: "/login", name: 'Login', component: LoginAccount, meta: { title: 'Login' } },
    { path: "/forgot-password", name: 'Forgot Password', component: ForgotPassword, meta: { title: 'Forgot Password' } },
    { path: "/profile", name: 'Profile', component: ProfilePage, meta: { title: 'Profile'} },
    { path: "/create-post", name: 'Create Post', component: CreatePost, meta: { title: 'Create Post'} },
    { path: "/blog-review", name: 'Blog Preview', component: PreviewBlog, meta: { title: 'Blog Review'} },
    { path: "/blog/:blogid", name: 'BlogDetail', component: BlogPage, meta: { title: 'Blog Detail' }},
    { path: "/blog/edit-blog/:blogid", name: 'EditBlog', component: EditBlog, meta: { title: 'Edit Blog' }}
  ],
  scrollBehavior(to, from, savedPos) {
    if (savedPos) {
      return savedPos;
    }
    return { left: 0, top: 0 };
  },
});

// router.beforeEach((to, _, next) => {
//     document.title = `${to.meta.title} | FireBlog`
//     next()
// })

export default router;
