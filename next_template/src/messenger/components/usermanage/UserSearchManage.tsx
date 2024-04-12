import React, { ChangeEvent } from 'react';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import { useAppSelector } from '@/redux/hook';
import { blockUser, getAllUserInDoc, getInfoInFriendListCol, getReuestAddFriendInDoc } from '../FirebaseController';
import ListElement from './ListElement';


export default function UserSearchManage() {
    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);
    const requestList = useAppSelector((state)=> state.messengerFriendReq)

    const [inputValue, setInputValue] = React.useState("");
    const [userList, setUserList] = React.useState<UserInfo[]>([]);
    const [filteringList, setFilteringList] = React.useState<UserInfo[]>([]);
    
    React.useEffect(()=> {
        checkFilters()
    } ,[currentUser]);

    React.useEffect(()=> {
        {inputValue.length > 0 ? filterUser() : setFilteringList([])}
    },[inputValue])

    
    const filterUser = ()=> {
        const resultArray = userList.filter((item)=> item.email.includes(inputValue))
        setFilteringList(resultArray)
    }    

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>)=> {
        setInputValue(e.target.value.trim())
    }
    const checkFilters= async()=> {
        // get Friend Email List
        /*
        const friendEmails = []
        if(currentUser.friendList) {
            currentUser.friendList.map((uuid: string)=> {
                getInfoInFriendListCol(uuid).then((response)=> {
                    response.result && friendEmails.push(response.value)
                })
            })
        }
        console.log(friendEmails)
        // get All User List
        await getAllUserInDoc().then((response)=> {
            if(response.result) {
                const allUser = response.value as UserInfo[];
                const filteredUser = allUser.reduce((acc,cur)=> {
                    // true - Block User / false : netural User
                    const blockYn = currentUser.block.some((item)=> item.blockUser === cur.email);
                    if(!blockYn) {
                        // true = Friend / False : non Friend
                        const friendYn = friendEmails.includes(cur.email);
                        if(!friendYn) {
                            // true : send Request of receive Request / false : None
                            const requestYn = requestList.some((item)=> 
                                item.from === currentUser.email && item.to === cur.email || 
                                item.from === cur.email && item.to === currentUser.email )
                            if(!requestYn) {
                                
                            }
                        }
                    }
                    
                },[])
                console.log(filterUser)
            }
        })
        */
        
        // get All User List
        const allUser = [];
        await getAllUserInDoc().then((response)=> {
            if(response.result) allUser.push(...response.value)
        })
         // get All Friend Email List
        const friendList = [];
        if(currentUser.friendList) {
            currentUser.friendList.forEach(async (friendUUID : string)=> {
                await getInfoInFriendListCol(friendUUID).then((result)=> {
                    result.result && friendList.push(result.value)
                })  
            })
        }
        
        // get User List of send or receive Request
        
        const reqResArray = [];
        await getReuestAddFriendInDoc().then((response)=> 
            response.result && response.value.forEach((req: RequestFriend)=> {
                if(req.from === currentUser.email) reqResArray.push(req.to)
                if(req.to === currentUser.email) reqResArray.push(req.from)
            })
        )
        
        // Filtering Block User
        const fBlockUserList = allUser.filter((item)=> 
            !currentUser.block?.some((block)=> block.blockUser === item.email)
        )

        // Filtering Friend in Previous Array
        const fFriendList = fBlockUserList.filter((item)=> 
            !friendList.includes(item.email)
        )   
        // Filtering User send or receive request in Previous Array
        const fReqResList = fFriendList.filter((item)=> 
            !reqResArray.includes(item.email)
        )
        return setUserList(fReqResList)
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
                        return <ListElement key={result.uid} selected={result} openFrom={"Default"}/>
                    })
                }
            </ul>
        </>
    )
}