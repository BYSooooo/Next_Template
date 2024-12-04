"use client";

import React from 'react';
import { useAppSelector } from "../../redux/hooks";
import NoDisplayName from './NoDisplayName';

export default function Dialog() {
    const { openYn, contentName, size } = useAppSelector((state)=> state.dialogStore);
    
    React.useEffect(()=> {
        console.log("Dialog Called")
        console.log(contentName)
    },[openYn])

    const dialogBgControl = {
        open : 'opacity-100',
        close : 'opacity-0 pointer-events-none'
    }

    const dialogSizeControl = {
        oneTwo : 'w-1/2',
        twoThree : 'w-2/3'
        
    }

    const switchContent = ()=> {
        switch(contentName) {
            case "noDisplayName" :
                return <NoDisplayName />
            default :
            break;
        }
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-block bg-opacity-50 transition-opacity ${dialogBgControl[openYn === true ? "open" : "close"]}`}>
            <div className={`dark:bg-gray-700 bg-gray-300 rounded-lg shadow-lg p-6 max-w-screen-sm min-w-96 ${dialogSizeControl[size]}`}>
                <div className="flex justify-between items-center mb-4">
                    {switchContent()}
                </div>
            </div>
        </div>
    )
}

//<div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
