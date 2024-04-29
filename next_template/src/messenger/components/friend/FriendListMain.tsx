import React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { UserInfo } from '../../../../msg_typeDef';
import { getUserInfo } from '../FirebaseController';

export default function FriendListMain() {
    const currentuser = useAppSelector((state)=> state.messengerCurUserInfo);
    const [friendList, setFriendList] = React.useState<UserInfo[]>([])
    const dispatch = useAppDispatch()
    
    React.useEffect(()=> {
        getFriendList()
    })

    const getFriendList = ()=> {
        if(currentuser.friendList) {
            currentuser.friendList.map(async(email)=> {
                const {result, value} = await getUserInfo(email)
            }
            )
        
        }
    }

    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>
                    Friends List
                </h4>
            </div>
            <ul className='overflow-y-scroll'>

            </ul>
        </div>
    )
}