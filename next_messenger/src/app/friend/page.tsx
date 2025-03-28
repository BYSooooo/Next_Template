"use client";

import React from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../../firebase-config";
import ReceiveRequestList from "../../friend/ReceiveRequestList"
import SendRequestList from "../../friend/SendRequestList"
import SideNavigation from "../../main/SideNaigation"
import { getCurrentUser } from "../../controller/FirebaseController";
import { useAppDispatch } from "../../redux/hooks";
import { controlMessageToast, setUserInfo } from "../../redux/features";

export default function Page() {
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        getCurUserInfo()
    },[])

    const getCurUserInfo = ()=> {
        const uuid = firebaseAuth.currentUser.uid;
            // set Snapshot for Listen when Update
            const docRef = doc(firebaseStore,'userInfo',uuid);
            onSnapshot(docRef,(response)=> {
                console.log("Refresh UserInfo")
                getCurrentUser().then((response)=> {
                    const { result, value } = response;
                    result 
                        ? dispatch(setUserInfo(value))
                        : dispatch(controlMessageToast({ 
                            openYn : true, 
                            title : "Error Occured", 
                            type: 'error', 
                            content : 'Error during update'}))
                })
            })
            const docRef2 = doc(firebaseStore,'avatarImg', uuid)
            onSnapshot(docRef2, (response)=> {
                console.log("Refresh avatarImg")
                getCurrentUser().then((response)=> {
                    const { result, value } = response;
                    result 
                        ? dispatch(setUserInfo(value))
                        : dispatch(controlMessageToast({ 
                            openYn : true, 
                            title : "Error Occured", 
                            type: 'error', 
                            content : 'Error during update'}))
                })
            })
    }
    
    return (
        <div className="flex flex-row mx-auto w-max h-svh text-center justify-center pt-14 pb-2">
            <div className='flex max-w-[10vw]'>
                <SideNavigation />
            </div>
            <div className='default-box 
                flex flex-col w-[55rem] h-full ml-1 p-5 gap-2'>
                <p className="font-bold text-start text-4xl">
                    Friend Manage
                </p>
                <div className="grid grid-flow-col  grid-cols-3 gap-2">
                    <SendRequestList  />
                    <ReceiveRequestList />
                    <div className="default-box-inner">
                        <p className="text-xl font-bold text-start">
                            Delete Friend
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}