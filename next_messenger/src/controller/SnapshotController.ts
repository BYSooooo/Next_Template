import React from 'react';
import { firebaseAuth, firebaseStore } from '../../firebase-config';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getCurrentUser, setChatRoomMessage } from './FirebaseController';
import { useAppDispatch } from '../redux/hooks';
import { addChatRoomMessage, controlMessageToast, setUserInfo } from '../redux/features';
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
    
    React.useEffect(()=> {
        if(chatId !== ""){
            const chatRef = doc(firebaseStore, 'chat', chatId);
            const chatMsgRef = collection(firebaseStore, `chat/${chatId}/messages`);
            const colRefQuery = query(chatMsgRef, orderBy("createdAt", "asc"));
            
            // If messages subcollection has changed, update just only messages collection.
            const chatSnapshot = onSnapshot(colRefQuery,(snapshot)=> {
                snapshot.docChanges().forEach((change)=> {
                    if(change.type === 'added') {
                        const addedMessage = change.doc.data();
                        dispatch(addChatRoomMessage(addedMessage as ChatMessage));
                    }
                })
            })
            
            chatSnapshot();

            return ()=> {
                chatSnapshot()
            }
        }
    },[chatId])
    
    
    
}