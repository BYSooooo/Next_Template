"use client"
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { controlDialog } from '../../redux/features';

export default function Page() {
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        
    },[])

    const onClickTest = ()=> {
        console.log("clicked")
        dispatch(controlDialog({ openYn : true, contentName : ""}))
    }

    return (
        <div className="container flex flex-col mx-auto w-max h-svh text-center justify-center">
            <button onClick={onClickTest}>
                Test
            </button>
        </div>
    )
}