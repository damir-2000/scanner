import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
import Scanner from "@/views/Scanner.vue";
import Generator from "@/views/Generator.vue";
import Login from "@/views/Login.vue";
import Registration from "@/views/Registration.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/scanner",
    name: "Scanner",
    component: Scanner,
  },
  {
    path: "/generator",
    name: "Generator",
    component: Generator,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);

  store.dispatch("isAuthorized").then((isAuth) => {
    if (to.path == "/logout") {
      store.dispatch("logout");
      next("/");
    } else if (
      (isAuth && (to.path != "/login" && to.path != "/registration")) ||
      (!isAuth && (to.path == "/login" || to.path == "/registration"))
    ) {
      next();
    } else if (!isAuth) {
      next("/login");
    } else {
      next("/");
    }
  });

  // router.push('/')
  // return '/login'
});

export default router;
