import React from 'react';

import { useAppSelector } from '@/redux/hook';
import BlockUserElement from './BlockUserElement';

export default function FriendManageBlock() {
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);
    
    return (
        <div className='px-2'>
            <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>
                    Block User
                </h4>
            </div>
            <ul className='block text-sm list-disc list-outside disc px-4'>
                <li>
                    This is a list of users you&apos;ve blocked.
                </li>
                <li>
                    Users you have blocked will not be able to look you up in the user list
                </li>
            </ul>
            <ul>
                {currentUserInfo.block && currentUserInfo.block.map((user)=> {
                    return <BlockUserElement key={user.blockUser} blockUserEmail={user.blockUser} blockDate={user.blockDate}/>
                })}
            </ul>

        </div>
    )
}