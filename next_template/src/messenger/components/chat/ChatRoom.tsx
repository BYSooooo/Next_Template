import React from 'react'

import { useAppSelector } from '@/redux/hook'
import { getChatCollection } from '../FirebaseController';
import { MessageInfo } from '../../../../msg_typeDef';
import { WriteMessage } from '../board/WriteMessage';


export function ChatRoom() {
    const [messageList, setMessageList] = React.useState<MessageInfo[]>([])
    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);

    React.useEffect(()=> {
        getMessageList()
    },[chatRoomReducer.chatListUUID])

    const getMessageList = async() => {
        await getChatCollection(chatRoomReducer.chatListUUID).then((result)=> {
            setMessageList(result)
        })
    }

    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            {messageList.length === 0 
            ?
            <h4 className='font-bold text-lg'>
                No Message
            </h4> 
            : 
            <h4>
                have Message
            </h4>}
            <WriteMessage />
        </div>
    )
}