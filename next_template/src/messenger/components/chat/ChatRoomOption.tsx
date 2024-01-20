import React from 'react';

import { ChatRoomMenu } from './ChatRoomMenu';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRendering } from '@/redux/features/messengerReducer';
import { getSelectedChatInfo } from '../FirebaseController';
import { ChatRoomInfo, MessageInfo } from '../../../../msg_typeDef';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { messageDown } from './messageDown';

export function ChatRoomOption() {
    const [attached, setAttached] = React.useState<MessageInfo[]>([])
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
        const attachArray : MessageInfo[] = []
        const messageArray : MessageInfo[] = []
        await getDocs(colRef).then((items)=> {
            items.forEach((message)=> {
                const item = message.data() as MessageInfo
                {item.attachedYn === true && attachArray.push(item)}
                messageArray.push(item)
            })
        })
        setAttached(attachArray)
        setMessages(messageArray)
    }

    const exportToText = (e :React.MouseEvent)=> {
        e.preventDefault();
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
        messageDown(JSON.stringify(array,null,"\t"),'test.txt','text/txt')            
    }

    const exportToCsv = (e: React.MouseEvent) => {
        e.preventDefault();
        const headers = ['Time,Sender,Message,Attached,AttachedName'];
        const csvContext = messages.reduce((acc,msg)=> {
            const {createDate,author, message, attachedYn, attachedName } = msg            
            acc.push([createDate.toDate().toLocaleString(),author, message, attachedYn, attachedName].join(','))
            return acc
        },[])
        messageDown([...headers, ...csvContext].join('\n'), 'text.csv','text/csv')   
    }

    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex w-72 h-10 justify-between items-center p-2'>
                <h4 className='font-bold text-lg'>
                    Chat - Option
                </h4>
                <ChatRoomMenu />
            </div>
            <div className='p-1 border-2 border-solid border-slate-600 rounded-md my-1'>
                <h4 className='font-bold text-sm'>
                    Attached File
                </h4>
                <div className='grid grid-cols-3 gap-3 overflow-y-scroll px-2'>
                    {attached.map((item)=> {
                        return (
                            <img src={item.attachedValue} className='rounded-md w-20 h-20'/>
                        )
                    })}
                </div>
            </div>
            
            <div className='p-1 border-2 border-solid border-slate-600 rounded-md my-1'>
                <h4 className='font-bold text-sm'>
                    Messages Export
                </h4>
                <h4 className='text-xs'>
                    You can save your conversations.
                </h4>
                <h4 className='text-xs'>
                    You can check the conversation content, creation time, and author.
                </h4>
                <h4 className='text-xs'>
                    Attachments are not saved.
                </h4>
                <div className='grid grid-cols-2 gap-2'>
                    <button className='w-full rounded-lg border-2 border-solid border-green-600'
                            onClick={(e)=>exportToText(e)}>
                        Text
                    </button>
                    <button className='w-full rounded-lg border-2 border-solid border-green-600'
                            onClick={(e)=>exportToCsv(e)}>
                        CSV
                    </button>
                </div>  
            </div>
                
            <div>
                <button onClick={()=>onClickHandler("ok")}>
                    return
                </button>
            </div>
            
        </div>
    )
}