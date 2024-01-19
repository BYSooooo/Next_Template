import React from 'react';

import { ChatRoomMenu } from './ChatRoomMenu';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRendering } from '@/redux/features/messengerReducer';
import { getSelectedChatInfo } from '../FirebaseController';
import { ChatRoomInfo, MessageInfo } from '../../../../msg_typeDef';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';

export function ChatRoomOption() {
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
        const resultArray : MessageInfo[] = []
        await getDocs(colRef).then((items)=> {
            items.forEach((message)=> {
                const item = message.data() as MessageInfo
                {item.attachedYn === true && resultArray.push(item)}
                
            })
        })
        setMessages(resultArray)
    }


    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex h-10 justify-between items-center p-2'>
                <h4 className='font-bold text-lg'>
                    Chat - Option
                </h4>
                <ChatRoomMenu />
            </div>
            <div className='p-1'>
                <h4>
                    Attached File
                </h4>
            </div>
            <div className='grid grid-cols-3 gap-3 overflow-y-scroll px-2'>
                {messages.map((item)=> {
                    return (
                        <img src={item.attachedValue} className='rounded-md w-20 h-20'/>
                    )
                })}
            </div>
            <div className='p-1'>
                <h4>
                    Messages Export
                </h4>
            </div>
            <button className='w-full rounded-lg border-2 border-solid border-green-600'>
                Export
            </button>
            <div>
                <button onClick={()=>onClickHandler("ok")}>
                    return
                </button>
            </div>
            
        </div>
    )
}