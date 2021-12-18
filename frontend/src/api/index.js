import axios from "axios";
class Api{
    constructor(){
        this.client = axios.create({
            baseURL:'http://localhost:8000/api/'
        })
    }
    login(){
        this.client.post('token/', {username: "admin", password: "123"}).
        then(response => {
            console.log(response.data)
        }).catch(error =>{
            console.log(error.response.status)
        })
    }
}

export default new Api()