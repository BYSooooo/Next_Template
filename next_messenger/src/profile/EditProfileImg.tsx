"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { controlMessageToast } from '../redux/features';

export default function EditProfileImg() {
    const userStore = useAppSelector((state)=> state.userStore);
    const dispatch = useAppDispatch();

    const onChangeTempDisplayImg = async(event:React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files }} = event;
        const uploaded : File = files[0];

        if(uploaded.size > 1048576) {
            dispatch(controlMessageToast({ openYn: true, type: "error", title : "File Upload Error", content : "File Size exceed 1MB"}))
        } else {
            // To be Continue
            // const { result, value } = await manageDisplayImg({ action : 'set', file : uploaded});
            // if(result) {
            //     dispatch(controlMessageToast({ openYn : true, type : 'confirm', title : 'Success', content : "Profile Image Changed"}))
            // } else {
            //     dispatch(controlMessageToast({ openYn : true, type : 'error', title : 'Error Occured', content : value}))
            // }
        }
    }


    return (
        <div className="default-box-inner">
            <div className='flex-col text-start'>
                <p className="text-2xl font-bold">
                    Profile Image
                </p>
                <ul className="text-sm list-inside list-disc">
                    <li> Set a Image for display user information page.</li>
                    
                </ul>
            </div>
            <div className='flex flex-row-reverse gap-2'>
                <button
                    onClick={()=> document.getElementById("tempDisplayImg").click()}
                    className='confirm-button py-1 px-2'>
                    Select
                </button>
                <input 
                    type='file' 
                    id="tempDisplayImg" 
                    accept="image/*" 
                    onChange={(e)=> onChangeTempDisplayImg(e)}
                    style={{ display : 'none'}} 
                />
            </div>
        </div>
    )
}