import React from 'react'

import { ArrowDownIcon, ArrowUpIcon, NoSymbolIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { FriendAddReq } from './FriendAddReq'
import { FriendAddRes } from './FriendAddRes'
import FriendBlockManage from './FriendBlockManage'

export function FriendAddModal({open} : {open : Function}) {
    const [tabIndex, setTabIndex] = React.useState<number>(1)

    const switchList = (index: number)=> {
        switch(index) {
            case 1:
                return <FriendAddReq />
            case 2:
                return <FriendAddRes />
            case 3:
                return <FriendBlockManage />
            default : break;
        }    
        
    }
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-slate-800 rounded-md p-3 w-80'>
                <div className='flex mb-2 justify-between border-b-2' >
                    <div className='flex flex-wrap -mb-px text-xs font-medium text-center items-center'>
                        <button className='flex p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                                onClick={()=>setTabIndex(1)}>
                            <ArrowUpIcon className='w-4 h-4  dark:text-white focus:text-blue-500'/>
                            Request
                        </button>
                        <button className='flex p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                                onClick={()=>setTabIndex(2)}>
                            <ArrowDownIcon className='w-4 h-4  dark:text-white focus:text-blue-500 '/>
                            Response    
                        </button>
                        <button
                            className='flex me-2 p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                            onClick={()=>setTabIndex(3)}>
                                <NoSymbolIcon className='w-4 h-4 dark:text-white focus:text-blue-500' />
                            Block
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