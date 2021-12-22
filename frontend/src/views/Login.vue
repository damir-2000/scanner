<template>
  <form @submit.prevent="auth">
    <p>
      <router-link to="/registration">Зарегистрироваться</router-link>
    </p>
    <p>
      <label for="loginInput">Логин</label> <br />
      <input
        id="loginInput"
        v-model="userLogin"
        type="text"
        placeholder="Логин"
      />
    </p>
    <p>
      <label for="passwordInput">Пароль</label> <br />
      <input
        id="passwordInput"
        v-model="userPassword"
        type="password"
        placeholder="Пароль"
      />
    </p>
    <p>
      <input type="submit" value="Войти" />
    </p>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userLogin: "",
      userPassword: "",
    };
  },
  methods: {
    ...mapActions({
      login: "login",
    }),
    auth() {
      if (this.userLogin != "" && this.userPassword != "") {
        this.login({
          username: this.userLogin,
          password: this.userPassword,
        }).then((data) => {
          const status = data.status;
          if (status == 200) {
            console.log("acces");
            console.log(data);
            this.$router.push("/");
          } else if (status == 401) {
            console.log("unacces");
          }
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang='scss'>
</style>