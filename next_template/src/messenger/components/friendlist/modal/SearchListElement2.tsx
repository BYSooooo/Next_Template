import React from 'react';
import { RequestFriend, UserInfo } from '../../../../../msg_typeDef';
import { blockUser, getReuestAddFriendInDoc } from '../../FirebaseController';
import { firebaseAuth } from '../../../../../firebaseConfig';
import { UserIcon, UsersIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function SearchListElement2({userInfo} : {userInfo : UserInfo}) {
    const [clicked, setClicked] = React.useState(false)
    const [statusContext, setStatusContext] = React.useState<RequestFriend>();
    
    React.useEffect(()=>{
        getStatus()
    },[])

    const getStatus = async()=> {
        const currentEmail = firebaseAuth.currentUser.email;
        await getReuestAddFriendInDoc().then((response)=> {
            if(response.result) {
                const filteringResult : RequestFriend = response.value.find((item : RequestFriend) =>
                    (item.from === currentEmail && item.to === userInfo.email) 
                    || (item.to === currentEmail && item.from === userInfo.email)
                )
                setStatusContext(filteringResult)
            }
        })
    }

    const onClickBlock = async()=> {
        await blockUser(userInfo.email).then((result)=> {
            console.log(result)
        })
    }

    const selectedView = ()=> {
        
        return (
            <div className='border-2 border-solid border-slate-500 rounded-md my-1 p-2'>
                <div className='flex w-full justify-end'>
                    <XMarkIcon className='w-5 h-5 text-red-500 hover:cursor-pointer' onClick={()=>setClicked(false)} />
                </div>
                <div className='flex justify-center'>
                    {userInfo.photoURL
                        ? <img src={userInfo.photoURL} className='w-24 h-24 rounded-full border-none' />
                        : <UserIcon className='w-20 h-20 border-2 rounded-full border-slate-500 border-solid text-slate-500 dark:text-white dark:border-white' />
                    }
                </div>
                    
            </div>
        )
    }

    const notSelectedView = () => {
        return (
            <div
                onClick={()=>setClicked(true)} 
                className='flex justify-between border-2 border-solid border-slate-500 rounded-lg my-1 p-2 hover:cursor-pointer'>
                <div className='flex items-center gap-2'>
                    <UserIcon className='w-8 h-8 border-2 rounded-full border-slate-500 border-solid text-slate-500'/>
                    <h4 className='text-sm'>
                        {userInfo.email}
                    </h4>
                </div>
                {statusContext?.status === 'success' && 
                    <div className='flex items-center'>
                        <UsersIcon className='w-4 h-4 text-green-700'/>
                    </div>
                }
            </div>
        )
    }

    
    return (
        <>
        {clicked 
            ? selectedView()
            : notSelectedView()
        }
        </>
    )

}