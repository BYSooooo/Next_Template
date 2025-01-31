import { UserCircleIcon } from "@heroicons/react/24/solid"

export default function EditPohtoUrl({photoUrl} : {photoUrl : string}) {
    const photoCircle = ()=> {

    }

    return (
        
        <div className="flex flex-col bg-slate-300 dark:bg-slate-700 rounded-lg p-3 gap-1">
            <div className="flex flex-col text-start ">
                <p className="text-2xl font-bold">
                    Photo
                </p>
                <ul className="text-sm list-inside list-disc">
                    <li>
                        Upload an image to use as profile picture.  
                    </li>
                    <li>
                        You can control the visibility of your photos in the settings menu.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center">
            {photoUrl 
                ? 
                    <p>
                        Yes
                    </p>
                : 
                    <UserCircleIcon className="w-40 h-40 text-gray-600 dark:text-white"/> 
            }

            </div>
            <div className="flex flex-row-reverse gap-2">
                <button className="confirm-button py-1 px-2">
                    Upload
                </button>
                <button className="decline-button py-1 px-2 ">
                    Delete
                </button>
            </div>
        </div>
    )
}