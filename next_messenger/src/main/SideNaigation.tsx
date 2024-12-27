import { ChatBubbleBottomCenterIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function SideNavigation() {

    const hoverStyle = "p-[0.2rem] hover:bg-slate-300 hover:dark:bg-slate-700 rounded-md dark:hover:bg-slate-500"

    return (
        <div className="default-box
            flex flex-col min-w-12 relative max-w-[10vw] items-center 
            mr-1 py-2 gap-3">
            <button 
                className={`${hoverStyle}`}>
                <HomeIcon className="w-7 h-7"/>
            </button>
            <button className={`${hoverStyle}`}>
                <ChatBubbleBottomCenterIcon className="w-7 h-7" />

            </button>
        </div>
    )
}