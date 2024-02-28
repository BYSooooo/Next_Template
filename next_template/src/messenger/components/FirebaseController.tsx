import React, { lazy } from 'react';

import { firebaseAuth, firebaseStore, firebaseStrg } from '../../../firebaseConfig';
import { deleteObject, getBlob, getDownloadURL, listAll, ref, uploadString } from 'firebase/storage';
import { setDoc, doc, getDoc, updateDoc, getDocs, collection, arrayUnion, deleteDoc, deleteField, writeBatch, FieldValue, arrayRemove} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { AttachedInfo, ChatRoomInfo, FriendList, MessageInfo, RequestFriend, UserInfo } from '../../../msg_typeDef';
import JSZip from 'jszip';
import saveAs from 'file-saver';

const userAuth = firebaseAuth;

/**
 * Get Current User Info in Document
 * 
 */
export const setInitUserInfo = async() => {
    if(userAuth.currentUser) {
        const docRef = doc(firebaseStore,'userInfo',userAuth.currentUser.email)
        try {
            await setDoc(docRef, {
                uid : userAuth.currentUser.uid,
                email : userAuth.currentUser.email,
                emailVerified : userAuth.currentUser.emailVerified,
                displayName : userAuth.currentUser.displayName,
                photoURL : userAuth.currentUser.photoURL,
                lastLogin : new Date()
            }, { merge : true })
            return true
        } catch(error) {
            return false
        }
    } else {
        console.log("Not Logined")
        return false
    }
}

/**
 * Get All User List In Document
 * @return result - true or false depending on whether the request succeeds or not
 * @return value - Array of User List
 */
export const getAllUserInDoc = async()=> {
    let userList = []
    try {
        await getDocs(collection(firebaseStore,"userInfo"))
            .then((response)=> {
                response.forEach((docs)=> {
                    {docs.data().email !== userAuth.currentUser.email 
                        && userList.push(docs.data())}  
                })
            })
        console.log(userList)
        return { result : true, value : userList}
        
    } catch(error) {
        return {result :false, value : []}
    }
}


export const getUserInfo = async(email: string) => {
    const docRef = doc(firebaseStore,'userInfo',email);
    try { 
        const response = await getDoc(docRef);
        const docData = response.data() 
        const reNewDate : Date = docData.lastLogin.toDate()
        const resultValue = docData as UserInfo
        resultValue.lastLogin = reNewDate.toString()
        return { result : true, value : resultValue}
        
    } catch(error) {
        console.log(error)
        return { result : false, value : null}
    }
}

/**
 * Upload Image File's String Value to Firebase Storage
 * @param fileString upload Image File generated by `FileReader()`
 * @return `Object` result : boolean, value : optional
 */
export const uploadPhotoToStrg = async(fileString : string) => {
    const storageRef = ref(firebaseStrg,`userInfo/${userAuth.currentUser.email}/photoURL`);
    try {
        await uploadString(storageRef,fileString,"data_url")    
        return {result : true, value : storageRef}
    } catch(error) {
        console.log(error)
        return {result : false, value : null}
    } 
}

export const updatePhotoURL = async(url : string)=> {
    const docRef = doc(firebaseStore,'userInfo',userAuth.currentUser.email);
    try {
        await updateDoc(docRef, { photoURL : url });
        return true;
    } catch(error) {
        return false;
    } 
}

export const getUserListInStrg = async()=> {
    const storageRef = ref(firebaseStrg, 'userInfo');    
    let userList = []
    try {
        await listAll(storageRef)
            .then((response)=> {
                response.prefixes.map((item : any)=> {
                    const mailString = item._location.path_.split('/')[1];
                    userList.push(mailString);
                })
            })
        return { result : true, value : userList }
    } catch(error){
        return { result : false, value : null}
    }
}
export const getUserInfoInStrg = async(email : string)=> {
    const storageRef = ref(firebaseStrg,`userInfo/${email}/photoURL`)
    try {
        const downURL = await getDownloadURL(storageRef)
        return {result : true, value : downURL}
    } catch(error) {
        return {result : false, value : ""}
    }
    
}

/**
 * Send a friend request to the selected user
 * @param {string} email Who will receive friend requests
 * @return result : boolean, value : message
 */
export const setRequestAddFriendInDoc = async(email : string) => {
    const requestUUID = uuidv4()
    try {
        await setDoc(doc(firebaseStore,'friendReq', requestUUID), {
            UUID : requestUUID,
            from : userAuth.currentUser.email,
            to : email,
            checkYn : false,
            status : "request",
            req_date : new Date(),
        })
        return { result : true, value : "Request Success"}
    } catch (error) {
        return { result : false, value : `Error : ${error}`}
    }
}
/**
 * Move a friend request to request history,
 * and delete request in friendReq
 * 
 * Note : This function is related to `setRequestAddFriendInDoc()`
 * @param {Interface} friendRequest Object of Friend request Information
 * @return {Boolean} success : true / fail : false
 */
