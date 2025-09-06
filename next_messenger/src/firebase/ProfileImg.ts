import { doc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { binaryEncode } from "../controller/BinaryController";

const currentUser = firebaseAuth.currentUser;

export async function manageProfileImage({file, profileImgOpenYn, action } : {file?: File, profileImgOpenYn?: boolean, action: 'set'|'delete'|'openYn'}) {
    if(!currentUser) {
        return { result : false, value : "User not logined"};
    }
    const docRef = doc(firebaseStore, 'profileImg', currentUser.uid);

    try {
        switch(action) {
            case 'set' : 
                const fileString = file ? await binaryEncode(file) : "";
                const setResult = await updateDoc(docRef, { profileImg : fileString });
                return { result : true, value : setResult };
            case 'delete' :
                const delResult = await updateDoc(docRef, { profileImg : "", profileImgOpenYn : false }) 
                return { result : true, value : delResult };
            case 'openYn' : 
                const openResult = await updateDoc(docRef, { profileImgOpenYn : profileImgOpenYn})
                return { result : true, value : openResult };
        };
    } catch(error) {
        return { result : false, value : error };
    }
}