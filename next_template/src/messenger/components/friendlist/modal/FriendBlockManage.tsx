import React from 'react';

export default function FriendManageBlock() {

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
        </div>
    )
}