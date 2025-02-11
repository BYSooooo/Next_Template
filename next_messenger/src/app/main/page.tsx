"use client"

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCurrentUser, updateUserInfo } from '../../controller/FirebaseController';
import { controlDialog, controlMessageToast, controlPageLayout, setUserInfo } from '../../redux/features';
import FriendList from '../../main/FriendList';
import MainPage from '../../main/MainPage';
import { firebaseAuth, firebaseStore } from '../../../firebase-config';
import { useRouter } from 'next/navigation';
import SideNavigation from '../../main/SideNaigation';
import WelcomePage from '../../main/WelcomePage';
import { doc, getDocs, onSnapshot } from 'firebase/firestore';
import UserDetailInfo from '../../main/UserDetailInfo';

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
        const uuid = fireAuth.currentUser.uid;
        const docRef = doc(firebaseStore,'userInfo',uuid);
        onSnapshot(docRef,(response)=> {
            console.log("Refresh UserInfo")
            const userInfoData = response.data();
            // userInfoData && dispatch(setUserInfo(userInfoData));
            
        })
        const docRef2 = doc(firebaseStore,'avatarImg', uuid)
        onSnapshot(docRef2, (response)=> {
            console.log("Refresh avatarImg")
            const avatarImgData = response.data() as {email : string, avatarImg : string};
            // avatarImgData && dispatch(setUserInfo({ avatarImg : avatarImgData.avatarImg}));
            
        })

        getCurrentUser().then((response) => {
            console.log(response.result)
            if(response.result) {
                const displayNameYn = response.value.displayName ? true : false
                !displayNameYn 
                    ? dispatch(controlDialog({openYn : true, contentName : "noDisplayName", size : "fit", title: "Confirm"}))
                    : dispatch(controlPageLayout({left: '', middle : 'WelcomePage', right : ''}))
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
            case '' : return null
            case 'SideNavigation' : return <SideNavigation />
            case 'WelcomePage' : return <WelcomePage />
            case 'FriendList' : return <FriendList />
            case 'MainPage' : return <MainPage />
            case 'UserDetailInfo' : return <UserDetailInfo />
            default : break;
        }
    }
    
    return (
        <div className="flex flex-row mx-auto w-max h-svh text-center justify-center pt-14 pb-2">
            <div className='flex max-w-[10vw]'>
                {pageRouter(pageReducer.left)}
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
