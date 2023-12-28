import React from 'react';
import { getInfoInFriendListCol, getUserInfo } from '../FirebaseController';
import { UserInfo } from '../../../../msg_typeDef';
import { UserIcon } from '@heroicons/react/20/solid';

export function FriendListItem({uuid, selected} : {uuid : string, selected : Function}) {
    const [selectUser, setSelectUser] = React.useState<UserInfo>()
    const [clicked, setClicked] = React.useState(false)
    React.useEffect(()=> {
        getSelectedFriendInfo()
    },[])

    const getSelectedFriendInfo = async() => {
        const {result, value} = await getInfoInFriendListCol(uuid)
        if(result) await getUserInfo(value).then((result)=> {
            {result.result === true && setSelectUser(result.value)}
            console.log(result.value)
        })
    }
    const clickHandler = () => {
        console.log(selectUser)
        selected(selectUser.email)
    }

    return (
        <li onClick={clickHandler}
            className='flex p-2 w-60 my-2 rounded-md border-2 border-slate-500 hover:cursor-pointer hover:opacity-50'>
            <div>
                <div className='transition duration-200'>
                    <div className='flex items-center gap-3 px-2'>
                        {selectUser?.photoURL 
                        ?   <img className='w-12 h-12 rounded-full border-none shadow-none' src={selectUser.photoURL} /> 
                        :   <UserIcon className='w-12 h-12 border-2 rounded-full border-solid border-slate-500 text-slate-500 dark:border-white  dark:text-white'/>  
                        }
                        <h4 className='font-bold text-sm overflow-hidden text-ellipsis'>
                        {selectUser?.displayName ? selectUser.displayName : "No Name"}
                        </h4>
                    </div>
                </div>
            </div>
        </li>
    )
}