"use client";

import React from 'react';

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { firebaseAuth } from '../../../firebase-config';
import { useAppDispatch } from '../../redux/hooks';
import { controlMessageToast } from '../../redux/features';
import { updateUserInfo } from '../../controller/FirebaseController';

export default function NoDisplayName() {
    const [display, setDisplay] = React.useState("");
    const dispatch = useAppDispatch();

    const userAuth = firebaseAuth;
    
    const onClickSubmit = ()=> {
        if(display.length === 0) {
            dispatch(controlMessageToast({ type : "error", openYn : true, title : 'Error', content : 'Please Input Display Name'}))
        } else {
            updateUserInfo([{ key : "displayName", value : display}])
                .then((result)=> {
                    console.log(result)
                })
        }
    }

    return (
        <div className="flex flex-col items-center">
            <UserCircleIcon className="w-1/3 h-1/3 mb-4"/>
            <div className='flex flex-col text-start mb-7 items-start'>
                <label 
                    htmlFor='emailAddress' 
                    className='block text-sm/3 font-medium text-gray-700 dark:text-gray-300 text-start'>
                    Email
                </label>
                <p  id="emailAddress" 
                    className='text-sm/7 text-white mb-4'>
                    {userAuth.currentUser.email}
                </p>
            
                <label
                    htmlFor='displayInput' 
                    className='block text-sm/7 font-medium text-gray-700 dark:text-gray-300 text-start'>
                    Display Name
                </label>
                <input 
                    className='rounded-md px-2 py-1'
                    id='displayInput'
                    onChange={(e)=> setDisplay(e.target.value)}
                    value={display}
                />
            </div>
            <button
                onClick={onClickSubmit} 
                className='bg-blue-400 dark:bg-blue-600 w-3/4 h-10 rounded-md transition duration-200 hover:bg-blue-500 hover:dark:bg-blue-500 '>
                <p className='text-sm'>
                    Submit
                </p>
            </button>
        </div>
    )
}