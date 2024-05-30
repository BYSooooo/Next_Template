import React from 'react';

import { CheckIcon, UserIcon } from '@heroicons/react/20/solid';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRendering } from '@/redux/features/messengerReducer';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../../../firebaseConfig';

export default function UserInfo() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const dispatch = useAppDispatch()

    const onClickSignOut = ()=> {
        signOut(firebaseAuth)
    }

    return (
        <div className='shadow-box mx-2'>
            <div className='flex rounded-full w-28 h-28  items-center justify-center'>
                {currentUser?.photoURL 
                ? <img src={currentUser.photoURL} className='w-full h-full rounded-full shadow-xl '/> 
                : <UserIcon className='w-auto h-auto text-gray-400 border-2 rounded-full border-solid border-gray-400'/> }
            </div>
            
            <div>
                <h1 className='text-md text-gray-500'>
                    Name
                </h1>
                <h1 className='text-lg font-bold'>
                    {currentUser.displayName ? currentUser.displayName : "No Name"}
                </h1>
                <h1 className='text-md text-gray-500'>
                    E-Mail
                </h1>
                <div className='flex'>
                    <h1 className='text-lg font-bold'>
                        {currentUser?.email} 
                    </h1>
                    {currentUser?.emailVerified 
                    ? <CheckIcon className='w-6 h-6 text-green-500'/> 
                    : <CheckIcon className='w-6 h-6 text-red-500'/> }
                </div>
                <h1 className='text-md text-gray-500'>
                    Introduce
                </h1>
                <h1 className='text-lg font-bold'>
                    {currentUser?.introduction}
                </h1>
            </div>
            <div className='absoulte justify-end'>
                <button 
                    className='btn-primary mx-0 my-1'
                    onClick={()=>dispatch(setPageRendering({title : "Edit", left : "UserInfoEdit", middle : "null", right : "null"}))}>
                    <h1 className='text-sm'>
                        Edit
                    </h1>
                </button>
            </div>
            <div className='justify-end'>
                <button
                    onClick={onClickSignOut}
                    className='btn-primary mx-0 my-1 bg-red-500 hover:bg-red-300 dark:bg-red-700 dark:hover:bg-red-500'>
                    <h1 className='text-sm'>
                        Log out
                    </h1>
                </button>

            </div>
            
            
        </div>
    )
}