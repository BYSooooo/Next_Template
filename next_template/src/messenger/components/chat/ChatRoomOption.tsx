import React from 'react';

import { ChatRoomMenu } from './ChatRoomMenu';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRendering } from '@/redux/features/messengerReducer';
import { AttachedInfo, MessageInfo } from '../../../../msg_typeDef';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { messageDown } from './messageDown';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { attachedDown, deleteAttachment } from '../FirebaseController';



export function ChatRoomOption() {
    const [attached, setAttached] = React.useState<AttachedInfo[]>([])
    const [messages, setMessages] = React.useState<MessageInfo[]>([]) 

    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        getMessagesList()
    },[])

    const onClickHandler = (select:string)=> {
        if(select === "ok") {
            dispatch(setPageRendering({middle : "ChatRoom"}))
        }
    }

    const getMessagesList = async()=> {
        const colRef = query(collection(firebaseStore,`chatList/${chatRoomReducer.uuid}/messages`),orderBy('createDate','asc'));
        const attachArray : AttachedInfo[] = []
        const messageArray : MessageInfo[] = []
        await getDocs(colRef).then((items)=> {
            items.forEach((message)=> {
                const item = message.data() as AttachedInfo
                item.selectedYn = false
                {item.attachedYn === true && attachArray.push(item)}
                messageArray.push(item)
            })
        })
        setAttached(attachArray)
        setMessages(messageArray)
    }

    const exportToText = (e :React.MouseEvent)=> {
        e.preventDefault()
        const array = [];
        messages.map((item)=> {
            const context = {
                time : item.createDate.toDate().toLocaleString(),
                sender : item.author,
                message : item.message,
                attached : item.attachedYn,
                attachedName : item.attachedName
            }
            array.push(context)
        })
        messageDown(JSON.stringify(array,null,"\t"),`export_msg_${new Date().toLocaleDateString()}.txt`,'text/txt')            
    }

    const exportToCsv = (e: React.MouseEvent) => {
        e.preventDefault();
        const headers = ['Time,Sender,Message,Attached,AttachedName'];
        const csvContext = messages.reduce((acc,msg)=> {
            const {createDate,author, message, attachedYn, attachedName } = msg            
            acc.push([createDate.toDate().toLocaleString(),author, message, attachedYn, attachedName].join(','))
            return acc
        },[])
        messageDown([...headers, ...csvContext].join('\n'), `export_msg_${new Date().toLocaleDateString()}.csv`,'text/csv')   
    }

    const onClickAttached = (e: React.MouseEvent, selected : AttachedInfo)=> {
           e.preventDefault();
           const changeArray = attached.map((attached)=> {
                if(attached.UUID === selected.UUID) {
                    attached.selectedYn = !attached.selectedYn   
                }
                return attached
           })
           setAttached(changeArray)
    }
    
    const onClickDownload = ()=> {
        const selection = attached.filter((item)=> item.selectedYn === true)
        const result = attachedDown(selection,chatRoomReducer.uuid)
        if(result) {
            const initArray = attached.map((item)=> {
                item.selectedYn = false
                return item;
            })   
            setAttached(initArray)
        }
    }

    const onClickDelete = ()=> {
        const selection = attached.filter((item)=>item.selectedYn === true);
        const result = deleteAttachment(selection,chatRoomReducer.uuid)
        if(result) getMessagesList()
    }

    return (
        <div className='w-80 border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex w-72 h-10 justify-between items-center p-2'>
                <h4 className='font-bold text-lg'>
                    Chat - Option
                </h4>
                <ChatRoomMenu />
            </div>
            <div className='p-2 border-2 border-solid border-slate-600 rounded-md my-1'>
                <h4 className='font-bold text-sm'>
                    Attached File
                </h4>
                <div className='grid grid-cols-3 gap-3 overflow-y-scroll px-2'>
                    {attached.map((item)=> {
                        return (
                            <div key={item.UUID} 
                                className='relative cursor-pointer hover:opacity-60'
                                onClick={(e)=>onClickAttached(e,item)}>
                                <div className='absolute right-2 top-1'>
                                    {item.selectedYn 
                                    ?   <CheckCircleIcon className='w-4 h-4 fill-green-600 stroke-white stroke-2'/> 
                                    :   <span className='w-4 h-4 border-white inline-block border-2 border-solid rounded-full'/>}
                                </div>
                                <img src={item.attachedValue} className='rounded-md w-20 h-20'/>
                            </div>
                        )
                    })}
                </div>
                <div className='grid grid-cols-2 my-2 gap-2'>
                    <button onClick={()=>onClickDelete()}
                        className='rounded-full border-2 border-solid border-red-500 hover:bg-red-500 transition duration-200'>
                        Delete
                    </button>
                    <button onClick={()=>onClickDownload()}
                        className='rounded-full border-2 border-solid border-blue-500 hover:bg-blue-500 transition duration-200'>
                        Download
                    </button>
                    
                </div>
            </div>
            
            <div className='p-2 border-2 border-solid border-slate-600 rounded-md my-1'>
                <h4 className='font-bold text-sm mb-1'>
                    Messages Export
                </h4>
                <div className='my-1'>
                    <h4 className='text-xs'>
                        You can export Messages.
                    </h4>
                    <h4 className='text-xs'>
                        Attachments are not saved.
                    </h4>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <button className='w-full rounded-full border-2 border-solid border-gray-500'
                            onClick={(e)=>exportToText(e)}>
                        Text
                    </button>
                    <button className='w-full rounded-full border-2 border-solid border-green-600'
                            onClick={(e)=>exportToCsv(e)}>
                        CSV
                    </button>
                </div>  
            </div>
                
            <div>
                <button className='w-full border-2'
                    onClick={()=>onClickHandler("ok")}>
                    return
                </button>
            </div>
            
        </div>
    )
}