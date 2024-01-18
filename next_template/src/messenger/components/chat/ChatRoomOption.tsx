import React from 'react';

import { ChatRoomMenu } from './ChatRoomMenu';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRendering } from '@/redux/features/messengerReducer';

export function ChatRoomOption() {
    const chatRoomReducer = useAppSelector((state)=> state.messengerCurChatInfo);
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);

    const dispatch = useAppDispatch()
    const onClickHandler = (select:string)=> {
        if(select === "ok") {
            dispatch(setPageRendering({middle : "ChatRoom"}))
        }
    }

    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex h-10 justify-between items-center p-2'>
                <h4 className='font-bold text-lg'>
                    Chat - Option
                </h4>
                <ChatRoomMenu />
            </div>
            <div>
                <button onClick={()=>onClickHandler("ok")}>
                    return
                </button>
            </div>
            
        </div>
    )
}