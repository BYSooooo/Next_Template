import React from 'react';

import PageRouter from '../components/PageRouter';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setCurrentUserInfo, setPageRendering } from '@/redux/features/messengerReducer';
import HeaderMain from '../components/header/HeaderMain';
import { setInitUserInfo } from '../components/FirebaseController';
import { firebaseAuth, firebaseStore } from '../../../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserInfo } from '../../../msg_typeDef';
import PopOver from '../components/public/PopOver';

export default function MainLogined () {
    const dispatch = useAppDispatch()
    const popOverReducer = useAppSelector((state)=> state.messengerPopOverControl);

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
            // Transform type last login property from TimeStamp to Date 
            const reNewDate: Date = snapShot.data().lastLogin.toDate()
            userInfo.lastLogin = reNewDate.toString()
            // Transform type blockdate property from Timestamp to Date
            const blockData = snapShot.data().block;
            
            if (blockData) {
                userInfo.block.forEach((item)=> {
                    const checkUser = blockData.find((user)=> user.blockUser === item.blockUser)
                    if(item.blockUser === checkUser.blockUser) {
                        item.blockDate = checkUser.blockDate.toDate().toString()
                    }
                })
            }

            dispatch(setCurrentUserInfo(userInfo))
        })
    }
    
    return (
        <div className="container max-w-fit border-2 border-solid border-gray-600 rounded-md p-2">
            <HeaderMain />
            <PageRouter />
            {popOverReducer.showYn && <PopOver />}
        </div>
    )
}