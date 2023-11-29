import React from 'react';

import { firebaseAuth, firebaseStore, firebaseStrg } from '../../../firebaseConfig';
import { ListResult, getDownloadURL, listAll, ref, uploadString } from 'firebase/storage';
import { setDoc, doc, getDoc, updateDoc, query, collection } from 'firebase/firestore';
import { Co2Sharp } from '@mui/icons-material';

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
/**
 * Upload Image File's String Value to Firebase Storage
 * @param fileString upload Image File generated by `FileReader()`
 * @return `Object` result : boolean, value : optional
 */
export const uploadPhotoToStrg = async(fileString : string) => {
    const storageRef = ref(firebaseStrg,`userInfo/${userAuth.currentUser.email}/photoURL`);
    try {
        await uploadString(storageRef,fileString,"data_url")    
        return {result : true, value : storageRef}
    } catch(error) {
        console.log(error)
        return {result : false, value : null}
    } 
}

export const updatePhotoURL = async(url : string)=> {
    const docRef = doc(firebaseStore,'userInfo',userAuth.currentUser.email);
    try {
        await updateDoc(docRef, { photoURL : url });
        return true;
    } catch(error) {
        return false;
    } 
}

export const getUserListInStrg = async()=> {
    const storageRef = ref(firebaseStrg, 'userInfo');    
    let userList = []
    try {
        await listAll(storageRef)
            .then((response)=> {
                response.prefixes.map((item : any)=> {
                    const mailString = item._location.path_.split('/')[1];
                    userList.push(mailString);
                })
            })
        return { result : true, value : userList }
    } catch(error){
        return { result : false, value : null}
    }
}
export const getUserInfoInStrg = async(email : string)=> {
    const storageRef = ref(firebaseStrg,`userInfo/${email}/photoURL`)
    try {
        const downURL = await getDownloadURL(storageRef)
        return {result : true, value : downURL}
    } catch(error) {
        return {result : false, value : ""}
    }
    
}