"use client";

import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { firebaseAuth } from "../../../firebase-config";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { controlMessageToast } from "../../redux/features";
import { updateUserInfo } from "../../firebase/UserInfo";
import { useRouter } from "next/navigation";

export default function Page() {
    const [displayNm, setDisplayNm] = React.useState("");

    const currentUser = firebaseAuth.currentUser;
    const userSlice = useAppSelector((state)=> state.userStore);
    const dispatch = useAppDispatch();
    const router = useRouter();

    React.useEffect(()=> {
        !currentUser && router.push("/")
    },[])

    const onClickSubmit = async()=> {
        if(displayNm.length === 0) {
            dispatch(controlMessageToast({ openYn : true, type : "error", title : "Display Name Empty", content : "Display Name is Required"}))
        } else {
            const { result, value } = await updateUserInfo([{ key : "displayName", value : displayNm}])
                result 
                    ? router.push("/main")
                    : dispatch(controlMessageToast({openYn : true, type : "error", title : "Error Occured", content : value}))
                
        }
    }

    return (
        <div className="main-div">
            <div className="flex flex-col default-box items-center p-3 ">
                <div className="text-start gap-1">
                    <h4 className="text-xl font-bold text-black dark:text-white">
                        Display Name
                    </h4>
                    <ul className="text-sm list-disc list-inside mb-3">
                        <li>
                            To use the site, you need to set the DisplayName.
                        </li>
                        <li>
                            DisplayName used for Searching User, Chatting, and others.
                        </li>
                    </ul>

                </div>
                <UserCircleIcon className="w-32 h-32"/>
                <div>
                    <label 
                        htmlFor="emailAddress"
                        className="block text-sm/3 font-medium text-gray-700 dark:text-gray-300 self-start">
                        Email
                    </label>
                    <p 
                        id="emailAddress"
                        className="text-sm/7 dark:text-white text-black mb-4">
                        {currentUser?.email}
                    </p>
                    <label
                        htmlFor="displayInput"
                        className="block text-sm/3 font-medium text-gray-700 dark:text-gray-300 text-start self-start mb-2">
                        Display Name
                    </label>
                    <input 
                        className='default-input'
                        id='displayInput'
                        onChange={(e)=> setDisplayNm(e.target.value)}
                        value={displayNm}
                    />

                </div>
                <button
                    className="confirm-button w-2/3 p-2 justify-around mt-3"
                    onClick={onClickSubmit}>
                    <p className="text-sm">
                        Submit
                    </p>

                </button>
                
            </div>
        </div>
    )
}