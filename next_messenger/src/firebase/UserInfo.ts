// Firebase Function of User Information 

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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

/**
 * get UserList by Sorting and Keyword
 * @param keyword search keyword
 * @param sort Sorting
 * @returns 
 */
export async function getUserListForSearch(keyword : string, sort : string) {

    const infoColRef = collection(firebaseStore,"userInfo");
    const imgColRef = collection(firebaseStore, "avatarImg");
    const profileImgColRef = collection(firebaseStore, "profileImg");
    
    try {
        const aResults = [];
        if(keyword.length > 0) {
            // Get Documents Datas
            const currentUid = firebaseAuth.currentUser.uid;
            const userInfos = await getDocs(infoColRef);
            const avatarImgs = await getDocs(imgColRef);
            
            const friendList = (await getDoc(doc(firebaseStore, "userInfo", currentUid))).data().friend;
            let avatarList = [];
            
            avatarImgs.forEach((doc)=> {
                const data = doc.data();
                avatarList.push(data)
            })
            
            userInfos.forEach((doc)=> { 
                const docData = doc.data();
                const friendYn = friendList.includes(docData.uid)
                const currenYn = docData.uid !== currentUid

                if(!friendYn && currenYn) {
                    const findAvatarDoc = avatarList.find((item)=> item.email === docData.email);
                    const data : UserInfo = {
                        uid : docData.uid,
                        email : docData.email,
                        displayName : docData.displayName,
                        emailVerified : docData.emailVerified,
                        avatarImg : findAvatarDoc.avatarImg,
                        avatarOpenYn : findAvatarDoc.avatarOpenYn,
                        profileImg : "",
                        profileImgOpenYn : false,
                        received : docData.received,
                        requested : docData.requested,
                        friend : docData.friend,

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

/**
 * get User Information selected
 * @param friendInfo 
 * @returns 
 */
export async function getSelectedUserInfo(friendInfo: {uuid : string, chatId? : string}) {
    const infoDocRef = doc(firebaseStore,"userInfo", friendInfo.uuid);
    const avatarDocRef = doc(firebaseStore, "avatarImg", friendInfo.uuid);
    const profileImgDocRef = doc(firebaseStore, "profileImg", friendInfo.uuid);

    try {
        const infoDoc = await getDoc(infoDocRef);
        const avatarDoc = await getDoc(avatarDocRef);
        const profileImgDoc = await getDoc(profileImgDocRef);

        const userInfo = infoDoc.data();
        const avatarInfo = avatarDoc.data();
        const profileImgInfo = profileImgDoc.data();

        const data : UserInfo = {
            uid : friendInfo.uuid,
            email : userInfo.email,
            displayName : userInfo.displayName,
            emailVerified : userInfo.emailVerified,
            avatarImg : avatarInfo.avatarImg,
            avatarOpenYn : avatarInfo.avatarOpenYn,
            profileImg : profileImgInfo.profileImg,
            profileImgOpenYn : profileImgInfo.profileImgOpenYn,
            received : userInfo.received,
            requested : userInfo.requested,
            friend : userInfo.friend
        }
        return { result : true, value : data };
    } catch(error) {
        return { result : false, value : error}
    }
}