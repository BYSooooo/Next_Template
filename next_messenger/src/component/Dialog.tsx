"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function Dialog() {
    const { openYn, contentName } = useAppSelector((state)=> state.dialogStore);
    const dispatch = useAppDispatch();
    React.useEffect(()=> {
        
    },[openYn])

    const dialogBgControl = {
        start : 'ease-in opacity-100 bg-blue-500',
        end : 'ease-out opacity-0'

    }

    return (
        <div 
            className={`relative z-10 duration-300
                ${dialogBgControl[openYn === true ? "start" : "end"]}`
            }
            aria-labelledby='modal-title'
            role="dialog"
            aria-modal="true">
            
            {/* <div 
                className='fixed inset-0 bg-gray-500/75 transition-opacity'
                aria-hidden="true">
                <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>

                </div>    
            </div> */}
            <div>
                <button>
                    Submit
                </button>
                <button>
                    Close
                </button>
            </div>
        </div>
    )
}