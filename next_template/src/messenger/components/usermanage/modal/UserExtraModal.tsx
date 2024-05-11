import React from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '@/redux/hook';
import { setPopOverToggle, setSelectedTab } from '@/redux/features/messengerReducer';
import { blockUser,delAddFriendRequestInDoc,deleteFriend,getReuestAddFriendInDoc, setFriendRequestControl, setRequestAddFriendInDoc, unBlockUser } from '../../FirebaseController';
import { firebaseAuth } from '../../../../../firebaseConfig';
import { UserInfo } from '../../../../../msg_typeDef';

export default function UserExtraModal({openYn, selectedUser, action, extraInfo} : {openYn : Function, selectedUser : UserInfo, action: string, extraInfo? : any}) {
    const [headerText, setHeaderText] = React.useState("");
    const [bodyText, setBodyText] = React.useState<string[]>([]);
    const [extra, setExtra] = React.useState<any>()
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        setHeaderByAction()
        setBodyByAction()
        extraInfo && setExtra(extraInfo)
    },[])

    const onClickBtn = ()=> {
        switch(action) {
            case "userBlock" : 
                return userBlockAction()
            case "sendRequest" : 
                return sendRequestAction()
            case "cancelRequest" : 
                return cancelRequestAction()
            case "allowRequest" : 
                return responseRequestAction(true)
            case "rejectRequest" : 
                return responseRequestAction(false)
            case "unBlock" :    
                return unBlockAction()
            case "deleteFriend" :
                return deleteFriendAction()
            case "friendBlock" : 
                return friendBlock()
            default : break;
        }    
    }

    const setHeaderByAction = ()=> {
        switch(action) {
            case "friendBlock" : 
            case "userBlock" : 
                setHeaderText("Caution - Block")
                break;
            case "sendRequest" : 
                setHeaderText("Send Request")
                break;
            case "cancelRequest" : 
                setHeaderText("Cancel Request")
                break;
            case "allowRequest" : 
                setHeaderText("Allow Request")
                break;
            case "rejectRequest" :
                setHeaderText("Reject Request")
                break;
            case "unBlock" :
                setHeaderText("Unblock User")
                break;
            case "deleteFriend" :
                setHeaderText("Delete Friend")
                break;
            default : break;
        }
    }
    const setBodyByAction = ()=> {
        var textArray : string[]
            switch(action) {
                case "friendBlock" :
                case "userBlock": 
                    textArray = [
                        "You can block selected user.",
                        "if selected user has a friend Relationship, Automatically removed from friends list when blocked.",
                        "You would not be found in this user's Add Friends list until you unblock."
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
                case "allowRequest" : 
                    textArray = [
                        "Allow Request from other user.",
                        "Once you form a friendship, you can have a 1:1 conversation.",
                        "After accepting the request, you can check the selected user in your friend list."
                    ]
                    break;
                case "rejectRequest" : 
                    textArray = [
                        "Reject Request from other user.",
                        "Rejected requests are deleted and cannot be undone."
                    ]
                    break;
                case "unBlock":
                    textArray = [
                        "Unblocks the selected user.",
                        "Once the block is lifted, actions such as searching and friend requests become possible.",   
                    ]
                    break;
                case "deleteFriend" :
                    textArray = [
                        "You can remove this friend.",
                        "When you delete a friend, you are removed from that user's friends list ",
                        "The chat room is not available and will be availabie if you become friends again."
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
            case "friendBlock" : 
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
            case "allowRequest" : 
                return <button onClick={onClickBtn}
                        className='w-full border-2 border-solid border-green-500 justify-center rounded-full hover:bg-green-500 hover:text-white transition duration-200'>
                            Allow Request
                        </button>
            case "rejectRequest" : 
                return  <button onClick={onClickBtn}
                            className='w-full border-2 border-solid border-purple-500 justify-center rounded-full hover:bg-purple-500 hover:text-white transition duration-200'>
                            Reject Request
                        </button>
            case "unBlock" :
                return  <button onClick={onClickBtn}
                            className='w-full border-2 border-solid border-orange-500 justify-center rounded-full hover:bg-orange-500 hover:text-white transition duration-200'>
                            Unblock User
                        </button>
            case "deleteFriend" :
                return <button onClick={onClickBtn}
                            className='w-full border-2 border-solid border-red-500 justify-center rounded-full hover:bg-red-500 hover:text-white transition duration-200'>
                            Delete Friend
                </button>
            default : break;
        }
    }

    const userBlockAction = async()=> {
        await blockUser(selectedUser.email).then((res)=> {
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
        if(extraInfo) {
            extraInfo.rejected && await delAddFriendRequestInDoc(extraInfo.friendReq)
        }
        await setRequestAddFriendInDoc(selectedUser.email).then((res)=> {
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
        await getReuestAddFriendInDoc()
            .then((response)=> {
                 return response.result 
                    && response.value.find((reqDoc)=> 
                        reqDoc.from === firebaseAuth.currentUser.email && reqDoc.to === selectedUser.email)})
            .then(async(response2) => {
                const result = await delAddFriendRequestInDoc(response2)
                if(result) {
                    openYn({open : false, target: "all"}) 
                    dispatch(setPopOverToggle({showYn : true, messageString : "Delete Success", type : "success"}))
                } else {
                    dispatch(setPopOverToggle({showYn : true, messageString : "Delete Failed", type : "fail"})) 
                }
            })
    }
    const responseRequestAction =async(allowYn : boolean)=> {
        await getReuestAddFriendInDoc()
            .then((response)=> {
                return response.result
                    && response.value.find((reqDoc)=> 
                        reqDoc.to === firebaseAuth.currentUser.email && reqDoc.from === selectedUser.email
                    )
            })
            .then(async(response2)=> {
                const result = await setFriendRequestControl(response2,allowYn)
                if(result) {
                    openYn({open: false, target: "all"})
                    dispatch(setPopOverToggle({showYn : true, messageString : allowYn ? "Accept Success" : "Reject Success", type : "success"}))
                } else {
                    dispatch(setPopOverToggle({showYn : true, messageString : allowYn ? "Accept Failed" : "Reject Failed", type : "fail"}))
                }
            })
    }
    
    const unBlockAction = async() => {
        await unBlockUser(extraInfo).then((response)=>{
           if(response) {
            openYn({ open : false, target : "all"});
            dispatch(setPopOverToggle({ showYn : true, messageString : "Unblock Success", type :"success"}))
           } else {
            dispatch(setPopOverToggle({ showYn: true, messageString : "Unblock Failed", type : "fail"}))
           }
        })
    }

    const deleteFriendAction = async()=> {
        if(extra && (extra.sort === "friendUUID")) {
            const result = await deleteFriend(extra.info)
            if(result) {
                openYn({open: false, target: "all"});
                dispatch(setPopOverToggle({showYn : true, messageString : "Delete Success", type : "success"}))
            } else {
                dispatch(setPopOverToggle({ showYn: true, messageString : "Delete Failed", type: 'fail'}))
            }
        }
    }

    const friendBlock = async() => {
        if(extra && (extra.sort === "friendUUID")) {
            const friendResult = await deleteFriend(extra.info);
            const blockResult = await blockUser(selectedUser.email);
            if(friendResult && blockResult) {
                openYn({open : false, target: "all"});
                dispatch(setPopOverToggle({ showYn : true, messageString : "Block Success", type : "success"}));
            } else {
                dispatch(setPopOverToggle({ showYn: true, messageString : "Block Failed", type : "fail"}))
            }
        }
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
                { setButtonByActtion() }
            </div>
        </div>
    )

}