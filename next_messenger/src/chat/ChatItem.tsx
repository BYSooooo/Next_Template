"use client"

import React from 'react';

import { ChatMessage } from "../../typeDef";

export default function ChatItem({currentUid, chat} : {currentUid : string , chat : ChatMessage}){
    const [senderType, setSenderType] =  React.useState<'me'|'other'|'sys'>('sys');
    React.useEffect(()=> {
        switch(chat.createdBy) {
            case 'system' : 
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
                return 'justify-center bg-black'
        }
            
    }
    
    return (
        <div className={`${senderHandler}`}>
            <p>
                {chat.content}
            </p>
        </div>
    )
}