import React from 'react';

import { firebaseAuth, firebaseStrg } from '@/../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUserInfo, setPageRouter } from '@/redux/features/messengerReducer';
import { UserIcon } from '@heroicons/react/20/solid';
import SubmitGroup from './SubmitGroup';
import { updatePassword, updateProfile } from 'firebase/auth';
import { ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { updatePhotoURL } from '../../FirebaseController';

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
        // Password Edited Check
        const passwordEdited = infoReducer[getStateIdx("password")].editYn ? infoReducer[getStateIdx("Password")].value : null
        {passwordEdited && updatePassword(userAuth, passwordEdited)}
        
        // photoURL Edited Check
        const photoURLEdited = infoReducer[getStateIdx("photoURL")].editYn
        // if Edited, Uploaded to Firebase Stroage and get Image URL
        if(photoURLEdited) {
            const urlValue = infoReducer[getStateIdx("photoURL")].value;
            updatePhotoURL(urlValue)
        }

        updateProfile(userAuth, {            
            displayName : infoReducer[getStateIdx("displayName")].editYn ? infoReducer[getStateIdx("displayName")].value : userAuth.displayName,
            //photoURL : infoReducer[getStateIdx("photoURL")].editYn ? infoReducer[getStateIdx("photoURL")].value : userAuth.photoURL
        }).then(()=> {
            console.log("Success")
            setInitInfo()
        }).catch((error) => {
            console.log(error)
        })
        
    }

    const onTempPhotoHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { target : { files } } = event;
        const uploaded = files[0];
        const reader = new FileReader();
        reader.onloadend = (finished : any) => {
            const { currentTarget : { result }} = finished;
            dispatch(setUserInfo({infoName : "photoURL", value : result, editYn : true}))
        }
        reader.readAsDataURL(uploaded)
    }
    const onTempPhotoClear = ()=>  {
        dispatch(setUserInfo({infoName :  "photoURL", value : userAuth.photoURL ?userAuth.photoURL : "" , editYn : false}))    
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
                            {infoReducer[getStateIdx("photoURL")].value 
                                ? <img src={infoReducer[getStateIdx("photoURL")].value} className='w-20 h-20 rounded-full'/> 
                                : <UserIcon className='w-20 h-20 text-gray-400' />
                            }
                        </div>
                        <label htmlFor="tempPhoto">
                            <button 
                                onClick={()=>document.getElementById("tempPhoto").click()}
                                className='flex border-2 border-blue-400 rounded-full border-solid px-1 hover:bg-blue-400 w-fit h-fit'>
                                Edit
                            </button>
                            <input type='file' id='tempPhoto' accept='image/*' onChange={(e)=>onTempPhotoHandler(e)} style={{display : 'none'}}/>
                        </label>
                        { infoReducer[getStateIdx("photoURL")].value && 
                            <button
                                className='flex border-2 border-red-400 rounded-full border-solid px-1 hover:bg-red-400'
                                onClick={onTempPhotoClear}>
                                Clear
                            </button>
                        }
                    </div>
                </div>
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