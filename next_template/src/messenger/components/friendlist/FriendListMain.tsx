import { PlusIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { FriendAddModal } from './modal/FriendAddModal';
import { useAppSelector } from '@/redux/hook';
import { FriendListItem } from './FriendListItem';

export default function FriendListMain() {
    const [showAdd, setShowAdd] = React.useState(false)
    const [frList, setFrList] = React.useState<string[]>([])
    const msgCurrentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    

    React.useEffect(()=> {
        getFriendList()
    },[msgCurrentUser])
    
    const getFriendList = () => {
        {msgCurrentUser.friendList && setFrList(msgCurrentUser.friendList)}
        console.log(frList)
    }
    

    const controlModal =(openYn: boolean)=> setShowAdd(openYn)        
    
    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>
                    Friends List
                </h4>
                <button onClick={()=>setShowAdd(true)}>
                    <PlusIcon className='w-4 h-10'/>
                </button>
            </div>
            <ul className='overflow-y-scroll'>
                {frList.map((item)=> {
                    return <FriendListItem key={item} uuid={item}/>
                })}
            </ul>   
            {showAdd && <FriendAddModal open={controlModal}/>}    
        </div>
        
    )
}