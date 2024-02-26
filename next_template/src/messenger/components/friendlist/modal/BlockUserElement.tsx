import React from 'react';
import { getUserInfo } from '../../FirebaseController';
import { UserInfo } from '../../../../../msg_typeDef';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';

export default function BlockUserElement({email} : {email: string}) {
    const [blockUser, setBlockUser] = React.useState<UserInfo>(); 

    React.useEffect(()=> {
        getBlockUserInfo()
    },[])

    const getBlockUserInfo = async()=> {
        await getUserInfo(email).then((result)=> {
            result.result && setBlockUser(result.value);
        })
    }

    return (blockUser && 
        <li className='flex p-2 m-1 rounded-md border-2 border-slate-500 hover:text-white hover:cursor-pointer transition duration-200 '>
            
                {blockUser.photoURL 
                    ? <img src={blockUser.photoURL} />
                    : <h4> Photo is null</h4>
                }
                <h4 className='text-xs'>
                    {blockUser.email}
                </h4>
                <ArrowRightOnRectangleIcon className='w-4 h-4' />
            
            
        </li>
    )
}