"use client"

import React from 'react';

import { ChatMessage } from "../../typeDef";
import { InformationCircleIcon } from '@heroicons/react/24/solid';

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
    const senderHandler = () => {
        switch(senderType){
            case 'me' : 
                return 'justify-end'
            case 'other' : 
                return 'justify-begin'
            case 'sys' : 
                return 'justify-center'
        }
    };

    
    return (
        <div className={`flex mx-2 ${senderHandler()} px-20`}>
            <p className='default-chat-item'>
            { chat.createdBy === "System" 
                && <InformationCircleIcon className='w-6 h-6'/>}
                {chat.content}
            </p>
        </div>
    )
}