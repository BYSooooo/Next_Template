"use client"

import React from 'react';
import FriendList from "../../chat/FriendList";
import SideNavigation from "../../main/SideNaigation";
import FriendChat from '../../chat/FriendChat';
import { ChatRoomSnapshot, UserInfoSnapshot } from "../../controller/SnapshotController";
import { getChatRoom } from '../../controller/FirebaseController';
import { useAppDispatch } from '../../redux/hooks';
import { controlMessageToast, setChatRoom } from '../../redux/features';
import { Chat, UserInfo } from '../../../typeDef';
import { FriendChatInput } from '../../chat/FriendChatInput';

export default function Page() {
    const dispatch = useAppDispatch();
    const [ chatId, setChatId ] = React.useState("")
    const [ selUserInfo, setSeluserInfo ] = React.useState<UserInfo>()
    React.useEffect(()=> {
        getChatRoomInit()
    },[chatId])

    const getChatRoomInit = async()=> {
        dispatch(setChatRoom({member : [], messages : []}))
        if(chatId !== "") {
            const { result, value } = await getChatRoom(chatId)
            if(result) {
                dispatch(setChatRoom(value));
            } else {
                dispatch(controlMessageToast({ openYn : true, type : 'error', title : "Error", content : value}));   
            }
        }
    }

    UserInfoSnapshot()
    ChatRoomSnapshot(chatId);

    const selectionHandler = (chatId : string, selectedUserInfo : UserInfo)=> {
        setChatId(chatId);
        setSeluserInfo(selectedUserInfo);
    }
    
    return (
        <div className="flex flex-row mx-auto w-max h-svh text-center justify-center pt-14 pb-2">
            <div className='flex max-w-[10vw]'>
                <SideNavigation />
            </div>
            <div className='flex flex-row max-w-[90vw]'>
                <div className='flex'>
                    <FriendList selectFn={selectionHandler}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <FriendChat chatId={chatId} selUserInfo={selUserInfo}/>
                    <FriendChatInput chatId={chatId}/>
                </div>
            </div>
        </div>
    )
}