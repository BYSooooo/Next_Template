"use client";

import React from 'react';

import { ListBulletIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserInfo } from '../../typeDef';
import { getChatRoom } from '../controller/FirebaseController';
import { controlMessageToast, setChatRoom } from '../redux/features';

export default function FriendChat({chatId, selUserInfo} : {chatId : string, selUserInfo : UserInfo}) {
    const dispatch = useAppDispatch();
    const chatStore = useAppSelector((state)=> state.chatStore);    
    const [selectedUser, setSelectedUser] = React.useState<UserInfo>(selUserInfo);
    React.useEffect(()=> {
        chatId !== "" && initChatRoom();
        
    },[chatId])

    const initChatRoom = async()=> {
        const { result, value } = await getChatRoom(chatId)
        if(result) {
            dispatch(setChatRoom(value));
        } else {
            dispatch(controlMessageToast({ openYn : true, type : 'error', title : 'Error', content : value}))
        }
    }   

    return (
        <div className='default-box
            flex flex-col w-[40rem] ml-1' >
            <div className="flex flex-row p-4 justify-between">
                <span className="flex flex-row items-center">
                    <UserCircleIcon className="w-16 h-16"/>
                    <div className="flex flex-col text-start">
                        { selectedUser 
                            ? 
                                <p className='font-bold text-xl' >
                                    {selectedUser.displayName}
                                </p>
                            :
                                <p className='text-xl italic'>
                                    DisplayName not set
                                </p>
                        }
                        <p className="text-sm">
                            SampleEmail@example.com
                        </p>
                    </div>
                </span>
                <span>
                    <ListBulletIcon className="w-7 h-7" />
                </span>
                
            </div>
            <div className="h-0.5 bg-slate-800 dark:bg-white mx-2 rounded-md"/>
            <p>
                This is Main Page
            </p>
        </div>
    )
}