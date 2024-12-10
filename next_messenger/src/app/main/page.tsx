"use client"

import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getCurrentUser } from '../../controller/FirebaseController';
import { controlDialog, controlMessageToast } from '../../redux/features';

export default function Page() {
    const dispatch = useAppDispatch()
    
    React.useEffect(()=> {
        getCurUserInfo()
        
    },[])

    const getCurUserInfo = async()=> {
        const { result, value } = await getCurrentUser()
        console.log(value)
        if(result) {
            console.log(value.displayName)
            const displayNameYn = value.displayName ? true : false
            !displayNameYn && dispatch(controlDialog({openYn : true, contentName : "noDisplayName", size : "oneTwo", title: "Confirm"}))            
            
        } else {
            dispatch(controlMessageToast({ 
                openYn : true, 
                title : "Error Occured", 
                type : "error", 
                content : "Authorization Error. Please Login try again."
            }))
        }
    }

    return (
        <div className="flex flex-row mx-auto w-max h-svh text-center justify-center">
            <div className='min-w-96 bg-cyan-200'>
                Hello
            </div>
            <div className='70vw bg-yellow-400' >
                Hello2
            </div> 
        </div>
    )
}