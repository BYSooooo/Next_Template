import React from 'react';
import { UserInfo } from '../../../../msg_typeDef';
import { UserIcon } from '@heroicons/react/20/solid';
import UserInfoModal from '../public/UserInfoModal';

export default function ListElement({selected, openFrom, } : {selected : UserInfo, openFrom : string }) {
    const [modalOpenYn, setModalOpenYn] = React.useState(false);
    const [income, setIncome] = React.useState("");
    React.useEffect(()=> {
        setIncome(openFrom)
    },[])

    const toggleModal =(openYn: boolean)=> {
        setModalOpenYn(openYn)
    }

    return (
        <>
            <li onClick={()=>setModalOpenYn(true)}>
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
            {modalOpenYn &&  <UserInfoModal info={selected} openFrom={income} openYn={toggleModal}/>}
        </>
    )
}