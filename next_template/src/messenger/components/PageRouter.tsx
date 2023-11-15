import React from 'react';

import ChatList from "@/messenger/components/main/contents/ChatList";
import OtherInfo from "@/messenger/components/main/contents/OtherInfo";
import UserInfoEdit from "@/messenger/components/main/contents/UserInfoEdit";
import UserInfo from './main/left/UserInfo';
import { useAppSelector } from '@/redux/hook';

export default function PageRouter() {
    const messengerReducer = useAppSelector((state)=> state.messengerRouter);
    const [page, setPage] = React.useState("Default");

    React.useEffect(()=> {
        setPage(messengerReducer.pageName)
    },[messengerReducer.pageName])

    const routing = () => {
        switch (page) {
            case "Default" : 
                return (
                    <div className='flex grid-cols-3'>
                        <UserInfo />
                        <ChatList />
                        <OtherInfo />
                    </div>
                )
            case "Profile" : 
                return (
                    <div className='flex grid-cols-1'>
                        <UserInfoEdit />
                    </div>
                )
            default : 
                return (
                    <div>
                        Please Select
                    </div>
                )
        }
    }

    return routing()
}