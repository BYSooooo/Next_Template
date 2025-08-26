import React from 'react';
import { firebaseAuth, firebaseStore } from '../../firebase-config';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getCurrentUser } from './FirebaseController';
import { useAppDispatch } from '../redux/hooks';
import { addChatRoomMessage, controlMessageToast, removeChatRoomMessage, setInitMessages, setUserInfo, updateChatRoomMessage } from '../redux/features';
import { useRouter } from 'next/navigation';
import { ChatMessage } from '../../typeDef';

export function UserInfoSnapshot() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [ userInfoData, setUserInfoData ] = React.useState(null);
    const [ avatarImgData, setAvatarImgData ] = React.useState(null);
    const [ profileImgData, setProfileImgData ] = React.useState(null);

    React.useEffect(()=> {
        const currentUser = firebaseAuth.currentUser;
        if(!currentUser) {
            console.log("No Auth Information. Move to Login Page for get Auth")
            return router.push("/login");
        } else {
            // Listener of Changing UserInfo Document
            const userDocRef = doc(firebaseStore, 'userInfo', firebaseAuth.currentUser.uid);
            const userInfoSnapshot = onSnapshot(userDocRef, (snapshot)=> {
                if(snapshot.exists()) {
                    setUserInfoData(snapshot.data());
                }
            })
            //Listener of Changing AvatarImg Document
            const avatarDocRef = doc(firebaseStore, 'avatarImg', firebaseAuth.currentUser.uid);
            const avatarImgSnapshot = onSnapshot(avatarDocRef,(snapshot)=> {
                if(snapshot.exists()) {
                    setAvatarImgData(snapshot.data())
                }
            })

            const profileImgDocRef = doc(firebaseStore, 'profileImg', firebaseAuth.currentUser.uid);
            const profileImgSnapshot = onSnapshot(profileImgDocRef,(snapshot)=> {
                if(snapshot.exists()) {
                    setProfileImgData(snapshot.data())
                }
            })
            console.log("UserInfoSnapshot Attached")
            return ()=> {
                console.log("UserInfoSnapshot Detached")
                userInfoSnapshot();
                avatarImgSnapshot();
                profileImgSnapshot();
            }
        }
    },[router, dispatch])

    // Call Function when each Document Changed.
    React.useEffect(()=> {
        if(userInfoData && avatarImgData) {
            try { 
                const data = {
                    uid : firebaseAuth.currentUser.uid,
                    email : userInfoData.email,
                    emailVerified : userInfoData.emailVerified,
                    displayName : userInfoData.displayName,
                    avatarImg : avatarImgData.avatarImg,
                    avatarOpenYn : avatarImgData.avatarOpenYn,
                    profileImg : profileImgData.profileImg,
                    profileImgOpenYn : profileImgData.profileImgOpenYn,
                    requested : userInfoData.requested,
                    received : userInfoData.received,
                    friend : userInfoData.friend
                };
                dispatch(setUserInfo(data))

            } catch(error) {
                dispatch(controlMessageToast({
                    openYn : true,
                    title : 'Error',
                    type : "error",
                    content : "Error Occured During Update"
                }));
                console.error("Failed to combine data and dispatch", error);
            }
        }
    },[userInfoData, avatarImgData, profileImgData, dispatch])
 };

// export function UserInfoSnapshot_old() {
//     const dispatch = useAppDispatch();
//     const router = useRouter();

//     React.useEffect(()=> {
//         const currentUser = firebaseAuth.currentUser;
//         if(!currentUser) {
//             console.log("No Auth Information. Move to Login Page for get Auth")
//             return router.push("/login");
//         } else {
//             // Snapshot of 'userinfo' Document
//         const userDocRef = doc(firebaseStore,'userInfo', firebaseAuth.currentUser.uid);
//         const userInfoSnapshot = onSnapshot(userDocRef, ()=> {
//             getCurrentUser().then((response)=> {
//                 const { result, value } = response;
//                 result
//                     ? dispatch(setUserInfo(value))
//                     : dispatch(controlMessageToast({
//                         openYn : true,
//                         title : 'Error',
//                         type : "error",
//                         content : "Error Occured during Update"
//                     }))
//             })
//         })

