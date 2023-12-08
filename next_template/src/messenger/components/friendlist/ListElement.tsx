import React, { HTMLAttributes } from 'react'


import { getReuestAddFriendInDoc, getUserInfo, getUserInfoInStrg, setRequestAddFriendInDoc } from '../FirebaseController'
import { UserIcon } from '@heroicons/react/20/solid';
import { firebaseAuth } from '../../../../firebaseConfig';

import PopOver from '../public/PopOver';

export function ListElement({mailAddress} : {mailAddress : string}) {
    const [photoURL, setPhotoURL] = React.useState("");
    const [selected, setSelected] = React.useState(false)
    const [infoInDoc, setInfoInDoc] = React.useState<userInfo>(null)
    const [reqList, setReqList] = React.useState<requestFriend[]>([])

    React.useEffect(()=> {
        getPhotoURL();
        getSelectedUserInfo();
        getStatusRequestDoc();
    },[])
    
    const getPhotoURL = async()=> {
        const {result, value} = await getUserInfoInStrg(mailAddress)
        setPhotoURL(value)
    }

    const onClickAddButton = ()=> {
        setRequestAddFriendInDoc(infoInDoc.email).then((result)=> {
            if(result.result) {
                alert("Success")
            }
        })
    }

    const getSelectedUserInfo = () => {
        getUserInfo(mailAddress).then((result: userInfo)=> {
            setInfoInDoc(result)
        })
    }

    const getStatusRequestDoc = () => {
        getReuestAddFriendInDoc().then((result)=> {
            if(result.result) {
               const filteringReq = result.value.filter((item)=> 
                    item.from === firebaseAuth.currentUser.email         
                )
                setReqList(filteringReq)

            }
        })
    }
    
    const renderElement = () => {
        const reqIndex = reqList.findIndex((request)=> request.to === mailAddress);
        const status = reqIndex !== -1 && reqList[reqIndex].status

        let outlineCss = ""
        switch(status) {
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
        const reqIndex = reqList.findIndex((request)=> request.to === mailAddress);
        const status = reqIndex !== -1 && reqList[reqIndex].status
        let buttonCss = "";
        switch(status) {
            case "request" : 
                buttonCss = "bg-none bg-orange-400"
                break;
            case "refusal" : 
                buttonCss = "bg-none bg-red-600"
                break;
            case "success" : 
                buttonCss = "bg-none bg-green-600"
                break;
            default : 
                buttonCss = "bg-none bg-blue-400"
                break;
        } 
        
        const button : HTMLAttributes<HTMLButtonElement> = {
            className : 'flex w-full px-2 py-1 rounded-full text-white transition duration-200 justify-center items-center'+buttonCss
        }
        return button.className 
    }



    return (
        <li 
            onMouseOver={()=>setSelected(true)}
            onMouseOut={()=>setSelected(false)}
            className={renderElement()}>
                {
                    selected 
                    ?   <div>
                            <div className='flex items-center gap-3'>
                                {photoURL.length > 0 
                                ?   <img className='w-12 h-12 rounded-full border-none shadow-none' src={photoURL} /> 
                                :   <UserIcon className='w-12 h-12 border-2 rounded-full border-white border-solid text-white'/>}
                                <ul>
                                    <li className='font-bold text-lg'>
                                        {mailAddress}
                                    </li>
                                    <li className='font-bold text-sm'>
                                        {infoInDoc.displayName}
                                    </li>
                                </ul>
                            </div>
                            <div className='flex justify-end items-end mt-6'>
                            <button
                                onClick={onClickAddButton} 
                                className={buttonContext()}>
                                    Send Request
                            </button>
                            </div>                            
                        </div>
                    :   <div className='flex items-center gap-2'>
                            {photoURL
                                ?   <img className='w-8 h-8 rounded-full border-none shadow-none' src={photoURL} />
                                :   <UserIcon className='w-8 h-8 border-2 rounded-full border-slate-500 border-solid text-slate-500'/>
                                
                            }
                            <h4 className='font-bold'>
                                {mailAddress}
                            </h4>
                        </div>
                }
        </li>
    )
    
}


{/* <Popover>
            <Popover.Button
                className='flex p-2 m-1 w-80 items-center gap-2 rounded-md border-slate-500 border-2 hover:bg-slate-500 hover:text-white hover:cursor-pointer'>  
                {photoURL.length > 0
                    ?   <img className='w-8 h-8 rounded-full border-none shadow-none' src={photoURL} />
                    :   <Spinner lightMode='black' darkMode='white' />

                }
                <h4 className='font-bold'>
                    {mailAddress}
                </h4>
            </Popover.Button>
            <Popover.Panel className='bg-slate-600 rounded-md ml-1 p-2 text-white w-80'>
                Panel Content
            </Popover.Panel>
        </Popover> */}
