"use client"

import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getCurrentUser } from '../../controller/FirebaseController';
import { controlDialog, controlMessageToast } from '../../redux/features';
import FriendList from '../../main/FriendList';
import MainPage from '../../main/MainPage';
import { firebaseAuth } from '../../../firebase-config';
import { useRouter } from 'next/navigation';
import SideNavigation from '../../main/SideNaigation';

export default function Page() {
    const [ naviIndex, selNaviIndex ] = React.useState(0)
    const dispatch = useAppDispatch()
    const fireAuth = firebaseAuth;
    const router = useRouter();
    React.useEffect(()=> {
        selNaviIndex(0)
        if(fireAuth.currentUser) {
            getCurUserInfo()
        } else {
            dispatch(controlMessageToast({type : "error", title : "Login Error", content : "Please Try Login Again.", openYn : true}))
            router.push("/")
        }
    },[])

    const getCurUserInfo = ()=> {
        getCurrentUser().then((response) => {
            console.log(response.result)
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
    const switchMain =()=> {
        
    }

    return (
        <div className="flex flex-row mx-auto w-max h-svh text-center justify-center pt-14 pb-2">
            <SideNavigation />
            <div className='flex flex-row max-w-[90vw]'>
                {/* {switchMain()} */}
                
            </div>
        </div> 
    )
}
