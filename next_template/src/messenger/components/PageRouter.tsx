import React from 'react';

import UserInfo from './userinfo/UserInfo';

//import FriendListMain from './friendlist/FriendListMain';
import FriendListMain from './friend/FriendListMain';
import UserInfoEdit from './info_edit/UserInfoEdit';
import { useAppSelector } from '@/redux/hook';
import { ChatRoom } from './chat/ChatRoom';
import { ChatRoomOption } from './chat/ChatRoomOption';
import UserManageMain from './usermanage/UserManageMain';

export default function PageRouter() {
    const msgPageReudcer = useAppSelector((state)=> state.messengerRouter);

    const pageMapping = (componentName : string) => {
        switch(componentName) {
            case "UserInfo" : return ( <UserInfo />); 
            case "UserInfoEdit" : return ( <UserInfoEdit /> )
            case "FriendListMain" : return (<FriendListMain />); 
            case "ChatRoom" : return (<ChatRoom />);
            case "ChatRoomOption" : return (<ChatRoomOption />);
            case "UserManageMain" : return (<UserManageMain />)
            default : return null;
        }
    }
    
    return (
        <div className='flex grid-cols-3'>
            <div>
                { pageMapping(msgPageReudcer.left)}
            </div>
            <div>
            { pageMapping(msgPageReudcer.middle)}

            </div>
            <div>
            { pageMapping(msgPageReudcer.right)}

            </div>
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