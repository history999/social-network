import React, { useState, useEffect } from "react";
import profile from './Profile.module.scss'
import { useDispatch } from 'react-redux';
import { setProfileStatus } from './../../redux/profile-reducer';

function ProfileStatus(props) {
    let dispatch = useDispatch();


    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status);


    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    const NotclickEditStatus = () => {
        setEditMode(false)
        dispatch(setProfileStatus(status))
    }

    return (
        <div><span> Status: </span>
            {!editMode ?
                <div className={profile.hoverStatus} onClick={() => setEditMode(true)}>
                    {props.status || "Информации пока нет"}
                </div>
                :
                <div>
                    <input className={profile.inputStatus} onChange={onStatusChange} autoFocus onBlur={NotclickEditStatus} type="text" value={status} />
                </div>}
        </div>
    )
}

export default ProfileStatus