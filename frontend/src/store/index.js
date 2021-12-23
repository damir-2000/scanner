import { createStore } from "vuex";
import api from "@/api";
// import router from "@/router"

export default createStore({
  state: {
    userData: {},
    isAuth: false,
  },
  mutations: {
    setIsAuth(state, boolean) {
      state.isAuth = boolean;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
  },

  actions: {
    login(context, body) {
      return api.loginUser(body).then((data) => {
        const status = data.status;
        const userData = data.userData;
        if (status == 200) {
          context.commit("setIsAuth", true);
          context.commit("setUserData", userData);
        }
        return data
      });
    },
    
    registration(context, body){
      return api.registrationUser(body)
    },
    
    logout(context){
      api.logout()
      context.commit("setIsAuth", false);
      context.commit("setUserData", {});
    },
    
    isAuthorized(context) {
      if (context.state.isAuth) {
        return true;
      }
      if (api.existToken()) {
        return api.updateToken().then((data) => {
          const status = data.status;
          const userData = data.userData;
          if (status == 200) {
            context.commit("setIsAuth", true);
            context.commit("setUserData", userData);
            return true;
          } else {
            return false;
          }
        });
      } else {
        return new Promise((resolve) => {
          resolve(false);
        });
      }
    },
    
    groupList(){
      return api.groupList()
    },
    attendanceList(){
      return api.attendanceList()
    },
    
    generate(){
      return api.qrGenerateData()
    }
  },
  modules: {},
});
