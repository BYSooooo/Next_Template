"use client";

import React from 'react';
import { getChatRoomFile } from '../../controller/FirebaseController';


export default function ChatRoomArchive({chatId, uuid} : {chatId : string, uuid : string}) {
    const [ fileStrings, setFileStrings ] = React.useState(); 

    React.useEffect(()=> {
        
    },[])

    const fileList = async() => {
        const { result, value } = await getChatRoomFile(chatId, uuid);
        if(result) {
            
        }
    }

    return (
        <div>
            This is Chat Room Archive
        </div>
    )
}