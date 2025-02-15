"use client";

import React from 'react';
import { controlDialog, controlMessageToast } from "../../redux/features";
import { useAppDispatch } from "../../redux/hooks";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getUserListForSearch } from '../../controller/FirebaseController';
import { NoSymbolIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import UserListItem from '../UserListItem';
import UserDetailInfo from '../UserDetail';

export default function SearchFriend() {
    const [checked, setChecked] = React.useState("email")
    const [selUser, setSelUser] = React.useState<UserInfo>(null);
    const [userList, setUserList] = React.useState([]);
    const [keyword, setKeyword] = React.useState("");
    
    const dispatch = useAppDispatch()

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
                        return <UserListItem key={user.email} user={user} selected={setSelUser}/>
                    })}
                </ul>   
            )
        } else {
            return (
                <div className='flex flex-col items-center h-full justify-center'>
                    <NoSymbolIcon className='w-10 h-10 dark:text-red-400 text-red-600'/>
                    <p className='text-lg dark:text-red-200 text-red-800'>
                        No Result
                    </p>
                </div>
            )
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row divide-solid divide-x">
                {/*  Left Side : Search, List */}
                <div className="flex flex-col gap-2 items-center min-w-[20rem]">
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
                    {/* Input and Search*/}
                    <div className='flex flex-row'>
                        <input
                            onKeyDown={(event)=> {
                                event.key === 'Enter' && onClickSearch()
                            }}
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
                    <div className='flex flex-col text-center min-h-[20vh] overflow-scroll'>
                        {showSearchList(userList)}
                    </div>
                </div>
                {/* Right Side : Selected Friend Inform */}
                <div className="flex flex-col px-2 min-w-[20rem]">
                    {selUser 
                        ?   <UserDetailInfo userInfo={selUser}/>  
                        :   <div className='flex flex-col h-full items-center justify-center'>
                                <QuestionMarkCircleIcon className='w-14 h-14 dark:text-red-500' />       
                                <p className='dark:text-red-500'>
                                    No Select
                                </p>
                            </div>
                    }
                
                    <button className='confirm-button'>
                        Request
                    </button>
                
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