//         // Snapshot of 'avatarImg' Document
//         const avatarDocRef = doc(firebaseStore, 'avatarImg', firebaseAuth.currentUser.uid);
//         const avatarImgSnapshot = onSnapshot(avatarDocRef,()=> {
//             getCurrentUser().then((response)=> {
//                 const { result , value } = response;
//                 result
//                     ? dispatch(setUserInfo(value))
//                     : dispatch(controlMessageToast({
//                         openYn : true,
//                         title : 'Error',
//                         type : 'error',
//                         content : "Error Occured During Update"
//                     }))
//             })
//         })
//         console.log("UserInfoSnapshot Attached")
//             return ()=> {
//                 console.log("UserInfoSnapshot Detached")
//                 userInfoSnapshot();
//                 avatarImgSnapshot();
//             } 

//         }
//     })
// }

export function ChatRoomSnapshot_old(chatId : string) {
    const dispatch = useAppDispatch();
    console.log("ChatRoomSnapshot Called")
    React.useEffect(()=> {
        if(chatId !== ""){
            // Snapshot of messages
            const messageColRef = collection(firebaseStore, 'chat', chatId, 'messages');
            const messageQuery = query(messageColRef,orderBy("createdAt","desc"));

            const chatSnapshot = onSnapshot(messageQuery,(snapshot)=> {
                snapshot.docChanges().forEach((change)=> {
                    const changedMsgData = change.doc.data();
                    const createdAt = changedMsgData.createdAt.toDate();
                    switch(change.type) {
                        case 'added' : 
                            const addedMessage = {
                                ...changedMsgData,
                                createdAt : createdAt.toISOString()
                            } as ChatMessage
                            dispatch(addChatRoomMessage(addedMessage));
                        break;
                        case 'modified' :
                            const updateMsg = {
                                ...changedMsgData,
                                createdAt : createdAt.toISOString()
                            } as ChatMessage
                            dispatch(updateChatRoomMessage(updateMsg))
                        break;
                        case 'removed' : 
                            console.log("removed : "+changedMsgData)
                        break;
                    }
                });
            }, (error)=> {
                dispatch(controlMessageToast({openYn : true, type : "error", title : "Error", content : error.message}));
            });

            return ()=> {
                if(chatSnapshot) {
                    chatSnapshot()
                }
            }
        }
    })
}

export function ChatRoomSnapshot(chatId : string) {
    const dispatch = useAppDispatch();
    console.log("ChatRoom Snapshot Called");

    React.useEffect(()=> {
        if(chatId !== "") {
            // Snapshot of Messages
            const messageColRef = collection(firebaseStore, 'chat', chatId, 'messages');
            const messageQuery = query(messageColRef, orderBy("createdAt", "asc"));

            const chatSnapshot = onSnapshot(messageQuery, (snapshot)=> {
                // Case.1 : Init
                if(snapshot.docChanges().length > 0 && snapshot.docs.length == snapshot.docChanges().length) {
                    const initMessages  = snapshot.docs.map((doc) => {
                        const data = doc.data()
                        return {
                            ...data,
                            docId : doc.id,
                            createdAt : data.createdAt.toDate().toISOString()
                        } as ChatMessage
                    });
                    dispatch(setInitMessages(initMessages))
                    return;
                }
                // Case.2 Update
                snapshot.docChanges().forEach((change)=> {
                    const changeMsgData = change.doc.data();
                    const createdAt = changeMsgData.createdAt.toDate().toISOString();
                    const message = {
                        ...changeMsgData,
                        docId : change.doc.id,
                        createdAt : createdAt
                    } as ChatMessage
                    switch(change.type) {
                        case 'added':
                            dispatch(addChatRoomMessage(message))
                            break;
                        case 'modified' : 
                            dispatch(updateChatRoomMessage(message))
                            break;
                        case 'removed'  :
                            dispatch(removeChatRoomMessage({docId : change.doc.id}));
                            break;
                    }
                });
            }, (error) => {
                dispatch(controlMessageToast({
                    openYn : true,
                    type : 'error',
                    title : `Error ${error.code}`,
                    content : error.message
                }))
            });
            // Detatch Snapshot
            return ()=> {
                chatSnapshot()
            }
        }
    }, [chatId, dispatch])
}