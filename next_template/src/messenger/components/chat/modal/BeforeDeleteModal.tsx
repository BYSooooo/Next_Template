import { XMarkIcon } from "@heroicons/react/20/solid";

export function BeforeDeleteModal({closeFn, clickFn} : {closeFn : Function, clickFn : Function}) {

    const onClickDelete = ()=> {
        closeFn(false)
        clickFn()
    }
    
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className='absolute self-center bg-white dark:bg-black rounded-md p-3 w-80'>
                <div className='flex mb-2 border-b-slate-500 justify-between' >
                    <h1 className="font-bold">
                        Caution
                    </h1>
                    <button onClick={()=>closeFn(false)}>
                        <XMarkIcon className='w-6 h-6 text-red-500'/>
                    </button>
                </div>
                <ul className='my-1 list-disc px-2'>
                    <li className="text-xs">
                        When you delete a room, all history is deleted
                    </li>
                    <li className="text-xs">
                        Once deleted, there is no going back.
                    </li>
                    <li className="text-xs">
                        Please export the required materials in advance
                    </li>
                </ul>
                <div >
                    <button 
                        className='w-full border-2 rounded-full border-purple-500 hover:bg-purple-500 hover:text-white transition duration-200 '
                        onClick={()=>onClickDelete()}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}