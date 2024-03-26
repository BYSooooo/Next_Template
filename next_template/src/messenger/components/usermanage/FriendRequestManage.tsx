import { useAppSelector } from '@/redux/hook';
import React, { ChangeEvent } from 'react';
import { getReuestAddFriendInDoc, getUserInfo } from '../FirebaseController';
import { RequestFriend, UserInfo } from '../../../../msg_typeDef';
import ListElement from './ListElement';

export default function FriendRequestManage() {
    const [inputValue, setInputValue] = React.useState("");
    const [reqUserList, setReqUserList] = React.useState<UserInfo[]>([]);
    const [filteringList, setFilteringList] = React.useState<UserInfo[]>([])

    const currentUser = useAppSelector((state)=> state.messengerCurUserInfo);

    React.useEffect(()=> {
        getRequestList()
    },[])

    React.useEffect(()=> {
        inputValue.length > 0 ? filtering() : setFilteringList(reqUserList)
    },[inputValue])

    const getRequestList = async()=> {
        const requestArray : RequestFriend[] = []
        await getReuestAddFriendInDoc().then((response)=> {
            if(response.result) {
                // response.value.map((req) => {
                //     if(req.from === currentUser.email) {
                //         if(req.status !=="success") {
                //             requestArray.push(req)

                //         }
                //     }
                // })

                const requests = response.value.filter((req: RequestFriend)=> req.from === currentUser.email && req.status !=="success");
                requestArray.push(...requests)
            }
        })
        requestArray.forEach((req)=> 
            getUserInfo(req.to).then((response)=>
                response.result && setReqUserList(prev => { return [...prev, response.value]})
            )
        )
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value.trim())
    }
    
    const filtering = ()=> {
        const filterArray = reqUserList.filter((item)=> item.email.includes(inputValue))
        setFilteringList(filterArray)
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
                    filteringList.map((item)=> {
                        console.log(item)
                        return <ListElement key={item.email} selected={item} />
                    })
                }
            </ul>
        </>
    )
}
