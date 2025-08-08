import React from 'react';
import UserDetailInfo from '../UserDetail';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { controlDialog } from '../../redux/features';

export default function RemoveFriend() {
    const selectedUserInfo = useAppSelector((state)=> state.dialogStore).extraData;
    const dispatch = useAppDispatch();

    const onClickRemove = ()=> {

    }

    return (
        <div className='flex flex-col items-center'>
            <UserDetailInfo userInfo={selectedUserInfo}/>
            <ul className='text-sm list-inside list-disc text-start text-pretty'>
                <li>
                    Once deleted, it cannot be undone.
                </li>
                <li>
                    If you remove a friend from your list, all chats and attachments will also be deleted.
                </li>
            </ul>
            <div className='w-full flex flex-row mt-3 justify-end gap-x-2'>
                <button
                    className='default-button text-center p-1
                        hover:bg-red-600 dark:hover:bg-red-600'
                    onClick={onClickRemove}>
                    Remove
                </button>
                <button 
                    onClick={()=>dispatch(controlDialog({ openYn : false }))}
                    className='default-button text-center p-1'>
                    Close
                </button>
            </div>
        </div> 
    )
}