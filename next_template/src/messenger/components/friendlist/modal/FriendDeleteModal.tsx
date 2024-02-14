import { XMarkIcon } from "@heroicons/react/20/solid";

export function FriendDeleteModal({closeFn} : {closeFn: Function}) {

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
            </div>
        </div>
    )
}