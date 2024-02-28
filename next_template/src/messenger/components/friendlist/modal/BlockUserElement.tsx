import React from 'react';
import { getUserInfo } from '../../FirebaseController';
import { UserInfo } from '../../../../../msg_typeDef';
import { ArrowRightOnRectangleIcon, InformationCircleIcon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Timestamp } from 'firebase/firestore';

export default function BlockUserElement({blockUserEmail, blockDate} : {blockUserEmail : string, blockDate : Timestamp}) {
    const [blockUser, setBlockUser] = React.useState<UserInfo>(); 
    const [clicked, setClicked] = React.useState(false)

    React.useEffect(()=> {
        getBlockUserInfo()
    },[])

    const getBlockUserInfo = async()=> {
        await getUserInfo(blockUserEmail).then((result)=> {
            result.result && setBlockUser(result.value);
        })
    }

    const onClickIcon = ()=> {
        alert("Clicked")
    }
    

    const NotSelectedView = () => {
        return (
            <li className='flex p-2 m-1 items-center place-content-between rounded-md border-2 border-slate-500 transition duration-200 '>
                <div className='flex items-center gap-2'>
                    {blockUser.photoURL 
                        ? <img src={blockUser.photoURL} />
                        : <UserCircleIcon className='w-6 h-6 text-slate-600' />
                    }
                    <h4 className='text-sm'>
                        {blockUser.email}
                    </h4>
                </div>
                <div className='flex justify-end '>
                    <InformationCircleIcon className='w-5 h-5 text-blue-500 hover:cursor-pointer' onClick={()=>setClicked(true)} />
                    <ArrowRightOnRectangleIcon className='w-5 h-5 text-green-500 hover:cursor-pointer' onClick={onClickIcon}/>
                </div>
            </li>
        )   
    }

    const SelectedView = () => {
        return (
            <li className='p-2 m-2 transition duration-200 border-2 rounded-md border-slate-500'>
                <div className='flex w-full justify-end'>
                    <XMarkIcon className='w-5 h-5 text-red-500 hover:cursor-pointer' onClick={()=>setClicked(false)} />
                </div>
                <div className='flex w-full justify-center my-2'>
                    {blockUser.photoURL 
                    ? <img src={blockUser.photoURL} className='w-24 h-24 rounded-full border-none' />
                    : <UserIcon className='w-20 h-20 border-2 rounded-full border-slate-500 border-solid text-slate-500 dark:text-white dark:border-white' />
                     }
                </div>
                <div className='w-full text-center'>
                     <h4 className='font-bold'>
                        {blockUser.email}
                     </h4>
                     <h4 className='font-thin text-sm'>
                        {blockUser.displayName || 'No Name' }
                     </h4>
                     <h4 className='font-medium text-xs'>
                        Block Date : {blockDate.toDate().toDateString()}
                     </h4>
                </div>
                <button className='w-full rounded-full text-center mt-1 border-2 border-solid border-purple-600'>
                    Unblock
                </button>
            </li>
        )
    }
    return (blockUser && (!clicked ? <NotSelectedView /> : <SelectedView />) )

}