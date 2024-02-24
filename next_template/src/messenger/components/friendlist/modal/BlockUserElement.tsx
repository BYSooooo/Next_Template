import React from 'react';
import { getUserInfo } from '../../FirebaseController';
import { UserInfo } from '../../../../../msg_typeDef';

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
        <li className='border-2 border-gray-200'>
            <div>
                {blockUser.email}
            </div>
            <div>
                {blockUser.uid }
            </div>
        </li>
    )
}