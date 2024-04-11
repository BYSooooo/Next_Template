import React from 'react';

import { useAppSelector } from '@/redux/hook';
import { getUserInfo } from '../FirebaseController';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import ListElement from './ListElement';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function FriendResponseManage(){
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const requestList = useAppSelector((state)=> state.messengerFriendReq)
    const [reqOtherUserInfo, setReqOtherUserInfo] = React.useState<UserInfo[]>([])

    React.useEffect(()=> {
        setReqOtherUserInfo([]);
        getReqFromOtherInfo(getOthersList());
    },[requestList])

    const getOthersList = ()=> {
        if(requestList) {
            const reqArray : RequestFriend[] = requestList.filter((item:RequestFriend)=> 
                item.to === currentUser.email && item.status === "request"
            )
            return reqArray
        }
    }

    const getReqFromOtherInfo = (reqs : RequestFriend[])=> {
        if(reqs.length > 0) {
            reqs.map((item)=> {
                getUserInfo(item.from).then((response)=> {
                    if(response.result === true) {
                        setReqOtherUserInfo(prev => {
                            const check = prev.some((info)=> info.email === response.value.email)
                            return !check ? [...prev,response.value] : [...prev]
                        })
                    }
                })
            })
        }else {
            setReqOtherUserInfo([])
        }
    }


    return (
        <div>
            <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>
                    Receive Request List
                </h4>
            </div>
            <ul className='text-sm list-disc list-inside'>
                <li>
                    You can see request list that you get from another user.
                </li>
                <li>
                    Select a user to view their detailed information.
                </li>
                <li>
                    You can deny Request from another user send.
                </li>
            </ul>
            <ul className='list-none list-inside h-52 overflow-y-scroll'>   
                { reqOtherUserInfo.length > 0
                    ? 
                        reqOtherUserInfo.map((item)=> {
                            return ( 
                                <ListElement key={item.uid} selected={item} openFrom={"Response"} /> 
                            )
                        })
                    :
                        <div className='flex w-full h-full items-center justify-center'>
                            <div className='flex-col align-middle'>
                                <ExclamationCircleIcon className='w-15 h-15'/>
                                <h4 className='font-bold'>
                                    No Data
                                </h4>
                            </div>
                        </div>
                }
            </ul>
        </div>
    )
}