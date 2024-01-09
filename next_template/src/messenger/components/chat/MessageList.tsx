import React from 'react'

import { ChatRoomInfo, MessageInfo, UserInfo } from '../../../../msg_typeDef'
import { useAppSelector } from '@/redux/hook'
import { MessageItem } from './MessageItem';
import { getUserInfo } from '../FirebaseController';

export function MessageList({messages, chatRoomInfo} : {messages : MessageInfo[], chatRoomInfo : ChatRoomInfo}) {
    const [membersInfo, setMembersInfo] = React.useState<UserInfo[]>([]);
    const currentUserInfoReducer = useAppSelector((state)=> state.messengerCurUserInfo);

    React.useEffect(()=> {
        getMembersInfo()
    },[])

    const getMembersInfo = () => {
        const array: UserInfo[] = []
        chatRoomInfo.members.map(async(item)=> {
            const data = await getUserInfo(item);
            array.push(data.value)
        })
        setMembersInfo(array);
    }

    const authorCheck = (email : string) => {
        const check = currentUserInfoReducer.email === email ? true : false     
        return check
    }
    const authorInfo = (email: string) => membersInfo.find((item)=> item.email === email)
        
    

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