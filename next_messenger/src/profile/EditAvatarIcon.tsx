import { UserCircleIcon } from "@heroicons/react/24/solid"
import { useAppDispatch } from "../redux/hooks";
import { controlMessageToast } from "../redux/features";
import { setAvatarBinary } from "../controller/FirebaseController";

export default function EditAvatarIcon({photoUrl} : {photoUrl : string}) {
    const dispatch = useAppDispatch();

    const onChangeTempAvatar = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } }= event;
        const uploaded : File = files[0];
        console.log(uploaded)
        if(uploaded.size > 1048576) {
            dispatch(controlMessageToast({ openYn: true, type: "error", title : "File Upload Error", content : "File Size exceed 1MB"}))
        } else {
            setAvatarBinary(uploaded)
        }
    }

    return (
        
        <div className="flex flex-col bg-slate-300 dark:bg-slate-700 rounded-lg p-3 gap-1">
            <div className="flex flex-col text-start ">
                <p className="text-2xl font-bold">
                    Avatar
                </p>
                <ul className="text-sm list-inside list-disc">
                    <li>
                        Upload an image to use as profile picture.  
                    </li>
                    <li>
                        You can control the visibility of your photos in the settings menu.
                    </li>
                    <li>
                        Upload File has a size limit of 1MB.
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
                <button
                    onClick={()=> document.getElementById("tempAvatar").click()} 
                    className="confirm-button py-1 px-2">
                    Select
                </button>
                <input type='file' id="tempAvatar"accept="image/*" onChange={(e)=> onChangeTempAvatar(e)} style={{ display : 'none'}} />
                <button className="decline-button py-1 px-2 ">
                    Delete
                </button>
            </div>
        </div>
    )
}