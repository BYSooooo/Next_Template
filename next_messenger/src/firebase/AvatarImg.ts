import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { binaryEncode } from "../controller/BinaryController";

const currentUserAuth = firebaseAuth.currentUser;

export async function manageAvatar({file, avatarOpenYn, action} : {file?: File, avatarOpenYn?: boolean, action: 'set'|'delete'|'openYn'}) {

    if(!currentUserAuth) {
        return { result : false, value : "User not logined"};
    }
    const docRef = doc(firebaseStore, 'avatarImg', currentUserAuth.uid);
    
    try {
        switch(action) {
            case 'set' : 
                const fileString = file ? await binaryEncode(file) : "";
                const setResult = await updateDoc(docRef, { avatarImg : fileString})
                return { result : true, value : setResult }; 
            case 'delete' : 
                const delResult = await updateDoc(docRef, { avatarImg : ""});
                return { result : true, value : delResult };
            case 'openYn' :
                const openResult = await updateDoc(docRef, { avatarOpenYn : avatarOpenYn}) 
                return { result : true, value : openResult}   
        }
    } catch (error) {
        return { result: false, value : error };
    }
}

export async function setAvatarBinary(file : File) {
    const { email, uid } = currentUserAuth;
    const binary = await binaryEncode(file)

    const docRef = doc(firebaseStore, 'avatarImg', uid)
    try {
        const result = await setDoc(docRef, { email : email, avatarImg : binary })
        return { result : true, value : result }
        
    } catch (error) {
        return { result : false, value : error }
    }
}

export async function delAvatarBinary() {
    const { email, uid } = currentUserAuth;
    const docRef = doc(firebaseStore,'avatarImg', uid);

    try {
        const result = await updateDoc(docRef, {
            avatarImg : ""
        })
        return { result : true, value : result };
    } catch(error) {
        return { result : false, value : error };
    }
}

export async function updateAvatarOpenYn(avatarOpenYn : boolean) {
    const { email, uid } = currentUserAuth;
    const docRef = doc(firebaseStore, 'avatarImg', uid);
    try {
        const result = await updateDoc(docRef, {
            avatarOpenYn : avatarOpenYn
        })
        return { result : true, value : result };

    } catch(error) {
        return { result : false, value : error };
    }
}