export const delAddFriendRequestInDoc = async(friendRequest : RequestFriend | null) => {
    try {
        if(friendRequest !== null ){
            await setDoc(doc(firebaseStore, 'reqHistory',friendRequest.UUID),{
                UUID : friendRequest.UUID,
                from : friendRequest.from,
                to : friendRequest.to,
                status : friendRequest.status,
                req_date : friendRequest.req_date,
            }).then(()=> {
                deleteDoc(doc(firebaseStore,'friendReq',friendRequest.UUID))
            })
            return true
        } else {
            return false
        }
    } catch(error) {
        console.log(error)
        return false
    }
}

/**
 * View the full list of friend add requests
 * 
 * Note : View the full list for reuse in other components. 
 * @returns result : `Boolean`, value : `Array` of request List
 */
export const getReuestAddFriendInDoc = async()=> {
    let docList = []
    try {
        await getDocs(collection(firebaseStore,'friendReq'))
            .then((response)=> {
                response.forEach((doc)=>
                    docList.push(doc.data())
                )
            })
            return {result : true, value : docList}
    }catch (error) {
        console.log(`Error : ${error}`)
        return {result : false, value : []};
    }
}

/**
 * Runs when a friend request is accepted or declined
 * @param {RequestFriend} request friend request Information Object
 * @param {boolean} acceptYn accept:`true`, decline:`false`
 * 
 */
export const setFriendRequestControl = async (request : RequestFriend, acceptYn : boolean) => {
    try {
        if(acceptYn) {
            const requestUUID = uuidv4()
            await setDoc(doc(firebaseStore, 'friendList',requestUUID), {
                UUID : requestUUID,
                friendReqUUID : request.UUID,
                friendEmail : [firebaseAuth.currentUser.email, request.from],
                acceptDate : new Date(),
                chatUUID : "",
                
            })
            await updateDoc(doc(firebaseStore,'userInfo',firebaseAuth.currentUser.email),{
                friendList : arrayUnion(requestUUID)
            })
            await updateDoc(doc(firebaseStore,'userInfo',request.from),{
                friendList : arrayUnion(requestUUID)
            })
            await updateDoc(doc(firebaseStore,'friendReq',request.UUID),{
                status : "success"
            })
        } else {
            await updateDoc(doc(firebaseStore, 'friendReq', request.UUID),{
                status : "refusal"
            })
        }
        return true
    } catch(error){
        console.log(new Error(`Request Error : ${error}`))
        return false
    }
}

export const getFriendInDoc = async() => {
    const docRef = doc(firebaseStore,'userInfo',firebaseAuth.currentUser.email)
    try {
        const response = await getDoc(docRef)
        return {result : true, value : response.data()}
    } catch(error) {
        console.log(error)
        return {result : false, value : null}
    }
}
/**
 * Get the email address of the member based on the UUID of the friendList Collection.
 * 
 * @param uuid Unique ID in collection of 'friendList'
 * @returns result : `Boolean` value : the other User Email
 */
export const getInfoInFriendListCol = async(uuid : string) => {
    const currentUser = firebaseAuth.currentUser.email;
    const docRef = doc(firebaseStore,'friendList',uuid);
    try {
        const response = (await getDoc(docRef)).data() as FriendList;
        const otherUser = response.friendEmail.filter((item)=> item !== currentUser)[0];
        return {result : true, value : otherUser}
    } catch(error) {
        console.log(error);
        return { result : false, value : null}
    }
}

/**
 * Returns the UUID value of the chat room created with the selected friend
 * 
 * Note :  If the chatUUID does not exist, function will be created and returned
 * @param uuid Unique ID in Collection 'friendList'
 * @return {string} value of chatList UUID
 * 
 */
export const getChatInfoInFriendList = async(uuid : string) => {    
    const docRef = doc(firebaseStore,'friendList',uuid);
    try {
        const response = (await getDoc(docRef)).data() as FriendList
        let chatUUID = ""
        if(response.chatUUID.length === 0) {
            const uuid = uuidv4();
            await setDoc(doc(firebaseStore,'chatList',uuid),{
                uuid : uuid,
                friendListUUID : response.UUID,
                members : response.friendEmail,
                active : true,
                lastChat : new Date()
            })
            await updateDoc(docRef,{ chatUUID : uuid}).then(()=>{
                chatUUID = uuid
            })
        } else {
            chatUUID = response.chatUUID
        }
        return {chatUUID : chatUUID };
    } catch(error) {
        console.log(error)
        return { chatUUID : null }
    }
}

