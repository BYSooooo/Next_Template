"use client";

import React from 'react';
import { useAppSelector } from "../redux/hooks";
import { getSelectedUserInfo } from '../controller/FirebaseController';
import UserListItem from '../component/UserListItem';

export default function SendRequestList() {
    const userStore = useAppSelector((state)=> state.userStore);
    const [sendList, setSendList] = React.useState<UserInfo[]>([]);

    React.useEffect(()=> {
        getRequestList()
    },[userStore])

    const getRequestList = async() => {
        const aResult = [];
        if(userStore && userStore.requested) {
            userStore.requested.forEach(async(uid)=> {
                const { result, value } = await getSelectedUserInfo(uid);
                result && aResult.push(value);
            })
            setSendList(aResult);    
        }
    }

    const onClickList = ()=> {
        console.log("onClicked")
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
            <div className="h-[85%]">
                {sendList.map((item)=> {
                    return (
                        <UserListItem key={item.uid} user={item} selected={onClickList}/>
                    )
                })}
            </div>
        </div>
    )
}