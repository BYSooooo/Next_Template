import React from 'react'

import { ArrowDownIcon, ArrowUpIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { FriendAddReq } from './FriendAddReq'
import { FriendAddRes } from './FriendAddRes'

export function FriendAddModal({open} : {open : Function}) {
    const [tabIndex, setTabIndex] = React.useState<number>(1)

    const switchList = (index: number)=> {
        switch(index) {
            case 1:
                return <FriendAddReq />
            case 2:
                return <FriendAddRes />
            default : break;
        }    
        
    }
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-black rounded-md p-3 w-80'>
                <div className='flex mb-2 border-b-slate-500 justify-between' >
                    <div className='flex flex-wrap -mb-px text-sm font-medium text-center' >
                        <button className='flex me-2 p-2 border-b-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-200'
                                onClick={()=>setTabIndex(1)}>
                            <ArrowUpIcon className='w-5 h-5  dark:text-white focus:text-blue-500'/>
                            Request
                        </button>
                        <button className='flex me-2 p-2 border-b-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-200'
                                onClick={()=>setTabIndex(2)}>
                            <ArrowDownIcon className='w-5 h-5  dark:text-white focus:text-blue-500 '/>
                            Response    
                        </button>
                    </div>
                    <button onClick={()=>open(false)}>
                        <XMarkIcon className='w-6 h-6 text-red-500'/>
                    </button>
                </div>
                <div>
                    {switchList(tabIndex)}
                </div>
            </div>
        </div>
    )
}

// {searchUser.length > 0
//     ?   <div className='h-60 overflow-scroll'>
//             {searchUser.map((user)=> {
//             return (
//                 <ListElement key={user} mailAddress={user}/>
//             )
//             })}
//         </div>
//     :   <div className='flex h-60 justify-center items-center'>
//             <h4 className='font-bold'>
//                 No result found.
//             </h4>
//         </div>
//     }