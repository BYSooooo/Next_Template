import React from 'react'

import { useAppSelector } from '@/redux/hook'
import { WriteMessage } from './WriteMessage';
import { ChatRoomInfo, MessageInfo, UserInfo } from '../../../../msg_typeDef';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { getSelectedChatInfo, getUserInfo } from '../FirebaseController';
import { MessageItem } from './MessageItem';
import { ChatRoomMenu } from './ChatRoomMenu';
import { ChatRoomFreezeNotice } from './ChatRoomFreezeNotice';

export function ChatRoom() {
    const [messageList, setMessageList] = React.useState<MessageInfo[]>([])
    const [membersInfo, setMembersInfo] = React.useState<UserInfo[]>([]);
    const [chatRoomInfo, setChatRoomInfo] = React.useState<ChatRoomInfo>()
    const [memberInfo, setMemberInfo] = React.useState<UserInfo>()
    const [attachCheck, setAttachCheck] = React.useState(false)
    const dayCheck = React.useRef<Date>()
    const listRef = React.useRef<HTMLDivElement>(null)
    
    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);

    React.useEffect(()=> {
        setAttachCheck(false)
        dayCheck.current = undefined
        setMessageList([])
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
    const controlAttach = ()=> {
        let defaultCSS = 'w-80 overflow-y-scroll my-1';
        switch (attachCheck) {
            case true : 
                defaultCSS +=' h-60'
                break;
            case false : 
                defaultCSS +=' h-96'
                break;
            default : break;
        }
        return defaultCSS;
    }

    
    return (
        <div className='w-fit shadow-box p-2 m-2'>
            <div className='flex h-10 justify-between items-center p-2'>
                <h4 className='font-bold text-lg'>
                    Chat - {memberInfo?.displayName ? memberInfo.displayName : 'No Name'}
                </h4>
                {chatRoomInfo?.active && <ChatRoomMenu />}
            </div>
            <div className={controlAttach()} ref={listRef}>
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
            {chatRoomInfo?.active 
            ? <WriteMessage chatUUID={chatRoomReducer.uuid} attachedYn={setAttachCheck} />
            : <ChatRoomFreezeNotice chatUUID={chatRoomReducer.uuid} viewYn={setAttachCheck}/> }
        </div>
    )
}