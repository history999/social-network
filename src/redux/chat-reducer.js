import { chatAPI } from './../api/chat-api';

const UPDATE_MESSAGE_LIST = 'UPDATE_MESSAGE_LIST'


let initialState = {
    messages: []
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_LIST:
            return {
                ...state, messages: [...state.messages, ...action.payload.messages]
            }

        default: return state
    }
}

export const updateMessage = (messages) => ({ type: UPDATE_MESSAGE_LIST, payload: {messages} })

let _newMessageHandler = null
const newMessageHandlerCreator = (dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(updateMessage(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagingThunk = () => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagingThunk = () => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessageThunk = (message) => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;