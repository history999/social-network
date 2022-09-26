import React from "react";
import { connect } from "react-redux";

import { followThunk, getUsers, unfollowThunk } from "../../redux/users-reducer";
import Users from "./Users";
import hocAuth from '../../hoc/hocAuth';
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalCount, getUsersSelector } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        
    }

    onPageChanged = (page) => {
        this.props.getUsers(page, this.props.pageSize)
    }

    render() {
        return (
            <Users {...this.props}
            onPageChanged = {this.onPageChanged}
            follow = {this.props.followThunk}
            unfollow = {this.props.unfollowThunk}
            followingInProgress = {this.props.followingInProgress} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state)
    }
   
}

export default compose(connect(mapStateToProps, 
    {getUsers, followThunk, unfollowThunk}),
    hocAuth)(UsersContainer)

