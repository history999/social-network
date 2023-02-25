import { profileAPI, usersAPI } from "../api/api"
import authReducer from './auth-reducer';

const ADD_POSTS = 'ADD_POSTS'
const GET_STATUS = 'GET_STATUS'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_LOADING = 'SET_LOADING'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
const INFO_EDIT_MODE_CHANGE = 'INFO_EDIT_MODE_CHANGE'
const UPDATE_SUBSCRIPTIONS = 'UPDATE_SUBSCRIPTIONS'

let initialState = {
    posts: [
        {
            id: 5,
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        },
        {
            id: 6,
            message: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        },
        {
            id: 7,
            message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        }
    ],
    status: 'Напишите что-нибудь',
    profile: {},
    loading: true,
    infoEditMode: false,
    subscriptions: 0
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

        
        case UPDATE_SUBSCRIPTIONS:
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
export const updateSubscriptionAC = (subscriptions) => ({ type: UPDATE_SUBSCRIPTIONS, payload: { subscriptions } })
export const getStatusAction = (status) => ({ type: GET_STATUS, payload: { status } })
export const setUserProfileAC = (profile) => ({ type: SET_USER_PROFILE, payload: { profile } })
export const setLoadingAC = (loading) => ({ type: SET_LOADING, payload: { loading } })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const changeInfoEditMode = (infoEditMode) => ({ type: INFO_EDIT_MODE_CHANGE, payload: { infoEditMode } })

export const updateNewPostText = (postInfo) => (dispatch) => {

    dispatch(addPostAC(postInfo))
}


export const getProfile = (userID) => async (dispatch) => {
    dispatch(setLoadingAC(true))
    let response = await profileAPI.getProfile(userID)
    dispatch(setUserProfileAC(response.data))
    dispatch(setLoadingAC(false))
}

export const updateSubscriptions = () => async (dispatch) => {
    let response = await usersAPI.getUsers(1, 100, '', true)
    dispatch(updateSubscriptionAC(response.items.length))
}


export const getProfileStatus = (userID) => async (dispatch) => {
    dispatch(setLoadingAC(true))
    let response = await profileAPI.getStatus(userID)
    dispatch(getStatusAction(response.data))
    dispatch(setLoadingAC(false))
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
        dispatch(setLoadingAC(false))
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

export const loadingComponentThunk = (value) => (dispatch) => {
    dispatch(setLoadingAC(value))
}








export default profileReducer;