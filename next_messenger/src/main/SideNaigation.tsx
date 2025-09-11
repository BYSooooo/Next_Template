"use client"

import { ChatBubbleBottomCenterIcon, Cog6ToothIcon, HomeIcon, IdentificationIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

export default function SideNavigation() {
    const router = useRouter();
    const [selectedIdx, setSelectedIdx] = React.useState(1); 

    const onClickHandler = (navTo: string)=> {
        switch(navTo) {
            case 'welcome' :
                return router.push("/main")
            case 'chatting' :
                setSelectedIdx(2)
                return router.push("/chat")
            case 'friendHandler' :
                setSelectedIdx(3) 
                return router.push("/friend")
            case 'infoDetail':
                setSelectedIdx(4)
                return router.push('/profile')
        }
    }

    

    return (
        <div className="default-box
            flex flex-col min-w-12 relative max-w-[10vw] items-center 
            mr-1 py-2 px-1 gap-3">
            <button
                onClick={()=>onClickHandler('welcome')} 
                className="py-[0.2rem] px-[0.5rem] w-full hover:bg-slate-400 hover:dark:bg-slate-700 rounded-md ">
                <div className="flex w-full justify-center">
                    <HomeIcon className="w-7 h-7 self-center"/>
                </div>  
                <p className="text-sm">
                    Home
                </p>
            </button>
            <button 
                onClick={()=>onClickHandler('chatting')}
                className="py-[0.2rem] px-[0.5rem] w-full hover:bg-green-500 hover:dark:bg-green-600 rounded-md">
                <div className="flex w-full justify-center">
                    <ChatBubbleBottomCenterIcon className="w-7 h-7" />
                </div>    
                <p className="text-sm">
                    Chat
                </p>
            </button>
            <button
                onClick={()=>onClickHandler('friendHandler')} 
                className="py-[0.2rem] px-[0.5rem] w-full hover:bg-purple-500 hover:dark:bg-purple-600 rounded-md">
                <div className="flex w-full justify-center">
                    <UsersIcon className="w-7 h-7" />
                </div>
                <p className="text-sm">
                    Friend
                </p>
            </button>
            <button 
                onClick={()=>onClickHandler('infoDetail')}
                className="p-[0.2rem] px-[0.5rem] w-full hover:bg-orange-500 hover:dark:bg-orange-600 rounded-md">
                <div className="flex w-full justify-center">
                    <IdentificationIcon className="w-7 h-7" />
                </div>    
                <p className="text-sm">
                    Profile
                </p>
            </button>
        </div>
    )
}