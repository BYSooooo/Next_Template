"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SearchFriend from './SearchFriend';
import { controlDialog } from '../../redux/features';
import SendRequestInfo from './SendRequestInfo';
import ReceiveRequestInfo from './ReceiveRequestInfo';
import ChatRoomPhoto from './ChatRoomPhoto';
import ChatRoomArchive from './ChatRoomArchive';
import RemoveFriend from './RemoveFriend';

export default function Dialog() {
    const { openYn, contentName, size, title, extraData, background, } = useAppSelector((state)=> state.dialogStore);
    const [ backImgYn, setBackImgYn] = React.useState(false);
    const wrapperRef = React.useRef(null);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        const handleOutsideClick = (event)=> {
            if(!wrapperRef.current?.contains(event.target)) {
                dispatch(controlDialog({openYn : false, contentName : "", size: "", title : "", background : ""}))
            }
        };
        window.addEventListener("mousedown", handleOutsideClick)
        return ()=> {
            window.removeEventListener('mousedown', handleOutsideClick)
        }
    },[wrapperRef])

    React.useEffect(()=> {
        if(openYn) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''
        }
    },[openYn])

    // Checking User Profile Image
    React.useEffect(()=> {
        if(contentName === 'SendRequestInfo' || contentName === 'ReceiveRequestInfo') {
            if(extraData)  {
                const profileOpenYn = extraData.profileImgOpenYn;
                setBackImgYn(profileOpenYn)
            }
        }
    },[contentName])

    const dialogBgControl = {
        open : 'opacity-100',
        close : 'opacity-0 pointer-events-none'
    }

    const switchContent = ()=> {
        switch(contentName) {
            case 'searchFriend' :
                return <SearchFriend />
            case 'SendRequestInfo' : 
                return <SendRequestInfo />
            case 'ReceiveRequestInfo' : 
                return <ReceiveRequestInfo />
            case 'ChatRoomPhoto' : 
                return <ChatRoomPhoto />
            case 'ChatRoomArchive' : 
                return <ChatRoomArchive />
            case 'RemoveFriend' : 
                return <RemoveFriend />
            default :
            break;
        }
    }
    
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 bg-block bg-opacity-75 transition-opacity duration-200 ${dialogBgControl[openYn === true ? "open" : "close"]}`}>
            <div
                ref={wrapperRef}
                style={(background.length > 0 && backImgYn === true) 
                    ? {
                        backgroundImage: `url(${background})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        backgroundBlendMode : 'soft-light' } 
                    : {}}
                className={`flex dark:bg-gray-700 bg-gray-300 rounded-lg shadow-lg w-${size} jusify-center py-3`}>
                <div className='container p-2'>
                    {/* Part1 : Dialog Title  */}
                    <div className='mx-2 mb-2'>
                        <h4 className='font-bold text-lg text-black dark:text-white'>
                            {title}
                        </h4>
                    </div>
                    {/* Part.2 : Main Content */}
                    <div>
                        {switchContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}
