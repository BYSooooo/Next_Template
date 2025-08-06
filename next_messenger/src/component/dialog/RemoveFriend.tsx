import React from 'react';
import UserDetailInfo from '../UserDetail';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function RemoveFriend() {
    const selectedUserInfo = useAppSelector((state)=> state.dialogStore).extraData;
    const dispatch = useAppDispatch();

    return (
        <div className='flex flex-col items-center'>
            <UserDetailInfo userInfo={selectedUserInfo}/>
        </div> 
    )
}