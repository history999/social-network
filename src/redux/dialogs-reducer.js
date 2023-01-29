import { dialogsAPI } from "../api/api"


const SET_ALL_DIALOGS = 'SET_ALL_DIALOGS'
const SET_LOADING = 'SET_LOADING'
const SET_USER_MESSAGE = 'SET_USER_MESSAGE'


let initialState = {
    allDialogs: null,
    loading: true,
    message: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_ALL_DIALOGS:
        case SET_LOADING:
        case SET_USER_MESSAGE:
            return {
                ...state,
                ...action.payload
            }

        
        default: return state
    }
}

export const setAllDialogs = (allDialogs) => ({ type: SET_ALL_DIALOGS, payload: { allDialogs } })
export const setDialogsWithUser = (message) => ({ type: SET_USER_MESSAGE, payload: { message } })
export const setLoadingAC = (loading) => ({ type: SET_LOADING, payload: { loading } })



export const getDialogsThunk = () => async (dispatch) => {
    dispatch(setLoadingAC(true))
    let allDialogs = await dialogsAPI.getDialogs();
    dispatch(setAllDialogs(allDialogs))
    dispatch(setLoadingAC(false))
    console.log(allDialogs)
}

export const startChattingThunk = () => async (dispatch) => {
    let startChat = await dialogsAPI.startChatting();
    console.log(startChat)
}

export const getMessageWithUserThunk = (userId) => async (dispatch) => {
    dispatch(setLoadingAC(true));
    let message = await dialogsAPI.getMessageWithUser(userId);
    dispatch(setDialogsWithUser(message));
    dispatch(setLoadingAC(false))
}

export const sendMessageUserThunk = (userId, message) => async (dispatch) => {
    let messageSend = await dialogsAPI.sendMessageUser(userId, message);
    console.log(messageSend)
}












export default profileReducer;