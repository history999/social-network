import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userIcon from "../../img/profile.png";
import dialogsStyle from './Dialogs.module.scss';
import { getDialogsThunk, sendMessageUserThunk, startChattingThunk } from '../../redux/dialogs-reducer';
import { getMessageWithUserThunk } from './../../redux/dialogs-reducer';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Dialogs() {
    let allDialogs = useSelector(state => state.dialogsReducer.allDialogs)
    let loading = useSelector(state => state.dialogsReducer.loading)


    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDialogsThunk())
    }, [dispatch])

    const startChat = () => {
        dispatch(startChattingThunk())
    }

    const sendMessage = (userId, message) => {
        dispatch(sendMessageUserThunk(userId, message))
    }

    if(loading){
        return <div>Loading</div>
    }

    return (
        <div>
            {!allDialogs ||
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
                </div>}

            <button onClick={() => startChat}>start</button>
            <button onClick={() => sendMessage}>send</button>
        </div>
    )
}
