import { createStore } from "vuex";
import api from "@/api";
// import router from "@/router"

export default createStore({
  state: {
    userData: {},
    isAuth: false
  },
  mutations: {
    setIsAuth(state) {
      state.isAuth = true
    },
    setUserData(state, userData) {
      state.userData = userData
    }
  },

  actions: {
    login(context, body) {
      api.loginUser(body)
        .then(data => {

          const status = data.status
          const userData = data.userData
          if (status == 200) {
            context.commit('setIsAuth')
            context.commit('setUserData', userData)
          }
          console.log(data);
        })
    },

    isAuthorized(context) {
      if (api.existToken()) {
        return api.updateToken()
          .then(data => {
            const status = data.status
            const userData = data.userData
            if (status == 200) {
              context.commit('setIsAuth')
              context.commit('setUserData', userData)
              return true
            }
            else {
              
              return false
            }

          })
      }
      else {
        return false
      }

    }
  },
  modules: {

  },
});
