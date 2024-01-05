import React from 'react'

import { DocumentIcon, DocumentPlusIcon } from '@heroicons/react/20/solid'
import { sendMessage } from '../FirebaseController';
import { MessageInfo } from '../../../../msg_typeDef';

export function WriteMessage({chatUUID} : {chatUUID : string}) {
    const [sendMessage, setSendMessage] = React.useState<MessageInfo>()
    const [msgContext, setMsgContext] = React.useState("")
    const [attachedFile, setAttachedFile] = React.useState<{name : string, value: string}>();
    const [fileType, setFileType] = React.useState("");
    
    const onClick = () => {
            
    }
    const tempFileHandler = (event : React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } } = event;
        const uploaded = files[0]
        const reader = new FileReader()
        reader.onloadend = (finished : any)=> {
            const { currentTarget : { result }} = finished;
            setAttachedFile({name : uploaded.name, value:result})
        }
        setFileType(uploaded.type);
        
        reader.readAsDataURL(uploaded)
    }

    const previewHandler = () => {
        if(fileType.includes('image')) {
            return (    
                <div className='flex flex-col w-20 h-fit items-center'>
                    <div className='w-fit h-fit rounded-md bg-black'>
                        <img src={attachedFile?.value} 
                            className=' w-20 h-20 rounded-md border-none bg-opacity-0 cursor-pointer hover:opacity-50'
                            onClick={()=> { 
                                setAttachedFile({name : "", value: ""})
                                setFileType("")
                                }}/>
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
        <div className='p-2 bg-slate-200 rounded-lg'>
            {attachedFile?.name.length > 0 && 
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
                    onChange={(e)=>setMsgContext(e.target.value)} 
                    className='rounded-md border-2 border-slate-500 px-2' 
                    placeholder='Enter a message...'
                    value={sendMessage.message}/>
                <button 
                    className='px-2 rounded-md border-none bg-blue-400 text-white hover:bg-blue-600 transition duration-200'
                    onClick={onClick}>
                    Send
                </button>
                <DocumentPlusIcon 
                    className='w-8 h-8 text-green-400 hover:text-green-600 transition duration-200 cursor-pointer'
                    onClick={()=>document.getElementById('tempAttach').click()}/>            
                <input type='file' id='tempAttach' accept='image/*' onChange={(e)=> tempFileHandler(e)} style={{display : 'none'}}/>
            </div>
        </div>
    )
}