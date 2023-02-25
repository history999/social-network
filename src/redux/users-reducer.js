import { usersAPI } from '../api/api'
import { usersListFollowUnfollow } from './pure-function'

const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_PAGE = 'SET_PAGE'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const IS_FETCHING = 'IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_FILTER = 'SET_FILTER'

let initialState = {
    users: [],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: [...action.users] }
        case FOLLOW:
            return {
                ...state, users: usersListFollowUnfollow(state.users, action.id, true)
            }

        case UNFOLLOW:
            return {
                ...state, users: usersListFollowUnfollow(state.users, action.id, false)
            }
        case SET_TOTAL_COUNT:
            return { ...state, ...action }
        case SET_PAGE:
            return { ...state, ...action }
        case IS_FETCHING:
            return { ...state, ...action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id != action.id)
            }
        case SET_FILTER:
            return {...state, filter: action.payload}

        default: return state
    }
}

export const setUsers = (users) => ({ type: SET_USERS, users })
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount })
export const setPage = (currentPage) => ({ type: SET_PAGE, currentPage })
export const followAC = (id) => ({ type: FOLLOW, id })
export const unFollowAC = (id) => ({ type: UNFOLLOW, id })
export const toggleIsFetching = (isFetching) => ({ type: IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, id) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id })
export const setFilterAC = (filter) => ({ type: SET_FILTER, payload: filter })


export const getUsers = (currentPage, pageSize, filter) => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true))
    dispatch(setFilterAC(filter));
    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(setPage(currentPage))
    dispatch(toggleIsFetching(false))
}

const followAndUnFollowThunk = async (dispatch, id, followOrUnFollowAC, followOrUnFollowAPI) => {
    dispatch(toggleFollowingProgress(true, id))
    let data = await followOrUnFollowAPI(id)
    if (data.data.resultCode === 0) {

        dispatch(followOrUnFollowAC(id))
    }
    dispatch(toggleFollowingProgress(false, id))
}

export const followThunk = (id) => async (dispatch) => {
    followAndUnFollowThunk(dispatch, id, followAC, usersAPI.follow.bind(usersAPI))
}



export const unfollowThunk = (id) => async (dispatch) => {
    followAndUnFollowThunk(dispatch, id, unFollowAC, usersAPI.unFollow.bind(usersAPI))

}



export default usersReducer;