export const getSelectedChatInfo = async(uuid: string) => {
    const docRef = doc(firebaseStore,'chatList',uuid);
    try {
        const response = await getDoc(docRef);
        const newChatInfo = response.data()
        const lastChatDate : Date = newChatInfo.lastChat.toDate();
        newChatInfo.lastChat = lastChatDate.toString()
        return newChatInfo
    }
    catch(error) {
        console.log(error)
        return null;
    }
}

/**
 * Send message 
 * 
 * Note : If message contain attached file, upload Firebase stroage first
 * @param uuid chatList UUID
 * @param msgInfo message context object
 */
export const sendChatMessage = async(uuid : string, msgInfo : MessageInfo) => {
    const colRef = doc(firebaseStore,`chatList/${uuid}/messages`,msgInfo.UUID);
    try {
        await setDoc(colRef,msgInfo)
    }catch(error){
        console.log(error)
    }
}

/**
 * Upload Attached File to Firestore Storage 
 * 
 * @param attached Attachment Information
 * @param chatListUUID UUID of ChatRoom
 * @param messageUUID UUID of Message 
 * @returns File download path in Firebase Cloud Storage 
 */
export const sendChatAttachedFile = async(attached : {name: string, type:string, value: string}, chatListUUID : string, messageUUID : string)=> {
    const storageRef = ref(firebaseStrg,`chatList/${chatListUUID}/${messageUUID}`); 
    try {
        const result = await uploadString(storageRef,attached.value,'data_url',{customMetadata : { name : attached.name}}).then(()=> {
            return getDownloadURL(storageRef)
        });
        return result
        
    }catch(error){
        console.log(error)
        return null
    }
}
/**
 * File Download in ChatRoom by Select Attached File List
 * 
 * Note : If multiple files are selected, they will be downloaded as a zip 
 * 
 * @param selected Selected items in the attachment list
 * @param chatListUUID UUID of the currently selected ChatRoom
 * @returns 
 */

export function attachedDown(selected : AttachedInfo[],chatListUUID : string) {
    if(selected.length > 1) {
        let zip = new JSZip();
        try {
            selected.map((item)=> {
                const storageRef = ref(firebaseStrg,`chatList/${chatListUUID}/${item.UUID}`);
                const getData = getBlob(storageRef);
                zip.file(item.attachedName,getData)
            })
            zip.generateAsync({type : 'blob'}).then((res)=> {
                saveAs(res,`attachment.zip`)
            })
            return true;
        } catch(error) {
            console.error(error)
            return false;
        }
    } else {
        try {
            const storageRef = ref(firebaseStrg,`chatList/${chatListUUID}/${selected[0].UUID}`);
            getBlob(storageRef).then((res)=> {
                saveAs(res,selected[0].attachedName)
            });
            return true;
        } catch(error) {
            console.error(error)
            return false
        }
    }
}

export function deleteAttachment(selected : AttachedInfo[],chatListUUID : string) {
    if(selected.length > 1) {
        selected.map((item)=> {
            const storageRef = ref(firebaseStrg,`chatList/${chatListUUID}/${item.UUID}`);
            deleteObject(storageRef).then(()=> {
                const docRef = doc(firebaseStore,`chatList/${chatListUUID}/messages`,item.UUID);
                if(item.message.length > 0) {
                    updateDoc(docRef, { attachedYn : false, attachedType : null, attachedName : null})
                } else {
                    deleteDoc(docRef)
                }
            }).catch((error)=> {
                console.log(error);      
            })
        })
    } else if(selected.length === 1) {
        const storageRef = ref(firebaseStrg,`chatList/${chatListUUID}/${selected[0].UUID}`);
        deleteObject(storageRef).then(()=> {
            const docRef = doc(firebaseStore,`chatList/${chatListUUID}/messages`,selected[0].UUID)
            if(selected[0].message.length > 0) {
                updateDoc(docRef,{ attachedYn : false, attachedType : null, attachedValue : null, attachedName : null })
            } else {
                deleteDoc(docRef)
            }
        }).catch((error)=> {
            console.error(error)
        })
    }
}
/**
 * Freeze / Delete Chat Room
 * 
 * Note : If the room is already frozen, delete it
 * @param chatListUUID Selected ChatRoom UUID
 * @param user current User's Email Address
 */
export async function freezeChatRoom(chatListUUID : string, user : string) {
    const docRef = doc(firebaseStore,'chatList',chatListUUID);
    try {
        const response = (await getDoc(docRef)).data() as ChatRoomInfo;
        // Freeze ChatRoom
        if(response.active === true) {
            updateDoc(docRef,{ active : false, disableRequest : user })
        // unFreeze ChatRoom
        } else {
            updateDoc(docRef, { active : true, disableRequest : deleteField() })
        }
        return true;
    }catch(error) {
        console.error(error)
        return false;
    }
}

