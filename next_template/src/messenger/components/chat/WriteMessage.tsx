import React from 'react'

import { DocumentIcon, DocumentPlusIcon } from '@heroicons/react/20/solid'
import { Timestamp } from 'firebase/firestore';
import { firebaseAuth } from '../../../../firebaseConfig';
import { sendChatMessage } from '../FirebaseController';
import { MessageInfo } from '../../../../msg_typeDef';

export function WriteMessage({ chatUUID, writeDate} : {chatUUID : string, writeDate : string }) {
    const [msgContext, setMsgContext] = React.useState("")
    const [attachedFile, setAttachedFile] = React.useState<{name: string, type:string, value: string} | null>(null);

    const onClick = async() => {
        const message : MessageInfo = {
            UUID : 'msg_' + writeDate,
            message : msgContext,
            viewYn : false,
            createDate : Timestamp.fromDate(new Date()),
            attachedYn : attachedFile ? true : false,
            attachedName : attachedFile ? attachedFile.name : null,
            attachedType : attachedFile ? attachedFile.type : null,
            attachedValue : attachedFile ? attachedFile.value : null,
            author : firebaseAuth.currentUser.email
        }
        await sendChatMessage(chatUUID,message).then(()=> {
            setMsgContext("")
        })
        
    }

    const tempFileHandler = (event : React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } } = event;
        const uploaded = files[0]
        const reader = new FileReader()
        reader.onloadend = (finished : any)=> {
            const { currentTarget : { result }} = finished;
            setAttachedFile({name : uploaded.name, type: uploaded.type ,value:result})
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
                            onClick={()=> { setAttachedFile(null)}}/>
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
    
    return (
        <div className='h-30 p-2 bg-slate-200 rounded-lg'>
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
                    onChange={onChangeHandler} 
                    className='rounded-md border-2 border-slate-500 px-2' 
                    placeholder='Enter a message...'
                    value={msgContext}/>
                <button 
                    className='px-2 rounded-md border-none bg-blue-400 text-white hover:bg-blue-600 transition duration-200'
                    onClick={onClick}>
                    Send
                </button>
                <DocumentPlusIcon 
                    className='w-8 h-8 text-green-400 hover:text-green-600 transition duration-200 cursor-pointer'
                    onClick={()=>document.getElementById('tempAttach').click()}/>            
                <input type='file' id='tempAttach' accept='image/*' onChange={(e)=>tempFileHandler(e)} style={{display : 'none'}}/>
            </div>
        </div>
    )
}