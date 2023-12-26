import React from 'react';

import { CheckIcon, UserIcon } from '@heroicons/react/20/solid';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRouter } from '@/redux/features/messengerReducer';
import { UserInfo } from '../../../../msg_typeDef';

export default function UserInfo() {
    const [userInfo, setUserInfo] = React.useState<UserInfo>();
    const msgCurUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setUserInfo(msgCurUser)
    },[msgCurUser])

    return (
        <div className='w-fit p-2 m-2'>
            <div className='flex rounded-full w-28 h-28  items-center justify-center'>
                {userInfo?.photoURL 
                ? <img src={userInfo.photoURL} className='w-full h-full rounded-full'/> 
                : <UserIcon className='w-auto h-auto text-gray-400 border-2 rounded-full border-solid border-gray-400'/> }
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
                    {userInfo?.displayName ? userInfo.displayName : "No Name"}
                </h6>
                <h3 className='text-md text-gray-500'>
                    E-Mail
                </h3>
                <div className='flex'>
                    <h6 className='text-lg font-bold'>
                        {userInfo?.email} 
                    </h6>
                    {userInfo?.emailVerified 
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