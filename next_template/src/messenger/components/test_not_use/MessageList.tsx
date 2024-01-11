import React from 'react'

import { ChatRoomInfo, MessageInfo, UserInfo } from '../../../../msg_typeDef'
import { useAppSelector } from '@/redux/hook'
import { MessageItem } from '../chat/MessageItem';
import { getUserInfo } from '../FirebaseController';

export function MessageList({messages, chatRoomInfo} : {messages : MessageInfo[], chatRoomInfo : ChatRoomInfo}) {
    const [membersInfo, setMembersInfo] = React.useState<UserInfo[]>([])
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);

    React.useEffect(()=> {
        getMembersInfo()
    },[chatRoomInfo.members])

    const getMembersInfo = () => {
        console.log('MessageList');
        console.log(chatRoomInfo)
        chatRoomInfo.members.map(async(item)=> {
            const response = await getUserInfo(item);
            console.log('getUserInfo then')
            console.log(response)
            {response.result === true && setMembersInfo(prev => [...prev,response.value])}
            
        })
        
    }

    const authorCheck = (email : string) => {
        const check = currentUserInfo.email === email ? true : false     
        return check
    }
    const authorInfo = (email: string) => {
        const result = membersInfo.find((item)=> item.email === email)
        return result
    }
        
    

    return (
        <div className='overflow-y-scroll'>
            {membersInfo && messages.map((item)=> {
                    return <MessageItem key={item.UUID} 
                                        message={item} 
                                        authorYn={authorCheck(item.author)} 
                                        authorInfo={authorInfo(item.author)}/>
                })
            }
        </div>
    )
}