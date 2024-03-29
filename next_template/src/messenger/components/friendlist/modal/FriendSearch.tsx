import React, { ChangeEvent } from 'react';

import { getAllUserInDoc, getReuestAddFriendInDoc } from '../../FirebaseController'
import { RequestFriend, UserInfo } from '../../../../../msg_typeDef';
import { firebaseAuth } from '../../../../../firebaseConfig';
import { useAppSelector } from '@/redux/hook';
import SearchListElement from './SearchListElement';
import SearchListElement2 from './SearchListElement2';

export default function FriendSearch() {
    const [searchValue, setSearchValue] = React.useState("")
    const [getUserList, setGetUserList] = React.useState<UserInfo[]>([])
    const [searchUser, setSearchUser] = React.useState<UserInfo[]>([]);
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo)

    React.useEffect(()=> {
        getAllList()
    },[])

    React.useEffect(()=> {
        {searchValue.length > 0 
            ? filterUser()
            : setSearchUser([])
        }
    },[searchValue])

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>)=> {
        const value = e.target.value.trim()
        setSearchValue(value)
    }
    const getAllList = async () => {
        const receiveReqUserList : string[] = []
        await getReuestAddFriendInDoc().then((response)=> {
            if(response?.result) {
                response.value.map((item : RequestFriend)=>
                    {
                        if(item.to === firebaseAuth.currentUser.email && item.status === "request"){
                            receiveReqUserList.push(item.from)
                        }
                    }
                )
            } else {
                return [];
            }
        })
        
        const filterArray : UserInfo[] = await getAllUserInDoc().then((response)=> {
            const list = []
            if(response?.result) {
                response.value.forEach((item : UserInfo)=> {
                    if(!receiveReqUserList.includes(item.email)) {
                        if(currentUser.block) {
                            const checkBlocked = currentUser.block.find((blockInfo) => blockInfo.blockUser === item.email);
                            !checkBlocked && list.push(item)
                        } else {
                            list.push(item)
                        }
                        
                    }
                })
            }
            return list;
        })
        console.log(filterArray)
        setGetUserList(filterArray)
    }
    const filterUser = ()=> {
        const resultArray = getUserList.filter((item)=> 
            item.email.includes(searchValue.trim())
        )
        setSearchUser(resultArray)
    }    
    return (
        <div className='px-2'>
            <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>
                    Search User
                </h4>
            </div>
            <ul className='block text-sm list-disc list-outside disc px-4'>
                <li>
                    You can select a user to add as a friend or block them.
                </li>
                <li>
                    In order to have a 1:1 conversation, you need to register as a friend.
                </li>

            </ul> 
            <div className='flex justify-center my-3'>
                <label >
                    <h4 className='font-bold'>
                        Email
                    </h4>
                    <input 
                        className='py-1 pl-2 w-72 rounded-md border-2 border-gray-500  dark:bg-black'
                        onChange={(e)=>onChangeInput(e)}
                        placeholder='example@email.com'>
                    </input>
                </label>
            </div>
            <ul className='list-none list-inside h-64 overflow-scroll' >
                {searchUser.map((user)=> {
                    return (
                        <SearchListElement2 key={user.email} userInfo={user} />
                        //<SearchListElement key={user.email} userInfo={user}  />
                    )
                })}
            </ul>         
        </div>   
    )
}