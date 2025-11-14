import React from 'react';

import { useAppSelector } from '@/redux/hook';

export default function HeaderMain () {
    const messengerReducer = useAppSelector((state)=> state.messengerRouter)
    
    return (
        <div className='flex p-2 items-center justify-between'>
            <h1 className="text-5xl font-bold">
                {messengerReducer.title}
            </h1>
        </div>
    )
}