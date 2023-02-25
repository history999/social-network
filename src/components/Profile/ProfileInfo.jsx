import React, { useState, useEffect } from 'react'
import profileStyle from "./Profile.module.scss"
import profileImg from "../../img/profile.png"
import ProfileStatus from './ProfileStatus';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfoThunk, changeInfoEditModeThunk, updateSubscriptions } from './../../redux/profile-reducer';
import { FormEditInfoRedux } from './FormEditInfo';

export default function ProfileInfo(props) {
  const posts = useSelector((state) => state.profilePage.posts)
  const status = useSelector((state) => state.profilePage.status)
  const profile = useSelector((state) => state.profilePage.profile)
  const userIdProfile = useSelector((state) => state.authReducer.id)

  const [showInfo, setShowInfo] = useState(false)

  let dispatch = useDispatch();

  const infoEditMode = useSelector(state => state.profilePage.infoEditMode)
  const filterFriend = useSelector(state => state.profilePage.subscriptions)


  let setInfoProfile = (data) => {
    console.log(data)
    dispatch(updateProfileInfoThunk(data))
    dispatch(changeInfoEditModeThunk(false))
    
  }

  useEffect(() => {
    dispatch(updateSubscriptions())
  }, [dispatch])

  let profileContactsKey = []

  if (profile.contacts) {
    for (let key of Object.entries(profile.contacts)) {
      profileContactsKey.push(key)
    }
  }
  
  

  if (!profile.photos) {
    return <div>Loading</div>
  }
  props.updateProfileImg(profile.photos.small)
  return (

    <div>
      {infoEditMode ?
        <FormEditInfoRedux initialValues={profile} onSubmit={setInfoProfile} profile={profile} posts={posts} status={status} />
        :
        <div>
          <div className={profileStyle.profile}>
            <div className={profileStyle.info}>
              <img src={profile.photos.large || profileImg} alt="" />
              <div>
                <h2>{profile.fullName}</h2>
                <ProfileStatus userId={props.userId} userIdProfile={userIdProfile} status={status} />
                <div>
                  <h4>About me</h4>
                  <p>{profile.aboutMe}</p>
                  <h5>{profile.lookingForAJob ? <div>I need work</div> : <div>I am work</div>}</h5>
                </div>
                {showInfo ? <button className='standart-button' onClick={() => setShowInfo(false)}>Hide info</button> : <button className='standart-button' onClick={() => setShowInfo(true)}>Show info</button>}
              </div>
              <div className={profileStyle.advanceInfoProfile} style={{ display: showInfo ? 'block' : 'none' }}>
                <div>
                  <p>{profile.lookingForAJob && <div><b>My skills:</b> {profile.lookingForAJobDescription}</div>}</p>
                  {
                    profileContactsKey.map((item, key) => (
                      <p className={profileStyle.contactLinks} key={key}>{item[0]}: {item[1] || <span>NO</span>}</p>
                    ))
                  }

                  {props.userId === userIdProfile && <button className='standart-button' onClick={() => dispatch(changeInfoEditModeThunk(true))}>Edit mode</button>
                  }
                </div>
              </div>
            </div>
            {
              props.userId === userIdProfile &&
              <div className={profileStyle.buttons}>
                <div>Posts: {posts.length}</div>
                <div>Followers: 0</div>
                <div>Subscriptions: {filterFriend}</div>
              </div>
            }
          </div>


        </div>
      }
    </div>

  )
}




//form: 'FormEditInfo'