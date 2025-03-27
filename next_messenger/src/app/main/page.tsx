"use client"

import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getCurrentUser } from '../../controller/FirebaseController';
import { controlMessageToast, setUserInfo } from '../../redux/features';
import { firebaseAuth, firebaseStore } from '../../../firebase-config';
import { useRouter } from 'next/navigation';
import WelcomePage from '../../main/WelcomePage';
import { doc, onSnapshot } from 'firebase/firestore';
import Spinner from '../../component/Spinner';
import { firebaseSnapshot } from '../../controller/snapshotController';

export default function Page() {
    const [checkYn, setCheckYn] = React.useState(false);
    const dispatch = useAppDispatch()
    const fireAuth = firebaseAuth;
    const router = useRouter();

    React.useEffect(()=> {
        if(fireAuth.currentUser) {
            firebaseSnapshot()
            //getCurUserInfo()
        } else {
            dispatch(controlMessageToast({type : "error", title : "Login Error", content : "Please Try Login Again.", openYn : true}))
            router.push("/login")
        }
    },[])

    

    const getCurUserInfo = ()=> {
        const uuid = fireAuth.currentUser.uid;
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

        getCurrentUser().then((response) => {
            if(response.result) {
                dispatch(setUserInfo(response.value))
                const displayNameYn = response.value.displayName ? true : false
                !displayNameYn
                    ? router.push("/noname")
                    : setCheckYn(true)

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
        <div className="flex flex-col mx-auto w-max h-svh text-center justify-center pt-14 pb-2 max-w-[60rem]">
            { checkYn 
                ? <WelcomePage />
                : <Spinner size={16}/>           
            }
        </div> 
    )
}
