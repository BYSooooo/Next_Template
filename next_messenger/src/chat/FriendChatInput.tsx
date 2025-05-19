"use client";

import React from 'react';
import { setChatRoomMessage } from '../controller/FirebaseController';
import { firebaseAuth } from '../../firebase-config';
import { useAppDispatch } from '../redux/hooks';
import { controlMessageToast } from '../redux/features';

export function FriendChatInput({chatId} : {chatId : string}) {
    const [inputValue, setInputValue] = React.useState("");
    const [ attachFile, setAttachFile] = React.useState<{name:string, type : string, value: string} | null>(null);
    const [attachYn, setAttachYn] = React.useState(false);
    const dispatch = useAppDispatch();
    const currentUid = firebaseAuth.currentUser.uid;
    React.useEffect(()=> {

    },[])

    const onClickSendMessage = ()=> {
        sendMessage()        
    }

    const attachFileHandler = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } } = event;
        const uploaded = files[0]
        const reader = new FileReader();
        reader.onloadend = (finished: any)=> {
            const { currentTarget : { result } } = finished;
            setAttachFile({ name : uploaded.name, type: uploaded.type, value : result});

        }
        reader.readAsDataURL(uploaded);
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
                disabled={chatId === ""}
                onKeyDown={(e)=> e.key === 'Enter' && onClickSendMessage()}
                onChange={(e)=>setInputValue(e.target.value)}
                value={inputValue} 
                className="default-input w-[80%]">
            </input>
            <button
                disabled={chatId === ""}
                onClick={()=> document.getElementById('tempAttach').click()} 
                className="default-button w-[7%] justify-center">
                File
            </button>
            <input type="file" id="tempAttach" accept='image/*' onChange={(e)=>attachFileHandler(e)} style={{display : 'none'}}/>
            <button 
                disabled={chatId === ""}
                onClick={onClickSendMessage}
                className="default-button w-[7%] justify-center dark:bg-blue-500">
                Send
            </button>
        </div>
    )
}