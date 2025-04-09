"use client"

import React from 'react';
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { controlDialog } from "../redux/features";

export default function FriendList() {
    const dispatch = useAppDispatch()
    const userStore = useAppSelector((state)=> state.userStore)
    const [friendList, setFriendList] = React.useState<string[]>([]);
    React.useEffect(()=> {
        setFriendList(userStore.friend)
    },[userStore])
    
    const onClickAddFriend =()=> {
        dispatch(controlDialog({ openYn : true, contentName : 'searchFriend', size : 'fit', title : 'Search'}))
    }

    

    return (
        <div className='default-box
            flex flex-col
            max-w-[15rem] relative w-[30vw] mx-1 '>
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
                    className="default-input w-5/6 "
                    placeholder="Search..."
                />
            </div>
            <div className="h-0.5 bg-slate-800 dark:bg-white mx-2 rounded-md"/>
            <div>
                {friendList.length > 0 
                    ?   <ul role="list" className='flex flex-col gap-2'>
                            {friendList.map((uuid)=> {
                               return <li key={uuid}>
                                {uuid}
                               </li> 
                            })}
                        </ul>

                    : <p>
                        No List
                    </p>
                }
            </div>
        </div>
    )
}
