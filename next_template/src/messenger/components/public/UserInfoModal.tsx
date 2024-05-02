import React from 'react';

import { UserInfo } from '../../../../msg_typeDef';
import { CheckIcon, DocumentMinusIcon, ExclamationTriangleIcon, LockOpenIcon, NoSymbolIcon, UserIcon, UserMinusIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import UserExtraModal from '../usermanage/modal/UserExtraModal';
import { useAppSelector } from '@/redux/hook';

export default function UserInfoModal({info, openFrom, openYn} : {info : UserInfo, openFrom: string, openYn : Function}) {
    const requestList = useAppSelector((state)=> state.messengerFriendReq);
    const currentInfo = useAppSelector((state)=> state.messengerCurUserInfo);

    const [extraModal, setExtraModal] = React.useState(false)
    const [selectAction, setSelectAction] = React.useState("")
    const [isReject, setIsReject] = React.useState({rejected : false, friendReq : null})

    React.useEffect(()=> {
        requestCheck()
    },[])

    const requestCheck = () => {
        const currentEmail = currentInfo.email;
        const rejectList = requestList.filter((request)=> request.status === 'refusal')
        const search = rejectList.find((item)=> 
            ((item.from === currentEmail) && (item.to === info.email)) ||
            ((item.to === currentEmail) && (item.from === info.email))
        )
        search && setIsReject({rejected : true, friendReq : search})
        
    }

    const checkStatus = ()=> {
        switch(openFrom) {
            case "Default" : 
                return (
                    <div className='flex mx-4 justify-center items-center gap-2'>
                        {sendRequestIcon()}
                        {userBlockIcon()}
                    </div>
                )
            case "Request" : 
                return (
                    <div className='flex mx-4 justify-center items-center gap-2'>
                        {cancelRequestIcon()}
                    </div>
                )
            case "Response" :
                return (
                    <div className='flex mx-4 justify-center items-center gap-2'>
                        {allowRequestIcon()}
                        {rejectRequestIcon()}
                    </div>
                )
            case "Block" :
                return (
                    <div className='flex mx-4 justify-center items-center gap-2'>
                        {unBlockIcon()}
                    </div>
                )
            case "Friend" : 
                return (
                    <div className='flex mx-4 justify-center items-center gap-2'>
                        {FriendDeleteIcon()}
                    </div>

                )
        }
    }

    const setStatusIconByAction = ()=> {
        switch(openFrom) {
            case "Default" :
                switch(isReject.rejected) {
                    case true :
                        const msg = isReject.friendReq.to === currentInfo.email ? "You have denied Request" : "Request has Denied by this user" 
                        return (
                            <div className='flex px-2 w-fit rounded-full bg-orange-500 dark:bg-orange-700 text-white'>
                                <ExclamationTriangleIcon className='w-3 h-3 self-center' />
                                <h4 className='px-2 text-xs text-white'>
                                    {msg}
                                </h4>
                            </div>
                        )
                    case false :
                        return (
                            <div className='w-fit rounded-full bg-gray-500 dark:bg-slate-600'>
                                <h4 className='px-2 text-xs text-white'>
                                    No Relation
                                </h4>
                            </div>
                        )

                }
            case "Request" : 
                return (
                    <div className='w-fit rounded-full bg-yellow-500 dark:bg-yellow-700'>
                        <h4 className='px-2 text-xs text-white'>
                            Pending approval 
                        </h4>
                    </div>
                )
            case "Response" : 
                return (
                    <div className='w-fit rounded-full bg-yellow-500 dark:bg-yellow-700'>
                        <h4 className='px-2 text-xs text-white'>
                            Waiting your approval
                        </h4>
                    </div>
                )
            case "Block" :
                return (
                    <div className='w-fit rounded-full bg-red-500 dark:bg-red-700'>
                        <h4 className='px-2 text-xs text-white'>
                            Block User
                        </h4>
                    </div>
                )
            case "Friend" : 
                return (
                    <div className='w-fit rounded-full bg-green-500 dark:bg-green-700'>
                        <h4 className='px-2 text-xs text-white'>
                            Friend Relation
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
        return <UserExtraModal openYn={modalClose} selectedUser={info.email} action={selectAction} extraInfo={isReject}/>
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

    const allowRequestIcon = ()=> {
        const onClickAllow = ()=> {
            setSelectAction("allowRequest")
            setExtraModal(true);
        }
        return (
            <CheckIcon 
                className='w-5 h-5 text-white rounded-full p-1 hover:cursor-pointer bg-green-500 dark:text-slate-600 dark:bg-green-600'
                onClick={onClickAllow} />
        )
    }

    const rejectRequestIcon = ()=> {
        const onClickReject = ()=> {
            setSelectAction("rejectRequest")
            setExtraModal(true);
        }
        return (
            <XMarkIcon
                className='w-5 h-5 text-white rounded-full p-1 hover:cursor-pointer bg-red-500 dark:text-slate-600 dark:bg-red-600'
                onClick={onClickReject} />
        )
    }
    const unBlockIcon = ()=> {
        const onClickUnBlock = ()=> {
            setSelectAction("unBlock")
            setExtraModal(true);
        }
        return (
            <LockOpenIcon
                className='w-5 h-5 rounded-full p-1 hover:cursor-pointer text-white bg-green-500 dark:text-slate-600 dark:bg-green-600'
                onClick={onClickUnBlock} />
        )
    }
    const FriendDeleteIcon =()=> {
        const onClickFriendDel = ()=> {
            setSelectAction("deleteFriend")
            setExtraModal(true);
        }
        return (
            <UserMinusIcon 
                className='w-5 h-5 rounded-full p-1 hover:cursor-pointer text-white bg-red-500 dark:text-slate-600 dark:bg-red-600'
                onClick={onClickFriendDel}
            />
        )
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