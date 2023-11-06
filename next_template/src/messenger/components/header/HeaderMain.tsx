import React from 'react';

import { signOut } from "firebase/auth"
import { firebaseAuth } from "@/../../firebaseConfig"
import { PowerIcon } from '@heroicons/react/20/solid'
import { useAppSelector } from '@/redux/hook';

export default function HeaderMain () {
    const messengerReducer = useAppSelector((state)=> state.messengerRouter)
    const onClickSignOut = () => {
        signOut(firebaseAuth)
    }

    return (
        <div className='flex p-2 items-center justify-between'>
            <h1 className="text-5xl font-bold">
                {messengerReducer.title}
            </h1>
            <button
                className='border-2 border-red-500 rounded-full h-fit hover:bg-red-500'
                onClick={onClickSignOut}>
                <PowerIcon className='h-6 w-6 text-red-500 hover:text-white'/>
            </button>
        </div>
    )
}