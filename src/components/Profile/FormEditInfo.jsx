import React from 'react'
import { reduxForm } from 'redux-form';
import profileStyle from "./Profile.module.scss"
import profileImg from "../../img/profile.png"
import { FormControlInput } from './../FormsControls/FormsControl';
import HOCField from './../FormsControls/HOCField';
import { useDispatch } from 'react-redux';
import { saveChangesPhoto, changeInfoEditModeThunk } from './../../redux/profile-reducer';
import { lengthRequired, required } from '../validators/validators';

const lengthFieldValidator = lengthRequired(20)

const FormEditInfo = props => {


    let dispatch = useDispatch();
  
    const changeMainPhoto = (e) => {
      if (e.target.files.length) {
        dispatch(saveChangesPhoto(e.target.files[0]))
      }
    }
  
    return (
      <div>
        <form onSubmit={props.handleSubmit}>
          <div className={profileStyle.profile}>
            <div className={profileStyle.info}>
              <img src={props.profile.photos.large || profileImg} alt="" />
              <input className={profileStyle.inputChangeImage} type={"file"} onChange={changeMainPhoto} />
              <div>
                <h2>{HOCField('fullName', FormControlInput, 'Your Name', {validate: [required]})}</h2>
                <div>
                  <h4>About me</h4>
                  <p>{HOCField('aboutMe', FormControlInput, 'About me')}</p>
                  <p>Looking for a job: {HOCField('lookingForAJob', FormControlInput, '', { type: "checkbox" })}</p>
                  <p>Professional skills: {HOCField('lookingForAJobDescription', FormControlInput, 'Professional skills', { validate: [lengthFieldValidator] } )}</p>
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
                  <button className='standart-button' type="submit">Save changes</button>
                  <button className='standart-button' onClick={() => dispatch(changeInfoEditModeThunk(false))}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
  
        </form>
      </div>
  
    )
  }
  
  export const FormEditInfoRedux = reduxForm({ form: 'form-edit' })(FormEditInfo)