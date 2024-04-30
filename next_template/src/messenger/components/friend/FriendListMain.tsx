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
                const {result, value} = await getInfoInFriendListCol(email)
                console.log(result,value)
                // if(result) {
                //     setFriendList(prev => {
                //         return prev.some((item)=> item.email === value) ? prev : [...prev,value]
                //     })
                // }
            })
        
        }
    }

    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>
                    Friends List
                </h4>
            </div>
            <button onClick={()=> dispatch(setPageRendering({middle : "FriendListMain"}))}>

            </button>
            <ul className='overflow-y-scroll'>
                {friendList.map((item)=> {
                    return <ListElement key={item.uid} openFrom='friend' selected={item}/>
                })}
            </ul>
        </div>
    )
}