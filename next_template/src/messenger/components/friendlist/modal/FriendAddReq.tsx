import React, { ChangeEvent } from 'react';

import { ReqListElement } from './ReqListElement'
import { getAllUserInDoc, getReuestAddFriendInDoc } from '../../FirebaseController'
import { RequestFriend, UserInfo } from '../../../../../msg_typeDef';
import { firebaseAuth } from '../../../../../firebaseConfig';

export function FriendAddReq() {
    const [searchValue, setSearchValue] = React.useState("")
    const [getUserList, setGetUserList] = React.useState<UserInfo[]>([])
    const [searchUser, setSearchUser] = React.useState<UserInfo[]>([]);

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
        // Test Case .1
        // Check Request List in Modal Open
        // const reqUserList : string[] = await getReuestAddFriendInDoc().then((response)=> {
        //     if(response?.result) {
        //         return response.value.filter((item : RequestFriend)=> {
        //             item.to === firebaseAuth.currentUser.email
        //         })
        //     } else {
        //         return [];
        //     }
        // })
        getAllUserInDoc().then((response)=> {
            // const resultYn = response?.result === true
            // if(resultYn && reqUserList.length > 0) {
            //     response.value.map((item: UserInfo)=> {
                    
            //     })
            // }
            {response?.result === true && setGetUserList(response.value)}
        })
    }
    const filterUser = ()=> {
        const resultArray = getUserList.filter((item)=> item.email.includes(searchValue.trim()))
        setSearchUser(resultArray)
    }    
    return (
        <>
            <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>
                    Add New Friend
                </h4>
            </div>
            <div className='block'>
                <h4 className='text-sm'>
                    * Can add friends via email search
                </h4>
                <h4 className='text-sm'>
                    * The other person must accept the request
                </h4>
                <h4 className='text-sm pl-3'>
                    before you can communicate
                </h4>
            </div>    
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
                        <ReqListElement key={user.email} userInfo={user}  />
                    )
                })}
            </ul>         
        </>   
    )
}