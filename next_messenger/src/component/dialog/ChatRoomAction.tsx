"use client";
import { PhotoIcon } from '@heroicons/react/24/solid';
import React from 'react';

export default function ChatRoomAction() {

    const hoverStyle ="p-[0.2rem] hover:bg-slate-300 hover:dark:bg-slate-700 rounded-md dark:hover:bg-slate-500"
    
    const onClickHandler = (name: string)=> {

    };

    return (
        <div className="flex flex-row items-center">
            <div className='h-[15%] flex flex-col gap-2'>
                <button
                    className={`${hoverStyle}`}
                    // onClick={()=> onClickHandler()} 
                    >
                    <span className='flex flex-row items-center gap-2'>
                        <PhotoIcon className='w-7 h-7'/>
                        <p>Photo List</p>
                    </span>
                </button>

                
            </div>
            <div className='h-[85%]'>
                Hello
            </div>
        </div>
    )
}