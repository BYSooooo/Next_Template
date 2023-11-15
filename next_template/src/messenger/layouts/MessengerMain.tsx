import React from 'react';

import PageRouter from '../components/PageRouter';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRouter } from '@/redux/features/messengerReducer';
import { firebaseStrg } from '../../../firebaseConfig';
import HeaderMain from '../components/header/HeaderMain';


export default function MainLogined () {
    // const [showModal, setShowModal] = React.useState(false);
    const dispatch = useAppDispatch()
    
    
    React.useEffect(()=> {
        dispatch(setPageRouter({page : "Default", title : "Home"}))
                
        console.log(firebaseStrg)
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