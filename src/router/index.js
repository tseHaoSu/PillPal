import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import UserInformationView from "@/views/UserInformationView.vue";
import AccessDeniedView from "@/views/AccessDenied.vue";
import LoginPageView from "@/views/LoginPage.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import DataView from "@/views/DataView.vue";

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
    path: "/data",
    name: "Data",
    component: DataView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
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
    component: RegistrationView,
  },
  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/access-denied");
  } else {
    next();
  }
});

export default router;
