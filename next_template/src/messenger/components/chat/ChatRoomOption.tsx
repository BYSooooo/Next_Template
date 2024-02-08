import React from 'react';

import { ChatRoomMenu } from './ChatRoomMenu';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRendering } from '@/redux/features/messengerReducer';
import { AttachedInfo, ChatRoomInfo, MessageInfo } from '../../../../msg_typeDef';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { messageDown } from './messageDown';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { attachedDown, deleteAttachment, copyChatRoom, freezeChatRoom, getSelectedChatInfo, deleteChatRoom} from '../FirebaseController';


export function ChatRoomOption() {
    const [attached, setAttached] = React.useState<AttachedInfo[]>([])
    const [messages, setMessages] = React.useState<MessageInfo[]>([])
    const [chatRoomInfo, setChatRoomInfo] = React.useState<ChatRoomInfo>()
    const [freezeReqYn, setFreezeReqYn] = React.useState<"Request"|"Receive"|"">("")

    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        getChatRoomInfo()
        getMessagesList()
    },[])

    const onClickHandler = (select:string)=> {
        if(select === "ok") {
            dispatch(setPageRendering({middle : "ChatRoom"}))
        }
    }
    const getChatRoomInfo = async()=> {
        await getSelectedChatInfo(chatRoomReducer.uuid).then((response)=> {
            const result = response as ChatRoomInfo
            setChatRoomInfo(result)
            if(!result.active) {
                setFreezeReqYn(result.disableRequest === currentUserInfo.email ? 'Request' : 'Receive');
            }
        })
    }

    const getMessagesList = async()=> {
        const colRef = query(collection(firebaseStore,`chatList/${chatRoomReducer.uuid}/messages`),orderBy('createDate','asc'));
        onSnapshot(colRef,(snapShot)=> {
            let attachArray : AttachedInfo[] = []
            let messageArray : MessageInfo[] = []
            snapShot.docs.forEach((res)=> {
                const item = res.data() as AttachedInfo
                item.selectedYn = false
                {item.attachedYn === true && attachArray.push(item)}
                messageArray.push(item)
            })
            setAttached(attachArray)
            setMessages(messageArray)
        })
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

    const onClickDelete = (e: React.MouseEvent)=> {
        e.preventDefault()
        const selection = attached.filter((item)=>item.selectedYn === true);
        deleteAttachment(selection,chatRoomReducer.uuid);
    }

    const onClickDeleteChat = async(e: React.MouseEvent)=> {
        e.preventDefault();
        // Check Active
        const activeYn = chatRoomInfo?.active
        const freezeFn = async()=> await freezeChatRoom(chatRoomReducer.uuid,currentUserInfo.email)
            .then((result)=> {
                result && dispatch(setPageRendering({middle : "ChatRoom"}))
            });
        // Check Request User = currentUser
        // If it is an active chat room, request to freeze
        if(activeYn) {
            freezeFn()
        // If the room is frozen
        } else {
            chatRoomInfo.disableRequest === currentUserInfo.email
            // Unfreeze if the current user is the user who applied for freezing
            ?  freezeFn()
            //Delete a chat room if the current user has not applied for freezing
            : copyChatRoom(chatRoomInfo.uuid).then(async (response)=> {
                if(response){
                    const result = await deleteChatRoom(chatRoomInfo.uuid)
                    result === true && dispatch(setPageRendering({middle : "Null"}))
                    //Require Message Box
                    alert("ChatRoom Delete Success")
                }
            })
                
        }
    }

    const changeNotiText = ()=> {
        const check = chatRoomInfo?.active;    
        switch(check) {
            case true : 
                return (
                    <ul className='my-1 list-disc px-2'>
                        <li className='text-xs'>
                            Freeze a Chat. 
                        </li>
                        <li className='text-xs'>
                            Chat rooms will be frozen and unavailable.
                        </li>
                        <li className='text-xs'>
                            After being frozen, it is not possible to create a message, only view it.
                        </li>
                    </ul>
                )
            case false : 
                switch (freezeReqYn) {
                    case 'Request' : 
                    return (
                        <ul className='my-1 list-disc px-2'>
                            <li className='text-xs'>
                                Unfreeze a Chat.
                            </li>
                            <li className='text-xs'>
                                The chat room will be unfrozen and available again.
                            </li>
                        </ul>
                    )
                    case 'Receive' : 
                    return (
                        <ul className='my-1 list-disc px-2'>
                            <li className='text-xs'>
                                Accept Delete a Chat
                            </li>
                            <li className='text-xs'>
                                If you accept the request, the room will be permanently deleted.
                            </li>
                            <li className='text-xs'>
                                Please note that once a chat room is deleted, it cannot be recovered
                            </li>
                        </ul>
                    )
                }
                
        }
    }

    return (
        <div className='w-80 border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex w-72 h-10 justify-between items-center p-2'>
                <h4 className='font-bold text-lg'>
                    Chat - Option
                </h4>
                {chatRoomInfo?.active && <ChatRoomMenu />}
            </div>
            <div className='overflow-y-scroll h-96'>
            
            <div className='p-2 border-2 border-solid border-slate-600 rounded-md my-1'>
                <h4 className='font-bold text-sm'>
                    Attached File
                </h4>
                <div className='grid grid-cols-3 gap-3 overflow-y-scroll px-2'> 
                    {attached.map(item=> {
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
                    <button 
                        disabled={!chatRoomInfo?.active}
                        onClick={(e)=>onClickDelete(e)}
                        className='rounded-full border-2 border-solid border-red-500 hover:bg-red-500 hover:text-white disabled:border-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-neutral-900 transition duration-200'>
                        Delete
                    </button>
                    <button onClick={()=>onClickDownload()}
                        className='rounded-full border-2 border-solid border-blue-500 hover:bg-blue-500 hover:text-white transition duration-200'>
                        Download
                    </button>
                    
                </div>
            </div>
            
            <div className='p-2 border-2 border-solid border-slate-600 rounded-md my-1'>
                <h4 className='font-bold text-sm mb-1'>
                    Messages Export
                </h4>
                <ul className='my-1 list-disc px-2'>
                    <li className='text-xs'>
                        You can export Messages.
                    </li>
                    <li className='text-xs'>
                        Attachments are not saved.
                    </li>
                    
                </ul>
                <div className='grid grid-cols-2 gap-2'>
                    <button className='w-full rounded-full border-2 border-solid border-gray-500 hover:bg-gray-500 hover:text-white transition duration-200'
                            onClick={(e)=>exportToText(e)}>
                        Text
                    </button>
                    <button className='w-full rounded-full border-2 border-solid border-green-600 hover:bg-green-600 hover:text-white transition duration-200'
                            onClick={(e)=>exportToCsv(e)}>
                        CSV
                    </button>
                </div>  
            </div>
            <div className='p-2 border-2 border-solid border-slate-600 rounded-md my-1'>
                <h4 className='font-bold text-sm mb-1'>
                    ChatRoom Freeze
                </h4>
                {changeNotiText()}
                <button 
                    className='w-full border-2 border-solid rounded-full border-purple-500 hover:bg-purple-500 transition duration-200 hover:text-white'
                    onClick={(e)=>onClickDeleteChat(e)}>
                    {chatRoomInfo?.active 
                        ? 'Freeze' 
                        : freezeReqYn === 'Request' 
                            ? 'Freeze Cancel'
                            : 'Delete' 
                    }
                </button>
            </div>
            
            </div>
            <div className='mt-1'>
                <button className='w-full border-2 border-solid border-slate-500 rounded-full hover:bg-slate-500 hover:text-white transition duration-200'
                    onClick={()=>onClickHandler("ok")}>
                    return
                </button>
            </div>
            
        </div>
    )
}