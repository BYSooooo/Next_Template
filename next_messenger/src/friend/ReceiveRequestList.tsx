"use client"

import React from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getSelectedUserInfo } from '../controller/FirebaseController';
import UserListItem from '../component/UserListItem';
import { controlDialog } from '../redux/features';
import { UserInfo } from '../../typeDef';

export default function ReceiveRequestList() {
    const [receiveList, setReceiveList] = React.useState<UserInfo[]>([]);
    const userStore = useAppSelector((state)=> state.userStore);
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        getReceiveList()
    },[userStore])

    const getReceiveList = ()=> {
        if(userStore) {
            const receiveList = userStore.received;
            if(receiveList.length > 0) {
                receiveList.forEach(async(uid)=> {
                    const { result, value } = await getSelectedUserInfo(uid);
                    result && setReceiveList(prev => prev.find((item)=> item.uid === value.uid) ? [...prev] : [...prev,value])
                })
            } else {
                setReceiveList([])
            }
        }   
    }

    const onClickList = (user: UserInfo)=> {
        dispatch(controlDialog({openYn : true, title : "Receive Info", contentName : "ReceiveRequestInfo", size : "96", extraData : user}))
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
            <div className="h-[85%] flex flex-col gap-2">
                {receiveList.map((item)=>{
                    return <UserListItem key={item.uid} user={item} selected={onClickList}/>
                })}
            </div>
        </div>
    )
}