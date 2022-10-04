import React, { useState, useEffect } from 'react'
import { reduxForm, Field } from 'redux-form';
import profileStyle from "./Profile.module.scss"
import profileImg from "../../img/profile.png"
import ProfileStatus from './ProfileStatus';
import { FormControlCheckbox, FormControlInput } from './../FormsControls/FormsControl';
import HOCField from './../FormsControls/HOCField';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfileInfoThunk, getProfileStatus, saveChangesPhoto, changeInfoEditModeThunk } from './../../redux/profile-reducer';
import { useParams } from 'react-router-dom';

export default function ProfileInfo(props) {
  const posts = useSelector((state) => state.profilePage.posts)
  const loading = useSelector((state) => state.profilePage.loading)
  const status = useSelector((state) => state.profilePage.status)
  const profile = useSelector((state) => state.profilePage.profile)


  let dispatch = useDispatch();

  const infoEditMode = useSelector(state => state.profilePage.infoEditMode)


  const setInfoProfile = (data) => {
    dispatch(updateProfileInfoThunk(data))
    dispatch(changeInfoEditModeThunk(false))
    console.log(data)
  }




  if (loading) {
    return <div>Loading!</div>
  }
  return (

    <div>
      {infoEditMode ?
        <FormEditInfoRedux  initialValues={profile} onSubmit={setInfoProfile} profile={profile} posts={posts} status={status} />
        :
        <div>
          <div className={profileStyle.profile}>
            <div className={profileStyle.info}>
              <img src={profile.photos.large || profileImg} alt="" />
              <div>
                <h2>{profile.fullName}</h2>
                <ProfileStatus status={status} />
                <div>
                  <h4>About me</h4>
                  <p>{profile.aboutMe}</p>
                  <h5>{profile.lookingForAJob ? <div>I need work</div> : <div>I am work</div>}</h5>
                  <p>{profile.lookingForAJob && <div><b>My skills:</b> {profile.lookingForAJobDescription}</div>}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Facebook: {profile.contacts.facebook || <span>NO</span>}</p>
                  <p>GitHub: {profile.contacts.github || <span>NO</span>}</p>
                  <p>Instagram: {profile.contacts.instagram || <span>NO</span>}</p>
                  <p>Twitter: {profile.contacts.twitter || <span>NO</span>}</p>
                  <p>VK: {profile.contacts.vk || <span>NO</span>}</p>
                  <p>Website: {profile.contacts.website || <span>NO</span>}</p>
                  <p>YouTube: {profile.contacts.youtube || <span>NO</span>}</p>
                  <button onClick={() => dispatch(changeInfoEditModeThunk(true))}>Edit mode</button>
                </div>
              </div>
            </div>
            <div className={profileStyle.buttons}>
              <div>Posts: {posts.length}</div>
              <div>Followers</div>
              <div>Subscriptions</div>
            </div>
          </div>


        </div>
      }
    </div>

  )
}


const FormEditInfo = props => {

  let dispatch = useDispatch();

  const changeMainPhoto = (e) => {
    if(e.target.files.length){
      dispatch(saveChangesPhoto(e.target.files[0]))
    }
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
      <div className={profileStyle.profile}>
            <div className={profileStyle.info}>
              <img src={props.profile.photos.large || profileImg} alt="" />
              <input type={"file"} onChange={changeMainPhoto} />
              <div>
                <h2>{HOCField('fullName', FormControlInput, 'Your Name')}</h2>
                <ProfileStatus status={props.status} />
                <div>
                  <h4>About me</h4>
                  <p>{HOCField('aboutMe', FormControlInput, 'About me')}</p>
                  <p>Looking for a job: {HOCField('lookingForAJob', FormControlInput, '', {type: "checkbox"})}</p>
                  <p>Professional skills: {HOCField('lookingForAJobDescription', FormControlInput, 'Professional skills')}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Facebook: {HOCField('contacts.facebook', FormControlInput, 'Your Facebook')}</p>
                  <p>GitHub: {HOCField('contacts.github', FormControlInput, 'Your GitHub')}</p>
                  <p>Instagram: {HOCField('contacts.instagram', FormControlInput, 'Your Instagram')}</p>
                  <p>Twitter: {HOCField('contacts.twitter', FormControlInput, 'Your Twitter')}</p>
                  <p>VK: {HOCField('contacts.vk', FormControlInput, 'Your VK')}</p>
                  <p>Website: {HOCField('contacts.website', FormControlInput, 'Your website')}</p>
                  <p>YouTube: {HOCField('contacts.youtube', FormControlInput, 'Your YouTube')}</p>
                  <button >Save changes</button>
                  <button onClick={() => dispatch(changeInfoEditModeThunk(false))}>Cancel</button>
                </div>
              </div>
            </div>
            <div className={profileStyle.buttons}>
              <div>Posts: {props.posts.length}</div>
              <div>Followers</div>
              <div>Subscriptions</div>
            </div>
          </div>
        
      </form>
    </div>

  )
}

const FormEditInfoRedux = reduxForm({ form: 'FormEditInfo' })(FormEditInfo)