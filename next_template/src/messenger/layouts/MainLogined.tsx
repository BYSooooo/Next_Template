import React from 'react';

import { firebaseAuth } from "../../../firebaseConfig"
import { signOut } from "firebase/auth"
import UserInfo from "../components/left/UserInfo"
import ChatList from "../components/middle/ChatList"
import OtherInfo from "../components/right/OtherInfo"
import UserInfoModal from '../components/UserInfoModal';

export default function MainLogined () {
    const [showModal, setShowModal] = React.useState(false);

    const onClickSignOut = () => {
        signOut(firebaseAuth)
    }

    const modalControl = (modalYn : boolean) => {

    }

    return (
        <div className="container border-2 border-solid border-gray-600 rounded-md w-auto h-auto p-2">
            <div className="flex">
                <h1 className="text-4xl font-bold">
                    Home
                </h1>
                <button
                    onClick={onClickSignOut}>
                        SignOut
                </button>
            </div>
            <div className="grid grid-cols-3">
                <UserInfo modalYn={modalControl}/>
                <ChatList />
                <OtherInfo />
            </div>
            {showModal ? <UserInfoModal /> : null}            
        </div>
    )
}