import React from 'react';

import { useAppSelector } from '@/redux/hook';
import { getReuestAddFriendInDoc, getUserInfo } from '../FirebaseController';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import ListElement from './ListElement';

export default function FriendRequestManage() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const [reqUserInfo, setReqUserInfo ] = React.useState<UserInfo[]>([]);

    React.useEffect(()=> {
        getReqList()
        .then((result)=> getReqUserInfo(result))
    },[])

    const getReqList = async()=> {
        const { result, value } = await getReuestAddFriendInDoc();  
        if(result) {
            const reqArray : RequestFriend[] = value.filter((item : RequestFriend)=> item.from === currentUser.email && item.status !== "success")
            return reqArray
        }
    }

    const getReqUserInfo = (reqs : RequestFriend[])=> {
        reqs.map((async (item)=> {
            const { result, value } = await getUserInfo(item.to)
            result && setReqUserInfo(prev => {
                const check = prev.some((info) => info.email === value.email)
                return !check ? [...prev, value] : [...prev]
            })
        }))
    }

    return (
        <div>
            <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>
                    Request User
                </h4>
            </div>
            <ul className='text-sm list-disc list-inside'>
                <li>
                    You can search a user that you send Request for invite Friend.
                </li>
                <li>
                    Select a user to view their detailed information.
                </li>
                <li>
                    You can Cancel Friend Request.
                </li>
            </ul>
            <ul className='list-none list-inside h-52 overflow-y-scroll'>
                { reqUserInfo.map((item)=> {
                    return (  
                        <ListElement key={item.uid} selected={item} openFrom={"Request"} />
                    )
                }) }
            </ul>
        </div>
    )

}