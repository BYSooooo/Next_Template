import React from 'react';
import { UserInfo } from '../../../../msg_typeDef';
import { UserIcon } from '@heroicons/react/20/solid';
import UserInfoModal from '../public/UserInfoModal';

export default function ListElement({selected, openFrom, extraInfo} : {selected : UserInfo, openFrom : string, extraInfo? : {sort : string, info: any}}) {
    const [modalOpenYn, setModalOpenYn] = React.useState(false);
    const [income, setIncome] = React.useState("");
    const [extra, setExtra] = React.useState<{sort : string, info: any}>();

    React.useEffect(()=> {
        setIncome(openFrom)
        if(extraInfo) setExtra({sort : extraInfo.sort, info : extraInfo.info})
    },[])

    const toggleModal =(openYn: boolean)=> {
        setModalOpenYn(openYn)
    }

    return (
        <>
            <li onClick={()=>setModalOpenYn(true)}
                className='flex rounded-xl my-2 shadow-sm justify-between gap-x-6 py-2 px-3 bg-gray-50 dark:bg-gray-900'>
                <div className='flex min-x-0 gap-x-3'>
                    {selected.photoURL
                        ? <img 
                            className='flex-none mt-1 w-9 h-9 rounded-full'
                            src={selected.photoURL} />
                        : <UserIcon className='w-9 h-9 mt-1 rounded-full border-2 border-solid border-gray-500 text-gray-500' />
                    }
                    <div className='min-w-0 flex-auto'>
                        {selected.displayName 
                            ?   <h1 className='text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100'>
                                    {selected.displayName}
                                </h1>
                            :   <h1 className='text-sm leading-6 text-gray-900 dark:text-gray-100 italic'>
                                    No Display Name
                                </h1>
                        }
                        
                        <h1 className='text-xs truncate leading-5 text-gray-500 dark:text-gray-300'>
                            {selected.email}
                        </h1>
                    </div>
                </div>
            </li>
            {modalOpenYn && <UserInfoModal info={selected} openFrom={income} openYn={toggleModal} extraInfo={extra}/>}
        </>
    )
}