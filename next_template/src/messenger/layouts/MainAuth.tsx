import React from 'react';

import AuthController from '../components/AuthController';
import EmailAuthModal from '../components/login/EmailAuthModal';

export default function MainAuth() {
    const [showModal, setShowModal] = React.useState(false);

    const callAuth =(name : "Google" | "Github" | "Email" | "Test") => AuthController(name) 
    
    const showYn = (pressYn : boolean) => {
        setShowModal(pressYn)
    }
    return (
        <div className="box-content border-solid border-2 border-blue-950 dark:border-blue-300 rounded-xl w-96 h-auto p-2.5">
            <div className="flex p-3 items-start justify-between">
                <h1 className="text-3xl text-center font-bold">
                    Sign In
                </h1>
            </div>
            <div className='flex pl-3'>
                <h6>
                    Please Select Service
                </h6>
            </div>
            <div className="divide-y-2 divide-solid">
                <div className='h-52 mt-10'>
                    <div className="flex justify-center items-center my-3">
                        <button
                            onClick={()=>callAuth("Google")}
                            className=" w-60 rounded-full border-solid border-blue-500 border-2  p-2 hover:bg-blue-500">
                            Sign in with Google
                        </button>
                    </div>
                    <div className="flex justify-center items-center my-3">
                        <button
                            onClick={()=> callAuth("Github")}
                            className="w-60 rounded-full border-solid border-gray-800 border-2 p-2 hover:bg-gray-800 hover:text-white" >
                            Sign in with GitHub
                        </button>
                    </div>
                    <div className="flex justify-center items-center my-3">
                        <button
                            onClick={()=> setShowModal(true)}
                            className="w-60 rounded-full border-solid  border-gray-400 border-2 p-2 hover:bg-gray-400">
                            Sign in with Email
                        </button>
                    </div>
                </div>
                <div className='p-3'>
                    <h6 className='text-sm'>
                        If you would like to access a trial account, please click the button below 
                    </h6>
                    <div className='flex justify-center items-center min-w-full mt-2'>
                        <button
                            onClick={()=>callAuth("Test")}
                            className="w-2/3 rounded-full border-solid border-violet-400 border-2 p-2 hover:bg-violet-400">
                                Sign In Test Account
                        </button>
                    
                    </div>  
                </div>
                    { showModal ? <EmailAuthModal onClose={showYn} />: null}
            </div>
        </div>
    )
}