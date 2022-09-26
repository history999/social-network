import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateNewPostText, getProfile, getProfileStatus, setProfileStatus } from "../../redux/profile-reducer";
import Profile from '../Profile/Profile'
import hocAuth from '../../hoc/hocAuth'
import {compose} from 'redux'
import { useParams } from "react-router-dom";

function ProfileContainer(props){
    let {userId} = useParams();
    if (!userId){
        userId = props.id
    }
    useEffect(() => {
       props.getProfile(userId)
       props.getProfileStatus(userId)
    }, [userId])

     const clickAddPost = (postInfo) => {
        props.updateNewPostText(postInfo)
    }

  

        return (
            <Profile 
            {...props}
            clickAddPost={clickAddPost}
            clickUpdateStatus={props.setProfileStatus}
            />
        )
}

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        id: state.authReducer.id,
        newPostText: state.profilePage.newPostText,
        status: state.profilePage.status,
        profile: state.profilePage.profile
    }
   
}

    export default compose (connect(mapStateToProps, 
        {updateNewPostText, getProfile, getProfileStatus, setProfileStatus}),
        hocAuth)(ProfileContainer)