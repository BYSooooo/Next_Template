import React from 'react';
import { firebaseAuth } from '@/../../firebaseConfig';

export default function UserInfoEdit() {
    const userAuth = firebaseAuth.currentUser

    return (
        <div className='rounded-md border-2 border-gray-500 w-72 pr-2' >
            UserInfo Edit Page
        </div>

    )
}