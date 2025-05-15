import React from 'react';
import { firebaseAuth, firebaseStore } from '../../firebase-config';
import { collection, doc, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { getCurrentUser } from './FirebaseController';
import { useAppDispatch } from '../redux/hooks';
import { addChatRoomMessage, controlMessageToast, setUserInfo } from '../redux/features';
import { useRouter } from 'next/navigation';
import { ChatMessage } from '../../typeDef';
import { error } from 'console';

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
        userInfoSnapshot();
        avatarImgSnapshot();
            return ()=> {
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
        let snapshotChk : ()=> void | undefined;
        if(chatId !== ""){
            const messageColRef = collection(firebaseStore, 'chat', chatId, 'messages');
            const messageQuery = query(messageColRef,orderBy("createdAt","desc"));

            const chatSnapshot = onSnapshot(messageQuery,(snapshot)=> {
                snapshot.docChanges().forEach((change)=> {
                    if(change.type === 'added') {
                        const messageData = change.doc.data();
                        const createdAt = messageData.createdAt 
                            ? (messageData.createdAt as Timestamp).toDate() 
                            : null
                        const addedMessage = {
                            ...messageData,
                            createdAt : createdAt
                        }
                        dispatch(addChatRoomMessage(addedMessage as ChatMessage));
                    }
                });
            }, (error)=> {
                dispatch(controlMessageToast({openYn : true, type : "error", title : "Error", content : error.message}));
            })

            snapshotChk = chatSnapshot;

            // const chatRef = doc(firebaseStore, 'chat', chatId);
            // const chatMsgRef = collection(firebaseStore, `chat/${chatId}/messages`);
            // const colRefQuery = query(chatMsgRef, orderBy("createdAt", "desc"));
            
            // If messages subcollection has changed, update just only messages collection.
            // const chatSnapshot = onSnapshot(colRefQuery,(snapshot)=> {
            //     console.log("chatSnapshot Catch Event for add Message")
            //     snapshot.docChanges().forEach((change)=> {
            //         if(change.type === 'added') {
            //             const addedMessage = change.doc.data();
            //             dispatch(addChatRoomMessage(addedMessage as ChatMessage));
            //         }
            //     })
            // })
            // snapshotChk = chatSnapshot;
            // chatSnapshot();

            return ()=> {
                if(snapshotChk) {
                    snapshotChk()
                }
                // if(snapshotChk) {
                //     console.log("ChatRoomSnapshot Detached")
                //     snapshotChk()
                // }
            }
        }
    })
    
    
    
}