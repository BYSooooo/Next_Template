import React from 'react';

import { setUserInfo } from '@/redux/features/messengerReducer';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { firebaseAuth } from '../../../../firebaseConfig';

type reduxType = "email" | "displayName" | "phoneNumber" | "photoURL" | "introduction"


export default function SubmitGroup({title, reduxName} : {title : string, reduxName : reduxType}) {
    const dispatch = useAppDispatch();
    const infoReducer = useAppSelector((state)=> state.messengerUserInfoEdit)
    const currentInfoReducer = useAppSelector((state)=> state.messengerCurUserInfo)
    const userAuth = firebaseAuth.currentUser

    const inputValueChange = (propName : string, event : React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserInfo({infoName : propName, value : event.target.value }))
    }
    
    const checkYnChange =(event : React.ChangeEvent<HTMLInputElement>)=> {
        const checkedYn = event.target.checked;
        const inputName = event.target.name;
        const preValue = (name : string) => {
            switch (name) {
                case "email" : 
                    return userAuth.email;
                case "displayName" : 
                    return userAuth.displayName;
                case "introduction" :
                    return currentInfoReducer.introduction;
                default :
                    return null;
            }
        }
        // Enable to Input New Value
        if(checkedYn === true) {
            console.log("True")
            dispatch(setUserInfo({infoName : inputName, editYn : true }))
        // If check box values false, initialized input value
        } else {
            console.log("False")
            dispatch(setUserInfo({infoName : inputName, value : preValue(inputName) === null ? "" : preValue(inputName), editYn : false}))
        }
    }
    
    const validation = () => {

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
    const inputLayout = ()=> {
        const defaultCSS = "block w-full border-b border-solid border-gray-300 dark:border-slate-500 bg-gray-100 rounded-sm pl-2 py-1 dark:bg-slate-900 dark:text-slate-500"
        switch(inputEditYn(reduxName)) {
            case true : 
                return `${defaultCSS} text-gray-500 dark:text-slate-400`
            case false :
                return `${defaultCSS} text-black dark:text-slate-100` 
        }

    }

    return (
        <div className='my-2 mx-1'>
            <div className='flex border-0 items-center'>
                <h5 className='text-md mr-2'>
                    {title}
                </h5>
                <input name={reduxName} type="checkbox" onChange={checkYnChange} checked={checkHandler(reduxName)}/>
            </div>
            <input
                disabled={inputEditYn(reduxName)}
                className={inputLayout()}
                onChange={(e)=>inputValueChange(reduxName,e)}
                value={infoReducer[getStateIdx(reduxName)].value}/>
        </div>
    )
}