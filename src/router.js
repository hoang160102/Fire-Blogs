import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/pages/HomePage.vue";
import BlogsPage from "./components/pages/BlogsPage.vue";
import RegisterAccount from "./components/account/RegisterAccount.vue"
import LoginAccount from "./components/account/LoginAccount.vue"
import ForgotPassword from "./components/account/ForgotPassword.vue"
import ProfilePage from "./components/pages/ProfilePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: HomePage, meta: { title: 'Home'} },
    { path: "/blogs", name: "Blog", component: BlogsPage, meta: { title: 'Blogs'} },
    { path: "/register", name: "Register", component: RegisterAccount, meta: { title: 'Register'} },
    { path: "/login", name: 'Login', component: LoginAccount, meta: { title: 'Login' } },
    { path: "/forgot-password", name: 'Forgot Password', component: ForgotPassword, meta: { title: 'Forgot Password' } },
    { path: "/profile", name: 'Profile', component: ProfilePage, meta: { title: 'Profile'} }
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
