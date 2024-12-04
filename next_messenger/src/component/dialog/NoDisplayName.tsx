import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function NoDisplayName() {
    
    return (
        <div className="container flex flex-col">
            <div className="flex items-center">
                <InformationCircleIcon className="w-7 h-7 dark:text-blue-300 text-blue-700 mr-2" />
                <h4 className="text-xl text-black dark:text-white">
                    Confirm 
                </h4>
            </div>
            <p className="dark:text-black text-3xl">
                This is No Display
            </p>
            <div>

            </div>
        </div>
    )
}