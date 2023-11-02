import React from 'react';

import UserInfo from "../components/left/UserInfo"
import PageRouter from '../components/PageRouter';

import { signOut } from "firebase/auth"
import { firebaseAuth } from "../../../firebaseConfig"

import { PowerIcon } from '@heroicons/react/20/solid'


export default function MainLogined () {
    // const [showModal, setShowModal] = React.useState(false);
    const [loadPage, setLoadPage] = React.useState("");
    
    React.useEffect(()=> {
        setLoadPage("Default")
    },[])
    const onClickSignOut = () => {
        signOut(firebaseAuth)
    }

    // const modalControl = (modalYn : boolean) => {
    //     console.log(modalYn)
    //     setShowModal(modalYn)
    // }
    
    return (
        <div className="container border-2 border-solid border-gray-600 rounded-md p-2">
            <div className='flex p-2 items-center justify-between'>
                <h1 className="text-5xl font-bold">
                    Home
                </h1>
                <button
                    className='border-2 border-red-500 rounded-full h-fit hover:bg-red-500'
                    onClick={onClickSignOut}>
                    <PowerIcon className='h-6 w-6 text-red-500 hover:text-white'/>
                </button>
            </div>
            <div className="flex grid-cols-2">
                <UserInfo pageControl={setLoadPage}/>
                <PageRouter pageName={loadPage} />
            </div>
            {/* {showModal ? <UserInfoModal /> : null}             */}
        </div>
    )
}