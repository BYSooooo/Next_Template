import React from 'react'

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
    const [memberInfo, setMemberInfo] = React.useState<UserInfo>()
    const dayCheck = React.useRef<Date>()
    const listRef = React.useRef<HTMLDivElement>(null)

    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);

    React.useEffect(()=> {
        dayCheck.current = undefined
        setMessageList([])
        getDateNow()
        getMessageList()
        getChatRoomInfo()  
    },[chatRoomReducer.uuid])

    React.useEffect(()=> {
        chatMember()
    },[membersInfo])
    
    React.useEffect(()=> {
        scrollBottom()
    },[messageList])

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
        setMembersInfo([])
        const chatInfo = await getSelectedChatInfo(chatRoomReducer.uuid) as ChatRoomInfo;
        setChatRoomInfo(chatInfo)
        chatInfo.members.forEach(async(member)=> {
            const {result, value} = await getUserInfo(member);
            {result === true && setMembersInfo(prev => [...prev, value])}
        })
    }

    const authorCheck = (email : string) => currentUserInfo.email === email ? true : false
    const authorInfo = (email: string)=> membersInfo.find((member)=>  member.email === email)
    const chatMember = () => {
        const member = membersInfo.find((member)=> member.email !== currentUserInfo.email)
        setMemberInfo(member)
    } 
    
    const dateCheck = (date : Date) => {
        {!dayCheck.current && (dayCheck.current = date)}
        const result = dayCheck.current.getDate() !== date.getDate() 
        dayCheck.current = date
        return result
    }

    const scrollBottom  =()=> {
        console.log('Scroll Bottom Call')
        listRef.current.scroll({
            top : listRef.current.scrollHeight,
            behavior : 'instant'
        })
    }
    
    return (
        <div className='border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex h-10 justify-center p-2'>
                <h4 className='font-bold text-lg'>
                    Chat - {memberInfo?.displayName ? memberInfo.displayName : 'No Name'}
                </h4>
            </div>
            <div className='h-56 overflow-y-scroll my-1' ref={listRef}>
                {messageList.map((message)=> { 
                    return (
                        <MessageItem key={message.UUID} 
                            message={message} 
                            authorYn={authorCheck(message.author)} 
                            authorInfo={authorInfo(message.author)}
                            dateChange={dateCheck(message.createDate.toDate())}/>     
                    )
                })}
            </div>
            <WriteMessage chatUUID={chatRoomReducer.uuid} writeDate={currentDate} />
        </div>
    )
}