import React from 'react';


import UserInfo from './userinfo/UserInfo';
import FriendListMain from './friendlist/FriendListMain';
import UserInfoEdit from './info_edit/UserInfoEdit';
import { useAppSelector } from '@/redux/hook';
import { ChatRoom } from './chat/ChatRoom';
import { PublicBoard } from './test_not_use/PublicBoard';

export default function PageRouter() {
    const msgPageReudcer = useAppSelector((state)=> state.messengerRouter);

    const pageMapping = (componentName : string) => {
        switch(componentName) {
            case "UserInfo" : return ( <UserInfo />); 
            case "UserInfoEdit" : return ( <UserInfoEdit /> )
            case "FriendListMain" : return (<FriendListMain />); 
            case "ChatRoom" : return (<ChatRoom />);
            default : return null;
        }
    }
    
    return (
        <div className='flex grid-cols-3'>
            { pageMapping(msgPageReudcer.left)}
            { pageMapping(msgPageReudcer.middle)}
            { pageMapping(msgPageReudcer.right)}
        </div>
    )

}

// const routing = () => {
//     switch (page) {
//         case "Default" : 
//             return (
//                 <div className='flex grid-cols-3'>
//                     <UserInfo />
//                     <PublicBoard />
//                     <FriendListMain />
//                 </div>
//             )
//         case "Profile" : 
//             return (
//                 <div className='flex grid-cols-1'>
//                     <UserInfoEdit />
//                 </div>
//             )
//         default : 
//             return (
//                 <div>
//                     Please Select
//                 </div>
//             )
//     }
// }
// return routing()