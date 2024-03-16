import React from 'react';

import { firebaseAuth, firebaseStore } from '@/../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPageRendering, setUserInfo } from '@/redux/features/messengerReducer';
import { UserIcon } from '@heroicons/react/20/solid';
import SubmitGroup from './SubmitGroup';
import { getAuth, signOut, updateEmail, updateProfile } from 'firebase/auth';
import { getDownloadURL } from 'firebase/storage';
import { updatePhotoURL, uploadPhotoToStrg } from '../FirebaseController';
import PopOver from '../public/PopOver';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

export default function UserInfoEdit() {
    const [showLogout, setShowLogout] = React.useState(false);
    const [showWarning, setShowWarning] = React.useState(false);
    const [noEditModal, setNoEditModal] = React.useState(false);
    const userAuth = firebaseAuth.currentUser
    const infoReducer = useAppSelector((state)=> state.messengerUserInfoEdit);
    const currentInroReducer = useAppSelector((state)=> state.messengerCurUserInfo)
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setInitInfo()
    },[])

    const setInitInfo = () => {
        /* Basic Information */
        {userAuth.email && dispatch(setUserInfo({infoName : "email", value : userAuth.email, editYn : false}))};
        {userAuth.displayName && dispatch(setUserInfo({infoName : "displayName", value : userAuth.displayName, editYn : false}))}
        {userAuth.photoURL && dispatch(setUserInfo({infoName : "photoURL", value : userAuth.photoURL, editYn : false}))}
        /* Extra Information */
        {currentInroReducer.introduction && dispatch(setUserInfo({infoName : "introduction", value : currentInroReducer.introduction, editYn : false }))}
    }

    const getStateIdx = (propName : string)=> {
        const idx = infoReducer.findIndex((e)=> e.infoName === propName)
        return idx
    }

    const onClickHandler = () => {
        const checkEditYn = infoReducer.findIndex((item)=> item.editYn === true)
        console.log(checkEditYn)
        if(checkEditYn === -1) {
            setNoEditModal(true)
        } else {
            setShowWarning(true)
        }
    }

    const updateAuthInfo = async () => {
        const docRef = doc(firebaseStore,"userInfo",userAuth.email)
        // Close Warning Modal
        setShowWarning(false)
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
        // Email Address Edited CHeck
        const emailEdited = infoReducer[getStateIdx("email")].editYn;
        // if Edited, Change Email in Authentication
        if(emailEdited) {
            const changedEmail = infoReducer[getStateIdx("email")].value;
            updateEmail(userAuth, changedEmail);
        }
        //  edited check   
        const introEdited = infoReducer[getStateIdx("introduction")].editYn;
        // if Edited, Change Introduction text 
        if(introEdited) {
            const changeIntro = infoReducer[getStateIdx("introduction")].value;
            await updateDoc(docRef, {
                introduction : changeIntro
            })
        }    
        //dispatch(setPageRouter({page : "Default", title : "Home"}))
        setShowLogout(true)
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
                                className='flex border-2 border-blue-400 rounded-full border-solid px-2 hover:bg-blue-400 w-fit h-fit'>
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
                <SubmitGroup title="Email" reduxName='email' />
                <SubmitGroup title="Display Name" reduxName='displayName' />
                                
            </div>
            <div className='rounded-md border-2 border-gray-500 w-96 pr-2 p-2 my-2'>
                <h4 className='font-bold'>
                    Extra Information
                </h4>
                <SubmitGroup title="Indroduction" reduxName='introduction' />
            </div>
            <div className='flex justify-end'>
                <button     
                    onClick={()=>dispatch(setPageRendering({title : "Home", left : "UserInfo", middle : "ChatRoom", right : "FriendListMain"}))}
                    className='rounded-full border-2 border-red-500 mx-1 px-2 font-bold hover:bg-red-500 hover:text-white'>
                    Return  
                </button>
                <button 
                    onClick={onClickHandler}
                    className='rounded-full border-2 border-blue-500 mx-1 px-2 font-bold hover:bg-blue-500 hover:text-white'>
                    Confirm
                </button>
            </div>
            { showLogout ? 
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
                    <div className="relative w-80 h-auto my-6 mx-auto max-w-3xl bg-white dark:bg-slate-800 rounded-md p-3">
                        <div>
                            <h4 className='font-bold text-lg'>
                                User Information Change
                            </h4>
                        </div>
                        <div className="pl-1 items-start my-2">
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
            { showWarning &&
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/70">
                    <div className="relative w-80 h-auto my-6 mx-auto max-w-3xl bg-white dark:bg-slate-800 rounded-md p-3">
                        <div>
                            <h4 className='font-bold text-lg'>
                                Information Change
                            </h4>
                        </div>
                        <div className="pl-1 items-start my-2">
                            <h6 className='text-sm text-left'>
                                * Please check your entries before completing the editing of User Information.
                            </h6>
                            <h6 className='text-sm text-left'>
                                * If your email address is incorrect, you may not be able to sign in to your current account.
                            </h6>
                        </div>
                        <div className="flex justify-end gap-1">
                            <button
                                onClick={()=>setShowWarning(false)} 
                                className='rounded-full border-2 border-solid border-red-500 hover:bg-red-500 hover:text-white font-bold px-2 '>
                                Cancel
                            </button>
                            <button
                                onClick={()=>updateAuthInfo()}
                                className='rounded-full border-2 border-solid border-blue-500 hover:bg-blue-500 hover:text-white font-bold px-2'>
                                Confirm
                            </button>
                        </div> 
                    </div>
                </div>
            }
            {/* { noEditModal && <PopOver content='Nothing to edit' type='fail' control={()=>setNoEditModal(false)}/>} */}
        </div>

    )
}