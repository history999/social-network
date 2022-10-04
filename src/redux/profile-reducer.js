import { profileAPI } from "../api/api"
import authReducer from './auth-reducer';

const ADD_POSTS = 'ADD_POSTS'
const GET_STATUS = 'GET_STATUS'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_LOADING = 'SET_LOADING'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
const INFO_EDIT_MODE_CHANGE = 'INFO_EDIT_MODE_CHANGE'

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
    profile: {},
    loading: true,
    infoEditMode: false
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

        case SET_LOADING:
        case GET_STATUS:
        case SET_USER_PROFILE:
        case INFO_EDIT_MODE_CHANGE:
            return {
                ...state,
                ...action.payload
            }

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: { ...state.profile, photos: action.photos }
            }

        default: return state
    }
}

export const addPostAC = (newPostText) => ({ type: ADD_POSTS, newPostText })
export const getStatusAction = (status) => ({ type: GET_STATUS, payload: { status } })
export const setUserProfileAC = (profile) => ({ type: SET_USER_PROFILE, payload: { profile } })
export const setLoadingAC = (loading) => ({ type: SET_LOADING, payload: { loading } })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const changeInfoEditMode = (infoEditMode) => ({ type: INFO_EDIT_MODE_CHANGE, payload: {infoEditMode} })

export const updateNewPostText = (postInfo) => (dispatch) => {

    dispatch(addPostAC(postInfo))
}


export const getProfile = (userID) => async (dispatch) => {
    let response = await profileAPI.getProfile(userID)
    dispatch(setUserProfileAC(response.data))
    dispatch(setLoadingAC(false))
}


export const getProfileStatus = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(getStatusAction(response.data))
}


export const setProfileStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    dispatch(getStatusAction(status))
}


export const updateProfileInfoThunk = (info) => async (dispatch, getState) => {
    let id = getState().authReducer.id
    let response = await profileAPI.updateProfileInfo(info);
    if (response.data.resultCode === 0) {
        dispatch(getProfile(id))
    }
}

export const saveChangesPhoto = (file) => async (dispatch, getState) => {
    let response = await profileAPI.updateProfileMainPhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const changeInfoEditModeThunk = (editMode) => (dispatch) => {
    dispatch(changeInfoEditMode(editMode))
}










export default profileReducer;