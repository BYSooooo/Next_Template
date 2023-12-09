import React, { ChangeEvent } from 'react'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { getAllUserInDoc } from '../../FirebaseController'
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
        getAllUserInDoc().then((response)=> {
            
            {response?.result === true && setGetUserList(response.value)}
        })
    }
    const filterUser = ()=> {
        const resultArray = getUserList.filter((item)=> item.includes(searchValue.trim()))
        setSearchUser(resultArray)
    }    
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-black rounded-md p-3'>
                <div className='flex justify-between'>
                    <h4 className='font-bold text-lg'>
                        Add New Friend
                    </h4>
                    <button onClick={()=>open(false)}>
                        <XMarkIcon className='w-6 h-6 text-red-500'/>
                    </button>
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
                            className='py-1 pl-2 rounded-md border-2 border-gray-500 w-80'
                            onChange={(e)=>onChangeInput(e)}
                            placeholder='example@email.com'>
                        </input>
                    </label>
                </div>
                <ul className='list-none list-inside h-64 overflow-scroll' >
                    {searchUser.map((user)=> {
                        return (
                            <ListElement key={user} mailAddress={user}  />
                        )
                    })}
                </ul>               
            </div>
        </div>
    )
}

// {searchUser.length > 0
//     ?   <div className='h-60 overflow-scroll'>
//             {searchUser.map((user)=> {
//             return (
//                 <ListElement key={user} mailAddress={user}/>
//             )
//             })}
//         </div>
//     :   <div className='flex h-60 justify-center items-center'>
//             <h4 className='font-bold'>
//                 No result found.
//             </h4>
//         </div>
//     }