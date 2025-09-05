// Firebase Function of User Information 

import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, setDoc, writeBatch } from "firebase/firestore";
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

/**
 * Handle of Sending friend Reqeust by add new 
 * @param sort Add or Reject
 * @param receiverUid Friend uuid sending request
 * @returns 
 */
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
                setDoc(sendRequestUserDoc,
                    {   requested : arrayRemove(uid),
                        friend : arrayUnion({uuid : uid, chatId : ""})
                    },
                    { merge : true }
                ).then(()=> {
                    setDoc(currentUserDoc,
                        {
                            received : arrayRemove(requestUid),
                            friend : arrayUnion({uuid : requestUid, chatId : ""})
                        },
                        { merge : true}
                    )
                })
                
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
            return {result : true, value : "Decline Success"};
        }

    } catch(error) {
        return { result : false, value : error}
    }
};

export async function deleteFriend(friendInfo : UserInfo) {
    try {
        // Process.1 - Search chatId in friend list array at current user document
        const uuid = firebaseAuth.currentUser.uid;
        const friendEntry = friendInfo.friend.find((item)=> item.uuid === uuid);
        
        // If cannot find friend in user Document, return error.
        if(!friendEntry || !friendEntry.chatId) {
            return { result : false, value : "Cannot find Chatting Information"}
        } 
        const chatId = friendEntry.chatId;
        
        // Process.2 - remove each friend info in current user and friend user
        const currentUserDocRef = doc(firebaseStore, 'userInfo', uuid);
        const friendUserDocRef = doc(firebaseStore, 'userInfo', friendInfo.uid);

        const currentUserData = (await getDoc(currentUserDocRef)).data();
        const friendUserData = (await getDoc(friendUserDocRef)).data();

        const updateCurrentUserInfo = currentUserData.friend.filter((item)=> item.uuid !== friendInfo.uid);
        const updateFriendUserInfo = friendUserData.friend.filter((item)=> item.uuid !== uuid);

        const batch = writeBatch(firebaseStore);
        batch.update(currentUserDocRef, { friend : updateCurrentUserInfo});
        batch.update(friendUserDocRef, { friend : updateFriendUserInfo});
        await batch.commit();

        // Process.3 - remove sub collection in chat document.
        const messagesCollectionRef = collection(firebaseStore, `chat/${chatId}/messages`);
        const messagesSnapshot = await getDocs(messagesCollectionRef);

        const messagesDeletionPromises = messagesSnapshot.docs.map((messageDoc) =>
            deleteDoc(doc(messagesCollectionRef, messageDoc.id))
        );

        await Promise.all(messagesDeletionPromises);

        const filesCollectionRef = collection(firebaseStore, `chat/${chatId}/files`);
        const filesSnapshot = await getDocs(filesCollectionRef);

        const filesDeletionPromises = filesSnapshot.docs.map((fileDoc) =>
            deleteDoc(doc(filesCollectionRef, fileDoc.id))
        );

        await Promise.all(filesDeletionPromises);

        // Process.4 - Remove Chat Document
        const chatDocRef = doc(firebaseStore, "chat", chatId);
        await deleteDoc(chatDocRef);

        
        return { result : true, value : "Success"}
    } catch(error) {
        return { result : false, value : error}
    }
};