"use client";

import React from 'react';
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { doc, onSnapshot } from 'firebase/firestore';
import { getCurrentUser } from './FirebaseController';
import { useAppDispatch } from '../redux/hooks';
import { controlMessageToast, setUserInfo } from '../redux/features';

export function firebaseSnapshot() {
    
    
        const dispatch = useAppDispatch()
        const uuid = firebaseAuth.currentUser.uid;
        const curDocRef = doc(firebaseStore, 'userInfo', uuid)

        // Snapshot : UserInfo Document Listener
        const currentSnapshot = onSnapshot(curDocRef, ()=> {
            console.log("currentSnapshot Called")
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
        const avatarDocRef = doc(firebaseStore, 'avatarImg', uuid);
        const avatarSnapshot = onSnapshot(avatarDocRef, ()=> {
            console.log("avatarSnapshot Called")
            getCurrentUser().then((response)=> {
                const { result, value } = response;
                result 
                    ? dispatch(setUserInfo(value))
                    : dispatch(controlMessageToast({
                        openYn : true,
                        title : "Error Occured",
                        type : 'error',
                        content : 'Error During update'
                    }))
            })
        })
}