import React, { ChangeEvent } from 'react';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import { useAppSelector } from '@/redux/hook';
import { getReuestAddFriendInDoc } from '../FirebaseController';
import { firebaseAuth } from '../../../../firebaseConfig';


export default function UserSearchManage() {
    const [inputValue, setInputValue] = React.useState("");
    const [getUserList, setUserList] = React.useState<UserInfo[]>([]);
    const [filteringList, setFilteringList] = React.useState<UserInfo[]>([]);
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    
    React.useEffect(()=> {
        getAllList()
    },[]);

    const getAllList = async() => {
        const receiveRequestFromOther : string[] = [];
        await getReuestAddFriendInDoc().then((response)=> {
            if(response?.result){
                response.value.map((item: RequestFriend)=> {
                    
                })
            }
        })
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>)=> {
        setInputValue(e.target.value.trim())
    }

    

    return (
        <>
            <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>
                    Search User
                </h4>
            </div>
            <ul className='text-sm list-disc list-inside'>
                <li>
                    You can search for a user by entering email address. 
                </li>
                <li>
                Select a user to view their detailed information.
                </li>
            </ul>
            <div className='flex justify-center my-3'>
                <label>
                    <h4 className='font-bold'>
                        Email
                    </h4>
                    <input 
                        className='py-1 pl-2 w-72 rounded-md border-2 border-gray-500 dark:bg-black'
                        onChange={(e)=> onChangeInput(e)}
                        placeholder='Example@email.com'>
                    </input>
                </label>
            </div>
            <ul className='list-none list-inside overflow-y-scroll'>
                
            </ul>
        </>
    )
}