import * as axios from "axios";
import { setCurrentPage } from "../redux/users-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'fa5d6eb8-2c05-4d9a-9202-e2647bdcf23d'
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
        return instance.get('status/' + userID)
    },
    updateStatus(status){
        return instance.put('status' + {status})
    }
}


export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`, 
        {withCredentials: true})
            .then(response => response.data)
    }
}
