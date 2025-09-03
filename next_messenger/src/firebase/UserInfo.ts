// Firebase Function of User Information 

import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { UserInfo } from "../../typeDef";

// current user authentication
const currentUserAuth = firebaseAuth.currentUser;

/**
 * Initialize of Collection for First Time Login User
 * @returns 
 */
export async function initUserInfo() {
    if(currentUserAuth) {
        const currentUid = currentUserAuth.uid

        const docInfoRef = doc(firebaseStore, 'userInfo', currentUid);
        const docImgRef = doc(firebaseStore, 'avatarImg', currentUid);
        const docProfileImgRef = doc(firebaseStore, 'profileImg', currentUid);
        
        try {
            const currentDoc = await getDoc(docInfoRef)
            const currentDocData = currentDoc.data();
            
            // Check Y/N current User's Info in  firestore base 'userInfo' Collection
            if(currentDocData) {
                return { result : true, content : currentDocData}
            } else {
                // Init Setting for 'UserInfo' Collection
                await setDoc(docInfoRef, {
                    uid : currentUid,
                    email : currentUserAuth.email,
                    emailVerified : currentUserAuth.emailVerified,
                    displayName : currentUserAuth.displayName,
                    requested : [],
                    received : [],
                    friend : []
                }, { merge : true })

                // Init Setting for 'avatarImg' Collection
                await setDoc(docImgRef, {
                    uid : currentUserAuth.uid,
                    email : currentUserAuth.email,
                    avatarImg : "",
                    avatarOpenYn : false
                }, { merge : true })
                
                // Init Setting for 'profileImg' Collection
                await setDoc(docProfileImgRef, {
                    uid : currentUserAuth.uid,
                    email : currentUserAuth.email,
                    profileImg : "",
                    profileImgOpenYn : false
                }, { merge : true})
                return { result : true, content : ""};
            }

        } catch(error) {
            return { result : false, content : error}
        }
    }
};

/**
 * get Current User Information 
 * @returns 
 */
export async function getCurrentUser() {
    
    if(currentUserAuth) {
        const currentUid = currentUserAuth.uid
        // UserInfo Document
        const docRef1 = doc(firebaseStore, 'userInfo', currentUid);
        // Avatar Image Document
        const docRef2 = doc(firebaseStore, 'avatarImg', currentUid);
        // Profile Image Document
        const docRef3 = doc(firebaseStore, 'displayImg', currentUid);
        
        try {
            // Get document data of user information
            const userInfoResponse = await getDoc(docRef1);
            const userInfoDocData = userInfoResponse.data();
            const avatarImgResponse = await getDoc(docRef2);
            const avatarImgDocData = avatarImgResponse.data();
            const profileImgResponse = await getDoc(docRef3);
            const profileImgDocData = profileImgResponse.data();
                
            const data : UserInfo = {
                uid : currentUid,
                email : userInfoDocData.email,
                emailVerified : userInfoDocData.emailVerified,
                displayName : userInfoDocData.displayName,
                avatarImg : avatarImgDocData ? avatarImgDocData.avatarImg : "",
                avatarOpenYn : avatarImgDocData ? avatarImgDocData.avatarOpenYn : false,
                requested : userInfoDocData.requested,
                received : userInfoDocData.received,
                friend : userInfoDocData.friend,
                profileImg : profileImgDocData ? profileImgDocData.profileImg : "",
                profileImgOpenYn : profileImgDocData ? profileImgDocData.profileImgOpenYn : false
            };

            return { result : true, value : data}
                
        } catch(error) {
            return { result : false, value : error }
        }
    }
};

/**
 * Update current user information
 * @param content Object of key-value for update
 * @returns 
 */
export async function updateUserInfo(content? : [{key : string, value : any}]) {
    
    const docRef = doc(firebaseStore, 'userInfo', currentUserAuth.uid);
    const aDatas = content.map((item)=> {
        return { [item.key] : item.value }       
    })
    try {
        await setDoc(docRef, Object.assign({},...aDatas), {
            merge : true
        })
        return { result : true, content : ""};
    } catch(error) {
        return { result : false, value : error};
    }

};