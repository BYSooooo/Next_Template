import React from 'react'

import { useAppSelector } from '@/redux/hook'
import { getMessageInChat } from '../FirebaseController';
import { MessageInfo } from '../../../../msg_typeDef';
import { WriteMessage } from './WriteMessage';

export function ChatRoom() {
    const [messageList, setMessageList] = React.useState<MessageInfo[]>([])
    const [currentDate, setCurrentDate] = React.useState("")
    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);

    React.useEffect(()=> {
        getMessageList()
        getLastCount()
    },[chatRoomReducer.chatListUUID])

    /* set onSnapshot() for messages Collection in chatList Document */
    const getMessageList = async() => {
        await getMessageInChat(chatRoomReducer.chatListUUID).then((result)=> {
            setMessageList(result)
        })
    }
    /** get last Count for set Document Id */
    const getLastCount = () => {
        const offset = new Date().getTimezoneOffset()
        const current = new Date(new Date().getTime()-(offset*60*1000)).toISOString().split('T')[0]
        setCurrentDate(current)
    }
    /* */

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
            <WriteMessage chatUUID={chatRoomReducer.chatListUUID} writeDate={currentDate} newCount={0}/>
        </div>
    )
}