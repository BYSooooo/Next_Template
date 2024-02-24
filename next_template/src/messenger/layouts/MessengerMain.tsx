import React from 'react';

import PageRouter from '../components/PageRouter';
import { useAppDispatch } from '@/redux/hook';
import { setCurrentUserInfo, setPageRendering } from '@/redux/features/messengerReducer';
import HeaderMain from '../components/header/HeaderMain';
import { setInitUserInfo } from '../components/FirebaseController';
import { firebaseAuth, firebaseStore } from '../../../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserInfo } from '../../../msg_typeDef';

export default function MainLogined () {
    // const [showModal, setShowModal] = React.useState(false);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setInitUserInfo().then((result)=> {
            result === true && getCurrentUserInfo()
        })
        //dispatch(setPageRouter({page : "Default", title : "Home"}))
        dispatch(setPageRendering({title : "Home", left : "UserInfo", right : "FriendListMain"}))
    },[])
    
    const getCurrentUserInfo = async() => {
        console.log("getCurrentInfo Called")
        const docRef = doc(firebaseStore, 'userInfo',firebaseAuth.currentUser.email);
        onSnapshot(docRef,(snapShot)=> {
            const userInfo = snapShot.data() as UserInfo
            const reNewDate: Date = snapShot.data().lastLogin.toDate()
            userInfo.lastLogin = reNewDate.toString()
            dispatch(setCurrentUserInfo(userInfo))
        })
    }
    

    // const modalControl = (modalYn : boolean) => {
    //     console.log(modalYn)
    //     setShowModal(modalYn)
    // }
    
    return (
        <div className="container max-w-fit border-2 border-solid border-gray-600 rounded-md p-2">
            <HeaderMain />
            <PageRouter />
            {/* {showModal ? <UserInfoModal /> : null}             */}
        </div>
    )
}