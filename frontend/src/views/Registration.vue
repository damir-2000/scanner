<template>
  <form @submit.prevent='resgistration'>
      <p>
      <router-link to="/login">Войти</router-link>
    </p>
    <p>
      <label for="firstNameInput">Имя</label> <br />
      <input
        id="firstNameInput"
        v-model="firstName"
        type="text"
        placeholder="Имя"
      />
    </p>
    <p>
      <label for="lastNameInput">Фамилия</label> <br />
      <input
        id="lastNameInput"
        v-model="lastName"
        type="text"
        placeholder="Фамилия"
      />
    </p>
    <p>
      <label for="groupInput">Группа</label> <br />
      <select
        id="groupInput"
        v-model="group"
      >
        <option v-for="group in selectGroupList" :key=group.id :value=group.id>{{group.name}}</option>
      </select>
    </p>
    <p>
      <label for="emailInput">Email</label> <br />
      <input
        id="emailInput"
        v-model="email"
        type="email"
        placeholder="Email"
      />
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
      <label for="repeaPasswordInput">Повторите пароль</label> <br />
      <input
        id="repeaPasswordInput"
        v-model="repeatUserPassword"
        type="password"
        placeholder="Повторите пароль"
      />
    </p>
    <p>
      <input type="submit" value="Зарегистрироваться" />
    </p>
  </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data(){
        return{
            firstName:'',
            lastName:'',
            group:'',
            userLogin:'',
            email:'',
            userPassword:'',
            repeatUserPassword:'',
            selectGroupList:[]
        }
    },
    methods:{
        ...mapActions({
            registration:'registration',
            groupList:'groupList'
        }),
        resgistration(){
            if (
                this.userLogin != '' && 
                this.userPassword != '' &&
                this.firstName != '' && 
                this.lastName != '' &&
                this.group != '' &&
                this.email != ''
            ) {
                this.registration({
                username: this.userLogin, 
                password: this.userPassword,
                first_name: this.firstName, 
                last_name: this.lastName,
                group: this.group,
                email: this.email
                })
            .then(data=>{
                if (data.userData.status == 'success') {
                    this.$router.push('/login')
                }
            })
            }
            
            
        }
    },
    mounted(){
        this.groupList()
        .then(data=>{
            this.selectGroupList = data.groupList
            console.log(this.selectGroupList);
        })
    }
}
</script>

<style lang='scss'>

</style>