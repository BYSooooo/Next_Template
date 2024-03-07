import React, { ChangeEvent } from 'react';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import { useAppSelector } from '@/redux/hook';
import { getAllUserInDoc, getInfoInFriendListCol, getReuestAddFriendInDoc } from '../FirebaseController';
import { firebaseAuth } from '../../../../firebaseConfig';
import ListElement from './ListElement';


export default function UserSearchManage() {
    const [inputValue, setInputValue] = React.useState("");
    const [getUserList, setUserList] = React.useState<UserInfo[]>([]);
    const [filteringList, setFilteringList] = React.useState<UserInfo[]>([]);
    const [friendEmails, setFriendEmails] = React.useState([]);
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    
    React.useEffect(()=> {
        getAllList()
        getFriendEmailList()
    },[]);

    React.useEffect(()=> {
        {inputValue.length > 0 ? filterUser() : setFilteringList([])}
    },[inputValue])

    const getAllList = async() => {
        const receiveRequestFromOther : string[] = [];
        await getReuestAddFriendInDoc().then((response)=> {
            if(response?.result){
                response.value.map((item: RequestFriend)=> {
                    if(item.to === firebaseAuth.currentUser.email && item.status === "request") {
                        receiveRequestFromOther.push(item.from)
                    }
                })
            } else {
                return [];
            }
        })

        const filterArray : UserInfo[] = await getAllUserInDoc().then((response)=> {
            const list = []
            if(response?.result) {
                response.value.forEach((item : UserInfo)=> {
                    if(!receiveRequestFromOther.includes(item.email)) {
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
        setUserList(filterArray)

    }

    const filterUser = ()=> {
        const resultArray = getUserList.filter((item)=> 
            item.email.includes(inputValue)
        )
        setFilteringList(resultArray)
    }    

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>)=> {
        setInputValue(e.target.value.trim())
    }

    const getFriendEmailList = ()=> {
        currentUser.friendList.forEach((friendUUID : string)=> {
            getInfoInFriendListCol(friendUUID).then((result)=> {
                console.log(result)
                result.result && setFriendEmails([...friendEmails,result.value])
            })
            
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
                        className='py-1 pl-2 w-80 rounded-md border-2 border-gray-500 dark:bg-black'
                        onChange={(e)=> onChangeInput(e)}
                        placeholder='Example@email.com'>
                    </input>
                </label>
            </div>
            <ul className='list-none list-inside overflow-y-scroll'>
                {filteringList.map((result)=> {
                    const friendYn = friendEmails.includes(result.email);
                    console.log(friendEmails)
                    return (
                        !friendYn && <ListElement key={result.uid} selected={result} />
                    )
                })}
            </ul>
        </>
    )
}