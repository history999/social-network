export const getUsersSelector = (state) => {
    return state.usersPage.users
}

// export const getUsersSelectorSUPER = createSelector

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}



