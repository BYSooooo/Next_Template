import React, { HTMLAttributes } from 'react';
import { firebaseAuth } from '../../../../firebaseConfig';
import { Icon_Check_NotVeri, Icon_Check_Verified } from '@/messenger/styles/IconPack';

export default function UserInfo({modalYn} : {modalYn : Function}) {
    
    const userInfo = firebaseAuth.currentUser;
    console.log(userInfo)

    const avatarImage = ()=> {
        const customClass : HTMLAttributes<HTMLDivElement> = {
            
        }
        //https://flowbite.com/docs/components/avatar/
        return (
            <div className='relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                <svg className="absolute w-36 h-36 text-gray-400 -left-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
        )
    }
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
        <div className=' w-56 p-2 m-2'>
            <div className='flex rounded-full w-36 h-36 border-solid border-gray-400 border-2 items-center justify-center'>
                {firebaseAuth.currentUser.photoURL 
                ? <img src={firebaseAuth.currentUser.photoURL} /> 
                : avatarImage() }
            </div>
            <div>
                <div className='absolute items-end w-full'>
                    <button >
                        Edit
                    </button>

                </div>
                
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
                    {
                        userInfo.emailVerified 
                        ? <Icon_Check_Verified/> 
                        : <Icon_Check_NotVeri />
                    }
                    
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