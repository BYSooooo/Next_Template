import React from 'react';

import { setUserInfo } from '@/redux/features/messengerReducer';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { firebaseAuth } from '../../../../../firebaseConfig';

type reduxType = "email" | "displayName" | "phoneNumber" | "photoURL"


export default function SubmitGroup({title, reduxName} : {title : string, reduxName : reduxType}) {
    const dispatch = useAppDispatch();
    const infoReducer = useAppSelector((state)=> state.messengerUserInfoEdit)
    const userAuth = firebaseAuth.currentUser

    const inputValueChange = (propName : string, event : React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserInfo({infoName : propName, value : event.target.value }))
    }
    
    const checkYnChange =(event : React.ChangeEvent<HTMLInputElement>)=> {
        const checkedYn = event.target.checked;
        const inputName = event.target.name;
        // Enable to Input New Value
        if(checkedYn === true) {
            console.log("True")
            dispatch(setUserInfo({infoName : inputName, editYn : true }))
        // If check box values false, initialized input value
        } else {
            console.log("False")
            dispatch(setUserInfo({infoName : inputName, value : userAuth.displayName === null ? "" : userAuth.displayName, editYn : false}))
        }
    }

    const getStateIdx = (propName : string)=> {
        const idx = infoReducer.findIndex((e)=> e.infoName === propName)
        return idx
    }
    const checkHandler = (propName : string) => {
        return infoReducer[getStateIdx(propName)].editYn
    }

    const inputEditYn = (propName : string) => {
        return (
            !infoReducer[getStateIdx(propName)].editYn
        )
    }

    return (
        <div className='my-2 mx-1'>
            <div className='flex items-center'>
                <h5 className='text-md mr-2'>
                    {title}
                </h5>
                <input name={reduxName} type="checkbox" onChange={checkYnChange} checked={checkHandler(reduxName)}/>
            </div>
            <input
                disabled={inputEditYn(reduxName)}
                className='border-2 border-solid border-gray-500 rounded-md p-1 w-2/3'
                onChange={(e)=>inputValueChange(reduxName,e)}
                value={infoReducer[getStateIdx(reduxName)].value}/>
        </div>
    )
}