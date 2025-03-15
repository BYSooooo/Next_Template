"use client"

import { useAppSelector } from "../redux/hooks"

export default function ReceiveRequestList() {
    const userStore = useAppSelector((state)=> state.userStore);

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
                
            </div>
        </div>
    )
}