import React from 'react';

import { UserInfo } from '../../../../msg_typeDef';
import { UserIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function UserInfoModal({info,status,openYn} : {info : UserInfo, status: "Default"|"Request"|"Friend"|"Block", openYn : Function}) {
    React.useEffect(()=>{
     
    },[])

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-slate-800 rounded-md p-3 w-80'>
                <div className='flex justify-between'>
                    <text className='text-xl font-bold'>
                        Information
                    </text>
                    <XMarkIcon 
                        className='w-5 h-5 text-red-500 hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-full transition duration-200' 
                        onClick={()=>openYn(false)}/>
                </div>
                <div className='flex justify-center mt-4 mb-14'>
                    {
                        info.photoURL 
                        ?  <img src={info.photoURL} className='w-32 h-32 rounded-full '/>
                        :  <UserIcon className='w-32 h-32 border-2 border-solid rounded-full border-slate-500 text-slate-500'/>
                    }
                </div>
                <div className='text-center'>
                    <h4 className='text-2xl font-semibold'>
                        {info.displayName ??= 'No Name'}
                    </h4>
                    <h4 className='font-thin'> 
                        {info.email}
                    </h4>
                </div>
                <div className='mx-4 mt-2 rounded-md bg-gray-300 text-center'>
                    <h4 className='font-light text-xs'>
                        {info.introduction ??= 'No Infroduce Phrase'}
                    </h4>
                </div>
            </div>
        </div>
    )

}