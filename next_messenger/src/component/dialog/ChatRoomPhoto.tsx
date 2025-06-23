"use client";

import React from 'react';
import { getChatRoomFile } from '../../controller/FirebaseController';
import { useAppSelector } from '../../redux/hooks';

export default function ChatRoomPhoto() {
    const [ fileStrings, setFileStrings ] = React.useState([]); 
    const chatSlice = useAppSelector((state)=> state.chatStore);
    const { chatId } = useAppSelector((state)=> state.dialogStore).extraData;

    React.useEffect(()=> {
        const files = chatSlice.messages.filter((msg)=> {
            return msg.attachYn == true
        })
        files.forEach(async(item)=> {
            const UUID = item.attachFile;
            const { result, value } = await getChatRoomFile(chatId, UUID);
            if(result) {
                //setFileStrings((prev)=> [...prev, value])
            }
        })
        console.log(fileStrings)
    },[]);

    

    return (
        <div>
            
        </div>
    )
}