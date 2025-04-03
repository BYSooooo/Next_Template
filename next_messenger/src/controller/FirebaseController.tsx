import {    
    arrayRemove,
    arrayUnion,
    collection, 
    deleteDoc, 
    doc, 
    getDoc, 
    getDocs, 
    getDocsFromServer, 
    setDoc,
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
                    uid : userAuth.currentUser.uid,
                    email : userAuth.currentUser.email,
                    emailVerified : userAuth.currentUser.emailVerified,
                    displayName : userAuth.currentUser.displayName,
                    requested : [],
                    received : []
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
                uid : uuid,
                email : docData.email,
                emailVerified : docData.emailVerified,
                displayName : docData.displayName,
                avatarImg : docData2 ? docData2.avatarImg : "",
                avatarOpenYn : docData2 ? docData2.avatarOpenYn : false,
                requested : docData.requested,
                received : docData.received
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

    const infoColRef = collection(firebaseStore,"userInfo");
    const imgColRef = collection(firebaseStore, "avatarImg");
    
    try {
        const aResults = [];
        if(keyword.length > 0) {
            const currentUid = firebaseAuth.currentUser.uid;
            const userInfos = await getDocs(infoColRef);
            const avatarImgs = await getDocs(imgColRef);
            let avatarList = [];
            
            avatarImgs.forEach((doc)=> {
                const data = doc.data();
                avatarList.push(data)
            })
            
            userInfos.forEach((doc)=> { 
                const docData = doc.data();
                if(docData.uid !== currentUid) {
                    const findAvatarDoc = avatarList.find((item)=> item.email === docData.email);
                    const data : UserInfo = {
                        uid : docData.uid,
                        email : docData.email,
                        displayName : docData.displayName,
                        emailVerified : docData.emailVerified,
                        avatarImg : findAvatarDoc.avatarImg,
                        avatarOpenYn : findAvatarDoc.avatarOpenYn,
                        received : docData.received,
                        requested : docData.requested
                    } 
                    if(keyword.length > 0  && sort.length > 0) {
                        data[sort].includes(keyword) && aResults.push(data)
                    } else {
                        aResults.push(data)
                    }
                }
            })
        }
        return { result : true, value : aResults }
    } catch(error) {
        return { result : false, value : error }
    }
}

export async function getSelectedUserInfo(uid: string) {
    const infoDocRef = doc(firebaseStore,"userInfo", uid);
    const avatarDocRef = doc(firebaseStore, "avatarImg", uid);

    try {
        const infoDoc = await getDoc(infoDocRef);
        const avatarDoc = await getDoc(avatarDocRef);

        const userInfo = infoDoc.data();
        const avatarInfo = avatarDoc.data();
        
        const data : UserInfo = {
            uid : uid,
            email : userInfo.email,
            displayName : userInfo.displayName,
            emailVerified : userInfo.emailVerified,
            avatarImg : avatarInfo.avatarImg,
            avatarOpenYn : avatarInfo.avatarOpenYn,
            received : userInfo.received,
            requested : userInfo.requested
        }
        
        return { result : true, value : data };
    } catch(error) {
        return { result : false, value : error}
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

export async function updateAvatarOpenYn(avatarOpenYn : boolean) {
    const { email, uid } = firebaseAuth.currentUser;
    const docRef = doc(firebaseStore, 'avatarImg', uid);
    try {
        const result = await setDoc(docRef, {
            avatarOpenYn : avatarOpenYn
        },{
            merge : true
        })
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

export async function updateFriendRequest(sort: "add"| "del", receiverUid : string) {
    const { email, uid } = firebaseAuth.currentUser;
    
    try {
        const receiverDocRef = doc(firebaseStore, 'userInfo', receiverUid)
        const curUserDocRef = doc(firebaseStore, 'userInfo', uid);
        switch(sort) {
            case "add" : 
                setDoc(receiverDocRef, 
                    { received : arrayUnion(uid) },
                    { merge : true } )
                    .then(()=> {
                        setDoc(curUserDocRef, 
                            { requested : arrayUnion(receiverUid) },
                            { merge : true } )
                    }) 
            break;
            case "del" : 
                setDoc(curUserDocRef,
                    { requested : arrayRemove(receiverUid) },
                    { merge : true } )  
                    .then(()=> {
                        setDoc(receiverDocRef,
                            { received : arrayRemove(uid) },
                            { merge : true })
                    })  
            break;
        }
        return { result : true, value : "success"};
    } catch(error) {
        return { result : false, value : error}
    }
}

export async function updateFriendReceive(sort : "accept" | "decline", requestUid : string) {
    const { uid } = firebaseAuth.currentUser;
    
    try {
        const currentUserDoc = doc(firebaseStore, 'userInfo', uid);
        const sendRequestUserDoc = doc(firebaseStore, 'userInfo', requestUid);

        switch(sort) {
            case 'accept':

            return { result : true, value : "Accept Success"};
            case 'decline' :
                setDoc(sendRequestUserDoc,
                    { requested : arrayRemove(uid) },
                    { merge : true }
                ).then(()=> {
                    setDoc(currentUserDoc,
                        { received : arrayRemove(requestUid) },
                        { merge : true }
                    )
                })
            return {result : true, value : "Success"};
        }

    } catch(error) {
        return { result : false, value : error}
    }
}