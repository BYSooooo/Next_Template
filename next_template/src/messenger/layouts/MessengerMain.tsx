import React from 'react';

import PageRouter from '../components/PageRouter';
import { useAppDispatch } from '@/redux/hook';
import { setCurrentUserInfo, setPageRendering } from '@/redux/features/messengerReducer';
import HeaderMain from '../components/header/HeaderMain';
import { getUserInfo, setInitUserInfo } from '../components/FirebaseController';
import { firebaseAuth } from '../../../firebaseConfig';

export default function MainLogined () {
    // const [showModal, setShowModal] = React.useState(false);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setInitUserInfo().then((result)=> {
            result === true && getCurrentUserInfo()
        })
        //dispatch(setPageRouter({page : "Default", title : "Home"}))
        dispatch(setPageRendering({title : "Home", left : "UserInfo", middle : "PublicBoard", right : "FriendListMain"}))
    },[])
    
    const getCurrentUserInfo = async() => {
        await getUserInfo(firebaseAuth.currentUser.email).then((result)=> {
            const curData = result.value
            console.log(curData)
            dispatch(setCurrentUserInfo(curData))
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