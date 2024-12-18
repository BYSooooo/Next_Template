"use client";

import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { controlMessageToast } from "../redux/features";

export default function MessageToast() {
    const { type, openYn, title, content } = useAppSelector((state)=> state.toastStore)
    const toastRef = React.useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()
    
    React.useEffect(()=> {
        const handleClick = (event : MouseEvent)=> {
            if(toastRef.current && !toastRef.current.contains(event.target as Node)) {
                dispatch(controlMessageToast({ type : 'info', title : "", content : "", openYn : false}))
            }
        }
        document.addEventListener("click", handleClick, true);

        return ()=> {
            document.removeEventListener("click", handleClick, true);
        }
        
    },[toastRef,openYn])


    const bgColorSwitcher = {
        info    : 'bg-blue-100 border-blue-500 text-blue-900',
        confirm : 'bg-green-100 border-green-500 text-green-900',
        error   : 'bg-red-100 border-red-500 text-red-900',
    }

    const transControl = {
        toastStart : "ease-in opacity-100 -translate-y-full",
        toastEnd : "ease-out opacity-0 translate-y-0"
    }

    return (
        <div 
            ref={toastRef}
            className={
                `flex absolute w-full px-3 py-2 shadow-md border-t-4 rounded-xl transition duration-300
                ${bgColorSwitcher[type]}
                ${transControl[openYn === true ? "toastStart" : "toastEnd"]}
                `}
            role="alert">
            <div className="flex">
                <InformationCircleIcon className="py-1 mr-2 w-10 h-10"/>
                <div>
                    <p className="font-bold">
                        {title}
                    </p>
                    <p className="text-sm">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}