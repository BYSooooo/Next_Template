"use client";

import React from 'react';
import { getChatRoomFile } from '../../controller/FirebaseController';
import { useAppSelector } from '../../redux/hooks';
import { ChatMessage } from '../../../typeDef';

export default function ChatRoomPhoto() {
    const [ fileStrings, setFileStrings ] = React.useState([]); 
    const chatSlice = useAppSelector((state)=> state.chatStore);
    const { chatId } = useAppSelector((state)=> state.dialogStore).extraData;

    React.useEffect(()=> {
        const files = chatSlice.messages.filter((msg)=> {
            return msg.attachYn == true
        })
        const tempArray = [];
        const getFileStrings = async()=> {
            for(const item of files) {
                const UUID = item.attachFile;
                
                const { result, value } = await getChatRoomFile(chatId, UUID);
                if(result) {
                    tempArray.push(value)
                } else {
                    
                }
            } 
            setFileStrings(tempArray);   
        }
        getFileStrings()
    },[]);

    
    

    return (
        <div className='flex gap-2 '>
            { fileStrings.length > 0 &&
                fileStrings.map((string)=> {
                    return <img key={string} src={string} className='w-20 h-20 rounded-md'/>
                })                
            }
        </div>
    )
}