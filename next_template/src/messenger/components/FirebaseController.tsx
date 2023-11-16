import React from 'react';
import { firebaseAuth, firebaseStore, firebaseStrg } from '../../../firebaseConfig';
import { ref } from 'firebase/storage';
import { setDoc, doc, getDoc } from 'firebase/firestore';

const userAuth = firebaseAuth;

export const setInitUserInfo = async () => {
    if(userAuth.currentUser) {
        try {
            await setDoc(doc(firebaseStore,'userInfo',userAuth.currentUser.email), {
                uid : userAuth.currentUser.uid,
                email : userAuth.currentUser.email,
                emailVerified : userAuth.currentUser.emailVerified,
                displayName : userAuth.currentUser.displayName,
                photoURL : userAuth.currentUser.photoURL,
            }, { merge : true})
        } catch(error) {
            console.log("InitUserInfo Error : ",error)
        }
        
    } else {
        console.log("Not Logined")
    }
}
export const getUserInfo = async() => {
    const docRef = doc(firebaseStore,'userInfo',userAuth.currentUser.email);
    
    try {
        const result = await getDoc(docRef);
        return result.data()
    } catch(error) {
        console.log(error)
    }
}