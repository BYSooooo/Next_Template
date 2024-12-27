"use client"

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCurrentUser } from '../../controller/FirebaseController';
import { controlDialog, controlMessageToast, controlPageLayout } from '../../redux/features';
import FriendList from '../../main/FriendList';
import MainPage from '../../main/MainPage';
import { firebaseAuth } from '../../../firebase-config';
import { useRouter } from 'next/navigation';
import SideNavigation from '../../main/SideNaigation';
import WelcomePage from '../../main/WelcomePage';

export default function Page() {
    const pageReducer = useAppSelector((state)=> state.pageStore);
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
            console.log(response.result)
            if(response.result) {
                console.log(response.value.displayName)
                const displayNameYn = response.value.displayName ? true : false
                !displayNameYn 
                    ? dispatch(controlDialog({openYn : true, contentName : "noDisplayName", size : "oneTwo", title: "Confirm"}))
                    : dispatch(controlPageLayout({middle : 'WelcomePage', right : ''}))
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

    const pageRouter = (componentName : string) => {
        switch(componentName) {
            case 'WelcomePage' : return <WelcomePage />
            case 'FriendList' : return <FriendList />
            case 'MainPage' : return <MainPage />
            default : break;
        }
    }
    
    return (
        <div className="flex flex-row mx-auto w-max h-svh text-center justify-center pt-14 pb-2">
            <div className='flex'>
                <SideNavigation />
            </div>
            <div className='flex flex-row max-w-[90vw]'>
                <div className='flex'>
                    {pageRouter(pageReducer.middle)}
                </div>
                <div className='flex'>
                    {pageRouter(pageReducer.right)}
                </div>
            </div>
        </div> 
    )
}
