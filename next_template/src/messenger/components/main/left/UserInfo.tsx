import React from 'react';

import { firebaseAuth, firebaseStore, firebaseStrg } from '@/../../firebaseConfig';
import { ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'

import { CheckIcon, UserIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '@/redux/hook';
import { setPageRouter } from '@/redux/features/messengerReducer';

export default function UserInfo() {
    const userInfo = firebaseAuth.currentUser;
    const dispatch = useAppDispatch()
    console.log(userInfo)
    console.log(firebaseStore)

    React.useEffect(()=> {
        initFireStroage()
    },[])
    const setDisplayName = () => {
        let dName = ""
        if(userInfo.displayName) {
            dName = firebaseAuth.currentUser.displayName
        }else {
            dName = "No Name" 
        }
        return dName
        
    }
    
    const initFireStroage = async () => {
        const fireRef = ref(firebaseStrg,`${userInfo.uid}/${uuidv4}`)
        const reader = new FileReader()
        //const photoToURL = reader.readAsDataURL(userInfo.photoURL)
        const response = await uploadString(fireRef,userInfo.photoURL,"data_url");
        console.log(response)
    }

    return (
        <div className='w-fit p-2 m-2'>
            <div className='flex rounded-full w-36 h-36 border-solid border-gray-400 border-2 items-center justify-center'>
                {firebaseAuth.currentUser.photoURL 
                ? <img src={firebaseAuth.currentUser.photoURL} /> 
                : <UserIcon className='w-auto h-auto text-gray-400'/> }
            </div>
            <div className='absoulte justify-end'>
                <button onClick={()=>dispatch(setPageRouter({page : "Profile", title : "Profile Edit"}))}>
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