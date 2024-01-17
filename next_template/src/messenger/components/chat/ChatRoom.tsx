import React, { Fragment } from 'react'

import { useAppSelector } from '@/redux/hook'
import { WriteMessage } from './WriteMessage';
import { ChatRoomInfo, MessageInfo, UserInfo } from '../../../../msg_typeDef';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { getSelectedChatInfo, getUserInfo } from '../FirebaseController';
import { MessageItem } from './MessageItem';
import { Bars4Icon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { relative } from 'path';

export function ChatRoom() {
    const [messageList, setMessageList] = React.useState<MessageInfo[]>([])
    const [currentDate, setCurrentDate] = React.useState("")
    const [membersInfo, setMembersInfo] = React.useState<UserInfo[]>([]);
    const [chatRoomInfo, setChatRoomInfo] = React.useState<ChatRoomInfo>()
    const [memberInfo, setMemberInfo] = React.useState<UserInfo>()
    const [attachCheck, setAttachCheck] = React.useState(false)
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
    const onClickMenu =()=> {

    }
    
    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex h-10 justify-between items-center p-2'>
                <h4 className='font-bold text-lg'>
                    Chat - {memberInfo?.displayName ? memberInfo.displayName : 'No Name'}
                </h4>
                <Menu as='div' className='relative inline-block text-right'>
                    <div>
                        <Menu.Button className='inline-flex w-full justify-center'>
                            <Bars4Icon className='absoulte w-5 h-5 text-end hover:cursor-pointer' onClick={onClickMenu}/>
                        </Menu.Button>
                    </div>
                    <Transition as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                    show={true}>
                        
                    <Menu.Items className='absolute right-0 z-20'>
                        <div>
                            <Menu.Item>
                                {({active}) => (
                                    <a className={active ? 'bg-gray-50' : 'bg-gray-300'}>
                                        Edit
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
                </Menu>
                
                
                
            
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
            <WriteMessage chatUUID={chatRoomReducer.uuid} writeDate={currentDate} attachedYn={setAttachCheck} />
        </div>
    )
}