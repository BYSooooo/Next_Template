import React, { ChangeEvent } from 'react'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { getUserListInStrg } from '../FirebaseController'
import { ListElement } from './ListElement'

export function FriendAddModal({open} : {open : Function}) {
    const [searchValue, setSearchValue] = React.useState("")
    const [getUserList, setGetUserList] = React.useState<string[]>([])
    const [searchUser, setSearchUser] = React.useState<string[]>([]);

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
        const value = e.target.value
        setSearchValue(value)
    }
    const getAllList = () => {
        getUserListInStrg().then((response)=> {
            {response?.result === true && setGetUserList(response.value)}
        })
    }
    const filterUser = ()=> {
        const resultArray = getUserList.filter((item)=> item.includes(searchValue.trim()))
        setSearchUser(resultArray)
    }
    
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white rounded-md p-2'>
                <div className='flex justify-between'>
                    <h4 className='font-bold text-lg'>
                        Add New Friend
                    </h4>
                    <button onClick={()=>open(false)}>
                        <XMarkIcon className='w-6 h-6 text-red-500'/>
                    </button>
                </div>    
                <div className='flex justify-center'>
                    <input 
                        className='py-1 pl-2 rounded-md border-2 border-gray-500'
                        onChange={(e)=>onChangeInput(e)}
                        placeholder='example@email.com'>
                    </input>
                </div>
                <div>
                    {searchUser.map((user)=> {
                       return (
                           <ListElement key={user} mailAddress={user} />
                       )
                    })}
                </div>
            </div>
        </div>
    )
}