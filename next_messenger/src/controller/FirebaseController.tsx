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
    where
} from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { binaryEncode } from "./AvatarBinaryController";
import { Chat, ChatMessage, UserInfo } from "../../typeDef";

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
                    received : [],
                    friend : []
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
                received : docData.received,
                friend : docData.friend
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
                        received : docData.received,
                        requested : docData.requested,
                        friend : docData.friend
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

export async function getSelectedUserInfo(friendInfo: {uuid : string, chatId : string}) {
    
    const infoDocRef = doc(firebaseStore,"userInfo", friendInfo.uuid);
    const avatarDocRef = doc(firebaseStore, "avatarImg", friendInfo.uuid);

    try {
        const infoDoc = await getDoc(infoDocRef);
        const avatarDoc = await getDoc(avatarDocRef);

        const userInfo = infoDoc.data();
        const avatarInfo = avatarDoc.data();
        
        const data : UserInfo = {
            uid : friendInfo.uuid,
            email : userInfo.email,
            displayName : userInfo.displayName,
            emailVerified : userInfo.emailVerified,
            avatarImg : avatarInfo.avatarImg,
            avatarOpenYn : avatarInfo.avatarOpenYn,
            received : userInfo.received,
            requested : userInfo.requested,
            friend : userInfo.friend
        }
        
        return { result : true, value : data };
    } catch(error) {
        return { result : false, value : error}
    }
}

export async function manageAvatar({file, avatarOpenYn, action} : {file?: File, avatarOpenYn?: boolean, action: 'set'|'delete'|'openYn'}) {
    const currentUser = firebaseAuth.currentUser
    if(!currentUser) {
        return { result : false, value : "User not logined"};
    }
    const docRef = doc(firebaseStore, 'avatarImg', currentUser.uid);
    
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
        const result = await updateDoc(docRef, {
            avatarImg : ""
        })
        return { result : true, value : result };
    } catch(error) {
        return { result : false, value : error };
    }
}

export async function updateAvatarOpenYn(avatarOpenYn : boolean) {
    const { email, uid } = firebaseAuth.currentUser;
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
            attachFile : ""
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
        attachFile : string
        ) {
    const colRef = collection(firebaseStore, `chat/${chatId}/messages`);
    const currentUid = firebaseAuth.currentUser.uid
    try {
        const data ={
            content : content,
            attachYn : attachYn,
            attachFile : attachFile,
            createdAt : new Date(),
            createdBy : currentUid  
        }
        await addDoc(colRef, data)
        
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
    const fileColRef = collection(firebaseStore, `chat/${chatId}/files`);
    const fileColQuery = query(fileColRef, where("UUID", "==", uuid));
    
    const msgColRef = collection(firebaseStore, `chat/${chatId}/messages`);
    //const msgColQuery = query(msgColRef, where("attachFile", "==", uuid), deleteDoc());
    
    try {
        // await updateDoc(msgColQuery, {

        // })
        
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