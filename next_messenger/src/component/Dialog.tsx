"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function Dialog() {
    const { openYn, contentName } = useAppSelector((state)=> state.dialogStore);
    const dispatch = useAppDispatch();
    React.useEffect(()=> {
        
    },[openYn])

    return (
        <div
            className='relative z-10'
            aria-labelledby='modal-title' 
            role="dialog"
            aria-modal='true'>
            
        </div>
    )
}