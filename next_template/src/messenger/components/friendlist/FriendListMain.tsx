import { PlusIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { FriendAddModal } from './FriendAddModal';

export default function FriendListMain() {
    const [showAdd, setShowAdd] = React.useState(false)

    React.useEffect(()=> {

    },[])

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
            {showAdd && <FriendAddModal open={controlModal}/>}    
        </div>
        
    )
}