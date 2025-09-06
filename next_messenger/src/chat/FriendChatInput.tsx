"use client";

import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { controlMessageToast } from '../redux/features';
import { DocumentIcon } from '@heroicons/react/24/solid';
import { setChatRoomFile, setChatRoomMessage } from '../firebase/Chat';

export function FriendChatInput({chatId} : {chatId : string}) {
    const [inputValue, setInputValue] = React.useState("");
    const [ attachFile, setAttachFile] = React.useState<{name:string, type : string, value: string} | null>(null);
    const [attachYn, setAttachYn] = React.useState(false);
    const dispatch = useAppDispatch();
    React.useEffect(()=> {
        setAttachFile(null);
    },[])

    const onClickSendMessage = async()=> {
        if(attachYn) {
            const { result, value } = await setChatRoomFile(chatId, attachFile);
            if(result) {
                sendMessage(value)
                setAttachFile(null)
            } else {
                dispatch(controlMessageToast({ openYn : true, type : 'error', title : 'Error', content : value}))
            }
        } else {
            sendMessage(null);
        }
    }

    const inputCss = { attachTrue : 'h-[10rem]', attachFalse : 'h-[3rem]'};

    const attachFileHandler = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } } = event;
        const uploaded = files[0]
        if(uploaded.size <= 1048576) {
            const reader = new FileReader();
            reader.onloadend = (finished: any)=> {
                const { currentTarget : { result } } = finished;
                setAttachYn(true);
                setAttachFile({ name : uploaded.name, type: uploaded.type, value : result});
            }
            reader.readAsDataURL(uploaded);
            
        } else {
            dispatch(controlMessageToast({ openYn: true, type: "error", title : "File Upload Error", content : "File Size exceed 1MB"}))
        }
    }


    const sendMessage = async(fileUid : string | null)=> {
        const data = {
            chatId : chatId,
            content : inputValue,
            attachYn : fileUid ? true : false,
            attachFile : fileUid ? fileUid : "",
            deleteYn : false
        }
        
        const { result, value } = await setChatRoomMessage(data.chatId, data.content, data.attachYn, data.attachFile, data.deleteYn);
        if(result){
            setInputValue("");
        } else {
            dispatch(controlMessageToast({openYn : true, type : 'error', title : 'Error', content : value}))
        }
    }

    const previewHandler = ()=> {
        if(attachFile.type.includes('image')) {
            return (
                <div className='flex flex-row w-fit h-fit items-center'>
                    <div className='w-fit h-fit rounded-md bg-black'>
                        <img 
                            src={attachFile?.value}
                            className='w-14 h-14 rounded-md border-none bg-opacity-0 cursor-pointer hover:opacity-50'
                            onClick={()=> {
                                setAttachFile(null)
                                
                            }}
                        />
                    </div>
                    <div className='flex flex-col items-start ml-2'>
                        <p className='text-md'>{`Name : ${attachFile.name}`}</p>
                        <p className='text-sm'>{attachFile.type}</p>
                    </div>
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
                <div className='flex flex-col items-start px-2'>
                    <div className='p-1'>
                        <h1 className='text-sm'>
                            Attached File
                        </h1>
                    </div>
                    <div>
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