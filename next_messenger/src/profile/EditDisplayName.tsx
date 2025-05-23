'use client'

import React from 'react';
import { updateUserInfo } from '../controller/FirebaseController';
import { controlMessageToast } from '../redux/features';
import { useAppDispatch } from '../redux/hooks';

export default function EditDisplayName({name} : { name : string}) {
    const [nameText, setNameText] = React.useState("")
    const dispatch = useAppDispatch()
    React.useEffect(()=> {
        setNameText(name)
    },[])       

    const submitChangeHandler = async()=> {
        const {result, content} = await updateUserInfo([{key : 'displayName', value : nameText}])
        if(result) {
            dispatch(controlMessageToast({openYn: true, type: 'confirm', title : "Success", content : "Display Name Changed"}))
        } else {
            dispatch(controlMessageToast({ openYn : true, type : 'error', title : "Error Occured", content: content}))
        }
        
    }

    return (
        <div className="default-box-inner">
            <div className="flex flex-col text-start ">
                <p className="text-2xl font-bold">
                    Display Name
                </p>
                <ul className="text-sm list-inside list-disc">
                    <li> Set a Name for using on the site. </li>
                    <li> This entry cannot be blank. </li>
                </ul>
            </div>
            <div className="flex h-full items-center justify-center">
                <input
                    value={nameText}
                    onChange={(e)=>setNameText(e.target.value)} 
                    className="default-input">
                </input>
            </div>
            <div className="flex flex-row-reverse gap-2">
                <button 
                    onClick={submitChangeHandler}
                    className="confirm-button py-1 px-2">
                    Submit
                </button>
            </div>
        </div>
    )
}