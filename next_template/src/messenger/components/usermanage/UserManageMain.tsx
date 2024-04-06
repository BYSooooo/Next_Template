import React from 'react';

import UserSearchManage from './UserSearchManage';
import FriendRequestManage from './FriendRequestManage';
import FriendResponseManage from './FriendResponseManage';
import UserBlockManage from './UserBlockManage';
import { ArrowDownIcon, ArrowUpIcon, MagnifyingGlassIcon, NoSymbolIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setFriendReq, setPageRendering, setSelectedTab } from '@/redux/features/messengerReducer';
import { collection, onSnapshot } from 'firebase/firestore';
import { firebaseStore } from '../../../../firebaseConfig';
import { RequestFriend } from '../../../../msg_typeDef';

export default function UserManageMain() {
    const selectedTab = useAppSelector((state)=> state.messengerUserManageTab);
    
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        setSnapshotToDoc()
    },[])

    const setSnapshotToDoc =()=> {
        const colRef = collection(firebaseStore,"friendReq")
        onSnapshot(colRef,(response)=>{
            console.log("Get FriendRequest Snapshot Called")
            const resultArray :RequestFriend[] = [] 
            response.docs.map((item)=> {
                const reqData = item.data()
                resultArray.push({
                    UUID    : reqData.UUID,
                    from    : reqData.from,
                    to      : reqData.to,
                    req_date: reqData.req_date.toDate().toString(),
                    status  : reqData.status,
                    checkYn : reqData.checkYn
                })
            })
            dispatch(setFriendReq(resultArray));
        })
    }

    const renderingList = ()=>{
        switch(selectedTab.selected) {
            case 1 :
                return <UserSearchManage />
            case 2 :
                return <FriendRequestManage />
            case 3 : 
                return <FriendResponseManage /> 
            case 4 :
                return <UserBlockManage /> //Use UserInfo Snapshot in MessageMain
            default : break;
        }
    }

    return (
        <div className='w-96 border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex justify-between items-center border-b-2 '>
                <div className='flex flex-nowrap -mb-px text-xs font-medium text-center items-center'>
                    <button className='flex p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                            onClick={()=>dispatch(setSelectedTab(1))}>
                        <MagnifyingGlassIcon className='w-4 h-4  dark:text-white focus:text-blue-500'/>
                        Search
                    </button>
                    <button className='flex p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                            onClick={()=>dispatch(setSelectedTab(2))}>
                        <ArrowUpIcon className='w-4 h-4  dark:text-white focus:text-blue-500 '/>
                        Requests    
                    </button>
                    <button className='flex p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                        onClick={()=>dispatch(setSelectedTab(3))}>
                        <ArrowDownIcon className='w-4 h-4 dark:text-white focus:text-blue-500' />
                        Response
                    </button>
                    <button
                        className='flex me-2 p-2 rounded-t-lg hover:bg-gray-200 focus:text-blue-500 focus:bg-gray-100 border-gray-100'
                        onClick={()=>dispatch(setSelectedTab(4))}>
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