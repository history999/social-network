import { dialogsAPI } from "../api/api"


const SET_ALL_DIALOGS = 'SET_ALL_DIALOGS'
const SET_LOADING = 'SET_LOADING'
const SET_USER_MESSAGE = 'SET_USER_MESSAGE'


let initialState = {
    allDialogs: null,
    loading: true,
    message: []
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {




        case SET_ALL_DIALOGS:
        case SET_USER_MESSAGE:
            return {
                ...state,
                ...action.payload
            }

        case SET_LOADING:
            return {
                ...state,
                ...action
            }

        default: return state
    }
}

export const setAllDialogs = (allDialogs) => ({ type: SET_ALL_DIALOGS, payload: { allDialogs } })
export const setDialogsWithUser = (message) => ({ type: SET_USER_MESSAGE, payload: { message } })
export const setLoadingACC = (loading) => ({ type: SET_LOADING, loading })



export const getDialogsThunk = () => async (dispatch, getState) => {
    let allDialogs = await dialogsAPI.getDialogs();
    dispatch(setAllDialogs(allDialogs))
}

export const startChattingThunk = (userIdChat) => async (dispatch) => {
    let startChat = await dialogsAPI.startChatting(userIdChat);
}

export const getMessageWithUserThunk = (userId) => async (dispatch, getState) => {
    let message = await dialogsAPI.getMessageWithUser(userId);
    dispatch(setDialogsWithUser(message));
}

export const sendMessageUserThunk = (userId, message) => async (dispatch) => {
    let messageSend = await dialogsAPI.sendMessageUser(userId, message);
}

export const deleteMessageUserThunk = (messageId) => async (dispatch) => {
    let messageSend = await dialogsAPI.deleteMessageUser(messageId);
}









export default dialogsReducer;