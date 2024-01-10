import React from 'react'

import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hook'
import { WriteMessage } from './WriteMessage';
import { ChatRoomInfo, MessageInfo, UserInfo } from '../../../../msg_typeDef';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { getSelectedChatInfo, getUserInfo } from '../FirebaseController';
import { MessageItem } from './MessageItem';

export function ChatRoom() {
    const [messageList, setMessageList] = React.useState<MessageInfo[]>([])
    const [currentDate, setCurrentDate] = React.useState("")
    const [membersInfo, setMembersInfo] = React.useState<UserInfo[]>([]);
    const [chatRoomInfo, setChatRoomInfo] = React.useState<ChatRoomInfo>()

    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);

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
        console.log('ChatRoom');
        console.log(chatInfo)
        setChatRoomInfo(chatInfo)
        chatInfo.members.forEach(async(member)=> {
            const {result, value} = await getUserInfo(member);
            {result === true && setMembersInfo(prev => [...prev, value])}
        })
    }

    const authorCheck = (email : string) => currentUserInfo.email === email ? true : false
    const authorInfo = (email: string)=> membersInfo.find((member)=>  member.email === email)
    
    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className=''>

            </div>
            <div className='overflow-y-scroll'>
                {messageList.map((message)=> {
                    return <MessageItem key={message.UUID} 
                                message={message} 
                                authorYn={authorCheck(message.author)} 
                                authorInfo={authorInfo(message.author)}/>
                })}
            </div>
            {/* {messageList && <MessageList messages={messageList} chatRoomInfo={chatRoomReducer}/>} */}
            <WriteMessage chatUUID={chatRoomReducer.uuid} writeDate={currentDate} />
        </div>
    )
}