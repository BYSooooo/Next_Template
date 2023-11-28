import React, { ChangeEvent } from 'react'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { getUserListInStrg } from '../FirebaseController'

export function FriendAddModal({open} : {open : Function}) {
    const [searchValue, setSearchValue] = React.useState("")
    const [getUserList, setGetUserList] = React.useState<string[]>([])

    React.useEffect(()=> {
        getAllList()
    },[searchValue])

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>)=> {
        const value = e.target.value
        setSearchValue(value)
    }
    const getAllList = () => {
        {searchValue.length > 0 ? 
            getUserListInStrg().then((response)=> {
                {response?.result === true && setGetUserList(response.value)}
            })
            : setGetUserList([])
        }
    }
    
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white'>
                <div className='flex justify-between'>
                    <h4 className='font-bold text-lg'>
                        Add New Friend
                    </h4>
                    <button onClick={()=>open(false)}>
                        <XMarkIcon className='w-6 h-6 text-red-500'/>
                    </button>
                </div>    
                <div>
                    <input 
                        onChange={(e)=>onChangeInput(e)}
                        placeholder='example@email.com'>
                    </input>
                </div>
                {getUserList.map((item)=> (
                    
                    <div key={item}>
                        <h4>
                            {item}
                        </h4>
                    </div>
                ))
                }
            </div>
        </div>
    )
}