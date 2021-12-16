import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import About from "../views/About.vue";
import Scanner from "../views/Scanner.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/scanner",
    name: "About",
    component: Scanner,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
