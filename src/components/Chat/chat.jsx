import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import chatStyle from './Chat.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk, startMessagingThunk } from '../../redux/chat-reducer';
import { stopMessagingThunk } from '../../redux/chat-reducer';
import { HourGlass } from 'react-awesome-spinners';


const Chat = () => {

    let messages = useSelector(state => state.chatReducer.messages)

    const dispatch = useDispatch();
    let [message, setMessage] = useState('')
    let autoScrollDiv = useRef()


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessageThunk(message))
        setMessage('')
    }

    const scrollToBottom = () => {
        autoScrollDiv.current?.scrollIntoView({ behavior: 'smooth' })
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


    if(!messages.length){
        return <HourGlass />
    }
    

    return (
        <>
            <div>
                <div style={{ height: '550px', overflow: 'auto' }}>
                    {messages.map((m, index) => (
                        <div className={chatStyle.blockUserMessage} key={index}>
                            <div>
                                <img width="60px" src={m.photo} alt="" />
                            </div>
                            <div>
                                <h3>{m.userName}</h3>
                                <p>{m.message}</p>
                                <div ref={autoScrollDiv} />
                            </div>                            
                        </div>
                    )

                    )}
                </div>
                <div className={chatStyle.blockSendMessage}>
                    <textarea onChange={e => setMessage(e.currentTarget.value)} value={message} className="standart-input"></textarea>
                    <button className='standart-button' onClick={sendMessageHandler}>Send</button>
                </div>
            </div>
        </>
    );
};

export default Chat;
