import {    
    addDoc,
    arrayRemove,
    arrayUnion,
    collection, 
    deleteDoc, 
    doc, 
    getDoc, 
    getDocs, 
    getDocsFromServer, 
    orderBy, 
    query, 
    setDoc,
    Timestamp,
    updateDoc,
    where,
    writeBatch
} from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { binaryEncode } from "./BinaryController";
import { Chat, ChatMessage, UserInfo } from "../../typeDef";

const userAuth = firebaseAuth;

// export async function initUserInfo() {
//     if(userAuth.currentUser) {
//         const docInfoRef = doc(firebaseStore, 'userInfo', userAuth.currentUser.uid);
//         const docImgRef = doc(firebaseStore, 'avatarImg', userAuth.currentUser.uid);
//         const docProfileImgRef = doc(firebaseStore, 'profileImg', userAuth.currentUser.uid);
//         try {
//             const currentDoc = await getDoc(docInfoRef)
//             // Check Y/N current User's Info in  firestore base 'userInfo' Collection
//             if(currentDoc.data()) {
//                 return { result : true, content : currentDoc.data()}
//             } else {
//                 await setDoc(docInfoRef, {
//                     uid : userAuth.currentUser.uid,
//                     email : userAuth.currentUser.email,
//                     emailVerified : userAuth.currentUser.emailVerified,
//                     displayName : userAuth.currentUser.displayName,
//                     requested : [],
//                     received : [],
//                     friend : []
//                 }, { merge : true })
//                 await setDoc(docImgRef, {
//                     uid : userAuth.currentUser.uid,
//                     email : userAuth.currentUser.email,
//                     avatarImg : "",
//                     avatarOpenYn : false
//                 }, { merge : true })
//                 await setDoc(docProfileImgRef, {
//                     uid : userAuth.currentUser.uid,
//                     email : userAuth.currentUser.email,
//                     profileImg : "",
//                     profileImgOpenYn : false
//                 }, { merge : true})
//                 return { result : true, content : ""};
//             }

//         } catch(error) {
//             return { result : false, content : error}
//         }
//     }
// }

// export async function getCurrentUser() {
//     if(userAuth.currentUser) {
//         const uuid = userAuth.currentUser.uid
//         // UserInfo Document
//         const docRef1 = doc(firebaseStore, 'userInfo', uuid);
//         // Avatar Image Document
//         const docRef2 = doc(firebaseStore, 'avatarImg', uuid);
//         // Profile Image Document
//         const docRef3 = doc(firebaseStore, 'displayImg', uuid);
//         try {
//             const userInfoResponse = await getDoc(docRef1);
//             const userInfoDocData = userInfoResponse.data();
//             const avatarImgResponse = await getDoc(docRef2);
//             const avatarImgDocData = avatarImgResponse.data();
//             const profileImgResponse = await getDoc(docRef3);
//             const profileImgDocData = profileImgResponse.data();

//             const data : UserInfo = {
//                 uid : uuid,
//                 email : userInfoDocData.email,
//                 emailVerified : userInfoDocData.emailVerified,
//                 displayName : userInfoDocData.displayName,
//                 avatarImg : avatarImgDocData ? avatarImgDocData.avatarImg : "",
//                 avatarOpenYn : avatarImgDocData ? avatarImgDocData.avatarOpenYn : false,
//                 requested : userInfoDocData.requested,
//                 received : userInfoDocData.received,
//                 friend : userInfoDocData.friend,
//                 profileImg : profileImgDocData ? profileImgDocData.profileImg : "",
//                 profileImgOpenYn : profileImgDocData ? profileImgDocData.profileImgOpenYn : false
//             };

//             return { result : true, value : data}
                
//         } catch(error) {
//             return { result : false, value : error }
//         }
//     }
// }

