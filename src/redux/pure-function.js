export const usersListFollowUnfollow = (users, actionId, followedTrueFalse) => {
    return users.map(u => {
        if (u.id === actionId) {
            return { ...u, followed: followedTrueFalse }
        }
        return u
    })
}