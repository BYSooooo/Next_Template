import React from 'react';

import { useAppSelector } from '@/redux/hook';
import { getUserInfo } from '../FirebaseController';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import ListElement from './ListElement';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function FriendRequestManage() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const requestList = useAppSelector((state)=> state.messengerFriendReq)
    const [reqUserInfo, setReqUserInfo ] = React.useState<UserInfo[]>([]);

    React.useEffect(()=> {
        setReqUserInfo([])
        getReqUserInfo(getReqList())
    },[requestList])

    const getReqList = ()=> {
        if(requestList) {
            const reqArray : RequestFriend[] = requestList.filter((item : RequestFriend)=> 
                item.from === currentUser.email && item.status !== "success"
            )
            return reqArray
        }
    }

    const getReqUserInfo = (reqs : RequestFriend[])=> {
        if(reqs.length > 0 ) {
            reqs.map(((item)=> {
                //Get UserInfo by Email in RequestFriend List 
                getUserInfo(item.to).then((response)=> {
                    // If Fetch Success
                    if(response.result === true) {
                        // State Hook Update
                        setReqUserInfo(prev => {
                            const check = prev.some((info) => info.email === response.value.email)
                            return !check ? [...prev, response.value] : [...prev]
                        })
                    } 
                })
            }))
        } else {
            setReqUserInfo([])
        }
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
                {   reqUserInfo.length > 0
                    ?
                        reqUserInfo.map((item)=> {
                            return (  
                                <ListElement key={item.uid} selected={item} openFrom={"Request"} />
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