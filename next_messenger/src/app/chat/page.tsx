import FriendList from "../../main/FriendList";
import SideNavigation from "../../main/SideNaigation";

export default function Page() {
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
                    
                </div>
            </div>
        </div>
    )
}