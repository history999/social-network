import * as axios from "axios";
import { setCurrentPage } from "../redux/users-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '381faf5f-35df-434d-9a92-a3e915064d28'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(id) {
        return instance.post(`follow/${id}`)
    },

    unFollow(id) {
        return instance.delete(`follow/${id}`)
    },
    getProfile(userID){
        return profileAPI.getProfile(userID)
    }
}



export const profileAPI = {
    getProfile(userID){
        return instance.get('profile/' + userID)
    },
    getStatus(userID){
        return instance.get('profile/status/' + userID)
    },
    updateStatus(status){
        return instance.put('profile/status', {status})
    }
}


export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`, 
        {withCredentials: true})
            .then(response => response.data)
    },

    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
        
    },

    logout() {
        return instance.delete('auth/login')
    }
}
