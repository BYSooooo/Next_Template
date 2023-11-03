import React from 'react';

import ChatList from "@/messenger/components/main/contents/ChatList";
import OtherInfo from "@/messenger/components/main/contents/OtherInfo";
import UserInfoEdit from "@/messenger/components/main/contents/UserInfoEdit";

export default function PageRouter({pageName} : {pageName : string}) {
    const [page, setPage] = React.useState("Default");
    
    React.useEffect(()=> {
        setPage(pageName)
        
    },[pageName])

    const routing = () => {
        switch (page) {
            case "Default" : 
                return (
                    <div className='flex grid-cols-2'>
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