"use client";

import React from 'react';
import { getChatRoomFile } from '../../controller/FirebaseController';

export default function ChatRoomPhoto({chatId, attach} : {chatId : string, attach : any[]}) {
    const [ fileStrings, setFileStrings ] = React.useState(); 

    React.useEffect(()=> {
        
    },[]);

    const getFile = async(attachFile : string)=> {
        //const { result, value } = await getChatRoomFile()
    }

    return (
        <div>
            {/* { attach.map((item)=> {
                return <img key={item.cratedAt} src={await getChatRoomFile(item.attachFile)}/>
            })} */}
        </div>
    )
}