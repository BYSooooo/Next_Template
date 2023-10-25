import React from 'react'
import AuthController from "../AuthController"

export default function EmailAuthModal({onClose} : {onClose : Function}){
    const [email, setEmail] = React.useState("");

    const clickXButton = () => {
        onClose(false)   
    }
    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const inputString = event.target.value;
        setEmail(inputString);
    }
    const checkEmail = () => {
        
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
                    <label>
                        <span>
                            Email
                        </span>
                        <input 
                            type="email"
                            id="auth_input_email"
                            onChange={(e)=>onChange(e)}
                            required
                            pattern="[a-zA-Z0-9._+\-]+@[a-zA-Z0-9.\-]+\.[a-z]{2,}$"
                            className="pl-3 rounded-md focus:border-2 focus:border-blue-400 border-2 border-solid border-gray-400 w-full invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            placeholder="example@email.com" >
                        </input>
                        <span className='hidden mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"'>
                            Please Check Email Address
                        </span>
                    </label>
                
                </div>
                <div className="py-4 px-3 w-full">
                    <button 
                        onClick={checkEmail}
                        className="rounded-full p-2 text-center w-full border-2 border-gray-600 hover:bg-gray-600 hover:text-white">
                        Send Authentication Email
                    </button>
                </div>
            </div>
        </div>
    )
}