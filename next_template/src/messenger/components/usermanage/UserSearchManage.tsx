import React, { ChangeEvent } from 'react';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import { useAppSelector } from '@/redux/hook';
import { getAllUserInDoc, getInfoInFriendListCol, getReuestAddFriendInDoc } from '../FirebaseController';
import { firebaseAuth } from '../../../../firebaseConfig';
import ListElement from './ListElement';
import { current } from '@reduxjs/toolkit';


export default function UserSearchManage() {
    const [inputValue, setInputValue] = React.useState("");

    const [allUser, setAllUser] = React.useState<UserInfo[]>([]);
    const [friendEmails, setFriendEmails] = React.useState([]);
    


    const [userList, setUserList] = React.useState<UserInfo[]>([]);
    const [filteringList, setFilteringList] = React.useState<UserInfo[]>([]);
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    
    React.useEffect(()=> {
        //getFriendEmailList()
        getReqResList()
        // getAllList()
    },[currentUser]);

    React.useEffect(()=> {
        {inputValue.length > 0 ? filterUser() : setFilteringList([])}
    },[inputValue])


    const getAllUser = async()=>{ 
        await getAllUserInDoc().then((response)=> 
            response.result && setAllUser(response.value)
        )
    }

    const getFriendEmailList = ()=> {
        currentUser.friendList.forEach((friendUUID : string)=> {
            getInfoInFriendListCol(friendUUID).then((result)=> {
                result.result && setFriendEmails(prev=> { return [...prev, result.value]})
            })  
        })
    }

    const getReqResList = async()=> {
        const listArray : RequestFriend[] = []
        await getReuestAddFriendInDoc().then((response)=> {
            
            response.result && response.value.forEach((req: RequestFriend)=> {
              
            })
        })
    }




    


    const requestDummy = ()=> {
        let resultArray = []
        getReuestAddFriendInDoc().then((response)=> {
            if(response?.result) {
                console.log(response.value)
                const filtering = response.value.filter((item: RequestFriend)=> 
                    currentUser.email !== item.from && currentUser.email !== item.to
                )
                return resultArray = [...filtering]
            }else {
                return []
            }
        })
        console.log(resultArray)
    }





    // const getAllList = async() => {
    //     const receiveRequestFromOther : string[] = [];
    //     await getReuestAddFriendInDoc().then((response)=> {
    //         if(response?.result){
    //             response.value.map((item: RequestFriend)=> {
    //                 if(item.to === firebaseAuth.currentUser.email && item.status === "request") {
    //                     receiveRequestFromOther.push(item.from)
    //                 }
    //             })
    //         } else {
    //             return [];
    //         }
    //     })

    //     const filterArray : UserInfo[] = await getAllUserInDoc().then((response)=> {
    //         const list = []
    //         if(response?.result) {
    //             response.value.forEach((item : UserInfo)=> {
    //                 if(!receiveRequestFromOther.includes(item.email)) {
    //                     if(currentUser.block) {
    //                         const checkBlocked = currentUser.block.find((blockInfo) => blockInfo.blockUser === item.email);
    //                         !checkBlocked && list.push(item)
    //                     } else {
    //                         list.push(item)
    //                     }
    //                 }
    //             })
    //         }
    //         return list;
    //     })
    //     setUserList(filterArray)
    // }



    const filterUser = ()=> {
        const resultArray = userList.filter((item)=> 
            item.email.includes(inputValue)
        )
        setFilteringList(resultArray)
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
                <li>
                    Users who are already friends or blocked won&apos;t be found.
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
                {filteringList.map((result)=> {
                    const friendYn = friendEmails.includes(result.email);
                    return (
                        !friendYn && <ListElement key={result.uid} selected={result} />
                    )
                })}
            </ul>
        </>
    )
}