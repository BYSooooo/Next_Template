import { UserPlusIcon } from "@heroicons/react/24/solid";

export default function FriendList() {

    const onClickAddFriend =()=> {
        alert("Clicked")
    }

    return (
        <div className='max-w-[15rem] relative w-[30vw] dark:bg-slate-500 bg-slate-200 shadow-sm mr-1 rounded-md overflow-hidden flex flex-col'>
            <div className="flex flex-row static bg-purple-500 dark:bg-purple-800 min-w-full h-[10%] items-center px-3 justify-between">
                <p className="text-lg font-bold text-white">
                    Friend List
                </p>
                <UserPlusIcon
                    onClick={onClickAddFriend} 
                    className="w-6 h-6 text-white
                        hover:bg-slate-800
                        hover:rounded-full 
                        hover:cursor-pointer"
                />
            </div>
            <div>
                This is Friend List
            </div>
        </div>
    )
}
