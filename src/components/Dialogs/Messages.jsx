import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import dialogsStyle from './Dialogs.module.scss'
import { deleteMessageUserThunk, getMessageWithUserThunk, setLoadingThunk } from '../../redux/dialogs-reducer';
import { sendMessageUserThunk } from './../../redux/dialogs-reducer';
import { HourGlass } from 'react-awesome-spinners';

let Messages = (props) => {
    let messages = useSelector((state) => state.dialogsPage.message)

    let [inputMessage, setInputMessage] = useState('')

    let { userIdDialog } = useParams();

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessageWithUserThunk(userIdDialog))
    }, [userIdDialog, dispatch])


    const sendMessageUser = (userIdDialog, inputMessage) => {
        if (inputMessage) {
            dispatch(sendMessageUserThunk(userIdDialog, inputMessage))
            setInputMessage('')
            setTimeout(() => {
                dispatch(getMessageWithUserThunk(userIdDialog))
            }, 500);
        }
    }

    const deleteMessage = (messageId) => {
        dispatch(deleteMessageUserThunk(messageId))
        setTimeout(() => {
            dispatch(getMessageWithUserThunk(userIdDialog))
        }, 500);
    }

    if (!messages.items) {
        return <HourGlass />
    }

    return (
        <>
            <div>
                {messages.totalCount===0 ? <p>Messages are not found</p> 
                : 
                messages.items.map((item, key) => (
                    <div key={key}>
                        
                        <h3>{item.senderName}</h3>
                        <p>{item.body}</p>
                        <button className={'standart-button' + ' ' + 'small-button'} onClick={() => { if (window.confirm('Delete?')) deleteMessage(item.id) }}>Delete message</button>
                    </div>
                ))
                }
                <div className={dialogsStyle.blockSendMessage}>
                    <textarea onChange={e => setInputMessage(e.currentTarget.value)} value={inputMessage} className={"standart-input" + ' ' + dialogsStyle.inputMessage}></textarea>
                    <button className='standart-button' onClick={() => sendMessageUser(userIdDialog, inputMessage)}>Send</button>
                </div>

            </div>


        </>
    )
}

export default Messages