import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
  // linkActiveClass: "active",
});

router.beforeEach((to, from) => {
  console.log("global before each", to, from);
  // return false // sebagai guard untuk memblokir route / <a>
  if (to.meta.auth) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

export default router;
