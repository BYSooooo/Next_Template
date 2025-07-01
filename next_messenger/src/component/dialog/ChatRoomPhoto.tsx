"use client";

import React from 'react';
import { delChatRoomFile, getChatRoomFile, setChatRoomFile } from '../../controller/FirebaseController';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ChatMessage } from '../../../typeDef';
import { controlMessageToast } from '../../redux/features';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

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
                    tempArray.push({string : value, checkYn : false, uuid: UUID});
                } else {
                    dispatch(controlMessageToast({ openYn : true, title : 'Error', type : 'error', content : 'Error Occured during Attach File'}))
                }
            } 
            setFileStrings(tempArray);   
        }
        getFileStrings()
    },[]);

    const onClickImage = (file : {string : string, checkYn : boolean})=> {
        const fileArr = fileStrings.map((item)=> {
            if(item.string == file.string) {
                return { ...item, checkYn : !item.checkYn}
            } else {
                return item
            }
        });
        setFileStrings(fileArr);
    };

    const onClickDelete = async() => {

        const checkedImage = fileStrings.filter((item)=> item.checkYn === true);
        for(const item of checkedImage) {
            console.log(item.uuid)
            const { result, value } = await delChatRoomFile(chatId, item.uuid);
        }
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='grid grid-flow-row grid-cols-3 gap-2 '>
                { fileStrings.length > 0 &&
                    fileStrings.map((file)=> {
                        return (
                            <div
                                key={file.string}
                                onClick={()=>onClickImage(file)} 
                                className='relative w-20 h-20 cursor-pointer group rounded-md'>
                                { file.checkYn 
                                    ?   <CheckCircleIcon className='absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full'/>
                                    :   <div className='absolute top-1 right-1 w-5 h-5 rounded-full stroke-white border-2'/>
                                }
                                
                                <img 
                                    key={file.string} 
                                    src={file.string} 
                                    className='w-20 h-20 overflow-hidden rounded-md hover:opacity-50'
                                />
                            </div>
                        )                        
                    })                
                }
            </div>
            <div>

            </div>
            <div className='flex flex-row gap-2 justify-end'>
                <button
                    onClick={onClickDelete} 
                    className='default-button p-1 w-[50%] justify-center'>
                    Delete
                </button>
            </div>
        </div>
        
    )
}