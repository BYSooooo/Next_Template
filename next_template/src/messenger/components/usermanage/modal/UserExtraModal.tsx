import React from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '@/redux/hook';
import { setPopOverToggle, setSelectedTab } from '@/redux/features/messengerReducer';
import { blockUser, setRequestAddFriendInDoc } from '../../FirebaseController';

export default function UserExtraModal({openYn, selectedUser, action} : {openYn : Function, selectedUser : string, action: string}) {
    const [headerText, setHeaderText] = React.useState("")

    React.useEffect(()=> {
        setHeaderByAction()
    },[])

    const dispatch = useAppDispatch();

    const onClickBtn = ()=> {
        switch(action) {
            case "userBlock" : 
                return userBlockAction()
            case "sendRequest" : 
                return sendRequestAction()
            default : break;
        }    
    }

    const setHeaderByAction = ()=> {
        switch(action) {
            case "userBlock" : 
                setHeaderText("Caution - Block")
                break;
            case "sendRequest" : 
                setHeaderText("Send Request")
                break;
            default : break;
        }
    }

    const userBlockAction = async()=> {
        await blockUser(selectedUser).then((res)=> {
            if(res) {
                openYn(false)
                dispatch(setPopOverToggle({showYn : true, messageString : "Block Complete", type : "success"}))
                dispatch(setSelectedTab(4))
            } else {
                dispatch(setPopOverToggle({showYn : true, messageString : "Block Failed", type : "fail"}))   
            }
        })
    }

    const sendRequestAction = async()=> {
        await setRequestAddFriendInDoc(selectedUser).then((res)=> {
            if(res) {
                openYn(false)
                dispatch(setPopOverToggle({showYn: true, messageString : "Send Request", type : "success"}))
                dispatch(setSelectedTab(2))
            } else {
                dispatch(setPopOverToggle({showYn : true, messageString : "Request Fail", type : "fail"}))
            }
        })
    }

    


    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-black rounded-md p-3 w-80'>
                <div className='flex mb-2 border-b-slate-500 justify-between' >
                    <h4 className="font-bold">
                        {headerText}
                    </h4>
                    <button onClick={()=>openYn(false)}>
                        <XMarkIcon className='w-6 h-6 text-red-500'/>
                    </button>
                </div>
                <ul className='my-1 list-disc px-2'>
                    <li className='text-xs'>
                        You can block selected friends.
                    </li>
                    <li className='text-xs'>
                        Automatically removed from friends list when blocked.
                    </li>
                    <li className='text-xs'>
                        You won&apos;t be found in this user&apos;s Add Friends list until you unblock.
                    </li>
                </ul>
                <button
                    onClick={onClickBtn}
                    className='w-full border-2 border-solid border-purple-500 justify-center rounded-full hover:bg-purple-500 hover:text-white transition duration-200'>
                    Block
                </button>
            </div>
        </div>
    )

}