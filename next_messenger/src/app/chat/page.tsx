"use client"

import FriendList from "../../chat/FriendList";
import SideNavigation from "../../main/SideNaigation";
import FriendChat from '../../chat/FriendChat';
import { UserInfoSnapshot } from "../../controller/SnapshotController";

export default function Page() {
    
    UserInfoSnapshot()

    return (
        <div className="flex flex-row mx-auto w-max h-svh text-center justify-center pt-14 pb-2">
            <div className='flex max-w-[10vw]'>
                <SideNavigation />
            </div>
            <div className='flex flex-row max-w-[90vw]'>
                <div className='flex'>
                    <FriendList />
                </div>
                <div className='flex'>
                    <FriendChat />
                </div>
            </div>
        </div>
    )
}