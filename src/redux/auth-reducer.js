import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.data
            }

        default: return state
    }
}

export const setUserDataAC = (email, id, login, isAuth) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth } })

export const setUserDataThunk = (data) => {
    return async (dispatch) => {
         let data = await authAPI.getAuthData()
        
            if (data.resultCode === 0){
            let {email, id, login} = data.data;
            dispatch(setUserDataAC(email, id, login, true))
        }
    }
}

export const loginThunk = (login, password, rememberMe) => async (dispatch) => {
        
        let response = await authAPI.login(login, password, rememberMe)
        console.log(response)
            if (response.data.resultCode === 0){
            dispatch(setUserDataThunk())
        } else {
            console.log(response.data.messages)
        }
}

export const logoutThunk = (login, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.logout()
    console.log(response)
        if (response.data.resultCode === 0){
        dispatch(setUserDataAC(null, null, null, false))
    } else {
        console.log(response.data.messages)
    }
}

export default authReducer;