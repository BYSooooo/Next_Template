"use client";

import React from 'react';

import { ArchiveBoxArrowDownIcon, PhotoIcon } from '@heroicons/react/24/outline';
import ChatRoomPhoto from './ChatRoomPhoto';
import ChatRoomArchive from './ChatRoomArchive';
import { useAppSelector } from '../../redux/hooks';

export default function ChatRoomAction() {
    const [ selection, setSelection] = React.useState(0);
    const [ attaches, setAttaches ] = React.useState([]);
    const chatSlice = useAppSelector((state)=> state.chatStore.messages);
    const hoverStyle ="p-[0.2rem] rounded-md hover:bg-slate-300 hover:dark:bg-slate-500"
    
    React.useEffect(()=> {
        const filterAttach = chatSlice.filter((item)=> item.attachYn === true)
        setAttaches(filterAttach);
    },[])

    const onClickHandler = (select: number)=> {
        setSelection(select);
    };

    return (
        <div className="flex flex-row items-center">
            <div className='h-[15%] flex flex-col gap-2'>
                <button
                    className={`${hoverStyle}`}
                    onClick={()=> onClickHandler(0)} >
                    <span className='flex flex-row items-center gap-2'>
                        <PhotoIcon className='w-5 h-5'/>
                        <h1 className='text-sm'>Photo List</h1>
                    </span>
                </button>
                <button
                    className={`${hoverStyle}`}
                    onClick={()=> onClickHandler(1)}>
                    <span className='flex flex-row items-center gap-2'>
                        <ArchiveBoxArrowDownIcon className='w-5 h-5'/>
                        <h1 className='text-sm'>Archive</h1>
                    </span>
                </button>
            </div>
            <div>
                { selection === 0 && <ChatRoomPhoto chatId={''} attach={attaches}/>}
                { selection === 1 && <ChatRoomArchive />}
            </div>
            
        </div>
    )
}