"use client";

import React from 'react';
import { getChatRoomFile } from '../../controller/FirebaseController';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ChatMessage } from '../../../typeDef';
import { controlMessageToast } from '../../redux/features';

export default function ChatRoomPhoto() {
    const [ fileStrings, setFileStrings ] = React.useState([]); 
    const chatSlice = useAppSelector((state)=> state.chatStore);
    const dispatch = useAppDispatch();
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
                    dispatch(controlMessageToast({ openYn : true, title : 'Error', type : 'error', content : 'Error Occured during Attach File'}))
                }
            } 
            setFileStrings(tempArray);   
        }
        getFileStrings()
    },[]);

    const onClickImage = ()=> {
        alert("Hello")
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='grid grid-flow-row grid-cols-3 gap-2 '>
                { fileStrings.length > 0 &&
                    fileStrings.map((string)=> {
                        return (
                            <div
                                key={string}
                                onClick={onClickImage} 
                                className='relative w-20 h-20 cursor-pointer group rounded-md'>
                                <div className='absolute top-1 right-1 w-5 h-5 rounded-full stroke-white border-4'/>
                                
                                <img 
                                    key={string} 
                                    src={string} 
                                    className='w-20 h-20 overflow-hidden rounded-md hover:opacity-50'
                                />
                            </div>
                        )                        
                    })                
                }
            </div>
            <div>

            </div>
            <div className='flex flex-row gap-2'>
                <button className='default-button p-1 w-[50%] text-center'>
                    <p>
                        View
                    </p>
                </button>
                <button className='default-button p-1 w-[50%] '>
                    Delete
                </button>
            </div>
        </div>
        
    )
}