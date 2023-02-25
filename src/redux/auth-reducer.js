import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'


let initialState = {
    id: 0,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.data
            }
        case SET_CAPTCHA_URL:
            return {
                ...state, captchaUrl: action.captchaImg
            }

        default: return state
    }
}

export const setUserDataAC = (email, id, login, isAuth, captcha) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth, captcha } })
export const setCaptchaUrl = (captchaImg) => ({ type: SET_CAPTCHA_URL, captchaImg })

export const setUserDataThunk = (data) => async (dispatch) => {
      
        let data = await authAPI.getAuthData()

        if (data.resultCode === 0) {
            let { email, id, login } = data.data;
            dispatch(setUserDataAC(email, id, login, true))
        }
    
}

export const loginThunk = (login, password, rememberMe, captcha) => async (dispatch) => {

    let response = await authAPI.login(login, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(setUserDataThunk())
    } else if (response.data.resultCode === 10) {
        let captchaUrl = await authAPI.captcha()
        dispatch(setCaptchaUrl(captchaUrl.data.url))
    } else {
        console.log(response.data)
    }
}

export const logoutThunk = () => async (dispatch) => {
    let response = await authAPI.logout()
    console.log(response)
    if (response.data.resultCode === 0) {
        dispatch(setUserDataAC(null, null, null, false))
    } else {
        console.log(response.data.messages)
    }
}

export default authReducer;