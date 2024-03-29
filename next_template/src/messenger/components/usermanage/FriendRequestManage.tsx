import React, { ChangeEvent } from 'react';

import { useAppSelector } from '@/redux/hook';
import { getReuestAddFriendInDoc, getUserInfo } from '../FirebaseController';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import ListElement from './ListElement';

export default function FriendRequestManage() {
    const [reqUserList, setReqUserList] = React.useState<UserInfo[]>([]);
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);

    React.useEffect(()=> {
        getRequestList();
    },[])

    
    const getRequestList = async()=> {
        let infoArray : UserInfo[] = []
        await getReuestAddFriendInDoc().then((response)=> {
            if(response.result) {    
                return response.value.filter((req: RequestFriend)=> req.from === currentUser.email && req.status !=="success"); 
            }
        }).then((array : RequestFriend[])=> {
            array.map((item)=> {
                getUserInfo(item.to).then((response2) => {
                    if(response2.result)  {
                        !infoArray.some((item)=> item.email === response2.value.email) && infoArray.push(response2.value)
                    }
                })
            })
        })
        return setReqUserList(infoArray)
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
                { reqUserList && reqUserList.map((item)=> {
                    
                    return <ListElement key={item.uid} selected={item} />
                }) }
                {/* {   
                    inputValue
                    ?
                        filteringList.map((item)=> {
                            return <ListElement key={item.email} selected={item} />
                        })
                    :   reqUserList.map((item)=> {
                            return <ListElement key={item.email} selected={item} />
                    })
                    
                } */}
            </ul>
        </div>
    )
}
