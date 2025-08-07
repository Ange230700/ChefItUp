// app\router\index.ts

import { createRouter, createWebHistory } from "vue-router";

import { useAuth } from "../composables/useAuth";
import { useUserStore } from "../stores/userStore";

const HomePage = () => import("../pages/HomePage.vue");
const NotFoundPage = () => import("../pages/NotFoundPage.vue");
const RegisterPage = () => import("../pages/RegisterPage.vue");
const LoginPage = () => import("../pages/LoginPage.vue");
const RecipesPage = () => import("../pages/RecipesPage.vue");
const FavoritesPage = () => import("../pages/FavoritesPage.vue");

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: HomePage },
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/recipes", name: "Recipes", component: RecipesPage },
  { path: "/favorites", name: "Favorites", component: FavoritesPage },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// -- Auth Navigation Guards --
router.beforeEach(async (to, _, next) => {
  const { isAuthenticated, fetchMe } = useAuth();
  const userStore = useUserStore();

  // Wait for auth status if not bootstrapped
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    const ok = await fetchMe();
    if (!ok) return next("/login");
  }

  // Admin route guard
  if (to.meta.requiresAdmin && userStore.user?.role !== "ADMIN") {
    return next("/home");
  }

  // Block access to login/register for logged-in users
  if (
    (to.path === "/login" || to.path === "/register") &&
    isAuthenticated.value
  ) {
    return next("/home");
  }

  next();
});

export default router;
