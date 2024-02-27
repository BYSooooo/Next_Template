import React from 'react';
import { getUserInfo } from '../../FirebaseController';
import { UserInfo } from '../../../../../msg_typeDef';
import { ArrowRightOnRectangleIcon, InformationCircleIcon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function BlockUserElement({email} : {email: string}) {
    const [blockUser, setBlockUser] = React.useState<UserInfo>(); 
    const [clicked, setClicked] = React.useState(false)

    React.useEffect(()=> {
        getBlockUserInfo()
    },[])

    const getBlockUserInfo = async()=> {
        await getUserInfo(email).then((result)=> {
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
            <li className='flex p-2 m-2 h-20 transition duration-200 border-2 rounded-md border-slate-500'>
                
                <XMarkIcon className='w-5 h-5 text-red-500 hover:cursor-pointer' onClick={()=>setClicked(false)} />
                
            </li>
        )
    }
    return (blockUser && (!clicked ? <NotSelectedView /> : <SelectedView />) )

}