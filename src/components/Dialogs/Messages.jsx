import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMessageWithUserThunk } from '../../redux/dialogs-reducer';
import { sendMessageUserThunk } from './../../redux/dialogs-reducer';

const Messages = (props) => {
    let loading = useSelector(state => state.dialogsReducer.loading)
    let messages = useSelector(state => state.dialogsReducer.message)

    let [inputMessage, setInputMessage] = useState('')

    let { userIdDialog } = useParams();

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessageWithUserThunk(userIdDialog))
    }, [])


    const sendMessageUser = (userIdDialog, inputMessage) => {
        // if(!inputMessage){
        //     return
        // }

        dispatch(sendMessageUserThunk(userIdDialog, inputMessage))
    }

    

    return (
        <div>
            {loading ? <div>loading</div> 
            : 
            <div>
            {messages.items.map((item, key) => (
                <div key={key}>
                    <h3>{item.senderName}</h3>
                    <p>{item.body}</p>
                </div>
            ))}
            </div>}
            <textarea onChange={e => setInputMessage(e.currentTarget.value)} value={inputMessage} className="standart-input"></textarea>
            <button className='standart-button' onClick={() => sendMessageUser}>Send</button>
        
        </div>
    )
}

export default Messages