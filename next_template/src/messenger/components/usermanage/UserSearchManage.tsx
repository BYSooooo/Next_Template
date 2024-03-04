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

    const inputHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        const value = e.target.value.trim();
        setInputValue(value)
    }

    const getAllList = async() => {
        const receiveRequestFromOther : string[] = [];
        await getReuestAddFriendInDoc().then((response)=> {
            if(response?.result){
                response.value.map((item: RequestFriend)=> {
                    
                })
            }
        })
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
            </ul>
        </>
    )
}