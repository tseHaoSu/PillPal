import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/RegisterPage.vue";
import Login from "../components/LoginPage.vue";
import LandingPage from "../components/LandingPage.vue";
import HomePage from "../components/HomePage.vue";
import AdminPage from "../components/AdminPage.vue";
import SideNavigation from "../components/SideNavigation.vue";
import AnalyticsPage from "../components/AnalyticsPage.vue";



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
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage,
  },
  {
    path: "/sidenav",
    name: "SideNavigation",
    component: SideNavigation,
  },
  {
    path: "/analytics",
    name: "AnalyticsPage",
    component: AnalyticsPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
