import React from 'react';
import { firebaseAuth, firebaseStore } from '../../firebase-config';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getCurrentUser } from './FirebaseController';
import { useAppDispatch } from '../redux/hooks';
import { addChatRoomMessage, controlMessageToast, setUserInfo, updateChatRoomMessage } from '../redux/features';
import { useRouter } from 'next/navigation';
import { ChatMessage } from '../../typeDef';


export function UserInfoSnapshot() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    React.useEffect(()=> {
        const currentUser = firebaseAuth.currentUser;
        if(!currentUser) {
            console.log("No Auth Information. Move to Login Page for get Auth")
            return router.push("/login");
        } else {
            // Snapshot of 'userinfo' Document
        const userDocRef = doc(firebaseStore,'userInfo', firebaseAuth.currentUser.uid);
        const userInfoSnapshot = onSnapshot(userDocRef, ()=> {
            getCurrentUser().then((response)=> {
                const { result, value } = response;
                result
                    ? dispatch(setUserInfo(value))
                    : dispatch(controlMessageToast({
                        openYn : true,
                        title : 'Error',
                        type : "error",
                        content : "Error Occured during Update"
                    }))
            })
        })

        // Snapshot of 'avatarImg' Document
        const avatarDocRef = doc(firebaseStore, 'avatarImg', firebaseAuth.currentUser.uid);
        const avatarImgSnapshot = onSnapshot(avatarDocRef,()=> {
            getCurrentUser().then((response)=> {
                const { result , value } = response;
                result
                    ? dispatch(setUserInfo(value))
                    : dispatch(controlMessageToast({
                        openYn : true,
                        title : 'Error',
                        type : 'error',
                        content : "Error Occured During Update"
                    }))
            })
        })
        console.log("UserInfoSnapshot Attached")
            return ()=> {
                console.log("UserInfoSnapshot Detached")
                userInfoSnapshot();
                avatarImgSnapshot();
            } 

        }
    })
}

export function ChatRoomSnapshot(chatId : string) {
    const dispatch = useAppDispatch();
    console.log("ChatRoomSnapshot Called")
    React.useEffect(()=> {
        if(chatId !== ""){
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
            })
            return ()=> {
                chatSnapshot()
                
            }
        }
    })
    
    
    
}