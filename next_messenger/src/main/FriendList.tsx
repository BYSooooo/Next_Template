import { UserPlusIcon } from "@heroicons/react/24/solid";

export default function FriendList() {

    const onClickAddFriend =()=> {
        alert("Clicked")
    }

    return (
        <div className='max-w-[15rem] relative w-[30vw] dark:bg-slate-800 bg-slate-200 shadow-sm mx-1 rounded-md overflow-hidden flex flex-col'>
            <div className="flex flex-row static min-w-full h-[10%] items-center px-3 justify-between">
                <p className="text-lg font-bold ">
                    Friend List
                </p>
                <UserPlusIcon
                    onClick={onClickAddFriend} 
                    className="w-6 h-6  
                        hover:bg-slate-800
                        hover:rounded-full 
                        hover:cursor-pointer"
                />
            </div>
            <div className="mb-4">
                <input 
                    
                    className="dark:bg-slate-500 rounded-md px-2 py-1 w-5/6 hover:dark:bg-slate-300"
                    placeholder="Search..."/>
            </div>
            <div className="h-0.5 bg-slate-800 dark:bg-white mx-2 rounded-md"/>
            <div>
                
            </div>
        </div>
    )
}
