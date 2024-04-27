import React, { ChangeEvent } from 'react';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import { useAppSelector } from '@/redux/hook';
import { getAllUserInDoc, getBlockInfo, getInfoInFriendListCol, getReuestAddFriendInDoc } from '../FirebaseController';
import ListElement from './ListElement';


export default function UserSearchManage() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    
    const [inputValue, setInputValue] = React.useState("");
    const [userList, setUserList] = React.useState<UserInfo[]>([]);
    const [filteringList, setFilteringList] = React.useState<UserInfo[]>([]);
    const [blockList, setBlockList] = React.useState<UserInfo[]>([])
    
    React.useEffect(()=> {
        getBlockUserList()
        checkFilters()
    } ,[currentUser]);

    React.useEffect(()=> {
        {inputValue.length > 0 ? filterUser() : setFilteringList([])}
    },[inputValue])

    
    const filterUser = ()=> {
        const resultArray = userList.filter((item)=> item.email.includes(inputValue))
        setFilteringList(resultArray)
    }
    
    const getBlockUserList = ()=> {
        currentUser.block.forEach(async(info)=> {
            await getBlockInfo(info.uuid).then((response)=> {
                if(response.result) {
                    return !blockList.some((item)=> item.email === response.value.email) 
                        && setBlockList(prev => {return [...prev,response.value]})
                }
            })
        })
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>)=> {
        setInputValue(e.target.value.trim())
    }
    const checkFilters= async()=> {
        // get Friend Email List
        const friendEmails = []
        if(currentUser.friendList) {
            currentUser.friendList.forEach(async (uuid: string)=> {
                await getInfoInFriendListCol(uuid).then((response)=> {
                    return response.result && friendEmails.push(response.value)
                })
            })
        }
        // get Request of Response Friend
        const reqLists = []
        getReuestAddFriendInDoc().then((response)=> {
            if(response.result) {
                const filter = response.value.filter((item)=> 
                    ((item.from || item.to) === currentUser.email) && (item.status === "request") 
                )
                reqLists.push(...filter)
            }
        })
        

        // get All User List
        await getAllUserInDoc().then((response)=> {
            if(response.result) {
                const filtering : UserInfo[] = response.value.filter((user)=> 
                    !reqLists.some((item:RequestFriend)=>  
                        ((item.from === user.email) || (item.to === user.email)) 
                        && (item.status !== "success")
                    )
                )
                setUserList(filtering.filter((item)=> !friendEmails.includes(item.email)))
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
                {   filteringList.map((result)=> {
                        return blockList.some((item)=> result.email !== item.email) && 

                         <ListElement key={result.uid} selected={result} openFrom={"Default"}/>
                    })
                }
            </ul>
        </>
    )
}