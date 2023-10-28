import React from 'react';
import { firebaseAuth } from '../../../../firebaseConfig';

export default function UserInfo() {
    
    const userInfo = firebaseAuth.currentUser;
    console.log(userInfo)

    return (
        <div className='w-52 border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            {firebaseAuth.currentUser.email}
            
        </div>
    )
}