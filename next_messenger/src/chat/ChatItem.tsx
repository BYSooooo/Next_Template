"use client"

import React from 'react';

import { ChatMessage } from "../../typeDef";
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Timestamp } from 'firebase/firestore';

export default function ChatItem({currentUid, chat} : {currentUid : string , chat : ChatMessage}){
    const [senderType, setSenderType] =  React.useState<'me'|'other'|'sys'>('sys');
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
        
    },[])

    // Set justify of message position
    const spanCSS = {
        me : 'self-end text-end',
        other : 'justify-begin',
        sys : 'justify-center mx-20'
     }

    // Set Text CSS Setting for message
    const textCSS = {
        me : "bg-blue-500 dark:bg-blue-600 self-end",
        other : "",
        sys : "bg-gray-500 dark:bg-gray-600"
    }
    
    return (
        <span className={`flex mx-2 ${spanCSS[senderType]} max-w-[70%]`}>
            { /* Display Send Time for 'me' */
                senderType === "me" &&
                <p className='text-[0.6rem] self-end mr-1'>
                    {new Date(chat.createdAt as any).toLocaleTimeString()}
                </p>
            }
            <p className={`flex rounded-lg px-2 py-1 ${textCSS[senderType]} text-pretty`}>
                { /* Icon for System Message */ 
                    chat.createdBy === "System" 
                        && <InformationCircleIcon className='w-6 h-6'/> 
                }
                {chat.content}
            </p>
        </span>
    )
}