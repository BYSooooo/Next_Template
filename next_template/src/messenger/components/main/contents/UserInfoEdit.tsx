import React from 'react';
import { firebaseAuth } from '@/../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUserInfo, setPageRouter } from '@/redux/features/messengerReducer';
import { UserIcon } from '@heroicons/react/20/solid';
import SubmitGroup from './SubmitGroup';
import { updatePassword, updateProfile } from 'firebase/auth';

export default function UserInfoEdit() {
    const userAuth = firebaseAuth.currentUser
    const infoReducer = useAppSelector((state)=> state.messengerUserInfoEdit);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setInitInfo()
    },[])

    console.log(userAuth)

    const setInitInfo = () => {
        {userAuth.email && dispatch(setUserInfo({infoName : "email", value : userAuth.email, editYn : false}))};
        {userAuth.displayName && dispatch(setUserInfo({infoName : "displayName", value : userAuth.displayName, editYn : false}))}
        {userAuth.photoURL && dispatch(setUserInfo({infoName : "photoURL", value : userAuth.photoURL, editYn : false}))}

    }

    const getStateIdx = (propName : string)=> {
        const idx = infoReducer.findIndex((e)=> e.infoName === propName)
        return idx
    }

    const onClickHandler = () => {
        const passwordEdited = infoReducer[getStateIdx("password")].editYn ? infoReducer[getStateIdx("Password")].value : null
        {passwordEdited && updatePassword(userAuth, passwordEdited)}

        updateProfile(userAuth, {            
            displayName : infoReducer[getStateIdx("displayName")].editYn ? infoReducer[getStateIdx("displayName")].value : userAuth.displayName,
            photoURL : infoReducer[getStateIdx("photoURL")].editYn ? infoReducer[getStateIdx("photoURL")].value : userAuth.photoURL
        }).then(()=> {
            console.log("Success")
            setInitInfo()
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className='rounded-md border-2 border-gray-500 w-96 pr-2 p-2 my-2'>
                <h4 className='font-bold'>
                    Basic Information
                </h4>
                <div className='my-2 mx-1'>
                    <h5 className='text-md'>
                        Profile Photo
                    </h5>
                    <div className='flex items-end'>
                        <div className='flex w-fit h-fit rounded-full border-2 border-gray-400 border-solid align-baseline'>
                            {firebaseAuth.currentUser.photoURL 
                                ? <img src={firebaseAuth.currentUser.photoURL}/> 
                                : <UserIcon className='w-20 h-20 text-gray-400' />
                            }
                        </div>
                        <button className='flex border-2 border-blue-400 rounded-full border-solid px-1 hover:bg-blue-400 w-fit h-fit'>
                            <h5 className='font-bold hover:text-white'>
                                Edit
                            </h5>
                        </button>
                    </div>
                </div>
                <div className='my-2 mx-1'>
                    <h5 className='text-md'>
                        Email (Can't Modified)
                    </h5>
                    <input 
                        className='border-2 border-solid border-gray-500 rounded-md p-1 w-2/3' 
                        value={firebaseAuth.currentUser.email} 
                        disabled>
                    </input>
                </div>
                <SubmitGroup title="Display Name" reduxName='displayName' />
                <div className='flex justify-end'>
                    <button     
                        onClick={()=>dispatch(setPageRouter({page : "Default", title : "Home"}))}
                        className='rounded-full border-2 border-red-500 mx-1 px-2 font-bold hover:bg-red-500 hover:text-white'>
                        Return  
                    </button>
                    <button 
                        onClick={onClickHandler}
                        className='rounded-full border-2 border-blue-500 mx-1 px-2 font-bold hover:bg-blue-500 hover:text-white'>
                        Confirm
                    </button>
                </div>                
            </div>
            
            <div className='rounded-md border-2 border-gray-500 w-96 pr-2 p-2 my-2'>
            <h4 className='font-bold'>
                    Extra Information
                </h4>
                <SubmitGroup title='Phone Number' reduxName='phoneNumber' />
                
            </div>
            
        
        </div>

            
        
            
            
            
        

    )
}