export async function copyChatRoom(chatListUUID : string) {
    const prevDocRef = doc(firebaseStore,'chatList',chatListUUID);
     try{
        const prevChatData = (await getDoc(prevDocRef)).data();
        //Move existing room data
        const newDocRef = doc(firebaseStore,'chatListHistory',chatListUUID)
        const prevSubCol = collection(firebaseStore,`chatList/${chatListUUID}/messages`) 
        setDoc(newDocRef,prevChatData)
            .then(()=> { getDocs(prevSubCol)
                .then((response)=> { 
                    response.forEach((item)=> {
                        const data = item.data()
                        setDoc(doc(firebaseStore,`chatListHistory/${chatListUUID}/messages`,data.UUID),data)
                })
            });
        })
        return true ;
    }catch(error){
        console.log(error)
        return false
    }
}

export async function deleteChatRoom(chatListUUID : string) {
    const docRef = doc(firebaseStore, 'chatList', chatListUUID);
    const subCol = collection(firebaseStore,`chatList/${chatListUUID}/messages`,)
    try {
        const batch = writeBatch(firebaseStore);
        const querySnapShot = await getDocs(subCol);
        querySnapShot.forEach((doc)=> {
            batch.delete(doc.ref)
        })
        await batch.commit().then(async()=> {
            const { friendListUUID } = (await getDoc(docRef)).data();
            console.log(friendListUUID);
            const friendDocRef = doc(firebaseStore,'friendList',friendListUUID);
            updateDoc(friendDocRef,{chatUUID : ""}).then(()=> {
                deleteDoc(docRef)
            })
        });

        return true;
    }catch(error){
        console.error(error);
        return false
        
    }
}
/**
 * Delete Selected Friend in Friends List
 * @param friendListUUID uuid of FriendList Collection
 * @returns Success : true, Fail : false
 * 
 */
export async function deleteFriend(friendListUUID: string) {
    const prevDocRef = doc(firebaseStore,"friendList",friendListUUID)
    const historyDocRef = doc(firebaseStore,"friendListHistory",friendListUUID);
    
    try {
        await getDoc(prevDocRef).then(async (response)=> {
            const friendDoc = response.data() as FriendList
            console.log(`friendList Doc : ${friendDoc}`);
            // friendList Document move to friendListHistory
            await setDoc(historyDocRef,{...friendDoc, deleteDate : new Date()})
                .finally(()=> { console.log('Success : Move to friendListHistory')})
            // Delete friendListUUID in chatList
            if(friendDoc.chatUUID) {
                const chatRef = doc(firebaseStore,'chatList',friendDoc.chatUUID);
                await updateDoc(chatRef,{ friendListUUID : "" })
                    .finally(()=> { console.log('Success : Delete friendListUUID in chatList')})
            }
            // Delete FriendListUUID From both user information
            const friendList = friendDoc.friendEmail
            friendList.forEach(async (email)=> {
                const userRef = doc(firebaseStore,'userInfo',email);
                await updateDoc(userRef,{ friendList : arrayRemove(friendDoc.UUID)})
                    .finally(()=> { console.log(`Success : Delete FriendListUUID in UserInfo ${email}`)});
            })
            // Move friendReq Document to FriendReqHistory Collection
            const reqRef = doc(firebaseStore,'friendReq',friendDoc.friendReqUUID);
            await getDoc(reqRef).then(async (req) => {
                const requestDoc = req.data() as RequestFriend
                const result = await delAddFriendRequestInDoc(requestDoc);
                console.log(result)
            }).finally(()=> { console.log('Success : Move friendReq to History Collection')})
        }).then(async()=> {
            await deleteDoc(prevDocRef)
                .finally(()=> console.log('Success : Delete FriendList'))
        })
        return true;
    } catch(error) {
        console.log(error)
        return false;
    }

}
/** Block User
 * 
 * Note : If currentUser deletes a user who is a friend, need to remove the friend after blocking based on the Return value.
 * @param selectedUser Email of the user current want to block
 * @returns Boolean of Success or Failed Block
 */
export async function blockUser (selectedUser : string) {
    const currentEmail = firebaseAuth.currentUser.email
    const docRef = doc(firebaseStore,'userInfo',currentEmail);
    try {
        setDoc(docRef,{
            block :  arrayUnion({blockUser : selectedUser, blockDate : new Date()})
        },{merge : true});
        return true;
    } catch(error) {
        console.log(error)
        return false
    }
}
