"use client";

import React from 'react';
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { doc, onSnapshot } from 'firebase/firestore';
import { getCurrentUser } from './FirebaseController';
import { useAppDispatch } from '../redux/hooks';
import { controlMessageToast, setUserInfo } from '../redux/features';

export default function snapshotController() {
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        const uuid = firebaseAuth.currentUser.uid;
        const curDocRef = doc(firebaseStore, 'userInfo', uuid)

        // Snapshot : UserInfo Document Listener
        onSnapshot(curDocRef, ()=> {
            getCurrentUser().then((response)=> {
                const { result, value } = response;
                result
                    ? dispatch(setUserInfo(value))
                    : dispatch(controlMessageToast({
                        openYn : true,
                        title : "Error Occured",
                        type : 'error',
                        content : 'Failed Update'
                    }))
            })            
        })

        // Snapshot : AvatarImg Document Listener


        

        
    },)

}