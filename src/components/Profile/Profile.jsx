import React, { useEffect } from "react";
import profileStyle from "./Profile.module.scss"
import profileImg from "../../img/profile.png"
import ProfileStatus from './ProfileStatus';
import { Field, reduxForm } from 'redux-form';
import { required } from '../validators/validators'
import { FormControlInput } from "../FormsControls/FormsControl";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProfile, getProfileStatus, updateNewPostText } from './../../redux/profile-reducer';
import ProfileInfo from './ProfileInfo';

const Profile = (props) => {
    const id = useSelector((state) => state.authReducer.id)
    const posts = useSelector((state) => state.profilePage.posts)
    
    let { userId } = useParams();

  if (!userId) {
    userId = id
  }

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProfile(userId))
        dispatch(getProfileStatus(userId))
      }, [userId])

    let addpost = (values) => {
        dispatch(updateNewPostText(values.inputTextPost))
    }

    return (

        <div>
            <ProfileInfo userId={userId}/>

            <div className={profileStyle.posts}>
                <div className={profileStyle.addPost}>
                    <img src={profileImg} alt="" />
                    <FormAddPostRedux onSubmit={addpost} />
                </div>
            </div>
            {posts.length === 0 ? <div>Posts not found</div> : posts.map(p => <div key={p.id}>{p.message}</div>)}
            { }


        </div>
    )
}

export default Profile


const formAddPost = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field validate={[required]} name={'inputTextPost'} component={FormControlInput} placeholder="Enter your post" />
            <button >ADD POST</button>
        </form>
    )
}

const FormAddPostRedux = reduxForm({ form: 'addPostForm' })(formAddPost)