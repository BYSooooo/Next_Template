import { ChatBubbleBottomCenterIcon, Cog6ToothIcon, HomeIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../redux/hooks";
import { controlPageLayout } from "../redux/features";

export default function SideNavigation() {
    const dispatch = useAppDispatch()
    const hoverStyle = "p-[0.2rem] hover:bg-slate-300 hover:dark:bg-slate-700 rounded-md dark:hover:bg-slate-500"

    const onClickHandler = (navTo: string)=> {
        switch(navTo) {
            case 'welcome' : 
                return dispatch(controlPageLayout({ left : '', middle : 'WelcomePage', right : ''}))
            case 'chatting' :
                return dispatch(controlPageLayout({ left : 'SideNavigation', middle : 'FriendList', right : 'MainPage'}))
            case 'infoDetail':
                return dispatch(controlPageLayout({ left : 'SideNavigation', middle: 'UserDetailInfo', right : ''}))
        }
    }

    return (
        <div className="default-box
            flex flex-col min-w-12 relative max-w-[10vw] items-center 
            mr-1 py-2 gap-3">
            <button
                onClick={()=>onClickHandler('welcome')} 
                className={`${hoverStyle}`}>
                <HomeIcon className="w-7 h-7"/>
            </button>
            <button 
                onClick={()=>onClickHandler('chatting')}
                className={`${hoverStyle}`}>
                <ChatBubbleBottomCenterIcon className="w-7 h-7" />
            </button>
            <button 
                onClick={()=>onClickHandler('infoDetail')}
                className={`${hoverStyle}`}>
                <IdentificationIcon className="w-7 h-7" />
            </button>
            <button className={`${hoverStyle}`}>
                <Cog6ToothIcon className="w-7 h-7"/>           
            </button>
        </div>
    )
}