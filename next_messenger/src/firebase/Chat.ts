import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { Chat, ChatMessage } from "../../typeDef";

const currentUid = firebaseAuth.currentUser.uid;

export async function createChatRoom(friendUUID : string) {
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
};

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
};

export async function setChatRoomFile ( chatId : string,
                                        attachFile : {name: string, type: string, value: string} ) {
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
};

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
};

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
