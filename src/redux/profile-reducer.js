import { profileAPI } from "../api/api"

const ADD_POSTS = 'ADD_POSTS'
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
    status: 'Напишите что-нибудь',
    profile: {}
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POSTS:
            let newPost = {
                id: 8,
                message: action.newPostText
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        case GET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        default: return state
    }
}

export const addPostAC = (newPostText) => ({ type: ADD_POSTS, newPostText })
export const getStatusAction = (status) => ({ type: GET_STATUS, status })
export const setUserProfileAC = (profile) => ({ type: SET_USER_PROFILE, profile })

export const updateNewPostText = (postInfo) => (dispatch) => {

    dispatch(addPostAC(postInfo))
}


export const getProfile = (userID) => async (dispatch) => {
    let response = await profileAPI.getProfile(userID)
    dispatch(setUserProfileAC(response.data))
}


export const getProfileStatus = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(getStatusAction(response.data))
}


export const setProfileStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    dispatch(getStatusAction(status))
}


export default profileReducer;