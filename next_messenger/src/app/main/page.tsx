"use client"

import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getCurrentUser } from '../../controller/FirebaseController';
import { controlDialog, controlMessageToast } from '../../redux/features';
import FriendList from '../../main/FriendList';
import MainPage from '../../main/MainPage';
import { firebaseAuth } from '../../../firebase-config';
import { useRouter } from 'next/navigation';

export default function Page() {
    const dispatch = useAppDispatch()
    const fireAuth = firebaseAuth;
    const router = useRouter();
    React.useEffect(()=> {
        
        if(fireAuth.currentUser) {
            getCurUserInfo()
        } else {
            dispatch(controlMessageToast({type : "error", title : "Login Error", content : "Please Try Login Again.", openYn : true}))
            router.push("/")
        }
    },[])

    const getCurUserInfo = ()=> {
        getCurrentUser().then((response) => {
            if(response.result) {
                console.log(response.value.displayName)
                const displayNameYn = response.value.displayName ? true : false
                !displayNameYn && dispatch(controlDialog({openYn : true, contentName : "noDisplayName", size : "oneTwo", title: "Confirm"}))
            } else {
                dispatch(controlMessageToast({ 
                    openYn : true, 
                    title : "Error Occured", 
                    type : "error", 
                    content : "Authorization Error. Please Login try again."
                }))
            }
        })
    }

    return (
        <div className="flex flex-row mx-auto w-max h-dvh text-center justify-center">
            <FriendList />
            <MainPage />
        </div> 
    )
}
