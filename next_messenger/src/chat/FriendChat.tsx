"use client";

import React from 'react';

import { ListBulletIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserInfo } from '../../typeDef';
import ChatItem from './ChatItem';
import { firebaseAuth } from '../../firebase-config';

export default function FriendChat({chatId, selUserInfo} : {chatId : string, selUserInfo : UserInfo}) {
    const dispatch = useAppDispatch();
    const chatStore = useAppSelector((state)=> state.chatStore);  
    const currentUid = firebaseAuth.currentUser.uid;
    
    React.useEffect(()=> {
        
    },[chatId])

    return (
        <div className='default-box
            flex flex-col w-[40rem] ml-1 h-full' >
            <div className="flex flex-row p-4 justify-between">
                <span className="flex flex-row items-center">
                    { selUserInfo &&
                        selUserInfo.avatarOpenYn
                            ? selUserInfo.avatarImg.length > 0
                                ? <img className="w-16 h-16 rounded-full object-cover mx-auto" src={selUserInfo.avatarImg} />
                                : <UserCircleIcon className="w-16 h-16"/>
                            : <UserCircleIcon className="w-16 h-16"/>       
                        
                    }
                    <div className="flex flex-col text-start">
                        { selUserInfo 
                            ? 
                                <p className='font-bold text-xl' >
                                    {selUserInfo.displayName}
                                </p>
                            :
                                <p className='text-xl italic'>
                                    DisplayName not set
                                </p>
                        }
                        { selUserInfo && 
                            <p className='text-sm'>
                                {selUserInfo.displayName}
                            </p>
                        }
                    </div>
                </span>
                <span>
                    <ListBulletIcon className="w-7 h-7" />
                </span>
                
            </div>
            <div className="h-0.5 bg-slate-800 dark:bg-white mx-2 rounded-md"/>
            { chatStore.messages.length > 0 &&
                chatStore.messages.map((chat)=>{
                    return <ChatItem currentUid={currentUid} chat={chat}/>
                } )
            }
        </div>
    )
}