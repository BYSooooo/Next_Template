import React from 'react'

import { useAppSelector } from '@/redux/hook'
import { ChatRoomInfo, MessageInfo } from '../../../../msg_typeDef';
import { WriteMessage } from './WriteMessage';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { MessageList } from './MessageList';
import { getSelectedChatInfo } from '../FirebaseController';
import { useDispatch } from 'react-redux';
import { setChatListInfo } from '@/redux/features/messengerReducer';

export function ChatRoom() {
    const [messageList, setMessageList] = React.useState<MessageInfo[]>([])
    const [currentDate, setCurrentDate] = React.useState("")
    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);
    const dispatch = useDispatch();

    React.useEffect(()=> {
        setMessageList([])
        getDateNow()
        getMessageList()
        getChatRoomInfo()
    },[chatRoomReducer.uuid])

    /* set onSnapshot() for messages Collection in chatList Document */
    const getMessageList = async() => {
        const colRef = query(collection(firebaseStore,`chatList/${chatRoomReducer.uuid}/messages`),orderBy('createDate','asc'));
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
    /* get Chat Room Info */
    const getChatRoomInfo = async() => {
        const chatInfo = await getSelectedChatInfo(chatRoomReducer.uuid) as ChatRoomInfo;
        console.log(chatInfo)
        dispatch(setChatListInfo(chatInfo))   
    }
    
    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className=''>

            </div>
            {messageList && <MessageList messages={messageList} chatRoomInfo={chatRoomReducer}/>}
            <WriteMessage chatUUID={chatRoomReducer.uuid} writeDate={currentDate} />
        </div>
    )
}