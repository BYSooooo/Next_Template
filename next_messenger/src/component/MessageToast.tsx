import { InformationCircleIcon } from "@heroicons/react/24/outline";


export default function MessageToast({type}:{type : "info" | "confirm" | "error"}) {
    
    const bgColorSwitcher = {
        info    : 'bg-blue-100 border-blue-500 text-blue-900',
        confirm : 'bg-green-100 border-green-500 text-green-900',
        error   : 'bg-red-100 border-red-500 text-red-900',
    }

    return (
        <div 
            className={
                `px-3 py-2 shadow-md z-50 mx-5
                border-t-4
                rounded-xl
                ${bgColorSwitcher[type]}
                `}
            role="alert">
            <div className="flex">
                <InformationCircleIcon className="py-1 mr-2 w-10 h-10"/>
                <div>
                    <p className="font-bold">
                        Test
                    </p>
                    <p className="text-sm">
                        Hello
                    </p>
                </div>
            </div>
        </div>
    )
}