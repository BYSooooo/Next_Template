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
        <div className='h-30 p-2 bg-slate-200 dark:bg-slate-500 rounded-lg'>
            <div className='flex justify-between'>
                <h1 className='text-sm font-bold'>
                    This Chat Room is Frozen
                </h1>
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
                <div className='text-end'>
                    <button 
                        onClick={()=>dispatch(setPageRendering({middle : "ChatRoomOption"}))}
                        className='btn-primary bg-yellow-500 hover:bg-yellow-300 dark:bg-yellow-700 dark:hover:bg-yellow-500'>
                        <h1 className='text-sm'>
                            Option
                        </h1>
                    </button>

                </div>     
            </div>
            }
        </div>
    )
}