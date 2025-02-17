import {    
    collection, 
    deleteDoc, 
    doc, 
    getDoc, 
    getDocs, 
    getDocsFromServer, 
    setDoc 
} from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { binaryEncode } from "./AvatarBinaryController";

const userAuth = firebaseAuth;

export async function initUserInfo() {
    if(userAuth.currentUser) {
        const docInfoRef = doc(firebaseStore, 'userInfo', userAuth.currentUser.uid);
        const docImgRef = doc(firebaseStore, 'avatarImg', userAuth.currentUser.uid);
        try {
            const currentDoc = await getDoc(docInfoRef)
            // Check Y/N current User's Info in  firestore base 'userInfo' Collection
            if(currentDoc.data()) {
                return { result : true, content : currentDoc.data()}
            } else {
                await setDoc(docInfoRef, {
                    email : userAuth.currentUser.email,
                    emailVerified : userAuth.currentUser.emailVerified,
                    displayName : userAuth.currentUser.displayName
                }, { merge : true })
                await setDoc(docImgRef, {
                    email : userAuth.currentUser.email,
                    avatarImg : "",
                    avatarOpenYn : false
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
        const docRef1 = doc(firebaseStore, 'userInfo', uuid);
        const docRef2 = doc(firebaseStore, 'avatarImg', uuid);
        try {
            const response1 = await getDoc(docRef1);
            const docData = response1.data();
            const response2 = await getDoc(docRef2);
            const docData2 = response2.data();

            const data : UserInfo = {
                email : docData.email,
                emailVerified : docData.emailVerified,
                displayName : docData.displayName,
                avatarImg : docData2 ? docData2.avatarImg : "",
                avatarOpenYn : docData2 ? docData2.avatarOpenYn : false
            };

            return { result : true, value : data}
                
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
    console.log(aDatas)
    try {
        await setDoc(docRef, Object.assign({},...aDatas), {
            merge : true
        })
        return { result : true, content : ""};
    } catch(error) {
        return { result : false, value : error};
    }

}

export async function getUserListForSearch(keyword : string, sort : string) {
    const colRef = collection(firebaseStore,"userInfo");
    try {
        let aResults = []
        if(keyword.length > 0) {
            await getDocs(colRef).then((response)=> {
                response.forEach((doc)=> {
                    const data = doc.data() as UserInfo;
                    if(firebaseAuth.currentUser.email !== data.email) {
                        data[sort].includes(keyword) && aResults.push(data)
                    }
                })
            });
        }
        return { result : true, value : aResults }
    } catch(error) {
        return { result : false, value : error }
    }
}

export async function setAvatarBinary(file : File) {
    const { email, uid } = firebaseAuth.currentUser;
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
    const { email, uid } = firebaseAuth.currentUser;
    const docRef = doc(firebaseStore,'avatarImg', uid);

    try {
        const result = await deleteDoc(docRef)
        return { result : true, value : result };
    } catch(error) {
        return { result : false, value : error };
    }
}

export async function getFriendList() {
    const { email, uid } = firebaseAuth.currentUser;
    const colRef = collection(firebaseStore,'friendList',uid);
    try {
        const results = await getDocsFromServer(colRef);
        return { result : true, value : results };
    } catch (error) {
        return { result : false, value : error}
    }
}