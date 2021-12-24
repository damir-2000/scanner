import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
import Attendance from "@/views/Attendance.vue";
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
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
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

  store.dispatch("isAuthorized").then((isAuth) => {
    if (to.path == "/logout") {
      store.dispatch("logout");
      next("/");
    } else if (
      (isAuth && to.path != "/login" && to.path != "/registration") ||
      (!isAuth && (to.path == "/login" || to.path == "/registration"))
    ) {
      if (
        store.state.userData?.role &&
        store.state.userData.role.indexOf("user") != -1 &&
        to.path != "/generator"
      ) {
        next("/generator");
      } else if (
        store.state.userData?.role &&
        store.state.userData.role.indexOf("scanner") != -1 &&
        to.path != "/scanner"
      ) {
        next("/scanner");
      } else if (
        store.state.userData?.role &&
        store.state.userData.role.indexOf("admin") != -1 &&
        to.path != "/attendance"
      ) {
        next("/attendance");
      } else if (
        to.path != "/" &&
        store.state.userData?.role &&
        store.state.userData.role.indexOf("user") == -1 &&
        store.state.userData.role.indexOf("scanner") == -1 &&
        store.state.userData.role.indexOf("admin") == -1
      ) {
        next('/');
      } else {
        next();
      }
    } else if (!isAuth) {
      next("/login");
    } else {
      next("/");
    }
  });
});

export default router;
