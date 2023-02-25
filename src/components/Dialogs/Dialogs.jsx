import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userIcon from "../../img/profile.png";
import dialogsStyle from './Dialogs.module.scss';
import { getDialogsThunk } from '../../redux/dialogs-reducer';
import { NavLink } from 'react-router-dom';
import { HourGlass } from 'react-awesome-spinners'

let Dialogs = (props) => {
    let allDialogs = useSelector((state) => state.dialogsPage.allDialogs)
    
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDialogsThunk())
    }, [dispatch])

    if (!allDialogs) {
        return <HourGlass />
    }

    return (
        <>
            <div>
                {allDialogs.map((item, key) => (
                    <NavLink key={key} to={item.id + '/messages/'}>
                        <div className={dialogsStyle.dialogItem_user}>
                            <img src={item.photos.small || userIcon} alt="" />
                            <div>
                                <h3>{item.userName}</h3>
                                {item.hasNewMessages ? <p><b>New message!</b></p> : <p>No new message</p>}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
}
export default Dialogs