import axios from "axios";
import jwtDecode from "jwt-decode";
class Api{
    constructor(){
        this.client = axios.create({
            baseURL:'http://localhost:8000/api/'
        })
        const token = window.localStorage.getItem('token')
        if(token){
            this.client.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token).access}`
        }
        
    }
    loginUser(body){
        
        return this.client.post('token/', body).
        then(response => {
            const userData = response.data
            window.localStorage.setItem('token', JSON.stringify(userData))
            return {status: response.status, userData: jwtDecode(response.data.access)}

        }).catch(error =>{
            
            return {status: error.response.status, userData: ""}
        })
        
        
    }
    updateToken(){
        const refreshToken = JSON.parse(window.localStorage.getItem('token')).refresh

        return this.client.post('token/refresh/', {refresh: refreshToken}).
        then(response => {
            const userData = response.data
            window.localStorage.setItem('token', JSON.stringify(userData))
            return {status: response.status, userData: jwtDecode(response.data.access)}

        }).catch(error =>{
            return {status: error.response.status, userData: ""}
        })
    }

    existToken(){
        const token = window.localStorage.getItem('token')
        if(token){
            return true
        }
        else{
            return false
        }
    }
    
    getRoute(){
        this.client.get('/').
        then(response => {
            console.log(response.data);  
        }).catch(error =>{
            console.log(error.response.status)
            if(error.response.status == 401){
                const update = this.updateToken()
                console.log(update);
                if(update){
                    this.getRoute()
                }
            }
        })
    }
}

export default new Api()