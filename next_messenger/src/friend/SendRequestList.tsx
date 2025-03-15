"use client";

import React from 'react';
import { useAppSelector } from "../redux/hooks";
import { getUserListForSearch } from '../controller/FirebaseController';

export default function SendRequestList() {
    const userStore = useAppSelector((state)=> state.userStore);
    const [sendList, setSendList] = React.useState([]);

    React.useEffect(()=> {
        getRequestList()
    },[userStore])

    const getRequestList = async() => {
        console.log("request list Called")
        if(userStore && userStore.requested) {
            const {result, value } = await getUserListForSearch("","");
            if(result) {
                // Need Modify
            }
            setSendList(userStore.requested)
        }
    }

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
                        <p key={item}>
                            {item}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}