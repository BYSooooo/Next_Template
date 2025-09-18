"use client";

import React from 'react';

import { FaceFrownIcon, ListBulletIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserInfo } from '../../typeDef';
import ChatItem from './ChatItem';
import { firebaseAuth } from '../../firebase-config';
import { controlDialog, dialogSlice } from '../redux/features';
import { ArchiveBoxArrowDownIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function FriendChat({chatId, selUserInfo} : {chatId : string, selUserInfo : UserInfo}) {
    const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);
    
    const chatStore = useAppSelector((state)=> state.chatStore);  
    const chatContainerRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef(null);
    const currentUid = firebaseAuth?.currentUser?.uid;
    
    const dispatch = useAppDispatch();
    const menuToggle = ()=> {
        setIsMenuOpen(!isMenuOpen);
    }

    const hoverStyle = "p-[0.2rem] hover:bg-slate-300 hover:dark:bg-slate-700 rounded-md dark:hover:bg-slate-500";
    
    
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

    React.useEffect(()=> {
        const clickOutside = (event)=> {
            if(menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            };
        }
        document.addEventListener('mousedown', clickOutside);
        return ()=> {
            document.removeEventListener('mousedown',clickOutside);
        }
    },[menuRef])
    
    const onClickPhoto = ()=> {
        setIsMenuOpen(false)
        dispatch(controlDialog({
            openYn : true, 
            contentName : 'ChatRoomPhoto', 
            title : 'Photo', 
            extraData : chatId }
        ))
    }

    const onClickExport = ()=> {
        setIsMenuOpen(false)
        dispatch(controlDialog({
            openYn : true,
            contentName : 'ChatRoomArchive',
            title : 'Export',
            
        }))
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
                    <span
                        ref={menuRef} 
                        className='relative'>
                        <ListBulletIcon 
                            className={`w-7 h-7 ${hoverStyle} hover:cursor-pointer`}
                            onClick={menuToggle} />
                        { isMenuOpen &&
                            (   <div className='absolute p-2 flex flex-col gap-2 top-5 right-0 w-48 mt-2 origin-top-right bg-slate-400 dark:bg-gray-800 border border-slate-400 dark:border-gray-700 rounded-md shadow-lg z-50'>
                                    <button
                                        onClick={onClickPhoto}
                                        className={`${hoverStyle}`}>
                                        <span className='flex flex-row items-center gap-2'>
                                            <PhotoIcon className='w-5 h-5'/>
                                            <h1 className='text-sm'>Photo List</h1>
                                        </span>
                                    </button>
                                    <button
                                        onClick={onClickExport}
                                        className={`${hoverStyle}`}>
                                        <span className='flex flex-row items-center gap-2'>
                                            <ArchiveBoxArrowDownIcon className='w-5 h-5'/>
                                            <h1 className='text-sm'>Archive</h1>
                                        </span>
                                    </button>
                                </div>
                            )
                        }
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