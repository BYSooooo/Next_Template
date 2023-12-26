import React from 'react';
import { getInfoInFriendListCol, getUserInfo } from '../FirebaseController';
import { UserInfo } from '../../../../msg_typeDef';
import { UserIcon } from '@heroicons/react/20/solid';

export function FriendListItem({uuid} : {uuid : string}) {
    const [selectUser, setSelectUser] = React.useState<UserInfo>()

    React.useEffect(()=> {
        getSelectedFriendInfo()
    },[])

    const getSelectedFriendInfo = async() => {
        const {result, value} = await getInfoInFriendListCol(uuid)
        if(result) await getUserInfo(value).then((result)=> {
            {result.result === true && setSelectUser(result.value)}
        })
    }
    const onClick = () => {
        console.log('clicked')
    }

    return (
        <li
            onClick={onClick}
            className='flex p-2 w-60 rounded-md border-2 border-slate-500 hover:cursor-pointer hover:opacity-50'>
            <div>
                <div className='transition duration-200'>
                    <div className='flex items-center gap-3 px-2'>
                        {selectUser?.photoURL.length > 0 
                        ?   <img className='w-12 h-12 rounded-full border-none shadow-none' src={selectUser.photoURL} /> 
                        :   <UserIcon className='w-12 h-12 border-2 rounded-full border-white border-solid text-white'/>  
                        }
                        <h4 className='font-bold text-sm overflow-hidden text-ellipsis'>
                            {selectUser?.displayName}
                        </h4>
                    </div>
                </div>
            </div>
        </li>
    )
}