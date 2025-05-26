"use client"

import React from 'react';

import { ChatMessage } from "../../typeDef";
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { getChatRoomFile } from '../controller/FirebaseController';

export default function ChatItem({currentUid, chatId, chat} : {currentUid : string , chatId : string, chat : ChatMessage}){
    const [senderType, setSenderType] =  React.useState<'me'|'other'|'sys'>('sys');
    const [fileString, setFileString ] = React.useState<string>(null);
    React.useEffect(()=> {
        switch(chat.createdBy) {
            case 'System' : 
                setSenderType('sys')
            break;
            default : 
            return chat.createdBy === currentUid
                ? setSenderType('me')
                : setSenderType('other')
        }
        console.log("useEffect Call")
        chat.attachYn && displayAttachFile(chat.attachFile);
    },[])

    const displayAttachFile = async (attachUid : string)=> {
        const { result, value } = await getChatRoomFile(chatId, attachUid);
        console.log("Result : " + result);
        console.log("Value : "+ value)
        result && setFileString(value); 
    }

    // Set justify of message position
    const spanCSS = {
        me : 'self-end text-end',
        other : 'justify-begin',
        sys : 'self-center justify-center mx-20'
     }

    // Set Text CSS Setting for message
    const textCSS = {
        me : "bg-blue-500 dark:bg-blue-600 self-end",
        other : "bg-gray-500 dark:bg-gray-600",
        sys : "bg-purple-500 dark:bg-purple-600"
    }
    
    return (
        <span className={`flex mx-2 ${spanCSS[senderType]} max-w-[70%]`}>
            { /* Display Send Time for 'me' */
                senderType === "me" &&
                <p className='text-[0.6rem] self-end mr-1'>
                    {new Date(chat.createdAt as any).toLocaleTimeString()}
                </p>
            }
            { /* Display Attach File(Image)*/
                chat.attachYn && fileString &&
                <img
                    className='w-16 h-16' 
                    src={fileString}
                /> 
            }
            <p className={`flex rounded-lg px-2 py-1 ${textCSS[senderType]} text-pretty`}>
                { /* Icon for System Message */ 
                    chat.createdBy === "System" 
                        && <InformationCircleIcon className='w-6 h-6'/> 
                }
                {chat.content}
            </p>
            { /* Display Send Time for 'other */
                senderType === "other" &&
                <p className='text-[0.6rem] self-end ml-1'>
                    {new Date(chat.createdAt as any).toLocaleTimeString()}
                </p>
            }
        </span>
    )
}