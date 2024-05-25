import React from 'react';

import { useAppSelector } from '@/redux/hook';
import { UserInfo } from '../../../../msg_typeDef';
import { getBlockInfo, getUserInfo } from '../FirebaseController';
import ListElement from './ListElement';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function UserBlockManage() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const [blockList, setBlockList] = React.useState<{fromTo: string, uuid: string, info:UserInfo}[]>([])

    React.useEffect(()=> {
        setBlockList([])
        getBlockLists()
    },[currentUser])

    const getBlockLists = ()=> {
        currentUser.block && currentUser.block.map(async (info)=> {
            if(info.type === "from") {
                const {result, value} = await getBlockInfo(info.uuid);
                result && setBlockList(prev=> { 
                    return prev.some((item)=> item.info.email === value.email) ? prev : [...prev,{fromTo: info.type, uuid: info.uuid, info: value}]
                })
            }
        })
    }

    return (
        <div>
            <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>
                    Block User
                </h4>
            </div>
            <ul className='text-xs list-disc list-inside'>
                <li>
                    You can Manage block user 
                </li>
                <li>
                   Blocked users cannot retrieve your information or request conversations.
                </li>   
                <li>
                    You can select a user to unblock them.
                </li>
            </ul>
            <ul className='list-none list-inside h-52 overflow-y-scroll'>
                { blockList.length > 0 
                ?
                    blockList.map((item)=> {
                        return <ListElement key={item.info.uid} selected={item.info} openFrom={"Block"} extraInfo={{sort: "blockInfo", info : {type: item.fromTo, uuid: item.uuid} }} />
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