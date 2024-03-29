import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '381faf5f-35df-434d-9a92-a3e915064d28'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend = null) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    follow(id) {
        return instance.post(`follow/${id}`)
    },

    unFollow(id) {
        return instance.delete(`follow/${id}`)
    },
    getProfile(userID) {
        return profileAPI.getProfile(userID)
    }
}

export const dialogsAPI = {
    getDialogs() {
        return instance.get(`dialogs/`)
            .then(response => response.data)
    },
    startChatting(userId) {
        return instance.put('dialogs/' + userId)
    },
    getMessageWithUser(userIdChat) {
        return instance.get('dialogs/' + userIdChat + '/messages')
            .then(response => response.data)
    },
    sendMessageUser(userId, body) {
        return instance.post('dialogs/' + userId + '/messages', {userId, body})
    },
    deleteMessageUser(messageId) {
        return instance.delete('dialogs/' + '/messages/' + messageId)
    },
}

export const profileAPI = {
    getProfile(userID) {
        return instance.get('profile/' + userID)
    },
    getStatus(userID) {
        return instance.get('profile/status/' + userID)
    },
    updateStatus(status) {
        return instance.put('profile/status', { status })
    },
    updateProfileInfo(profile) {
        return instance.put('profile', profile)
    },
    updateProfileMainPhoto(data) {
        let formData = new FormData();
        formData.append("image", data)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}


export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`,
            { withCredentials: true })
            .then(response => response.data)
    },

    login(email, password, rememberMe = false, captcha) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })

    },

    logout() {
        return instance.delete('auth/login')
    },
    captcha() {
        return instance.get(`security/get-captcha-url`)
    }
}
