'use client'

import React from 'react'

import { UserCircleIcon } from "@heroicons/react/24/solid"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { controlMessageToast } from "../redux/features";
import { delAvatarBinary, setAvatarBinary, updateAvatarOpenYn } from "../controller/FirebaseController";
import { UserInfo } from '../../typeDef';
import { firebaseAuth } from '../../firebase-config';

export default function EditAvatarIcon() {
    const [publicYn, setPublicYn] = React.useState(false);
    const userStore = useAppSelector((state)=> state.userStore);
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        
        //setPublicYn(avatarOpenYn);
    },[])

    const onChangeTempAvatar = async(event: React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } }= event;
        const uploaded : File = files[0];

        if(uploaded.size > 1048576) {
            dispatch(controlMessageToast({ openYn: true, type: "error", title : "File Upload Error", content : "File Size exceed 1MB"}))
        } else {
            const {result, value} = await setAvatarBinary(uploaded)
            
            if(result) {
                dispatch(controlMessageToast({ openYn : true, type : 'confirm', title : 'Success', content : "Avatar Image Changed"}))
            } else {
                dispatch(controlMessageToast({ openYn : true, type : 'error', title : 'Error Occured', content : value}))
            }
        }
    }

    const onDeleteAvatarImg = async()=> {
        const { result, value } = await delAvatarBinary()
        console.log(result, value)
        if(result) {
            value && controlMessageToast({ openYn : true, type : 'confirm', title : "Success", content : 'Avatar Image Deleted'})  
        } else {
            controlMessageToast({ openYn : true, type : 'error', title : 'Error Occured', content : value})
        }
    }

    const toggleAvatarOpenYn = async(e: React.MouseEvent<HTMLDivElement,MouseEvent>)=> {
        const { result, value } = await updateAvatarOpenYn(!publicYn);
        if(result) {
            setPublicYn(!publicYn)
        } else {
            controlMessageToast({ openYn : true, type : 'error', title : 'Errur Occured', content : value})
        }
    }

    return (
        
        <div className="default-box-inner">
            <div className="flex flex-col text-start ">
                <p className="text-2xl font-bold">
                    Avatar
                </p>
                <ul className="text-sm list-inside list-disc">
                    <li>
                        Upload an image to use as profile picture.  
                    </li>
                    <li>
                        You can control the visibility of your avatar.
                    </li>
                    <li>
                        Upload File has a size limit of 1MB.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center">
            {userStore.avatarImg
                ?   <img
                        className="h-36 w-36 mx-auto object-cover rounded-full" 
                        src={userStore.avatarImg} 
                    />
                        
                : 
                    <UserCircleIcon className="w-36 h-36 text-gray-600 dark:text-white"/> 
            }
            </div>
            <div className="flex flex-row-reverse gap-2">
                <label
                    className="inline-flex relative items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={publicYn}
                        readOnly
                        />
                    <div 
                        onClick={toggleAvatarOpenYn}
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
                <p className="text-sm">
                    {`Visible : ${publicYn === false ? 'Private' : 'Public'}`}
                </p>
            </div>
            <div className="flex flex-row-reverse gap-2">
                <button
                    onClick={()=> document.getElementById("tempAvatar").click()} 
                    className="confirm-button py-1 px-2">
                    Select
                </button>
                <input type='file' id="tempAvatar"accept="image/*" onChange={(e)=> onChangeTempAvatar(e)} style={{ display : 'none'}} />
                <button
                    onClick={onDeleteAvatarImg} 
                    className="decline-button py-1 px-2 ">
                    Delete
                </button>
            </div>
        </div>
    )
}