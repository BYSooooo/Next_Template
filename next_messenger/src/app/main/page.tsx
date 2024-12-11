"use client"

import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getCurrentUser } from '../../controller/FirebaseController';
import { controlDialog, controlMessageToast } from '../../redux/features';
import FriendList from '../../main/FriendList';

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
        <div className="flex flex-row mx-auto w-max h-dvh text-center justify-center">
            <div className='max-w-[15rem] w-[30vw] bg-cyan-200'>
                <FriendList />
            </div>
            <div className='max-w-[70vw] w-[100vw] bg-yellow-400' >
                Hello2
            </div> 
        </div>
    )
}