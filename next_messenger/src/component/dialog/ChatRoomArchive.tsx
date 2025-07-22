"use client";

import React from 'react';

export default function ChatRoomArchive() {
    
    React.useEffect(()=> {
        
    },[])

    const onClickExportText = ()=> {

    }

    const onClickExportCSV = ()=> {

    }

    return (
        <div className='flex flex-col '>
            <h1 className='font-bold text-sm mb-1'>
                Messages Export
            </h1>
            <ul>
                <li className='text-xs'>
                    You can export Messages.
                </li>
                <li>
                    Attachments Files are not export.
                </li>
            </ul>
            <button 
                className='default-button'
                onClick={onClickExportText}>
                Export TXT
            </button>
            <button 
                className='default-button'
                onClick={onClickExportCSV}>
                Export CSV
            </button>
        </div>
    )
}