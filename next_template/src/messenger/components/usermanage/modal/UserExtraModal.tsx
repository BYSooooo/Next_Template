import React from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '@/redux/hook';
import { setPopOverToggle, setSelectedTab } from '@/redux/features/messengerReducer';
import { blockUser, cancelSendRequest, setRequestAddFriendInDoc } from '../../FirebaseController';

export default function UserExtraModal({openYn, selectedUser, action} : {openYn : Function, selectedUser : string, action: string}) {
    const [headerText, setHeaderText] = React.useState("");
    const [bodyText, setBodyText] = React.useState<string[]>([]);

    React.useEffect(()=> {
        setHeaderByAction()
        setBodyByAction()
    },[])

    const dispatch = useAppDispatch();

    const onClickBtn = ()=> {
        switch(action) {
            case "userBlock" : 
                return userBlockAction()
            case "sendRequest" : 
                return sendRequestAction()
            case "cancelRequest" : 
                return cancelRequestAction()
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
            case "cancelRequest" : 
                setHeaderText("Cancel Request")
                break;
            default : break;
        }
    }
    const setBodyByAction = ()=> {
        var textArray : string[]
            switch(action) {
                case "userBlock" : 
                    textArray = [
                        "You can block selected friends.",
                        "Automatically removed from friends list when blocked.",
                        "You won&apos;t be found in this user&apos;s Add Friends list until you unblock."
                    ];  
                    break;
                case "sendRequest" : 
                    textArray = [
                        "You can send a request to add user as a friend.",
                        "If the user approves the request, will be added to friend list",
                        "Requests awaiting approval can be canceled."
                    ];
                    break;
                case "cancelRequest" : 
                    textArray = [
                        "You can cancel a request you send other user"
                    ]
                    break;
                default : 
                    textArray = ["Invalid Access"]
                    break;
        }
        setBodyText(textArray)
    }
    const setButtonByActtion = ()=> {
        switch (action) {
            case "userBlock" : 
                return  <button onClick={onClickBtn}
                            className='w-full border-2 border-solid border-purple-500 justify-center rounded-full hover:bg-purple-500 hover:text-white transition duration-200'>
                            Block
                        </button>
            case "sendRequest" : 
                return <button onClick={onClickBtn}
                        className='w-full border-2 border-solid border-blue-500 justify-center rounded-full hover:bg-blue-500 hover:text-white transition duration-200'>
                            Send Request
                        </button>
            case "cancelRequest" :
                return <button onClick={onClickBtn}
                        className='w-full border-2 border-solid border-yellow-500 justify-center rounded-full hover:bg-yellow-500 hover:text-white transition duration-200'>
                            Cancel Request
                        </button>
            default : break;
        }
    }

    const userBlockAction = async()=> {
        await blockUser(selectedUser).then((res)=> {
            if(res) {
                openYn({open : false, target : "all"})
                dispatch(setPopOverToggle({showYn : true, messageString : "Block Complete", type : "success"}))
                dispatch(setSelectedTab(4))
            } else {
                dispatch(setPopOverToggle({showYn : true, messageString : "Block Failed", type : "fail"}))   
            }
        })
    }

    const sendRequestAction = async()=> {
        await setRequestAddFriendInDoc(selectedUser).then((res)=> {
            if(res.result) {
                dispatch(setSelectedTab(2))
                dispatch(setPopOverToggle({showYn: true, messageString : "Send Request", type : "success"}))
                openYn({open : false, target : "all"})
            } else {
                dispatch(setPopOverToggle({showYn : true, messageString : "Request Fail", type : "fail"}))
            }
        })
    }
    const cancelRequestAction =async()=> {
        await cancelSendRequest(selectedUser).then((result)=> {
            if(result === true ) {
                openYn({open : false, target: "all"})
                dispatch(setPopOverToggle({showYn : true, messageString : "Delete Success", type : "success"}))
            } else {
                dispatch(setPopOverToggle({showYn : true, messageString : "Delete Failed", type : "fail"}))
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
                    <button onClick={()=>openYn({open : false, target: 'extraOnly'})}>
                        <XMarkIcon className='w-6 h-6 text-red-500 hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-full transition duration-200' />
                    </button>
                </div>
                <ul className='my-1 list-disc px-2 text-xs'>
                    { 
                        bodyText.map((text,i)=> {
                            return <li key={`text_${i}`}>{text}</li>
                        })
                    }
                </ul>
                { setButtonByActtion()}
            </div>
        </div>
    )

}