"use client";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import UserDetailInfo from "../UserDetail";

export default function ReceiveRequestInfo() {
    const selectedUserInfo = useAppSelector((state)=> state.dialogStore).extraData;
    const dispatch = useAppDispatch();

    const onClickDecline = async()=> {
        console.log("Decline")
    }

    const onClickAccept = async()=> {
        console.log("Accept")
    }

    return (
        <div className="flex flex-col items-center">
            <UserDetailInfo userInfo={selectedUserInfo} />
            <div className="w-full flex flex-row-reverse mt-3 gap-2">
                <button
                    className="default-button text-center p-1"
                    onClick={onClickDecline}>
                    <p>
                        Decline
                    </p>
                </button>
                <button
                    className="default-button text-center p-1"
                    onClick={onClickAccept}>
                    <p>
                        Accept
                    </p>
                </button>
            </div>
        </div>
    )
}