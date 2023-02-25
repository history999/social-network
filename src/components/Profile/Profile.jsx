import React, { useState, useEffect } from "react";
import profileStyle from "./Profile.module.scss"
import userIcon from "../../img/profile.png"
import { Field, reduxForm } from 'redux-form';
import { required } from '../validators/validators'
import { FormControlInput } from "../FormsControls/FormsControl";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProfile, getProfileStatus, loadingComponentThunk, updateNewPostText } from './../../redux/profile-reducer';
import ProfileInfo from './ProfileInfo';
import { HourGlass } from "react-awesome-spinners";

const Profile = (props) => {
    const id = useSelector((state) => state.authReducer.id)
    const posts = useSelector((state) => state.profilePage.posts)
    const loading = useSelector((state) => state.profilePage.loading)

    let [profileImg, setProfileImg] = useState(null)

    let { userId } = useParams();

    if (!userId) {
        userId = id
    }

    let dispatch = useDispatch()


    useEffect(() => {
        dispatch(getProfile(userId))
        dispatch(getProfileStatus(userId))
        // dispatch(loadingComponentThunk(false))
    }, [userId, dispatch])

    let addpost = (values) => {
        dispatch(updateNewPostText(values.inputTextPost))
    }

    let updateProfileImg = (img) => {
        setProfileImg(img)
    }

    if (loading) {
        return <HourGlass />
    }

    return (

        <div>
            <ProfileInfo updateProfileImg={updateProfileImg} userId={userId} />
            <div className={profileStyle.posts}>
                {userId === id &&
                    <div className={profileStyle.addPost}>
                        <img src={profileImg || userIcon} alt="" />
                        <FormAddPostRedux onSubmit={addpost} />
                    </div>
                }
            </div>
            {userId === id && <>
                {posts.length === 0 ? <div>Posts not found</div> : posts.map(p =>
                <div className={profileStyle.posts}>
                    <div className={profileStyle.addPost + ' ' + profileStyle.postItem} key={p.id}>
                        <p>{p.message}</p>
                    </div>
                </div>
            )}
            </>
            }

        </div>
    )
}

export default Profile


const formAddPost = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field validate={[required]} name={'inputTextPost'} component={FormControlInput} placeholder="Enter your post" />
            <button className='standart-button'>ADD POST</button>
        </form>
    )
}

const FormAddPostRedux = reduxForm({ form: 'addPostForm' })(formAddPost)