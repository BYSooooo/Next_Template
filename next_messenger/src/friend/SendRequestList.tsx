"use client";

import { useAppSelector } from "../redux/hooks";

export default function SendRequestList() {
    const userStore = useAppSelector((state)=> state.userStore);
    
    const requestList = ()=> {
        if(userStore && userStore.requested) {
            const listArray = userStore.requested;
            if(listArray.length > 0) {
                return (
                    listArray.forEach((item)=> {
                        <p>
                            {item}
                        </p>
                    })
                )
            } else {
                return (
                    <p>
                        No List
                    </p>
                )
            }
        } else {
            return <p> No List </p>
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
                
            </div>
        </div>
    )
}