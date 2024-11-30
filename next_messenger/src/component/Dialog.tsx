"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function Dialog() {
    const { openYn, contentName } = useAppSelector((state)=> state.dialogStore);
    
    React.useEffect(()=> {
        console.log(openYn)
        console.log("Called")
    },[openYn])

    const dialogBgControl = {
        open : 'opacity-100',
        close : 'opacity-0 pointer-events-none'
    }
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-block bg-opacity-50 transition-opacity ${dialogBgControl[openYn === true ? "open" : "close"]}`}>
            <div className='bg-white rounded-lg shadow-lg p-6 max-w-screen-sm w-full'>
                <div className="flex justify-between items-center mb-4">
                    <p>
                        Hello
                    </p>
                </div>
            </div>
        </div>
    )
}

//<div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
