"use client";

import { firebaseAuth } from "../../../firebase-config";
import { updateFriendReceive } from "../../controller/FirebaseController";
import { controlMessageToast } from "../../redux/features";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import UserDetailInfo from "../UserDetail";

export default function ReceiveRequestInfo() {
    const selectedUserInfo = useAppSelector((state)=> state.dialogStore).extraData;
    const dispatch = useAppDispatch();

    const onClickDecline = async()=> {
        const { result, value } = await updateFriendReceive("decline",firebaseAuth.currentUser.uid)
        if(result) {
            dispatch(controlMessageToast({ openYn : true, title : "Success", type : "confirm", content : "Request Decliend"}))
        } else {
            dispatch(controlMessageToast({ openYn : true, title : "Error", type : 'error', content : value}))
        }
    }

    const onClickAccept = async()=> {
        dispatch(controlMessageToast({ openYn : true, title : "Success", type : "confirm", content : "Request Accepted"}))
    }

    return (
        <div className="flex flex-col items-center">
            <UserDetailInfo userInfo={selectedUserInfo} />
            <div className="w-full flex flex-row-reverse mt-3 gap-2">
                <button
                    className="default-button text-center p-1
                        hover:bg-green-500 dark:hover:bg-green-500"
                    onClick={onClickAccept}>
                    <p>
                        Accept
                    </p>
                </button>
                <button
                    className="default-button text-center p-1
                        hover:bg-red-600 dark:hover:bg-red-600"
                    onClick={onClickDecline}>
                    <p>
                        Decline
                    </p>
                </button>
            </div>
        </div>
    )
}