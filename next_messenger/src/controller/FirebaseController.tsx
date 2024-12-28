import {    doc, 
            getDoc, 
            onSnapshot, 
            setDoc 
        } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { useAppDispatch } from "../redux/hooks";

const userAuth = firebaseAuth;

export async function initUserInfo() {
    if(userAuth.currentUser) {
        const docRef = doc(firebaseStore, 'userInfo', userAuth.currentUser.uid);
        try {
            const currentDoc = await getDoc(docRef)
            // Check Y/N current User's Info in  firestore base 'userInfo' Collection
            if(currentDoc.data()) {
                return { result : true, content : currentDoc.data()}
            } else {
                await setDoc(docRef, {
                    email : userAuth.currentUser.email,
                    emailVerified : userAuth.currentUser.emailVerified,
                    displayName : userAuth.currentUser.displayName,
                    photoURL : userAuth.currentUser.photoURL
                }, { merge : true })
                return { result : true, content : ""};
            }

        } catch(error) {
            return { result : false, content : error}
        }
    }
}

export async function getCurrentUser() {
    console.log(userAuth.currentUser)
    if(userAuth.currentUser) {
        const uuid = userAuth.currentUser.uid
        const docRef = doc(firebaseStore, 'userInfo', uuid);
        try {
            const response = await getDoc(docRef);
            const docData = response.data();
            return { result : true, value : docData as UserInfo}
                
        } catch(error) {
            return { result : false, value : error }
        }
    }
}

export async function updateUserInfo(content? : [{key : string, value : any}]) {
    const uid = userAuth.currentUser.uid
    const docRef = doc(firebaseStore, 'userInfo', uid);
    const aDatas = content.map((item)=> {
        return { [item.key] : item.value }       
    },)
    try {
        await setDoc(docRef, Object.assign({},...aDatas), {
            merge : true
        })
        return { result : true, content : ""};
    } catch(error) {
        return { result : false, value : error};
    }

}