import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

export function FriendBlockModal({closeFn} : {closeFn: Function}) {

    const onClickIntercept = ()=> {

        closeFn(false)
    }

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-black rounded-md p-3 w-80'>
                <div className='flex mb-2 border-b-slate-500 justify-between' >
                    <h4 className="font-bold">
                        Caution - Block
                    </h4>
                    <button onClick={()=>closeFn(false)}>
                        <XMarkIcon className='w-6 h-6 text-red-500'/>
                    </button>
                </div>
                <ul className='my-1 list-disc px-2'>
                    <li className='text-xs'>
                        You can block selected friends.
                    </li>
                    <li className='text-xs'>
                        Automatically removed from friends list when blocked.
                    </li>
                    <li className='text-xs'>
                        You won&apos;t be found in this user&apos;s Add Friends list until you unblock.
                    </li>
                </ul>
                <button
                    onClick={onClickIntercept}
                    className='w-full border-2 border-solid border-purple-500 justify-center rounded-full hover:bg-purple-500 hover:text-white transition duration-200'>
                    Block
                </button>
            </div>
        </div>
    )
}