import axios from "axios";
import jwtDecode from "jwt-decode";
class Api{
    constructor(){
        this.client = axios.create({
            baseURL:'http://192.168.100.8:8000/api/'
        })
        this.token = window.localStorage.getItem('token')
        if(this.token){
            this.client.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(this.token).access}`
        }
    }
    
    loginUser(body){
        return this.client.post('token/', body)
        .then(response => {
            const userData = response.data
            window.localStorage.setItem('token', JSON.stringify(userData))
            this.client.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
            return {status: response.status, userData: jwtDecode(response.data.access)}

        }).catch(error =>{
            
            return {status: error.response.status, userData: ""}
        })
        
    }
    
    registrationUser(body){
        return this.client.post('registration', body)
        .then(response => {
            return {status: response.status, userData: response.data}

        }).catch(error =>{
            
            return {status: error.response.status, userData: error.response.data}
        })
    }
    
    logout(){
        window.localStorage.removeItem('token')
        this.client.defaults.headers.common['Authorization'] = ``
        this.token = ''
    }
    
    updateToken(){
        const refreshToken = JSON.parse(window.localStorage.getItem('token')).refresh

        return this.client.post('token/refresh/', {refresh: refreshToken}).
        then(response => {
            const userData = response.data
            window.localStorage.setItem('token', JSON.stringify(userData))
            this.client.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
            return {status: response.status, userData: jwtDecode(response.data.access)}

        }).catch(error =>{
            return {status: error.response.status, userData: ""}
        })
    }
    
    refresh(){
        const tokenData = jwtDecode(JSON.parse(window.localStorage.getItem('token')).access)
        if (tokenData.exp - 10 < new Date().getTime()/1000) {
            this.updateToken()
        }
        
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
    
    qrGenerateData(){
        this.refresh()
        return this.client.get('/generate', {timeout: 100})
        .then(response => {
            return {status: response.status, userData: response.data}

        }).catch(error =>{
            return {status: error.response.status, userData: ''}
        })
    }
    
    groupList(){
        return this.client.get('group_list')
        .then(response=>{
            return {status: response.status, groupList: response.data}
        })
        .catch(error =>{
            return {status: error.response.status, groupList: ""}
        })
    }
    attendanceList(){
        this.refresh()
        return this.client.get('attendance_list', {timeout: 100})
        .then(response=>{
            return {status: response.status, attendanceList: response.data}
        })
        .catch(error =>{
            return {status: error.response.status, attendanceList: ""}
        })
    }
    detect(body){
        this.refresh()
        return this.client.post('detect', body, {timeout: 100})
        .then(response=>{
            return {status: response.status, userData: response.data}
        })
        .catch(error =>{
            return {status: error.response.status, userData: ""}
        })
    }
    
    
    
}

export default new Api()