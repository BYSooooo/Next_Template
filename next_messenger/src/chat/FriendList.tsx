"use client"

import React from 'react';
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { controlDialog } from "../redux/features";
import { getSelectedUserInfo } from '../controller/FirebaseController';
import UserListItem from '../component/UserListItem';

export default function FriendList() {
    const dispatch = useAppDispatch()
    const userStore = useAppSelector((state)=> state.userStore)
    const [friendList, setFriendList] = React.useState<UserInfo[]>([]);
    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(()=> {
        setFriendList([])
        getFriendInfo(userStore.friend)
    },[userStore, inputValue])
    
    const onClickAddFriend =()=> {
        dispatch(controlDialog({ openYn : true, contentName : 'searchFriend', size : 'fit', title : 'Search'}))
    }

    const getFriendInfo = async(uuids : string[])=> {
        const friendInfos = [];
        for(const uid of uuids) {
            const { result, value } = await getSelectedUserInfo(uid);
            result && friendInfos.push(value);
        };
        if(inputValue.length > 0) {
            const filterList = friendInfos.filter((friend)=> 
                friend.displayName.toLowerCase().includes(inputValue.toLowerCase())
            )
            setFriendList(filterList)
        } else {
            setFriendList(friendInfos)
        }
    }

    const onClickListItem = (res : any)=> {
        console.log(res)
    }

    return (
        <div className='default-box
            flex flex-col
            max-w-[15rem] relative w-[30vw] mx-1'>
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
            <div>
                <input 
                    onChange={(e)=>setInputValue(e.target.value.trim())}
                    value={inputValue}
                    className="default-input w-5/6 "
                    placeholder="Search..."
                />
            </div>
            <div className="h-0.5 bg-slate-800 dark:bg-white mx-2 rounded-md my-5"/>
            <div className='px-2'>
                {friendList.length > 0 
                    ?   
                        <ul role="list" className='flex flex-col gap-2'>
                            {friendList.map((userInfo)=> {
                               return <UserListItem key={userInfo.uid} user={userInfo} selected={onClickListItem}/>
                            })}
                        </ul>

                    : 
                        <p>
                            No List
                        </p>
                }
            </div>
        </div>
    )
}
