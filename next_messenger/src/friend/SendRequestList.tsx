"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getSelectedUserInfo } from '../controller/FirebaseController';
import UserListItem from '../component/UserListItem';
import { controlDialog } from '../redux/features';

export default function SendRequestList() {
    const [sendList, setSendList] = React.useState<UserInfo[]>([]);
    const userStore = useAppSelector((state)=> state.userStore);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        getRequestList()
    },[userStore])

    const getRequestList = async() => {
        if(userStore && userStore.requested) {
            userStore.requested.forEach(async(uid)=> {
                const { result, value } = await getSelectedUserInfo(uid);
                result && setSendList(prev=> prev.find((item)=> item.uid === value.uid) ? [...prev] : [...prev,value])
            })
        }
    }

    const onClickList = (user: UserInfo)=> {
        dispatch(controlDialog({openYn : true, title : "Request Info", contentName : "SendReceiveInfo", size : "96"}))
        console.log(user)
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
                {sendList.map((item)=> {
                    return (
                        <UserListItem key={item.uid} user={item} selected={onClickList}/>
                    )
                })}
            </div>
        </div>
    )
}