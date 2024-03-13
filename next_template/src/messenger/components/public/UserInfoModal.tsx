import React from 'react';

import { UserInfo } from '../../../../msg_typeDef';
import { NoSymbolIcon, UserIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { setRequestAddFriendInDoc } from '../FirebaseController';
import UserBlockModal from '../usermanage/modal/UserBlockModal';

export default function UserInfoModal({info,status,openYn} : {info : UserInfo, status: "Default"|"Request"|"Friend"|"Block", openYn : Function}) {
    const [extraModal, setExtraModal] = React.useState(false)
    const [modalName, setModalName] = React.useState("")
    
    React.useEffect(()=>{
     
    },[])

    const checkStatus = ()=> {
        switch(status) {
            case "Default" : 
                return (
                    <div className='flex mx-4 justify-center items-end gap-2'>
                        {sendRequestIcon()}
                        {userBlockIcon()}
                    </div>
                )
        }
    }
    
    const showModalSwitch = ()=> {
        const modalClose = (showYn : boolean)=> {
            setExtraModal(showYn);
            openYn(showYn);
        }

        switch(modalName) {
            case "UserBlockModal" : 
                return <UserBlockModal openYn={modalClose} selectedUser={info.email} />
            default : break;
        }
    }

    const sendRequestIcon = ()=> {
        const onClick = async()=> {
            await setRequestAddFriendInDoc(info.email).then((response)=> {
                console.log(response)
            })
        }
        return (
            <UserPlusIcon 
                className='w-7 h-7 bg-blue-300 rounded-full p-1 hover:cursor-pointer'
                onClick={onClick}
            />
        )
    }

    const userBlockIcon = ()=> {
        const _onClickBlock = ()=> {
            setModalName("UserBlockModal");
            setExtraModal(true);
        }
        return (
            <NoSymbolIcon 
                className='w-7 h-7 bg-red-300 rounded-full p-1 hover:cursor-pointer'
                onClick={_onClickBlock}
            />
        )
    }

    const openChatRoom =()=> {
        
    }
    

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-slate-800 rounded-md p-3 w-80'>
                <div className='flex justify-between'>
                    <h4 className='text-xl font-bold'>
                        Information
                    </h4>
                    <XMarkIcon 
                        className='w-5 h-5 text-red-500 hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-full transition duration-200' 
                        onClick={()=>openYn(false)}/>
                </div>
                <div className='flex justify-center my-14'>
                    {
                        info.photoURL 
                        ?  <img src={info.photoURL} className='w-32 h-32 rounded-full '/>
                        :  <UserIcon className='w-32 h-32 border-2 border-solid rounded-full border-slate-500 text-slate-500'/>
                    }
                </div>
                <div className='text-center'>
                    <h4 className='text-2xl font-semibold'>
                        {info.displayName ??= 'No Name'}
                    </h4>
                    <h4 className='font-thin'> 
                        {info.email}
                    </h4>
                </div>
                <div className='mx-4 my-2 rounded-md bg-gray-300 text-center'>
                    <h4 className='font-light text-xs'>
                        {info.introduction ??= 'No Infroduce Phrase'}
                    </h4>
                </div>
                {checkStatus()}
            </div>
            {extraModal && showModalSwitch()}
        </div>
    )

}