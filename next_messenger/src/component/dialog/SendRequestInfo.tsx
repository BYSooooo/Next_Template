"use client";

import { updateFriendRequest } from "../../controller/FirebaseController";
import { controlDialog, controlMessageToast } from "../../redux/features";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import UserDetailInfo from "../UserDetail";

export default function SendRequestInfo() {
    const selectedUserInfo = useAppSelector((state)=> state.dialogStore).extraData;
    const dispatch = useAppDispatch()

    const onClickCancel = async()=> {
        const { result, value } = await updateFriendRequest("del", selectedUserInfo.uid)
        if(result) {
            dispatch(controlMessageToast({ openYn : true, type : "confirm", title : "Success", content : "Request Delete Complete"}))
            dispatch(controlDialog({ openYn : false, contentName : "", size : "", title : ""}))
        } else {
            dispatch(controlMessageToast({ openYn : true, type : "error", title : "Error Occured", content : value}))
        }
        
    }

    return (
        <div className="flex flex-col items-center">
            <UserDetailInfo userInfo={selectedUserInfo} />
            <div className="w-full flex flex-row-reverse mt-3">
                <button
                    onClick={onClickCancel} 
                    className="default-button text-center p-1 
                        hover:bg-red-600 dark:hover:bg-red-600">
                        <p>
                            Cancel
                        </p>                
                </button>   

            </div>
        </div>
    )
}