"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import UserListItem from '../component/UserListItem';
import { controlDialog } from '../redux/features';
import { UserInfo } from '../../typeDef';
import { getSelectedUserInfo } from '../firebase/UserInfo';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function SendRequestList() {
    const [sendList, setSendList] = React.useState<UserInfo[]>([]);
    const userStore = useAppSelector((state)=> state.userStore);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        getRequestList()
    },[userStore])

    const getRequestList = async() => {
        if(userStore) {
            const requestList = userStore.requested
            if(requestList.length > 0) {
                requestList.forEach(async(uid)=> {
                    const { result, value } = await getSelectedUserInfo({uuid : uid});
                    result && setSendList(prev=> prev.find((item)=> item.uid === value.uid) ? [...prev] : [...prev,value])
                })
            } else {
                setSendList([]);
            }
        }
    }

    const onClickList = (user: UserInfo)=> {
        dispatch(controlDialog({openYn : true, title : "Request Info", contentName : "SendRequestInfo", size : "96", extraData: user}))
    };

    return (
        <div className="default-box-inner h-[100vh]">
            <p className="text-xl font-bold text-start">
                Send Request
            </p>
            <div className="h-[15%]">
                <ul className="text-sm list-inside list-disc text-start text-pretty">
                    <li>
                        A list of friend requests that are waiting to be accepted.
                    </li>
                    <li>
                        You can wait for them to accept or cancel it.
                    </li>
                </ul>

            </div>
            <div className="h-[85%] flex flex-col gap-2">
                { sendList.length > 0
                    ?
                        <ul role='list' className='flex flex-col gap-2'>
                            {sendList.map((item)=> {
                                return (
                                    <UserListItem key={item.uid} user={item} selected={onClickList}/>
                                )
                            })}
                        </ul>                    
                    :
                        <div className='flex flex-col w-full h-full justify-center items-center'>
                            <ExclamationCircleIcon className='w-10 h-10'/>
                            <p>
                                No List
                            </p>
                        </div>  

                }
            </div>
        </div>
    )
}