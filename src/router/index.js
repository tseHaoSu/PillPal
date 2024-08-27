import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'
import AboutView from "../views/AboutView.vue";
import UserInformationView from "@/views/UserInformationView.vue";
import AccessDeniedView from "@/views/AccessDenied.vue";
import LoginPageView from "@/views/LoginPage.vue";
import RegistrationView from "@/views/RegistrationView.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: UserInformationView,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "Login",
    component: LoginPageView,
  },
  {
    path: "/access-denied",
    name: "AccessDenied",
    component: AccessDeniedView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegistrationView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/access-denied");
  } else {
    next();
  }
});

export default router;
