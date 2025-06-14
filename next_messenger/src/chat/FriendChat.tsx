"use client";

import React from 'react';

import { FaceFrownIcon, ListBulletIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserInfo } from '../../typeDef';
import ChatItem from './ChatItem';
import { firebaseAuth } from '../../firebase-config';
import { controlDialog, dialogSlice } from '../redux/features';

export default function FriendChat({chatId, selUserInfo} : {chatId : string, selUserInfo : UserInfo}) {
    const chatStore = useAppSelector((state)=> state.chatStore);  
    const chatContainerRef = React.useRef<HTMLDivElement>(null);
    const currentUid = firebaseAuth?.currentUser?.uid;
    const dispatch = useAppDispatch();

    const hoverStyle = "p-[0.2rem] hover:bg-slate-300 hover:dark:bg-slate-700 rounded-md dark:hover:bg-slate-500";
    /*
    React.useEffect(()=> {
        const chatContainer = chatContainerRef.current;
        if(!chatContainer) return;

        const scrollToBottom = ()=> {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        const awitImgLoading = () => {
            const images = chatContainer.querySelectorAll('img');
            if(images.length === 0) {
                scrollToBottom();
                return;
            }
            let imagesLoaded = 0;
            const totalImgCount = images.length;

            const handleImageLoaded = () => {
                imagesLoaded++;
                (imagesLoaded == totalImgCount) && scrollToBottom();
            }
            images.forEach(img => {
                img.complete
                    ? handleImageLoaded()
                    : img.addEventListener('load', handleImageLoaded);
            });
            return ()=> {
                images.forEach(img => {
                    img.removeEventListener('load', handleImageLoaded);
                })
            }
        }
        const cleanupImageLoaders = awitImgLoading();
        const initialScrollTimer = setTimeout(scrollToBottom, 100);

        return () => {
            clearTimeout(initialScrollTimer);
            if (cleanupImageLoaders) {
                cleanupImageLoaders();
            }
        };
    }, [chatId, chatStore.messages])
    */
    
    React.useEffect(()=> {
        // Bottom Scroll Control
        console.log("FriendChat UseEffect Called")
        const scrollToDown = ()=> {
            if(chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
        const timer = setTimeout(scrollToDown, 100);
        const images = chatContainerRef.current?.querySelectorAll('img');
        if(images) {
            images.forEach(img => {
                img.addEventListener('load', scrollToDown);
            });
        }
        return () => {
            clearTimeout(timer);
            if (images) {
                images.forEach(img => {
                    img.removeEventListener('load', scrollToDown);
                });
            }
        };
    },[chatId, chatStore.messages])
    
    const onClickChatMenu = ()=> {
        dispatch(controlDialog({ openYn: true, contentName : 'ChatRoomAction', title : 'Setting', size: 'fit' }))
    }
    return (
        <div className='default-box
            flex flex-col w-[40rem] ml-1 h-full' >
            {selUserInfo ?
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
                        <ListBulletIcon 
                            className={`w-7 h-7 ${hoverStyle} hover:cursor-pointer`}
                            onClick={onClickChatMenu} />
                    </span>
                </div>
            :   <div className='flex flex-col justify-center h-full items-center'>
                    <FaceFrownIcon className='w-16 h-16' />
                    <h1>
                        Select the friend <br/>
                        you want to start a chat with.
                    </h1>
                </div>

            }
            { selUserInfo 
                && <div className="h-0.5 bg-slate-800 dark:bg-white mx-2 rounded-md mb-2"/>
            }
            {
                selUserInfo
                    && 
                <div 
                    ref={chatContainerRef}
                    className='flex flex-col gap-3 overflow-scroll'>
                    { chatStore.messages.reduce((acc, cur, index, array)=> {
                        const curDate = new Date(cur.createdAt as any);
                        const preChat = array[index - 1];
                        const preDate = preChat ? new Date(preChat.createdAt as any) : null;
                        const uuid = crypto.randomUUID()
                        const dateSeperatorYn = !preDate || curDate.getDate() !== preDate.getDate();

                        if(dateSeperatorYn) {
                            acc.push(
                                <p  key={curDate.toISOString()} 
                                    className='text-sm bg-gray-500 rounded-md mx-2'> 
                                    {   curDate.getFullYear() + '-' + 
                                        (curDate.getMonth()+1).toString().padStart(2,"0") + "-" + 
                                        curDate.getDate().toString().padStart(2,"0")
                                    } 
                                </p>
                                )
                        }
                        acc.push(<ChatItem key={uuid} chatId={chatId} currentUid={currentUid} chat={cur}/>)
                        return acc;
                        },[])
                    }
                </div>
            }
        </div>
    )
}