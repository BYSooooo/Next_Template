"use client"

import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getCurrentUser } from '../../controller/FirebaseController';
import { controlMessageToast, setUserInfo } from '../../redux/features';
import { firebaseAuth } from '../../../firebase-config';
import { useRouter } from 'next/navigation';
import WelcomePage from '../../main/WelcomePage';
import Spinner from '../../component/Spinner';

export default function Page() {
    const [checkYn, setCheckYn] = React.useState(false);
    const dispatch = useAppDispatch();
    const fireAuth = firebaseAuth;
    const router = useRouter();

    React.useEffect(()=> {
        if(fireAuth.currentUser) {
            nameCheck()
        } else {
            dispatch(controlMessageToast({type : "error", title : "Login Error", content : "Please Try Login Again.", openYn : true}))
            router.push("/login")
        }
    },[])
    const nameCheck = ()=> {
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
