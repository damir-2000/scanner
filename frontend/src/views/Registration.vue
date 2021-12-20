<template>
  <form @submit.prevent='auth'>
      <input v-model="userLogin" type="text" placeholder="Логин">
      <input v-model="userPassword" type="password" placeholder="Пароль">
      <input type="submit" value='Войти'>
  </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data(){
        return{
            userLogin:'',
            userPassword:''
        }
    },
    methods:{
        ...mapActions({
            login:'login'
        }),
        auth(){
            
            this.login({username: this. userLogin, password: this.userPassword})
            
        }
    },
    mounted(){
 
    }
}
</script>

<style lang='scss'>

</style>