"use client";

import React from 'react';
import { delChatRoomFile, getChatRoomFile } from '../../controller/FirebaseController';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { controlDialog, controlMessageToast } from '../../redux/features';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function ChatRoomPhoto() {
    const [ fileStrings, setFileStrings ] = React.useState([]); 
    const chatSlice = useAppSelector((state)=> state.chatStore);
    const { chatId } = useAppSelector((state)=> state.dialogStore).extraData;
    const dispatch = useAppDispatch();

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
        if(checkedImage.length > 0) {
            for(const item of checkedImage) {
            const { result, value } = await delChatRoomFile(chatId, item.uuid);
            if(result) {
                dispatch(controlDialog({ openYn : false, title: "", contentName : "", size : ""}));
                dispatch(controlMessageToast({ openYn : true, type : 'confirm', title : "Success", content : "File Delete Complete"}))
            } else {
                dispatch(controlMessageToast({ openYn : true, type: 'error', title : 'Delete Error', content : value }))
            }
        }
        } else {
            dispatch(controlMessageToast({ openYn : true, type : 'error', title : 'Error', content : 'Select one or more files that you want to delete.'}))
        }
        
    }

    return (
        <div className='flex flex-col gap-3'>
            { fileStrings.length > 0 
                ? 
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
                :   <div className='flex flex-col min-w-52 min-h-52 text-center justify-center items-center'>
                        <ExclamationCircleIcon className='w-20 h-20'/>
                        <p>
                            No File
                        </p>
                    </div>
            }
            
            <div>

            </div>
            { fileStrings.length > 0 &&
                <div className='flex flex-row gap-2 justify-end'>
                <button
                    onClick={onClickDelete} 
                    className='default-button p-1 w-[50%] justify-center'>
                    Delete
                </button>
            </div>
            }
        </div>
        
    )
}