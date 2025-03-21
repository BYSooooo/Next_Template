"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import NoDisplayName from './NoDisplayName';
import SearchFriend from './SearchFriend';
import { controlDialog } from '../../redux/features';
import SendRequestInfo from './SendRequestInfo';

export default function Dialog() {
    const { openYn, contentName, size, title } = useAppSelector((state)=> state.dialogStore);
    const wrapperRef = React.useRef(null);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        console.log(openYn,contentName,size,title)
    },[openYn])

    React.useEffect(()=> {
        const handleOutsideClick = (event)=> {
            if(!wrapperRef.current?.contains(event.target)) {
                dispatch(controlDialog({openYn : false, contentName : "", size: "", title : ""}))
            }
        };
        window.addEventListener("mousedown", handleOutsideClick)
        return ()=> {
            window.removeEventListener('mousedown', handleOutsideClick)
        }
    },[wrapperRef])

    const dialogBgControl = {
        open : 'opacity-100',
        close : 'opacity-0 pointer-events-none'
    }

    const switchContent = ()=> {
        switch(contentName) {
            case "noDisplayName" :
                return <NoDisplayName />
            case 'searchFriend' :
                return <SearchFriend />
            case 'SendRequestInfo' : 
                return <SendRequestInfo />
            default :
            break;
        }
    }
    
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-block bg-opacity-50 transition-opacity ${dialogBgControl[openYn === true ? "open" : "close"]}`}>
            <div
                ref={wrapperRef}
                className={`flex dark:bg-gray-700 bg-gray-300 rounded-lg shadow-lg w-${size} jusify-center py-3`}>
                <div className="flex flex-col justify-between items-center mb-4">
                    {/* Dialog Title*/}
                    <div className="container flex flex-col">
                        <div className="flex items-center mb-2">
                            <InformationCircleIcon className="w-7 h-7 dark:text-blue-300 text-blue-700 mr-2" />
                            <h4 className="text-xl text-black dark:text-white">
                                {title} 
                            </h4>
                        </div>
                        {/* Dialog Content*/}
                        {switchContent()}
                        <div className='flex flex-row-reverse mr-2'>
                            <button className='default-button p-2'>
                                Hello
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

//<div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
