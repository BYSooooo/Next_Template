'use client';

import { ChatBubbleBottomCenterIcon, Cog6ToothIcon, IdentificationIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "../redux/hooks"
import { useRouter } from "next/navigation";

export default function WelcomePage() {
    const userInfoSlice = useAppSelector((state)=>state.userStore)
    const router = useRouter();

    const handleClick =(moveTo : string) => {
        switch(moveTo) {
            case 'chatting' : 
                router.push("/chat")
            break;
            case 'friendMng' : 
                
            break;
            case 'profile' :
            break;
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
                    { userInfoSlice.avatarImg === '' 
                        ?   <UserCircleIcon className="w-28 h-28"/>
                        :   <img
                                className="h-32 w-32 mx-auto object-cover rounded-full" 
                                src={userInfoSlice.avatarImg} 
                            />
                    }
                    <p className="text-xl">
                        {userInfoSlice.displayName}
                    </p>
                    <p className="text-base dark:text-slate-400 text-slate-600">
                        {userInfoSlice.email}
                    </p>
                </div>
                <div className="flex flex-col w-[50vw] items-center gap-2">
                    <div className="text-start w-[70%]">
                        <p className="text-base font-bold">
                            Please Choose Action
                        </p>

                    </div>
                    <button 
                        className="default-button px-3 h-10 w-[70%]
                                hover:bg-green-400 
                                dark:hover:bg-green-600"
                        onClick={()=>handleClick('chatting')}>
                        <ChatBubbleBottomCenterIcon className="w-5 h-5 mr-2"/>
                        Chatting
                    </button>
                    <button
                        className="default-button px-3 h-10 w-[70%]
                                hover:bg-purple-400 
                                dark:hover:bg-purple-600"
                        onClick={()=>handleClick('friendMng')}>
                        <UsersIcon className="w-5 h-5 mr-2"/>
                        Friend Manage
                    </button>
                    <button
                        onClick={()=>handleClick('profile')}
                        className="default-button px-3 h-10 w-[70%]
                                hover:bg-orange-400
                                dark:hover:bg-orange-600">
                        <IdentificationIcon className="w-5 h-5 mr-2" />
                        Profile
                    </button>
                    <button 
                        className="default-button px-3 h-10 w-[70%]">
                        <Cog6ToothIcon className="w-5 h-5 mr-2"/>
                        Setting
                    </button>
                </div>

            </div>
        </div>
    )
}