// export async function updateUserInfo(content? : [{key : string, value : any}]) {
//     const uid = userAuth.currentUser.uid
//     const docRef = doc(firebaseStore, 'userInfo', uid);
//     const aDatas = content.map((item)=> {
//         return { [item.key] : item.value }       
//     })
//     try {
//         await setDoc(docRef, Object.assign({},...aDatas), {
//             merge : true
//         })
//         return { result : true, content : ""};
//     } catch(error) {
//         return { result : false, value : error};
//     }

// }

// export async function getUserListForSearch(keyword : string, sort : string) {

//     const infoColRef = collection(firebaseStore,"userInfo");
//     const imgColRef = collection(firebaseStore, "avatarImg");
//     const profileImgColRef = collection(firebaseStore, "profileImg");
    
//     try {
//         const aResults = [];
//         if(keyword.length > 0) {
//             // Get Documents Datas
//             const currentUid = firebaseAuth.currentUser.uid;
//             const userInfos = await getDocs(infoColRef);
//             const avatarImgs = await getDocs(imgColRef);
            
//             const friendList = (await getDoc(doc(firebaseStore, "userInfo", currentUid))).data().friend;
//             let avatarList = [];
            
//             avatarImgs.forEach((doc)=> {
//                 const data = doc.data();
//                 avatarList.push(data)
//             })
            
//             userInfos.forEach((doc)=> { 
//                 const docData = doc.data();
//                 const friendYn = friendList.includes(docData.uid)
//                 const currenYn = docData.uid !== currentUid

//                 if(!friendYn && currenYn) {
//                     const findAvatarDoc = avatarList.find((item)=> item.email === docData.email);
//                     // To Be Continue
//                     const data : UserInfo = {
//                         uid : docData.uid,
//                         email : docData.email,
//                         displayName : docData.displayName,
//                         emailVerified : docData.emailVerified,
//                         avatarImg : findAvatarDoc.avatarImg,
//                         avatarOpenYn : findAvatarDoc.avatarOpenYn,
//                         profileImg : "",
//                         profileImgOpenYn : false,
//                         received : docData.received,
//                         requested : docData.requested,
//                         friend : docData.friend,

//                     } 
//                     if(keyword.length > 0  && sort.length > 0) {
//                         data[sort].includes(keyword) && aResults.push(data)
//                     } else {
//                         aResults.push(data)
//                     }
//                 }
//             })
//         }
//         return { result : true, value : aResults }
//     } catch(error) {
//         return { result : false, value : error }
//     }
// }

// export async function getSelectedUserInfo(friendInfo: {uuid : string, chatId? : string}) {
//     const infoDocRef = doc(firebaseStore,"userInfo", friendInfo.uuid);
//     const avatarDocRef = doc(firebaseStore, "avatarImg", friendInfo.uuid);
//     const profileImgDocRef = doc(firebaseStore, "profileImg", friendInfo.uuid);

//     try {
//         const infoDoc = await getDoc(infoDocRef);
//         const avatarDoc = await getDoc(avatarDocRef);
//         const profileImgDoc = await getDoc(profileImgDocRef);

//         const userInfo = infoDoc.data();
//         const avatarInfo = avatarDoc.data();
//         const profileImgInfo = profileImgDoc.data();

//         const data : UserInfo = {
//             uid : friendInfo.uuid,
//             email : userInfo.email,
//             displayName : userInfo.displayName,
//             emailVerified : userInfo.emailVerified,
//             avatarImg : avatarInfo.avatarImg,
//             avatarOpenYn : avatarInfo.avatarOpenYn,
//             profileImg : profileImgInfo.profileImg,
//             profileImgOpenYn : profileImgInfo.profileImgOpenYn,
//             received : userInfo.received,
//             requested : userInfo.requested,
//             friend : userInfo.friend
//         }
//         return { result : true, value : data };
//     } catch(error) {
//         return { result : false, value : error}
//     }
// }

