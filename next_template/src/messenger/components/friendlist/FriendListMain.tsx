import React from 'react';

import { PlusIcon } from '@heroicons/react/20/solid';
import { FriendAddModal } from './modal/FriendAddModal';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { FriendListItem } from './FriendListItem';
import { setPageRendering } from '@/redux/features/messengerReducer';

export default function FriendListMain() {
    const [showAdd, setShowAdd] = React.useState(false)
    const [frList, setFrList] = React.useState<{uid : string, openYn : boolean}[]>([])
    const msgCurrentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const dispatch = useAppDispatch()
    
    React.useEffect(()=> {
        getFriendList()
    },[msgCurrentUser])
    
    const getFriendList = () => {
        let listArray = []
        if(msgCurrentUser.friendList) {
            msgCurrentUser.friendList.map((friendEmail)=> {
                listArray.push({uid : friendEmail, openYn : false})
            })
        }
        setFrList(listArray)
        // {msgCurrentUser.friendList && setFrList(msgCurrentUser.friendList)}
    }
    
    const controlModal =(openYn: boolean)=> setShowAdd(openYn)        
    
    const selectHandler = (uid: string) => {
        let renewArray = []
        frList.map((friend)=> {
            renewArray.push({uid : friend.uid, openYn : friend.uid === uid ? true : false})
        })
        setFrList(renewArray)
    }
    
    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>
                    Friends List
                </h4>
                <button onClick={()=>dispatch(setPageRendering({middle : "UserManageMain"}))}>
                    <PlusIcon className='w-4 h-10'/>
                </button>

                {/* <button onClick={()=>setShowAdd(true)}>
                    <PlusIcon className='w-4 h-10'/>
                </button> */}
            </div>
            <ul className='overflow-y-scroll'>
                {frList.map((item)=> {
                    return <FriendListItem key={item.uid} uuid={item.uid} openYn={item.openYn} selected={selectHandler}/>
                })}
            </ul>   
            {/* {showAdd && <FriendAddModal open={controlModal}/>}     */}
        </div>
        
    )
}