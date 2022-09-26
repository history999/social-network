import React from "react";
import profile from "./Profile.module.scss"
import profileImg from "../../img/profile.png"
import ProfileStatus from './ProfileStatus';
import { Field, reduxForm } from 'redux-form';
import {required}  from '../validators/validators'
import { FormControlInput } from "../FormsControls/FormsControl";

const Profile = (props) => {



    let addpost = (values) => {
        props.clickAddPost(values.inputTextPost)
    }


    return (
        <div>
            <div className={profile.profile}>
                <div className={profile.info}>
                    <img src={profileImg} alt="" />
                    <div>
                        <h2>{props.profile.fullName}</h2>
                        <ProfileStatus clickUpdateStatus={props.setProfileStatus} status={props.status} />
                    </div>
                </div>
                <div className={profile.buttons}>
                    <div>Публикаций:0</div>
                    <div>Подписчики</div>
                    <div>Подписки</div>
                </div>
            </div>

            <div className={profile.posts}>
                <div className={profile.addPost}>
                    <img src={profileImg} alt="" />
                    <FormAddPostRedux onSubmit={addpost}/>
                </div>
            </div>
            {/* props.posts.length === 0 ? <div>Posts not found</div> :  */}
            {props.posts.map(p => <div key={p.id}>{p.message}</div>)}


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

const FormAddPostRedux = reduxForm({form: 'addPostForm'})(formAddPost)