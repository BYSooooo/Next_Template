"use client";

import React from 'react';
import { setChatRoomMessage } from '../controller/FirebaseController';
import { firebaseAuth } from '../../firebase-config';
import { useAppDispatch } from '../redux/hooks';
import { controlMessageToast } from '../redux/features';

export function FriendChatInput({chatId} : {chatId : string}) {
    const [inputValue, setInputValue] = React.useState("");
    const dispatch = useAppDispatch();
    const currentUid = firebaseAuth.currentUser.uid;
    React.useEffect(()=> {

    },[])

    const onClickSendMessage = ()=> {
        sendMessage()        
    }

    const onClickAttachFile = ()=> {
        console.log("Clicked")
    }

    const sendMessage = async()=> {
        const { result, value } = await setChatRoomMessage(chatId,inputValue,false,"",currentUid);
        if(result){
            setInputValue("");
        } else {
            dispatch(controlMessageToast({openYn : true, type : 'error', title : 'Error', content : value}))
        }
    }

    return (
        <div className="chat-input-box
            flex flex-row w-[40rem] ml-1 h-[3rem]
            justify-center p-2 gap-2">
            <input
                onKeyDown={(e)=> e.key === 'Enter' && onClickSendMessage()}
                onChange={(e)=>setInputValue(e.target.value)}
                value={inputValue} 
                className="default-input w-[80%]">
            </input>
            <button
                onClick={onClickAttachFile} 
                className="default-button w-[7%] justify-center">
                File
            </button>
            <button 
                onClick={onClickSendMessage}
                className="default-button w-[7%] justify-center dark:bg-blue-500">
                Send
            </button>
        </div>
    )
}