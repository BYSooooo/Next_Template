"use client"

import AuthController from '../component/AuthController'
import { openMessageToast } from '../redux/features';
import { useAppDispatch } from '../redux/hooks'

export default function AuthList() {
    const dispatch = useAppDispatch();

    const authHandler = (serviceType : "Google" | "Github" | "Email" | "Test", email : string )=> {
        AuthController(serviceType, "")
            .then((result)=> {
                if(result.result) {

                }else {
                    dispatch(openMessageToast({ type : 'error', title : "Login Canceled by User", content : result.content.message, openYn : true}))
                }         
            })
    }

    return (
        <div className="rounded-2xl border-2 w-96 mt-10 p-8
          dark:border-gray-300 
          border-gray-700">
            <button 
                onClick={()=>authHandler("Google","")}
                className="rounded-full py-2 px-10 m-2
                hover:cursor-pointer
                border-2
                border-blue-500
                hover:bg-blue-500
                dark:hover:bg-blue-500
                transition">
                Sign in using Google
            </button>
            <button className="rounded-full py-2 px-10 m-2
                hover:cursor-pointer
                border-2
                border-slate-500
                hover:bg-slate-500
                dark:hover:bg-slate-500
                transition">
                Sign in using GitHub
            </button>
            <button className="rounded-full py-2 px-10 m-2
                hover:cursor-pointer
                border-2
                border-gray-300
                hover:bg-gray-300
                transition">
                Sign in using E-mail
            </button>
            <div className="border-t-2 my-5
                border-gray-700
                dark:border-gray-300"
            />
            <h6 className="text-sm">
                Access to Messenger using Test Account
            </h6>
            <button className="rounded-full py-2 px-10 m-2
                hover:cursor-pointer
                border-2
                border-purple-600
                hover:bg-purple-600
                dark:border-purple-400
                dark:hover:bg-purple-400
                transition
                ">
                Sing in using Test Account
            </button>
        </div>
    )
}