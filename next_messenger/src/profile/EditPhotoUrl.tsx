import { UserCircleIcon } from "@heroicons/react/24/solid"

export default function EditPohtoUrl({photoUrl} : {photoUrl : string}) {
    const photoCircle = ()=> {

    }

    return (
        
        <div className="flex flex-col bg-slate-300 dark:bg-slate-700 rounded-md p-3">
            <div className="flex flex-col text-start ">
                <p className="text-2xl font-bold">
                    Photo
                </p>
                <ul className="text-sm list-outside">
                    <li>
                    You can upload an image to use as your profile picture.  
                    </li>
                </ul>
            </div>
            {photoUrl 
                ? 
                    <p>
                        Yes
                    </p>
                : 
                    <UserCircleIcon className="w-32 h-32 text-gray-600 dark:text-white"/> 
            }
            <button>
                Upload
            </button>
        </div>
    )
}