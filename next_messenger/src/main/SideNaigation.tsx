"use client"

import { ChatBubbleBottomCenterIcon, Cog6ToothIcon, HomeIcon, IdentificationIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SideNavigation() {
    const router = useRouter();
    const hoverStyle = "p-[0.2rem] hover:bg-slate-300 hover:dark:bg-slate-700 rounded-md dark:hover:bg-slate-500"

    const onClickHandler = (navTo: string)=> {
        switch(navTo) {
            case 'welcome' : 
                return router.push("/main")
            case 'chatting' :
                return router.push("/chat")
            case 'friendHandler' : 
                return router.push("/friend")
            case 'infoDetail':
                return router.push('/profile')
        }
    }

    return (
        <div className="default-box
            flex flex-col min-w-12 relative max-w-[10vw] items-center 
            mr-1 py-2 gap-3">
            <button
                onClick={()=>onClickHandler('welcome')} 
                className={`${hoverStyle} flex flex-row items-center gap-2`}>
                <HomeIcon className="w-7 h-7"/>
                <p>
                    Home
                </p>
            </button>
            <button 
                onClick={()=>onClickHandler('chatting')}
                className={`${hoverStyle}`}>
                <ChatBubbleBottomCenterIcon className="w-7 h-7" />
            </button>
            <button
                onClick={()=>onClickHandler('friendHandler')} 
                className={`${hoverStyle}`}>
                <UsersIcon className="w-7 h-7" />
            </button>
            <button 
                onClick={()=>onClickHandler('infoDetail')}
                className={`${hoverStyle}`}>
                <IdentificationIcon className="w-7 h-7" />
            </button>
        </div>
    )
}