<template>
  <form @submit.prevent='test'>
      <input type="text" placeholder="Логин">
      <input type="password" placeholder="Пароль">
      <input type="submit" value='Войти'>
  </form>
</template>

<script>
import Api from "@/api/index";
export default {
    data(){
        return{
            
        }
    },
    methods:{
        test(){
            // this.$router.push('/')
            console.log(Api.login());

        }
    },
    mounted(){
 
    }
}
</script>

<style lang='scss'>

</style>