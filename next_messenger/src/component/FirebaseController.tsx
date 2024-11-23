import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";

const userAuth = firebaseAuth;

export async function initUserInfo() {
    if(userAuth.currentUser) {
        const docRef = doc(firebaseStore, 'userInfo', userAuth.currentUser.email);
        try {
            setDoc(docRef, {
                ...userAuth.currentUser
            }, { merge : true })
            return { result : true, content : ""};
        } catch(error) {
            return { result : false, content : error}
        }
    }
}