import React, { HTMLAttributes } from 'react';
import { firebaseAuth } from '../../../../firebaseConfig';

export default function UserInfo() {
    
    const userInfo = firebaseAuth.currentUser;
    console.log(userInfo)

    const avatarImage = ()=> {
        const customClass : HTMLAttributes<HTMLDivElement> = {
            
        }
        //https://flowbite.com/docs/components/avatar/
        return (
            <div className='relative w-${} h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
        )
    }

    return (
        <div className='w-52 border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex rounded-full w-40 h-40 border-solid border-gray-400 border-2 items-center justify-center'>
                {firebaseAuth.currentUser.photoURL 
                ? <img src={firebaseAuth.currentUser.photoURL} /> 
                : avatarImage() }
            </div>
            {firebaseAuth.currentUser.email}
            
        </div>
    )
}