// export async function manageAvatar({file, avatarOpenYn, action} : {file?: File, avatarOpenYn?: boolean, action: 'set'|'delete'|'openYn'}) {
//     const currentUser = firebaseAuth.currentUser
//     if(!currentUser) {
//         return { result : false, value : "User not logined"};
//     }
//     const docRef = doc(firebaseStore, 'avatarImg', currentUser.uid);
    
//     try {
//         switch(action) {
//             case 'set' : 
//                 const fileString = file ? await binaryEncode(file) : "";
//                 const setResult = await updateDoc(docRef, { avatarImg : fileString})
//                 return { result : true, value : setResult }; 
//             case 'delete' : 
//                 const delResult = await updateDoc(docRef, { avatarImg : ""});
//                 return { result : true, value : delResult };
//             case 'openYn' :
//                 const openResult = await updateDoc(docRef, { avatarOpenYn : avatarOpenYn}) 
//                 return { result : true, value : openResult}   
//         }
//     } catch (error) {
//         return { result: false, value : error };
//     }
// }

// export async function setAvatarBinary(file : File) {
//     const { email, uid } = firebaseAuth.currentUser;
//     const binary = await binaryEncode(file)

//     const docRef = doc(firebaseStore, 'avatarImg', uid)
//     try {
//         const result = await setDoc(docRef, { email : email, avatarImg : binary })
//         return { result : true, value : result }
        
//     } catch (error) {
//         return { result : false, value : error }
//     }
// }

// export async function delAvatarBinary() {
//     const { email, uid } = firebaseAuth.currentUser;
//     const docRef = doc(firebaseStore,'avatarImg', uid);

//     try {
//         const result = await updateDoc(docRef, {
//             avatarImg : ""
//         })
//         return { result : true, value : result };
//     } catch(error) {
//         return { result : false, value : error };
//     }
// }

// export async function updateAvatarOpenYn(avatarOpenYn : boolean) {
//     const { email, uid } = firebaseAuth.currentUser;
//     const docRef = doc(firebaseStore, 'avatarImg', uid);
//     try {
//         const result = await updateDoc(docRef, {
//             avatarOpenYn : avatarOpenYn
//         })
//         return { result : true, value : result };

//     } catch(error) {
//         return { result : false, value : error };
//     }
// }

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
}

export async function createChatRoom(friendUUID : string) {
    const currentUid = firebaseAuth.currentUser.uid;
    try {
        const chatUUID = crypto.randomUUID();
        const curDocRef = doc(firebaseStore, "userInfo", currentUid);
        const friendDocRef = doc(firebaseStore, "userInfo", friendUUID);
        
        // Update Current User Document for Update ChatRoom ID
        const curDocData = (await getDoc(curDocRef)).data();
        const updateCurFriend = curDocData.friend.map((item : {chatId : string, uuid : string})=> {
            return item.uuid === friendUUID
                ? { chatId : chatUUID, uuid : item.uuid}
                : item
        })
        await updateDoc(curDocRef, { friend : updateCurFriend });
        
        // Update Friend User Document for Update ChatRoom ID
        const frdDocData = (await getDoc(friendDocRef)).data();
        const updateFreFriend = frdDocData.friend.map((item : { chatId : string, uuid : string})=> {
            return item.uuid === currentUid
                ? { chatId : chatUUID, uuid : item.uuid}
                : item
        });

        await updateDoc(friendDocRef, { friend : updateFreFriend});

        // create Chat Document
        const chatDocRef = doc(firebaseStore, "chat", chatUUID);
        await setDoc(chatDocRef, { 
            member : [friendUUID, currentUid],
        })

        const messageCol = collection(chatDocRef, "messages");
        const initChat = {
            content : "Please be careful not to write sensitive information such as personal information or account number in the chat.",
            createdAt : new Date(),
            createdBy : "System",
            attachYn : false,
            attachFile : "",
            deleteYn : false
        };
        await addDoc(messageCol, initChat)
        

        return { result : true, value : "success"}
    } catch(error) {
        return { result : false, value : error};
    }
}

