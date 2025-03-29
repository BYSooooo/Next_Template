"use client"

import React from 'react';
import { useAppSelector } from "../redux/hooks"
import { getSelectedUserInfo } from '../controller/FirebaseController';
import UserListItem from '../component/UserListItem';

export default function ReceiveRequestList() {
    const userStore = useAppSelector((state)=> state.userStore);
    const [receiveList, setReceiveList] = React.useState<UserInfo[]>([]);

    React.useEffect(()=> {
        getReceiveList()
    },[userStore])

    const getReceiveList = ()=> {
        const aResult = [];
        if(userStore && userStore.received) {
            userStore.received.forEach(async(uid)=> {
                const { result, value } = await getSelectedUserInfo(uid);
                result && aResult.push(value);
            })
            setReceiveList(aResult);
        }   
    }

    const onClickList = ()=> {
        console.log("onClicked")
    }

    return (
        <div className="default-box-inner">
            <p className="text-xl font-bold text-start">
                Receive Request
            </p>
            <div className="h-[15%]">
                <ul className="text-sm list-inside list-disc text-start text-pretty">
                    <li>
                        This is a list of friend registration requests that you have received.
                    </li>
                    <li>
                        You can accept or decline.
                    </li>
                </ul>
            </div>
            <div className="h-[85%]">
                {receiveList.map((item)=>{
                    return <UserListItem key={item.uid} user={item} selected={onClickList}/>
                })}
            </div>
        </div>
    )
}