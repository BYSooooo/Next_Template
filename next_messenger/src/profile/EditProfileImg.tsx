"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { controlMessageToast } from '../redux/features';
import { manageProfileImage } from '../controller/FirebaseController';
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function EditProfileImg() {
    const [ publicYn, setPublicYn ] = React.useState(false);
    const [ profileImg, setProfileImg ] = React.useState("");
    const userStore = useAppSelector((state)=> state.userStore);
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        setProfileImg(userStore.profileImg);
        setPublicYn(userStore.profileImgOpenYn);
    },[userStore.profileImg, userStore.profileImgOpenYn])

    const onChangeTempDisplayImg = async(event:React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files }} = event;
        const uploaded : File = files[0];

        if(uploaded.size > 1048576) {
            dispatch(controlMessageToast({ openYn: true, type: "error", title : "File Upload Error", content : "File Size exceed 1MB"}))
        } else {
            //To be Continue
            const { result, value } = await manageProfileImage({ action : 'set', file : uploaded});
            if(result) {
                dispatch(controlMessageToast({ openYn : true, type : 'confirm', title : 'Success', content : "Profile Image Changed"}))
            } else {
                dispatch(controlMessageToast({ openYn : true, type : 'error', title : 'Error Occured', content : value}))
            }
        }
    }

    const toggleProfileImgOpenYn = async(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        const { result, value } = await manageProfileImage({action : 'openYn', profileImgOpenYn : !publicYn});
        if(result) {
            setPublicYn(!publicYn)
        } else {
            controlMessageToast({ openYn : true, type : 'error', title : 'Error Occured', content : value});
        }
    }


    return (
        <div className="default-box-inner">
            <div className='flex-col text-start'>
                <p className="text-2xl font-bold">
                    Profile Image
                </p>
                <ul className="text-sm list-inside list-disc">
                    <li> 
                        Set a Image for display user information page.
                    </li>
                    <li>
                        You can control the visibility of your profileImg.
                    </li>
                    <li>
                        Upload File has a size limit of 1MB.
                    </li>
                </ul>
            </div>
            <div className='flex flex-col items-center'>
                {profileImg
                    ?   <img 
                            className='h-36 w-36 mx-auto'
                            src={profileImg}
                        />
                    : <PhotoIcon className='w-36 h-36 text-gray-600 dark:text-white'/>
                }
            </div>
            <div className='flex flex-row-reverse gap-2'>
                <label
                    className='inline-flex relative items-center cursor-pointer'>
                    <input
                        type='checkbox'
                        className='sr-only peer'
                        checked={publicYn}
                        readOnly
                    />
                    <div
                        onClick={toggleProfileImgOpenYn}
                        className="w-11 h-6 bg-red-500 rounded-full
                            peer  
                            peer-focus:ring-green-300  
                            peer-checked:after:translate-x-full 
                            peer-checked:after:border-white 
                            after:content-[''] 
                            after:absolute 
                            after:top-0.5 
                            after:left-[2px] 
                            after:bg-white 
                            after:border-gray-100 
                            after:border 
                            after:rounded-full 
                            after:h-5 
                            after:w-5 
                            after:transition-all 
                            peer-checked:bg-blue-500">
                    </div>
                </label>
                <p className='text-sm'>
                    {`Visible : ${publicYn === false ? 'Private' : 'Public'}`}
                </p>
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