export async function setChatRoomMessage(
        chatId: string, 
        content : string, 
        attachYn : boolean, 
        attachFile : string,
        deleteYn : boolean
        ) {
    const colRef = collection(firebaseStore, `chat/${chatId}/messages`);
    const currentUid = firebaseAuth.currentUser.uid
    try {
        const data ={
            content : content,
            attachYn : attachYn,
            attachFile : attachFile,
            createdAt : new Date(),
            createdBy : currentUid,
            deleteYn : deleteYn  
        }
        const response = await addDoc(colRef, data)
        // Update Docoument for Save Document ID
        response && await updateDoc(response, { docId : response.id});
                
        return { result : true, value : "Success"}
    } catch(error) {
        return { result : false, value : error}
    }
}

export async function setChatRoomFile (
    chatId : string,
    attachFile : {name: string, type: string, value: string} ) 
    {
        try {
            const currentUid = firebaseAuth.currentUser.uid
            const uid = crypto.randomUUID();
            const colRef = collection(firebaseStore, `chat/${chatId}/files`);
            const data = {
                UUID: uid,
                name: attachFile.name,
                type : attachFile.type,
                file : attachFile.value,
                createdAt : new Date(),
                createdBy : currentUid
            }  
            await addDoc(colRef, data);
            return { result : true, value : uid}
        } catch(error) {
            return { result : false, value : error}
        }
        
    }

export async function delChatRoomFile(chatId : string, uuid: string) {
    const fileDocRef = collection(firebaseStore, `chat/${chatId}/files`);
    const fileDocQuery = query(fileDocRef, where('UUID','==',uuid));
    
    const msgColRef = collection(firebaseStore, `chat/${chatId}/messages`);
    const msgDocQuery = query(msgColRef, where('attachFile','==',uuid));
    
    try {
        const msgDocRef = (await getDocs(msgDocQuery)).docs[0].ref;
        const fileDocRef = (await getDocs(fileDocQuery)).docs[0].ref;
        await updateDoc(msgDocRef, {
            attachYn : false,
            attachFile : "",
            deleteYn : true
        })
        await deleteDoc(fileDocRef);
        
        return { result : true, value : "Success"};
    } catch(error) {
        return { result : false, value : error};
    }
};

export async function getChatRoomFile(chatId : string, UUID : string) {
    const colRef = collection(firebaseStore, `chat/${chatId}/files`);
    const colQuery = query(colRef, where("UUID","==", UUID));
    try {
        const response = (await getDocs(colQuery)).docs[0];
        const fileString = response.data().file;
        return { result : true, value : fileString};
    } catch(error) {
        return { result : false, value : error};
    }
}

export async function getChatRoom(chatId : string) {
    const docRef = doc(firebaseStore, "chat", chatId);
    const colRef = collection(firebaseStore, `chat/${chatId}/messages`);
    const msgQuery = query(colRef, orderBy("createdAt", "asc"));
    try {
        // Get Member Array in Chat Document
        const { member } = (await getDoc(docRef)).data();
        
        // Get Messages List in subCollection of Chat/{chatId}/Messages 
        const messages = [];
        (await getDocs(msgQuery)).docs.forEach((msg)=> {
            const data = msg.data() as ChatMessage;
            // type exchage from Timestamp to Date
            if(data.createdAt instanceof Timestamp) {
                messages.push({...data, createdAt : data.createdAt.toDate().toString()})
            } else {
                messages.push(data)
            }
        });
        
        const response = { member : member, messages : messages } as Chat
        return { result : true, value : response};
    } catch (error) {
        return { result : false, value : error };
    }
}

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
}

export async function manageProfileImage({file, profileImgOpenYn, action } : {file?: File, profileImgOpenYn?: boolean, action: 'set'|'delete'|'openYn'}) {
    const currentUser = firebaseAuth.currentUser;
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