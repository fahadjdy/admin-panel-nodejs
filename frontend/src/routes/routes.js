import { createRouter, createWebHistory } from "vue-router";
import { webRoutes } from "./web.js";
import { adminRoutes } from "./admin.js";

const routes = [
  ...webRoutes,
  ...adminRoutes,
  { path: "/:pathMatch(.*)*", redirect: "/" }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
