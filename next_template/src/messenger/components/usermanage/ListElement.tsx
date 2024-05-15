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
            <li onClick={()=>setModalOpenYn(true)}>
                <div className='flex w-full justify-between border-2 border-solid border-slate-500 rounded-lg my-2 p-2 hover:cursor-pointer hover:border-blue-500 transition duration-200 '>
                    <div className='flex items-center gap-2'>
                        {
                            selected.photoURL 
                            ? <img src={selected.photoURL} className='w-8 h-8 rounded-full border-none' />
                            : <UserIcon className='w-8 h-8 border-2 rounded-full border-slate-500 border-solid text-slate-500'/>
                        }
                            <h1 className='text-base font-bold'>
                                {selected.email}
                            </h1>   
                    </div>
                </div>
            </li>
            {modalOpenYn &&  <UserInfoModal info={selected} openFrom={income} openYn={toggleModal} extraInfo={extra}/>}
        </>
    )
}