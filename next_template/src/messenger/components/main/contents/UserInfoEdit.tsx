import React from 'react';
import { firebaseAuth } from '@/../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUserInfo, setPageRouter } from '@/redux/features/messengerReducer';

export default function UserInfoEdit() {
    const userAuth = firebaseAuth.currentUser
    const infoReducer = useAppSelector((state)=> state.messengerUserInfoEdit);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        setInitInfo()
    },[])

    console.log(userAuth)

    const setInitInfo = () => {
        {userAuth.email && dispatch(setUserInfo({infoName : "Email", value : userAuth.email, editYn : false}))};
        {userAuth.displayName && dispatch(setUserInfo({infoName : "DisplayName", value : userAuth.displayName, editYn : false}))}
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
            dispatch(setUserInfo({infoName : inputName, value : "", editYn : false}))
        }
    }

    const getStateIdx = (propName : string)=> {
        const idx = infoReducer.findIndex((e)=> e.infoName === propName)
        return idx
    }

    const inputValueChange = (propName : string, event : React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserInfo({infoName : propName, value : event.target.value }))
    }

    const inputEditYn = (propName : string) => {
        return (
            !infoReducer[getStateIdx(propName)].editYn
        )
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
                    <input name="DisplayName" type="checkbox" onChange={checkYnChange} />
                </div>
                <input
                    disabled={inputEditYn("DisplayName")}
                    className='border-2 border-solid border-gray-500 rounded-md p-1 w-2/3'
                    onChange={(e)=>inputValueChange("DisplayName",e)}
                    value={infoReducer[getStateIdx("DisplayName")].value}/>
            </div>
            <div>
                <button
                    onClick={()=>dispatch(setPageRouter({page : "Default", title : "Home"}))}>
                    return default  
                </button>
            </div>    
            <div>
                <button className='rounded-md border-2 border-blue-400 '>
                    Confirm
                </button>
            </div>
        </div>

    )
}