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
        if(result) {
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
        <div className="container flex flex-col mx-auto w-max h-svh text-center justify-center">
            This is Main
        </div>
    )
}