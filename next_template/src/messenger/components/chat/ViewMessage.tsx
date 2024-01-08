import React from 'react'

import { MessageInfo } from '../../../../msg_typeDef'
import { useAppSelector } from '@/redux/hook'

export function ViewMessage({messages} : {messages : MessageInfo[]}) {
    const [list, setList] = React.useState<MessageInfo[]>(messages);

    const currentUserInfoReducer = useAppSelector((state)=> state.messengerCurUserInfo);
    

    return (
        <ul>
            {messages.map((item)=> {
                return <li key={item.UUID}>
                    {item.message}
                </li>
            })}
        </ul>
    )
}