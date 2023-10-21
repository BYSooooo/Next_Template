export default function AuthModal({onClose} : {onClose : Function}){
    
    const clickXButton = () => {
        onClose(true)   
    }
    const onTest = () => {
        console.log("test")
    }
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className="relative w-80 h-96 my-6 mx-auto max-w-3xl bg-white dark:bg-slate-800 rounded-md p-3">
                <div className="flex p-3 items-start justify-between">
                    <h3 className=" text-4xl font-bold">
                        Sign In
                    </h3>
                    <button
                        className=" bg-sky-300"
                        onClick={clickXButton}>
                            X
                    </button>
                </div>
                <div className="grid p-3 h-52 mt-10 grid-rows-3 py-6 gap-2">
                    <div className="flex justify-center items-center min-w-full">
                        <button
                            className=" w-2/3 rounded-full border-solid shadow-md p-2 hover:bg-blue-200/40"
                            onClick={onTest}>
                            Sign in with Google
                        </button>

                    </div>
                    <div className="flex justify-center items-center min-w-full">
                        <button
                            className="w-2/3 rounded-full border-solid shadow-md p-2 hover:bg-blue-200/40" >
                            Sign in with GitHub
                        </button>
                    </div>
                    <div className="flex justify-center items-center min-w-full">
                        <button
                            className="w-2/3 rounded-full border-solid shadow-md p-2 hover:bg-blue-200/40">
                            Sign in with Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}