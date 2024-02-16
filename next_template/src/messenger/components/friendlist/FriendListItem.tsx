import React from 'react';
import { deleteFriend, getChatInfoInFriendList, getInfoInFriendListCol, getUserInfo } from '../FirebaseController';
import { UserInfo } from '../../../../msg_typeDef';
import { ChatBubbleLeftRightIcon, NoSymbolIcon, UserIcon, UserMinusIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '@/redux/hook';
import { setChatListUUID, setPageRendering } from '@/redux/features/messengerReducer';
import { FriendInterceptModal } from './modal/FriendInterceptModal';
import { FriendDeleteModal } from './modal/FriendDeleteModal';
import { firebaseAuth } from '../../../../firebaseConfig';

export function FriendListItem({uuid, openYn, selected} : {uuid : string, openYn : boolean, selected : Function}) {
    const [selectUser, setSelectUser] = React.useState<UserInfo>()
    const [showDeleteModal, setShowDeleteModal] = React.useState(false)
    const [showInterCeptModal, setShowInterCeptModal] = React.useState(false)
    
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        getSelectedFriendInfo()
    },[])
    
    const getSelectedFriendInfo = async() => {
        const {result, value} = await getInfoInFriendListCol(uuid)
        if(result) await getUserInfo(value).then((result)=> {
            {result.result === true && setSelectUser(result.value)}
        })
    }
    const clickHandler = () => {
        selected(uuid)
    }

    const controlRendering = ()=> {
        let cssString = "flex w-60 my-2 rounded-md transition ease-in duration-300"
        switch(openYn) {
            case true :
                cssString += " py-5 bg-gray-200 dark:bg-gray-800 h-72 justify-center"
                break;
            case false : 
                cssString += " p-2 bg-none border-2 border-slate-500 hover:cursor-pointer";
                break;
            default : break;
        }
        return cssString
    }
    
    const checkChatRoom = async() => {
        const { chatUUID } = await getChatInfoInFriendList(uuid)
        dispatch(setChatListUUID(chatUUID));
        dispatch(setPageRendering({middle : "ChatRoom"}))
    }   

    const onClickDelete = async()=> {
        const result = await deleteFriend(uuid,firebaseAuth.currentUser.uid);
        console.log(result)
    }

    return (
        <li onClick={clickHandler}
            className={controlRendering()}>
            <div>
                {openYn 
                ?   <div className='flex flex-col items-center'>
                        {selectUser?.photoURL 
                        ?   <img className='w-24 h-24 rounded-full border-none shadow-none' src={selectUser.photoURL} /> 
                        :   <UserIcon className='w-24 h-24 border-2 rounded-full border-solid border-slate-500 text-slate-500 dark:border-white  dark:text-white'/>  
                        }
                        {selectUser?.displayName 
                        ?   <h4 className='font-bold text-lg mt-2'>
                                {selectUser.displayName}        
                            </h4>
                        :   <h4 className='text-lg text-gray-700 italic'>
                                No Name
                            </h4>
                        }
                        <h4 className='font-thin text-sm'>
                            {selectUser?.email}
                        </h4>
                        <h4 className='font-extrabold text-sm my-5'>
                            {selectUser?.introduction}
                        </h4>
                        <div className='flex flex-row gap-1 '>
                            <ChatBubbleLeftRightIcon className='w-7 h-7 fill-green-600 hover:cursor-pointer' onClick={checkChatRoom} />
                            <UserMinusIcon className='w-7 h-7 fill-red-800 hover:cursor-pointer' onClick={()=>setShowDeleteModal(true)} />
                            <NoSymbolIcon className='w-7 h-7 fill-purple-800 hover:cursor-pointer' onClick={()=>setShowInterCeptModal(true)}/>
                        </div>    
                    </div>
                :   <div className='flex flex-row items-center gap-3 px-2'>
                        {selectUser?.photoURL 
                        ?   <img className='w-12 h-12 rounded-full border-none shadow-none' src={selectUser.photoURL} /> 
                        :   <UserIcon className='w-12 h-12 border-2 rounded-full border-solid border-slate-500 text-slate-500 dark:border-white  dark:text-white'/>  
                        }
                        <h4 className='font-bold text-sm overflow-hidden text-ellipsis'>
                            {selectUser?.displayName ? selectUser.displayName : "No Name"}
                        </h4>
                    </div> 
                }
            </div>
            {showDeleteModal && <FriendDeleteModal closeFn={setShowDeleteModal} deleteFn={onClickDelete}/>}
            {showInterCeptModal && <FriendInterceptModal closeFn={setShowInterCeptModal}/>}
        </li>
    )
}