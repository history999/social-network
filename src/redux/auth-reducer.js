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
                ...state, ...action.data,
                isAuth: true
            }

        default: return state
    }
}

export const setUserDataAC = (email, id, login) => ({ type: SET_USER_DATA, data: { email, id, login } })

export const setUserDataThunk = (data) => {
    return (dispatch) => {

        authAPI.getAuthData().then(data => {
            if (data.resultCode === 0){
            let {email, id, login} = data.data;
            dispatch(setUserDataAC(email, id, login))
        }
    })

}
}

export default authReducer;