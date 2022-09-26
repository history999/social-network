import React, { useState, useEffect } from "react";
import profile from './Profile.module.scss'

function ProfileStatus(props){
    
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status);

  
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    const NotclickEditStatus = () => {
        setEditMode(false)
        
        props.clickUpdateStatus(status)
    }

        return (
            <div><span> Статус: </span>
                {!editMode ? <div onDoubleClick={()=>setEditMode(true)}>
                    {props.status || "Информации пока нет"}
                </div> :
                    <div>
                       <input className={profile.inputStatus} onChange={onStatusChange} autoFocus onBlur={NotclickEditStatus} type="text" value={status} />
                    </div>}
            </div>
        )
}

export default ProfileStatus