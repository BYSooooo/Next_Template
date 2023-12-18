import React, { HTMLAttributes } from 'react'

import { delAddFriendRequestInDoc, getReuestAddFriendInDoc, setRequestAddFriendInDoc } from '../../FirebaseController'
import { UserIcon } from '@heroicons/react/20/solid';
import { firebaseAuth } from '../../../../../firebaseConfig';
import { RequestFriend, UserInfo } from '../../../../../msg_typeDef';

export function ReqListElement({userInfo} : {userInfo : UserInfo}) {
    const [selected, setSelected] = React.useState(false)
    const [reqStatus, setReqStatus] = React.useState<"request"|"refusal"|"success"|"none">("none")
    const [friendReq, setFriendReq] = React.useState<RequestFriend | null>(null)

    React.useEffect(()=> {
        getStatusRequestDoc();
    },[])
    
    const onClickAddButton = ()=> {
        {reqStatus === "none" && setRequestAddFriendInDoc(userInfo.email)};
        {reqStatus === "refusal" && 
            delAddFriendRequestInDoc(friendReq).then(()=> {
                setRequestAddFriendInDoc(userInfo.email)
            })
        }
        getStatusRequestDoc() 
    }

    const getStatusRequestDoc = () => {
        getReuestAddFriendInDoc().then((result)=> {
            if(result.result) {
                const filteringReq = result.value.filter((item : RequestFriend)=> 
                    item.from === firebaseAuth.currentUser.email || item.to === firebaseAuth.currentUser.email
                )
                const reqIndex = filteringReq.findIndex((request)=> request.to === userInfo.email || request.from === userInfo.email);
                
                {reqIndex !== -1 && setReqStatus(filteringReq[reqIndex].status)}
                
                if(reqIndex !== -1) {
                    setFriendReq(filteringReq[reqIndex])
                }
            }
        })
    }
    
    const renderElement = () => {
        let outlineCss = ""
        switch(reqStatus) {
            case "request" :
                outlineCss = 'border-none hover:border-orange-500 hover:bg-orange-500 hover:border-solid'
                break;
            case "refusal" : 
                outlineCss = "border-none hover:border-red-500 hover:bg-red-500 hover:border-solid"
                break;
            case "success" : 
                outlineCss = "border-none hover:border-green-500 hover:bg-green-500 hover:border-solid"
                break;
            default : 
                outlineCss = "border-none hover:border-blue-500 hover:bg-blue-500 hover:border-solid"
                break;
        }
        
        const outline : HTMLAttributes<HTMLLIElement> = {
            className : "flex p-2 m-1 rounded-md border-2 border-slate-500 hover:text-white hover:cursor-pointer transition duration-200 hover:h-32"+outlineCss
        } 
    
        return outline.className
        
    }
    const buttonContext = ()=> {
        let buttonCss = "";
        switch(reqStatus) {
            case "request" : 
                buttonCss = "bg-none bg-orange-400 hover:bg-orange-300"
                break;
            case "refusal" : 
                buttonCss = "bg-none bg-red-600 hover:bg-red-700"
                break;
            case "success" : 
                buttonCss = "bg-none bg-green-600 hover:-green-700"
                break;
            default : 
                buttonCss = "bg-none bg-blue-400 hover:bg-blue-600"
                break;
        } 
        
        const button : HTMLAttributes<HTMLButtonElement> = {
            className : 'flex w-full px-2 py-1 rounded-full text-white transition duration-200 justify-center items-center'+buttonCss
        }
        return button.className 
    }
    
    const controlBtnText = () => {
        switch(reqStatus) {
            case "request" : 
                return "Waiting for approval"
            case "refusal" : 
                return "Resend a request"
            case "success" : 
                return "Already approved"
            default :
                return "Send Request"
        }
        
    }

    return (
        <li onMouseOver={()=>setSelected(true)}
            onMouseOut={()=>setSelected(false)}
            className={renderElement()}>
                {
                    selected 
                    ?   <div>
                            <div className='flex items-center gap-3'>
                                {userInfo.photoURL
                                ?   <img className='w-12 h-12 rounded-full border-none shadow-none' src={userInfo.photoURL} /> 
                                :   <UserIcon className='w-12 h-12 border-2 rounded-full border-white border-solid text-white'/>}
                                <ul>
                                    <li className='font-bold text-lg'>
                                        {userInfo.email}
                                    </li>
                                    <li className='font-bold text-sm'>
                                        {userInfo.displayName}
                                    </li>
                                </ul>
                            </div>
                            <div className='flex justify-end items-end mt-6'>
                            <button
                                disabled={reqStatus === "success" || reqStatus === "request" ? true : false}
                                onClick={onClickAddButton} 
                                className={buttonContext()}>
                                    {controlBtnText()}
                            </button>
                            </div>                            
                        </div>
                    :   <div className='flex items-center gap-2'>
                            {userInfo.photoURL
                                ?   <img className='w-8 h-8 rounded-full border-none shadow-none' src={userInfo.photoURL} />
                                :   <UserIcon className='w-8 h-8 border-2 rounded-full border-slate-500 border-solid text-slate-500'/>
                                
                            }
                            <h4 className='font-bold'>
                                {userInfo.email}
                            </h4>
                        </div>
                }
        </li>
    )
    
}
