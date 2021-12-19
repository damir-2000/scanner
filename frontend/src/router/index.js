import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
// import About from "../views/About.vue";
import Scanner from "@/views/Scanner.vue";
import Login from "@/views/Login.vue";


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
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  
  store.dispatch('isAuthorized')
  .then(isAuth =>{
    
    if((isAuth && to.path != '/login')||(!isAuth && to.path == '/login')){
      next()
    }
    else if(!isAuth) {
      console.log(isAuth);
      next('/login')
    }
    else{
      next('/')
    }
  })
  
  // router.push('/')
  // return '/login'
  
})

export default router;
