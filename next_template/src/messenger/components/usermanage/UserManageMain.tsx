import React from 'react';

import UserSearchManage from './UserSearchManage';
import FriendRequestManage from './FriendRequestManage';
import FriendResponseManage from './FriendResponseManage';
import UserBlockManage from './UserBlockManage';
import { ArrowDownIcon, ArrowUpIcon, MagnifyingGlassIcon, NoSymbolIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '@/redux/hook';
import { setPageRendering } from '@/redux/features/messengerReducer';

export default function UserManageMain() {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(1);
    const dispatch = useAppDispatch();

    const renderingList = ()=>{
        switch(selectedIndex) {
            case 1 :
                return <UserSearchManage />
            case 2 :
                return <FriendRequestManage />
            case 3 : 
                return <FriendResponseManage />
            case 4 :
                return <UserBlockManage />
            default : break;
        }
    }

    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex justify-between items-center border-b-2 '>
                <div className='flex flex-nowrap -mb-px text-xs font-medium text-center items-center'>
                    <button className='flex p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                            onClick={()=>setSelectedIndex(1)}>
                        <MagnifyingGlassIcon className='w-4 h-4  dark:text-white focus:text-blue-500'/>
                        Search
                    </button>
                    <button className='flex p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                            onClick={()=>setSelectedIndex(2)}>
                        <ArrowUpIcon className='w-4 h-4  dark:text-white focus:text-blue-500 '/>
                        Requests    
                    </button>
                    <button className='flex p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                        onClick={()=>setSelectedIndex(3)}>
                        <ArrowDownIcon className='w-4 h-4 dark:text-white focus:text-blue-500' />
                        Response
                    </button>
                    <button
                        className='flex me-2 p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                        onClick={()=>setSelectedIndex(4)}>
                            <NoSymbolIcon className='w-4 h-4 dark:text-white focus:text-blue-500' />
                        Block
                    </button>
                </div>
                <XMarkIcon 
                    onClick={()=>dispatch(setPageRendering({middle : 'Null'}))}
                    className='w-6 h-6 text-red-600 hover:cursor-pointer' />
            </div>
            <div className='p-2'>
                {renderingList()}
            </div>
        </div>
    )

}