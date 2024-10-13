import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/RegisterPage.vue";
import Login from "../components/LoginPage.vue";
import LandingPage from "../components/LandingPage.vue";
import HomePage from "../components/HomePage.vue";
import AdminPage from "../components/AdminPage.vue";
import SideNavigation from "../components/SideNavigation.vue";
import AnalyticsPage from "../components/AnalyticsPage.vue";
import { useAuthStore } from "../stores/auth.ts";



const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/sidenav",
    name: "SideNavigation",
    component: SideNavigation,
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics",
    name: "AnalyticsPage",
    component: AnalyticsPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Login" });
  }
  // Check if the route requires admin role
  else if (to.meta.requiresAdmin && authStore.userRole !== "admin") {
    next({ name: "admin" }); // or to an "Unauthorized" page
  } else {
    next();
  }
});

export default router;
