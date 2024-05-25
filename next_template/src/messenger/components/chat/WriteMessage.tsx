import React from 'react'

import { Timestamp } from 'firebase/firestore';
import { DocumentIcon, DocumentPlusIcon } from '@heroicons/react/20/solid'
import { v4 as uuidv4 } from 'uuid';
import { sendChatAttachedFile, sendChatMessage } from '../FirebaseController';
import { firebaseAuth } from '../../../../firebaseConfig';
import { MessageInfo } from '../../../../msg_typeDef';

export function WriteMessage({ chatUUID, attachedYn} : {chatUUID : string, attachedYn : Function }) {
    const [msgContext, setMsgContext] = React.useState("")
    const [attachedFile, setAttachedFile] = React.useState<{name: string, type:string, value: string} | null>(null);

    const onClick = async() => {
        const uid = uuidv4();
        const message : MessageInfo = {
            UUID : uid,
            message : msgContext,
            viewYn : false,
            createDate : Timestamp.fromDate(new Date()),
            attachedYn : attachedFile ? true : false,
            attachedName : attachedFile ? attachedFile.name : null,
            attachedType : attachedFile ? attachedFile.type : null,
            attachedValue : attachedFile ? attachedFile.value : null,
            author : firebaseAuth.currentUser.email
        }
        if(message.message.length === 0 && message.attachedYn === false) {
            // have to Add Check Logic
            return alert("No Context");
            
        } else {
            if(attachedFile) {
                await sendChatAttachedFile(attachedFile,chatUUID,uid).then((result)=> {
                    message.attachedValue = result
                })
            } 
            await sendChatMessage(chatUUID,message).then(()=> {
                setMsgContext("")
                setAttachedFile(null)
                attachedYn(false)
            })
        }
        
        
    }

    const tempFileHandler = (event : React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } } = event;
        const uploaded = files[0]
        const reader = new FileReader()
        reader.onloadend = (finished : any)=> {
            const { currentTarget : { result }} = finished;
            setAttachedFile({name : uploaded.name, type: uploaded.type ,value:result})
            attachedYn(true)
        }        
        reader.readAsDataURL(uploaded)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMsgContext(value)
    }

    const previewHandler = () => {
        if(attachedFile.type.includes('image')) {
            return (    
                <div className='flex flex-col w-20 h-fit items-center'>
                    <div className='w-fit h-fit rounded-md bg-black'>
                        <img src={attachedFile?.value} 
                            className=' w-20 h-20 rounded-md border-none bg-opacity-0 cursor-pointer hover:opacity-50'
                            onClick={()=> { 
                                setAttachedFile(null)
                                attachedYn(false) }}
                        />
                    </div>
                    <h4 className='text-sm flex-nowrap overflow-ellipsis'>
                        {attachedFile.name}
                    </h4>
                </div>
            )
        } else {
            return (
                <div className='flex flex-col w-fit h-fit items-center'>
                    <DocumentIcon className='w-10 h-10'/>
                    <h4 className='text-sm overflow-ellipsis'>
                        {attachedFile.name}
                    </h4>
                </div>
            )
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent)=> {event.key === "Enter" && onClick()}
    
    
    return (
        <div className='p-2 rounded-lg bg-slate-300 dark:bg-slate-500 '>
            {attachedFile && 
                <div className='flex flex-col justify-center'>
                    <h4 className='text-sm'>
                        Attached File
                    </h4>
                    <div className='overflow-x-scroll'>
                        {attachedFile.name.length > 0 && previewHandler()}
                    </div>
                </div>
            }
            <div className='flex gap-1'>
                <input
                    onKeyDown={handleKeyDown}
                    onChange={onChangeHandler} 
                    className='input-style w-fit' 
                    placeholder='Enter a message...'
                    value={msgContext}/>
                <button 
                    className='btn-primary'
                    onClick={onClick}>
                        <h1 className='text-sm'>
                            Send
                        </h1>
                </button>
                <DocumentPlusIcon 
                    className='w-8 h-8 text-green-400 hover:text-green-600 transition duration-200 cursor-pointer'
                    onClick={()=>document.getElementById('tempAttach').click()}/>            
                <input type='file' id='tempAttach' accept='image/*' onChange={(e)=>tempFileHandler(e)} style={{display : 'none'}}/>
            </div>
        </div>
    )
}