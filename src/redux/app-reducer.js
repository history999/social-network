import { setUserDataThunk } from "./auth-reducer"

const SET_DATA_ISAUTH = 'SET_DATA_ISAUTH'


let initialState = {
    initialize: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_ISAUTH:
            return {
                ...state, initialize: true
            }

        default: return state
    }
}

export const setDataAuthAC = () => ({ type: SET_DATA_ISAUTH })

export const setDataAuthThunk = () => (dispatch) => {
    let promiseDataIsAuth = dispatch(setUserDataThunk())
    
    promiseDataIsAuth.then(() => {
        dispatch(setDataAuthAC())
    })
}


export default appReducer;