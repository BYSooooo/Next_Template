import { InformationCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { freezeChatRoom } from '../FirebaseController'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setPageRendering } from '@/redux/features/messengerReducer'

export function ChatRoomFreezeNotice({chatUUID,viewYn} : {chatUUID : string, viewYn : Function}) {
    const [viewModal, setViewModal] = React.useState(false)
    const currentUserInfo = useAppSelector((state)=> state.messengerCurUserInfo);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        viewYn(false)
        setViewModal(false)
    },[])

    const onClickNotice =()=> {
        viewYn(!viewModal)
        setViewModal(!viewModal)
    }

    return (
        <div className='h-30 p-2 bg-slate-200 rounded-lg'>
            <div className='flex justify-between'>
                <h4 className='text-sm font-bold'>
                    This Chat Room is Frozen
                </h4>
                <InformationCircleIcon className='w-5 h-5 text-current hover:cursor-pointer' onClick={onClickNotice}/>
            </div>
            {viewModal && 
            <div>
                <div className='flex my-2'>
                    <ul className='pl-3 list-disc list-outside text-xs'>
                        <li>
                            In a frozen room, you can&apos;t make any modifications.
                        </li>
                        <li>
                            If the person allows deletion, the room will be deleted.
                        </li>
                        <li>
                            If you want to resume the conversation, you must unfreeze it or reopen it after the other person&apos;s approval of deletion.
                        </li>
                    </ul>
                </div> 
                <button 
                    onClick={()=>dispatch(setPageRendering({middle : "ChatRoomOption"}))}
                    className='w-full border-2 border-solid border-blue-500 justify-center rounded-full hover:bg-blue-500 hover:text-white transition duration-200'>
                    Option
                </button>
            </div>
            }
        </div>
    )
}