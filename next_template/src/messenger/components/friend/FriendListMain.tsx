import React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { UserInfo } from '../../../../msg_typeDef';
import { getInfoInFriendListCol, getUserInfo } from '../FirebaseController';
import ListElement from '../usermanage/ListElement';
import { setPageRendering } from '@/redux/features/messengerReducer';

export default function FriendListMain() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const [friendList, setFriendList] = React.useState<UserInfo[]>([])
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setFriendList([])
        getFriendList()
    },[currentUser])

    const getFriendList = ()=> {
        if(currentUser.friendList) {
            currentUser.friendList.map(async(email)=> {
                const response = await getInfoInFriendListCol(email)
                if(response.result) {
                    const {result, value} = await getUserInfo(response.value)
                    if(result) {
                        setFriendList(prev => {
                            return prev.some((item)=> item.email === value.email) ? prev : [...prev,value]
                        })
                    }
                }
            })
        
        }
    }

    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>
                    Friends List
                </h4>
                <button
                    className='rounded-md text-white text-xs bg-blue-500 py-1 px-2 hover:cursor-pointer hover:bg-blue-300'
                    onClick={()=> dispatch(setPageRendering({middle : "UserManageMain"}))}>
                    +ADD
                </button>
            </div>
            <ul className='overflow-y-scroll'>
                {friendList.map((item)=> {
                    return <ListElement key={item.uid} openFrom='Friend' selected={item}/>
                })}
            </ul>
        </div>
    )
}