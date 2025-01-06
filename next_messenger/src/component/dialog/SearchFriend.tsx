"use client";

import React from 'react';
import { controlDialog, controlMessageToast } from "../../redux/features";
import { useAppDispatch } from "../../redux/hooks";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getUserListForSearch } from '../../controller/FirebaseController';
import { NoSymbolIcon } from '@heroicons/react/24/solid';
import UserListItem from '../UserListItem';

export default function SearchFriend() {
    const dispatch = useAppDispatch()
    const [checked, setChecked] = React.useState("email")
    const [selUser, setSelUser] = React.useState<UserInfo>(null);
    const [userList, setUserList] = React.useState([]);
    const [keyword, setKeyword] = React.useState("");

    React.useEffect(()=> {
        setSelUser(null)
    },[])

    const onClickClose = ()=> {
        dispatch(controlDialog({ openYn : false, contentName : "", size : "",title : "",}))
    }

    const onClickSearch = async()=> {
        const {result, value } = await getUserListForSearch(keyword, checked)
        if(result) {
            setUserList(value)
        } else {
            dispatch(controlMessageToast({openYn : true, type : 'error', title : 'Search Error', content : value}))
        }
    }

    const showSearchList = (userList : UserInfo[])=> {
        if(userList.length > 0) {
            return (
                <ul 
                    role="list" 
                    className='flex flex-col gap-2'>
                    {userList.map((user)=> {
                        return <UserListItem user={user}/>
                    })}
                </ul>   
            )
        } else {
            return (
                <>
                    <NoSymbolIcon className='w-5 h-5'/>
                    <p>
                        No Result
                    </p>
                </>
            )
        }
    }
    

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row divide-solid divide-x gap-2">
                {/*  Left Side : Search, List */}
                <div className="flex flex-col gap-2">
                    {/* Radio Button Group*/}
                    <div className="flex flex-row gap-3">
                        <div className="flex flex-row text-center w-fit">
                            <input 
                                checked={checked === "email"}
                                onChange={()=>setChecked("email")}
                                className="default-radio mr-2" 
                                type="radio"
                            />
                            <label className="text-sm">Email</label>
                        </div>
                        <div className="flex flex-row text-center w-fit">
                            <input
                                checked={checked === "displayName"}
                                onChange={()=> setChecked("displayName")} 
                                className="default-radio mr-2" 
                                type="radio"/>
                            <label className="text-sm">DisplayName</label>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <input
                            onChange={(e)=>setKeyword(e.target.value)}
                            value={keyword}
                            placeholder="Search..." 
                            className="default-input w-[85%] mr-1">
                        </input>
                        <button 
                            onClick={onClickSearch}
                            className='w-[15%] confirm-button justify-center'>
                            <MagnifyingGlassIcon className='w-5 h-5 font-bold'/>
                        </button>
                    </div>
                    <div className='flex flex-col text-center'>
                        {showSearchList(userList)}
                    </div>
                </div>
                {/* Right Side : Selected Friend Inform */}
                <div className="flex flex-col">
                    This is Info Part
                </div>
            </div>
            
            
            <div className="">

            </div>
            <div className="flex flex-row justify-end">
                <button 
                    className="default-button"
                    onClick={onClickClose}>
                    Close
                </button>
            </div>
        </div>
    )
}