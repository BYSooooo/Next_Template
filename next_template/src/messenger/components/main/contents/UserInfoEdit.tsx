import React, { InputHTMLAttributes } from 'react';
import { firebaseAuth } from '@/../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { editUserInfo, userInfoHook, setPageRouter } from '@/redux/features/messengerReducer';

export default function UserInfoEdit() {
    const userAuth = firebaseAuth.currentUser
    const dispatch = useAppDispatch()
    
    React.useEffect(()=> {
        setInitInfo()
    },[])

    console.log(userAuth)

    const setInitInfo = () => {
        {userAuth.email && dispatch(editUserInfo({infoName : "Email", value : userAuth.email, editYn : false}))};
        {userAuth.displayName && dispatch(editUserInfo({infoName : "DisplayName", value : userAuth.displayName, editYn : false}))}
    }

    const userInfoChange =(event : React.ChangeEvent<HTMLInputElement>)=> {
        const checkedYn = event.target.checked;
        const inputName = event.target.name;
        // Enable to Input New Value
        if(checkedYn === true) {
     
        // If check box values false, initialized input value
        } else {
            
        }
    }

    


    return (
        <div className='rounded-md border-2 border-gray-500 w-96 pr-2 p-2'>
            <div className='my-2 mx-1'>
                <h5 className='text-md'>
                    Email
                </h5>
                <input 
                    className='border-2 border-solid border-gray-500 rounded-md p-1 w-2/3' 
                    value={firebaseAuth.currentUser.email} 
                    disabled>
                </input>
            </div>
            <div className='my-2 mx-1'>
                <div className='flex items-center'>
                    <h5 className='text-md'>
                        Display Name
                    </h5>
                    <input name="DisplayName" type="checkbox" onChange={userInfoChange} />
                </div>
                <input 
                    className='border-2 border-solid border-gray-500 rounded-md p-1 w-2/3' >
                        {userAuth.displayName}
                </input>
            </div>
            <button
                onClick={()=>dispatch(setPageRouter({page : "Default", title : "Home"}))}>
                return default  
            </button>
            {userAuth.displayName}
        </div>

    )
}