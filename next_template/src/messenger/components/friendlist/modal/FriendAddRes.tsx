import React from 'react';
import { getReuestAddFriendInDoc } from '../../FirebaseController';
import { firebaseAuth } from '../../../../../firebaseConfig';
import { ListElement } from './ListElement';

export function FriendAddRes() {
    const [reqUserList, setReqUserList] = React.useState<RequestFriend[]>([])

    React.useEffect(()=> {
        getRequestList()
    },[])

    const getRequestList = () => {
        getReuestAddFriendInDoc().then((result)=> {
            if(result.result) {
                const filterReq = result.value.filter((req : RequestFriend)=> {
                    req.to === firebaseAuth.currentUser.email
                })
                setReqUserList(filterReq)
            }
        })
    }

    return (
        <>
            <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>
                    Friend Request
                </h4>
            </div>
            <div className='block'>
                <h4 className='text-sm'>
                    * You can see requests from other users
                </h4>
                <h4 className='text-sm'>
                    * Once you accept the request,
                </h4>
                <h4 className='text-sm pl-3' >
                    you will be able to chat and send and receive messages
                </h4>
            </div>
            <div className='flex h-64 overflow-scroll'>
                {reqUserList.map((item)=> {
                    return (
                        <ListElement key={item.from} mailAddress={item.from} />
                    )
                })}    
            </div>
            
        </>
    )
}