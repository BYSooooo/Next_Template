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
    const chatContainerRef = React.useRef<HTMLDivElement>(null);
    const currentUid = firebaseAuth.currentUser.uid;
    
    React.useEffect(()=> {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    },[chatId, chatStore.messages])

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
            <div className="h-0.5 bg-slate-800 dark:bg-white mx-2 rounded-md mb-2"/>
            <div 
                ref={chatContainerRef}
                className='flex flex-col gap-3 overflow-scroll'>
                { chatStore.messages.reduce((acc, cur, index, array)=> {
                    const curDate = new Date(cur.createdAt as any);
                    const preChat = array[index - 1];
                    const preDate = preChat ? new Date(preChat.createdAt as any) : null;

                    const dateSeperatorYn = !preDate || curDate.getDate() !== preDate.getDate();

                    if(dateSeperatorYn) {
                        acc.push(
                            <p  key={curDate.toISOString()} 
                                className='text-sm bg-gray-500 rounded-md mx-2'> 
                                {   curDate.getFullYear() + '-' + 
                                    curDate.getMonth().toString().padStart(2,"0") + "-" + 
                                    curDate.getDate().toString().padStart(2,"0")
                                } 
                            </p>
                            )
                    }
                    acc.push(<ChatItem key={cur.createdAt.toString()} currentUid={currentUid} chat={cur}/>)
                    return acc;
                    },[])
                }
            </div>
        </div>
    )
}