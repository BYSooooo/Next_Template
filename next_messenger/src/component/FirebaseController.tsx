import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";

const userAuth = firebaseAuth;

export async function initUserInfo() {
    if(userAuth.currentUser) {
        const docRef = doc(firebaseStore, 'userInfo', userAuth.currentUser.uid);
        try {
            await setDoc(docRef, {
                email : userAuth.currentUser.email,
                emailVerified : userAuth.currentUser.emailVerified,
                displayName : userAuth.currentUser.displayName,
                photoURL : userAuth.currentUser.photoURL
            }, { merge : true })
            return { result : true, content : ""};
        } catch(error) {
            return { result : false, content : error}
        }
    }
}