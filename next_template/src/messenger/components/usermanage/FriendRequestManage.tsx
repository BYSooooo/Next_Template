import { useAppSelector } from '@/redux/hook';
import React, { ChangeEvent } from 'react';
import { getReuestAddFriendInDoc } from '../FirebaseController';
import { RequestFriend } from '../../../../msg_typeDef';

export default function FriendRequestManage() {
    const [inputValue, setInputValue] = React.useState("");
    const [requestList, setRequestList] = React.useState<RequestFriend[]>([]);

    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);

    React.useEffect(()=> {
        getRequestList()
    },[])

    React.useEffect(()=> {
        
    },[inputValue])

    const getRequestList = async()=> {
        await getReuestAddFriendInDoc().then((response)=> {
            if(response.result) {
                const requests = response.value.filter((req: RequestFriend)=> req.from === currentUser.email && req.status !=="success");
                setRequestList(requests);
            }
        })
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value.trim())
    }
    
    return (
        <>
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
            <div className='flex justify-center my-3'>
                <label>
                <h4 className='font-bold'>
                        Email
                    </h4>
                    <input 
                        className='py-1 pl-2 w-80 rounded-md border-2 border-gray-500 dark:bg-black'
                        onChange={(e)=> onChangeInput(e)}
                        value={inputValue}
                        placeholder='Example@email.com'>
                    </input>
                </label>
            </div>
            <ul className='list-none list-inside h-52 overflow-y-scroll'>
                {
                    
                }
            </ul>
        </>
    )
}
