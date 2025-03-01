"use client";

import { PowerIcon } from "@heroicons/react/24/outline";
import { firebaseAuth } from "../../../firebase-config";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "../../redux/hooks";
import { controlMessageToast, controlPageLayout } from "../../redux/features";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const currentAuth = firebaseAuth;
    const dispatch = useAppDispatch();
    const router = useRouter()

    const onClickLogout = ()=> {
        signOut(currentAuth).then(()=> {
            dispatch(controlPageLayout({ left : '', middle : '', right : ''}))
            dispatch(controlMessageToast({ openYn : true, type : 'info', title : 'Success', content : 'Sign-Out Success'}))
            router.push("/")
        }).catch((error)=> {
            controlMessageToast({ openYn : true, type : 'error', title : 'Error' , content : error})
        })
    };

    return <PowerIcon onClick={onClickLogout} className="w-6 h-6 text-white hover:cursor-pointer"/>   
        
    
}