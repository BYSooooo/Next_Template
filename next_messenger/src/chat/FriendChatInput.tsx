"use client";

import React from 'react';
import { setChatRoomMessage } from '../controller/FirebaseController';
import { firebaseAuth } from '../../firebase-config';
import { useAppDispatch } from '../redux/hooks';
import { controlMessageToast } from '../redux/features';
import { DocumentIcon } from '@heroicons/react/24/solid';

export function FriendChatInput({chatId} : {chatId : string}) {
    const [inputValue, setInputValue] = React.useState("");
    const [ attachFile, setAttachFile] = React.useState<{name:string, type : string, value: string} | null>(null);
    const [attachYn, setAttachYn] = React.useState(false);
    const dispatch = useAppDispatch();
    const currentUid = firebaseAuth.currentUser.uid;
    React.useEffect(()=> {
        setAttachFile(null);
    },[])

    const onClickSendMessage = ()=> {
        sendMessage()        
    }

    const inputCss = { attachTrue : 'h-[10rem]', attachFalse : 'h-[3rem]'};

    const attachFileHandler = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } } = event;
        const uploaded = files[0]
        if(uploaded.size <= 1048576) {
            const reader = new FileReader();
            reader.onloadend = (finished: any)=> {
                const { currentTarget : { result } } = finished;
                setAttachFile({ name : uploaded.name, type: uploaded.type, value : result});
            }
            reader.readAsDataURL(uploaded);
            
        } else {
            dispatch(controlMessageToast({ openYn: true, type: "error", title : "File Upload Error", content : "File Size exceed 1MB"}))
        }
    }


    const sendMessage = async()=> {
        const { result, value } = await setChatRoomMessage(chatId,inputValue,false,"",currentUid);
        if(result){
            setInputValue("");
        } else {
            dispatch(controlMessageToast({openYn : true, type : 'error', title : 'Error', content : value}))
        }
    }

    const previewHandler = ()=> {
        if(attachFile.type.includes('image')) {
            return (
                <div className='flex w-20 h-fit items-center'>
                    <div className='w-fit h-fit rounded-md bg-black'>
                        <img 
                            src={attachFile?.value}
                            className='w-20 h-20 rounded-md border-none bg-opacity-0 cursor-pointer hover:opacity-50'
                            onClick={()=> {
                                setAttachFile(null)
                                
                            }}
                        />
                    </div>
                    <h1 className='text-sm flex-nowrap overflow-ellipsis'>
                        {attachFile.name}
                    </h1>
                </div>
            )
        } else {
            return (
                <div className='flex flex-col w-fit h-fit items-center'>
                    <DocumentIcon className='w-10 h-10'/>
                    <h1 className='text-sm overflow-ellipsis'>
                        {attachFile.name}
                    </h1>
                </div>
            )
        }
    }

    return (
        <div className={`chat-input-box ${inputCss[attachFile ? 'attachTrue' : 'attachFalse']}
            flex flex-col w-[40rem] ml-1 
            justify-center`}>
            { attachFile && 
                <div className='flex flex-col items-start p-2'>
                    <h1 className='text-sm'>
                        Attached File
                    </h1>
                    <div className='flex flex-rows'>
                        {attachFile.name.length > 0 && previewHandler()}
                    </div>
                </div>
            }
            <div className='flex flex-row p-2 gap-2'>
                <input
                disabled={chatId === ""}
                onKeyDown={(e)=> e.key === 'Enter' && onClickSendMessage()}
                onChange={(e)=>setInputValue(e.target.value)}
                value={inputValue} 
                className="default-input w-[80%]">
            </input>
            <button
                disabled={chatId === ""}
                onClick={()=> document.getElementById('tempAttach').click()} 
                className="default-button w-[10%] justify-center dark:bg-green-700">
                Image
            </button>
            <input type="file" id="tempAttach" accept='image/*' onChange={(e)=>attachFileHandler(e)} style={{display : 'none'}}/>
            <button 
                disabled={chatId === ""}
                onClick={onClickSendMessage}
                className="default-button w-[7%] justify-center dark:bg-blue-500">
                Send
            </button>
            </div>
            
        </div>
    )
}