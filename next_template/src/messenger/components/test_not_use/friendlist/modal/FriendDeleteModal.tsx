import { XMarkIcon } from "@heroicons/react/20/solid";

export function FriendDeleteModal({closeFn,deleteFn } : {closeFn: Function, deleteFn: Function}) {

    const onClickDelete = ()=> {
        closeFn(false)
        deleteFn()
    }

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-black rounded-md p-3 w-80'>
                <div className='flex mb-2 border-b-slate-500 justify-between' >
                    <h4 className="font-bold">
                        Caution - Delete
                    </h4>
                    <button onClick={()=>closeFn(false)}>
                        <XMarkIcon className='w-6 h-6 text-red-500'/>
                    </button>
                </div>
                <ul className='my-1 list-disc px-2 text-xs'>
                    <li>
                        You can remove a friend from your friends list
                    </li>
                    <li>
                        When you delete a friend, the current user is removed from that friend&apos;s friends list.
                    </li>
                    <li>
                        The chat room is not available and will be available if you become friends again
                    </li>
                </ul>
                <button
                    onClick={onClickDelete}
                    className='w-full border-2 border-solid border-purple-500 justify-center rounded-full hover:bg-purple-500 hover:text-white transition duration-200'>
                    Delete
                </button>
            </div>
        </div>
    )
}