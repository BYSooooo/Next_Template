"use client";

import React from 'react';

import { ListBulletIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from '../redux/hooks';
import { UserInfo } from '../../typeDef';


export default function FriendChat({chatId} : {chatId : string}) {
    const chatStore = useAppSelector((state)=> state.chatStore);    
    const [selectedUser, setSelectedUser] = React.useState<UserInfo>();
    React.useEffect(()=> {
        
    },[chatId])

    return (
        <div className='default-box
            flex flex-col w-[40rem] ml-1' >
            <div className="flex flex-row p-4 justify-between">
                <span className="flex flex-row items-center">
                    <UserCircleIcon className="w-16 h-16"/>
                    <div className="flex flex-col text-start">
                        <p className="font-bold text-xl">
                            {chatId !== ""
                                ? chatId
                                : "No Chat ID"
                            }
                        </p>
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