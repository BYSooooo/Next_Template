"use client";

import React from 'react';
import { useAppSelector } from "../../redux/hooks";
import NoDisplayName from './NoDisplayName';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import SearchFriend from './SearchFriend';

export default function Dialog() {
    const { openYn, contentName, size, title } = useAppSelector((state)=> state.dialogStore);
    
    React.useEffect(()=> { 
        
    },[openYn])

    const dialogBgControl = {
        open : 'opacity-100',
        close : 'opacity-0 pointer-events-none'
    }

    const dialogSizeControl = {
        oneTwo : 'w-1/2',
        twoThree : 'w-2/3',
        threeFour : 'w-3/4'   
    }

    const switchContent = ()=> {
        switch(contentName) {
            case "noDisplayName" :
                return <NoDisplayName />
            case 'searchFriend' :
                return <SearchFriend />
            default :
            break;
        }
    }
    
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-block bg-opacity-50 transition-opacity ${dialogBgControl[openYn === true ? "open" : "close"]}`}>
            <div className={`dark:bg-gray-700 bg-gray-300 rounded-lg shadow-lg p-6 max-w-96 min-w-96 ${dialogSizeControl[size]}`}>
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
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

//<div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
