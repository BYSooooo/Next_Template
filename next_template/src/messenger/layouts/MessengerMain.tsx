import React from 'react';

import PageRouter from '../components/PageRouter';
import { useAppDispatch } from '@/redux/hook';
import { setPageRouter } from '@/redux/features/messengerReducer';
import HeaderMain from '../components/header/HeaderMain';
import { setInitUserInfo } from '../components/FirebaseController';


export default function MainLogined () {
    // const [showModal, setShowModal] = React.useState(false);
    const dispatch = useAppDispatch()
    
    
    React.useEffect(()=> {
        dispatch(setPageRouter({page : "Default", title : "Home"}))
        setInitUserInfo()
    },[])
    

    // const modalControl = (modalYn : boolean) => {
    //     console.log(modalYn)
    //     setShowModal(modalYn)
    // }
    
    return (
        <div className="container border-2 border-solid border-gray-600 rounded-md p-2">
            <HeaderMain />
            <PageRouter />
            {/* {showModal ? <UserInfoModal /> : null}             */}
        </div>
    )
}