import React from 'react';

import { UserInfo } from '../../../../msg_typeDef';
import { DocumentMinusIcon, NoSymbolIcon, UserIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import UserExtraModal from '../usermanage/modal/UserExtraModal';

export default function UserInfoModal({info,openFrom, openYn} : {info : UserInfo, openFrom: string, openYn : Function}) {
    const [extraModal, setExtraModal] = React.useState(false)
    const [selectAction, setSelectAction] = React.useState("")

    const checkStatus = ()=> {
        switch(openFrom) {
            case "Default" : 
                return (
                    <div className='flex mx-4 justify-center items-end gap-2'>
                        {sendRequestIcon()}
                        {userBlockIcon()}
                    </div>
                )
            case "Request" : 
                return (
                    <div className='flex mx-4 justify-center items-end gap-2'>
                        {cancelRequestIcon()}
                    </div>
                )
        }
    }

    const setStatusIconByAction = ()=> {
        switch(openFrom) {
            case "Default" : 
                return (
                    <div className='w-fit rounded-full bg-gray-500 dark:bg-slate-600'>
                        <h4 className='px-2 text-xs text-white'>
                            No Relation
                        </h4>
                    </div>
                )
            case "Request" : 
                return (
                    <div className='w-fit rounded-full bg-gray-500 dark:bg-slate-600'>
                        <h4 className='px-2 text-xs text-white'>
                            Pending approval
                        </h4>
                    </div>
                )
        }
    }
    
    const showExtraModal = ()=> {
        const modalClose = (res: {open : boolean, target: string})=> {
            setExtraModal(res.open)
            res.target === "all" && openYn(res.open)
        }
        return <UserExtraModal openYn={modalClose} selectedUser={info.email} action={selectAction}/>
    }

    const sendRequestIcon = ()=> {
        const onClickRequest = async()=> {
            setSelectAction("sendRequest");
            setExtraModal(true)
        }
        return (
            <UserPlusIcon 
                className='w-7 h-7 bg-blue-300 rounded-full p-1 hover:cursor-pointer dark:bg-blue-600'
                onClick={onClickRequest}
            />
        )
    }

    const userBlockIcon = ()=> {
        const onClickBlock = ()=> {
            setSelectAction("userBlock");
            setExtraModal(true);
        }
        return (
            <NoSymbolIcon 
                className='w-7 h-7 bg-red-300 rounded-full p-1 hover:cursor-pointer dark:bg-red-600'
                onClick={onClickBlock}
            />
        )
    }

    const cancelRequestIcon = ()=> {
        const onClickCancel = ()=> {
            setSelectAction("cancelRequest")
            setExtraModal(true);
        }
        return (
            <DocumentMinusIcon
                className='w-7 h-7 bg-yellow-300 rounded-full p-1 hover:cursor-pointer dark:bg-yellow-600'
                onClick={onClickCancel} />
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
                <div className='flex w-full justify-center'>
                    {setStatusIconByAction()}
                </div>
                <div className='mx-4 my-2 rounded-md bg-gray-300 text-center dark:bg-gray-700'>
                    <h4 className='font-light text-xs'>
                        {info.introduction ??= 'No Infroduce Phrase'}
                    </h4>
                </div>
                {checkStatus()}
            </div>
            {extraModal && showExtraModal()}
        </div>
    )

}