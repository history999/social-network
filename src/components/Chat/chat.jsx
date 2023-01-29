import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import chatStyle from './Chat.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk, startMessagingThunk } from '../../redux/chat-reducer';
import { stopMessagingThunk } from './../../redux/chat-reducer';


const Chat = () => {

    let messages = useSelector(state => state.chatReducer.messages)

    const dispatch = useDispatch();
    let [message, setMessage] = useState('')
    let autoScrollDiv = useRef()


    const sendMessageHandler = () => {
        if(!message){
            return
        }
        dispatch(sendMessageThunk(message))
        setMessage('')
    }
    
    const scrollToBottom = () => {
        autoScrollDiv.current?.scrollIntoView({behavior: 'smooth'})
    }
  

    useEffect(() => {
        dispatch(startMessagingThunk())

        return () => {
            dispatch(stopMessagingThunk())
        }
    }, []) 

    useEffect(() => {
        scrollToBottom()
    }, [messages])





    return (
        <div style={{height: '580px', overflow: 'auto'}}>
            {messages.map( (m,index) => (<div key={index}>
                    <div><h3>{m.userName}</h3></div>
                    <div><img width="60px" src={m.photo} alt="" /></div>
                    <p>{m.message}</p>
                    <div ref={autoScrollDiv} />
                </div>
                )
                
            )}
            <textarea onChange={e => setMessage(e.currentTarget.value)} value={message} className="standart-input"></textarea>
            <button className='standart-button' onClick={sendMessageHandler}>Send</button>
        </div>
    );
};

export default Chat;
