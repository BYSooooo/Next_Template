'use client';

import { ChatBubbleBottomCenterIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { controlPageLayout } from "../redux/features";

export default function WelcomePage() {
    const userInfoSlice = useAppSelector((state)=>state.userStore)
    const dispatch = useAppDispatch()

    const handleClick =(moveTo : string) => {
        switch(moveTo) {
            case 'chatting' : 
                dispatch(controlPageLayout({left : 'SideNavigation', middle : 'FriendList', right : 'MainPage'}))
            break
        }
    }

    return (
        <div className="default-box
            flex flex-col w-[90vw] p-5">
            <p className="font-bold text-start text-5xl">
                Welcome
            </p>
            <div className="flex flex-row h-full">
                <div className="flex flex-col justify-center items-center w-[40vw]">
                    {userInfoSlice.photoUrl
                        ? <p> Hello</p>
                        : <UserCircleIcon className="w-28 h-28"/>}
                    <p className="text-base dark:text-slate-400 text-slate-600">
                        Display Name
                    </p>
                    <p className="text-xl">
                        {userInfoSlice.displayName}
                    </p>
                </div>
                <div className="flex flex-col w-[50vw] items-center gap-2">
                    <div className="text-start w-[70%]">
                        <p className="text-base font-bold">
                            Please Choose Action
                        </p>

                    </div>
                    <button 
                        className="default-button px-3 h-10 w-[70%]"
                        onClick={()=>handleClick('chatting')}>
                        <ChatBubbleBottomCenterIcon className="w-5 h-5 mr-2"/>
                        Chatting
                    </button>
                    <button className="default-button px-3 h-10 w-[70%]">
                        <Cog6ToothIcon className="w-5 h-5 mr-2"/>
                        Setting
                    </button>
                </div>

            </div>
        </div>
    )
}