import React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { UserInfo } from '../../../../msg_typeDef';
import { getInfoInFriendListCol, getUserInfo } from '../FirebaseController';
import ListElement from '../usermanage/ListElement';
import { setPageRendering } from '@/redux/features/messengerReducer';

export default function FriendListMain() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const [friendList, setFriendList] = React.useState<{uuid : string, info : UserInfo}[]>([])
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setFriendList([])
        getFriendList()
    },[currentUser])

    const getFriendList = ()=> {
        if(currentUser.friendList) {
            currentUser.friendList.map(async(uuid)=> {
                const response = await getInfoInFriendListCol(uuid)
                if(response.result) {
                    const {result, value} = await getUserInfo(response.value)
                    if(result) {
                        setFriendList(prev => {
                            return prev.some((item)=> item.info.email === value.email) ? prev : [...prev,{uuid :uuid , info : value}]
                        })
                    }
                }
            })
        
        }
    }

    return (
        <div className='p-2 mx-1 w-64 shadow-box'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-lg'>
                    Friends List
                </h1>
                <button
                    className='btn-primary'
                    onClick={()=> dispatch(setPageRendering({middle : "UserManageMain"}))}>
                    <h1 className='text-sm'>
                        Manage
                    </h1>
                </button>
            </div>
            <ul className='overflow-y-scroll mt-2'>
                {friendList.map((item)=> {
                    return <ListElement key={item.info.uid} openFrom='Friend' selected={item.info} extraInfo={{sort : "friendUUID", info: item.uuid}}/>
                })}
            </ul>
        </div>
    )
}