import React from 'react'

import { useAppSelector } from '@/redux/hook'
import { MessageInfo } from '../../../../msg_typeDef';
import { WriteMessage } from './WriteMessage';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { ViewMessage } from './ViewMessage';

export function ChatRoom() {
    const [messageList, setMessageList] = React.useState<MessageInfo[]>([])
    const [currentDate, setCurrentDate] = React.useState("")
    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);

    React.useEffect(()=> {
        getDateNow()
        getMessageList()
    },[])

    /* set onSnapshot() for messages Collection in chatList Document */
    const getMessageList = async() => {
        const colRef = query(collection(firebaseStore,`chatList/${chatRoomReducer.chatListUUID}/messages`),orderBy('createDate','asc'));
        onSnapshot(colRef,(snapShot)=> {
            const resultArray : MessageInfo[] = []
            snapShot.docs.forEach((doc)=> {
                resultArray.push(doc.data() as MessageInfo)
                setMessageList(resultArray)
            })
        })
        
    }
    /** get current Date */
    const getDateNow = () => {
        const offset = new Date().getTimezoneOffset()
        const current = new Date(new Date().getTime()-(offset*60*1000)).toISOString().split('T')[0]
        setCurrentDate(current)
    }
    
    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            {messageList && <ViewMessage messages={messageList}/>}
            <WriteMessage chatUUID={chatRoomReducer.chatListUUID} writeDate={currentDate} />
        </div>
    )
}