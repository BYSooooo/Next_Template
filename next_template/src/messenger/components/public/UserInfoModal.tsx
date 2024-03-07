import React from 'react';

import { UserInfo } from '../../../../msg_typeDef';
import { getUserInfo } from '../FirebaseController';

export default function UserInfoModal({email,status} : {email : string, status: string}) {
    const [selectedUser, setSelectedUser] = React.useState<UserInfo>();
    const [relation, setRelation] = React.useState<"Default"|"Request"|"Friend"|"Block">("Default");

    React.useEffect(()=>{
        getUserInfoInit()
    },[])

    const getUserInfoInit = async()=> {
        await getUserInfo(email).then((response)=> {
            response.result ? setSelectedUser(response.value) : alert("Error Occured")  
        })
    }
    
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-slate-800 rounded-md p-3 w-80'>
                This is Modal
                
            </div>
        </div>
    )

}