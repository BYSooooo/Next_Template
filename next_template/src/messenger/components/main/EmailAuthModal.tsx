export default function EmailAuthModal({onClose} : {onClose : Function}){
    
    const clickXButton = () => {
        onClose(false)   
    }

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className="relative w-80 h-auto my-6 mx-auto max-w-3xl bg-white dark:bg-slate-800 rounded-md p-3">
                <div className="flex p-3 items-start justify-between">
                    <h3 className=" text-lg font-bold">
                        Authentication with Email
                    </h3>
                    
                    <button
                        className="w-6 h-6 border-2 border-red-600 rounded-full text-inherit"
                        onClick={clickXButton}>
                            X
                    </button>
                </div>
                <div className="pl-3 items-start">
                    <h6 className="text-xs text-left">
                        * Enter the Email you want to use for authentication
                    </h6>
                    <h6 className="text-xs text-left">
                        * You can complete the authentication through the Mail sent to the Email you entered.
                    </h6>
                </div>
                <div className="py-2 px-3 w-md">
                    <input 
                        type="email"
                        className="pl-3 rounded-md focus:border-2 focus:border-blue-400 border-2 border-solid border-gray-400 w-full"
                        placeholder="example@email.com" >
                    </input>
                </div>
                <div className="py-4 px-3 w-full">
                    <button 
                        className="rounded-full p-2 text-center w-full border-2 border-gray-600 hover:bg-gray-600 hover:text-white">
                        Send Authentication Email
                    </button>
                </div>
            </div>
        </div>
    )
}