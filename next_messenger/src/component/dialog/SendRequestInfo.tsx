"use client";

import { useAppSelector } from "../../redux/hooks";
import UserDetailInfo from "../UserDetail";

export default function SendRequestInfo() {
    const selectedUserInfo = useAppSelector((state)=> state.dialogStore).extraData;
    
    return (
        <div className="flex flex-col items-center w-96">
            <UserDetailInfo userInfo={selectedUserInfo} />
            <button 
                className="default-button text-center">
                    <p>
                        Hello
                    </p>                
            </button>   
        </div>
    )
}