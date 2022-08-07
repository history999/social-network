import { profileAPI } from "../api/api"

const ADD_POSTS = 'ADD_POSTS'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const GET_STATUS = 'GET_STATUS'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

let initialState = {
    posts: [
        {
            id: 5,
            message: 'Post text'
        },
        {
            id: 6,
            message: 'Post text'
        },
        {
            id: 7,
            message: 'Post text'
        }
    ],
    newPostText: '',
    status: 'default status',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POSTS:
            let newPost = {
                id: 8,
                message: state.newPostText
            }
            return { 
                ...state, 
                posts: [...state.posts, newPost], 
                newPostText: '' }
        case UPDATE_NEW_POST_TEXT: 
            return {
                ...state,
                newPostText: action.newText
            }
        case GET_STATUS: 
        return {
            ...state,
            status: action.status
        }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }

        default: return state
    }
}

export const addPostAC = () => ({ type: ADD_POSTS })
export const updateNewPostTextAC = (newText) => ({ type: UPDATE_NEW_POST_TEXT, newText: newText })
export const getStatusAction = (status) => ({ type: GET_STATUS, status })
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile })

export const updateNewPostText = (postInfo) => {
    return (dispatch) => {
        
        dispatch(updateNewPostTextAC(postInfo))
        dispatch(addPostAC())
    }
}

export const getProfile = (userID) => {
    return (dispatch) => {
        profileAPI.getProfile(userID).then( response => 
            dispatch(setUserProfileAC(response.data))
            )
    }
}

export const getProfileStatus = (userID) => {
    return (dispatch) => {
        profileAPI.getStatus(userID).then( response => 
            dispatch(getStatusAction(response.data))
            )
    }
}

export default profileReducer;