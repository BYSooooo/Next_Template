import React from 'react';
import { UserInfo } from '../../../../msg_typeDef';
import { UserIcon } from '@heroicons/react/20/solid';

export default function ListElement({selected} : {selected : UserInfo}) {
    

    React.useEffect(()=> {
    
    },[])

    

    const onClickElement =()=> {
        console.log("Clicked")
    }

    const getStatus = ()=> {
        
    }

    return (
        <li onClick={onClickElement}>
            <div className='flex justify-between border-2 border-solid border-slate-500 rounded-lg my-2 p-2 hover:cursor-pointer hover:border-blue-500 transition duration-200 '>
                <div className='flex items-center gap-2'>
                    {
                        selected.photoURL 
                        ? <img src={selected.photoURL} className='w-8 h-8 rounded-full border-none' />
                        : <UserIcon className='w-8 h-8 border-2 rounded-full border-slate-500 border-solid text-slate-500'/>
                    }
                        <h4 className='text-base font-bold'>
                            {selected.email}
                        </h4>   
                </div>
            </div>
        </li>
    )
}