"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../redux/hooks";

export default function MessageToast() {
const { type, openYn, title, content } = useAppSelector((state)=> state.toastStore)

    const bgColorSwitcher = {
        info    : 'bg-blue-100 border-blue-500 text-blue-900',
        confirm : 'bg-green-100 border-green-500 text-green-900',
        error   : 'bg-red-100 border-red-500 text-red-900',
    }

    const transControl = {
        toastOpen : "ease-out opacity-100 -translate-y-full",
        toastClose : "ease-in opacity-0 translate-y-0"
    }

    return (
        <div 
            className={
                `absolute w-full px-3 py-2 shadow-md z-10 
                border-t-4
                rounded-xl
                transition duration-300
                ${bgColorSwitcher[type]}
                ${transControl[openYn === true ? "toastOpen" : "toastClose"]}
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