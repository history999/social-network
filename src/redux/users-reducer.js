import { usersAPI } from '../api/api'

const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_PAGE = 'SET_PAGE'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const IS_FETCHING = 'IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: [...action.users] }
        case FOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }

        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case SET_TOTAL_COUNT:
            return { ...state, ...action }
        case SET_PAGE:
            return { ...state, ...action }
        case IS_FETCHING:
            return { ...state, ...action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return { ...state, followingInProgress: action.isFetching
                ?   [...state.followingInProgress, action.id]
                : state.followingInProgress.filter(id => id != action.id) }

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


export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
            dispatch(setPage(currentPage))
        }
        )
    }
}

export const followThunk = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        usersAPI.follow(id).then(data => {
            if (data.data.resultCode === 0) {

                dispatch(followAC(id))
            }
            dispatch(toggleFollowingProgress(false, id))
        })
    }

}

export const unfollowThunk = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        usersAPI.unFollow(id).then(data => {
            if (data.data.resultCode === 0) {
                dispatch(unFollowAC(id))
            }
            dispatch(toggleFollowingProgress(false, id))
        })
    }

}

export default usersReducer;