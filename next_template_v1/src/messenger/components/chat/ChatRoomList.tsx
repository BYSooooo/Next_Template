import React from 'react';
import { useAppSelector } from '@/redux/hook';
import { getInfoInFriendListCol } from '../FirebaseController';

export default function ChatRoomList() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);

    React.useEffect(()=> {
        getChatList()
    },[currentUser])

    const getChatList = async()=> {
        
    }

}