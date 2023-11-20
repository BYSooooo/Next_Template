import React from 'react';

import { firebaseAuth } from '@/../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUserInfo, setPageRouter } from '@/redux/features/messengerReducer';
import { UserIcon } from '@heroicons/react/20/solid';
import SubmitGroup from './SubmitGroup';
import { getAuth, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { getDownloadURL } from 'firebase/storage';
import { setInitUserInfo, updatePhotoURL, uploadPhotoToStrg } from '../../FirebaseController';

export default function UserInfoEdit() {
    const [showLogout, setShowLogout] = React.useState(false);
    const userAuth = firebaseAuth.currentUser
    const infoReducer = useAppSelector((state)=> state.messengerUserInfoEdit);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setInitInfo()
    },[])

    const setInitInfo = () => {
        {userAuth.email && dispatch(setUserInfo({infoName : "email", value : userAuth.email, editYn : false}))};
        {userAuth.displayName && dispatch(setUserInfo({infoName : "displayName", value : userAuth.displayName, editYn : false}))}
        {userAuth.photoURL && dispatch(setUserInfo({infoName : "photoURL", value : userAuth.photoURL, editYn : false}))}
    }

    const getStateIdx = (propName : string)=> {
        const idx = infoReducer.findIndex((e)=> e.infoName === propName)
        return idx
    }

    const onClickHandler = async () => {
        // Password Edited Check
        const passwordEdited = infoReducer[getStateIdx("password")].editYn ? infoReducer[getStateIdx("Password")].value : null
        {passwordEdited && updatePassword(userAuth, passwordEdited)}
        
        // photoURL Edited Check
        const photoURLEdited = infoReducer[getStateIdx("photoURL")].editYn
        // if Edited, Uploaded to Firebase Stroage and get Image URL
        if(photoURLEdited) {
            const urlValue = infoReducer[getStateIdx("photoURL")].value;
            await uploadPhotoToStrg(urlValue).then((response)=> {
                if(response.result === true) {
                    getDownloadURL(response.value).then((urlString)=> {
                        updatePhotoURL(urlString)
                        updateProfile(userAuth, { photoURL : urlString })
                    })
                }
            });
        }
        // displayName Edited Check
        const displayNameEdited = infoReducer[getStateIdx("displayName")].editYn;
        // if Edited, Change DisplayName 
        if(displayNameEdited) {
            const changedName = infoReducer[getStateIdx("displayName")].value;
            updateProfile(userAuth,{ displayName : changedName })    
        }        
        setShowLogout(true)
        //dispatch(setPageRouter({page : "Default", title : "Home"}))
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
                        { infoReducer[getStateIdx("photoURL")].editYn && 
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
            { showLogout ? 
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
                    <div className="relative w-80 h-auto my-6 mx-auto max-w-3xl bg-white dark:bg-slate-800 rounded-md p-3">
                        <div>
                            <h4 className='font-bold text-lg'>
                                Notice
                            </h4>
                        </div>
                        <div className="pl-1 items-start">
                            <h6 className="text-base text-left">
                                * User information has been modified.
                            </h6>
                            <h6 className="text-base text-left">
                                * Please log in again to update User information
                            </h6>
                        </div>
                        <button
                            onClick={()=>signOut(getAuth())}
                            className="rounded-full p-2 text-center w-full border-2 border-orange-400 hover:bg-orange-400 hover:text-white">
                            Log out
                        </button>
                    </div>
                </div>
            : null}
        </div>

    )
}