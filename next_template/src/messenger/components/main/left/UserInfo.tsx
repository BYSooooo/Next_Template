import React, { HTMLAttributes } from 'react';
import { firebaseAuth } from '@/../../firebaseConfig'
import { CheckIcon, UserIcon } from '@heroicons/react/20/solid';

export default function UserInfo({pageControl} : {pageControl : Function}) {
    
    const userInfo = firebaseAuth.currentUser;
    console.log(userInfo)


    const setDisplayName = () => {
        let dName = ""
        if(dName) {
            dName = firebaseAuth.currentUser.displayName
        }else {
            dName = "No Name" 
        }
        return dName
        
    }

    return (
        <div className='w-fit p-2 m-2'>
            <div className='flex rounded-full w-36 h-36 border-solid border-gray-400 border-2 items-center justify-center'>
                {firebaseAuth.currentUser.photoURL 
                ? <img src={firebaseAuth.currentUser.photoURL} /> 
                : <UserIcon className='w-auto h-auto text-gray-400'/> }
            </div>
            <div className='absoulte justify-end'>
                <button onClick={()=>pageControl("Profile")}>
                    Edit
                </button>
            </div>
            <div>
                <h3 className='text-md text-gray-500'>
                    Name
                </h3>
                <h6 className='text-lg font-bold'>
                    {setDisplayName()}
                </h6>
                <h3 className='text-md text-gray-500'>
                    E-Mail
                </h3>
                <div className='flex'>
                    <h6 className='text-lg font-bold'>
                        {firebaseAuth.currentUser.email} 
                    </h6>
                    {userInfo.emailVerified 
                    ? <CheckIcon className='w-6 h-6 text-green-500'/> 
                    : <CheckIcon className='w-6 h-6 text-red-500'/> }
                </div>
                <h3 className='text-md text-gray-500'>
                    Introduce
                </h3>
                <div className='rounded-md border-solid border-2 border-gray-500 w-full h-44'>

                </div>
                <div>
                    <h6 className='text-md text-gray-500'>
                        Follow List
                    </h6>
                </div>
            </div>
            
            
        </div>
    )
}