
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { useAppDispatch } from "../redux/hooks";
import { controlMessageToast } from "../redux/features";
import { delAvatarBinary, setAvatarBinary } from "../controller/FirebaseController";

export default function EditAvatarIcon({avatarImg} : {avatarImg : string}) {
    const dispatch = useAppDispatch();

    const onChangeTempAvatar = async(event: React.ChangeEvent<HTMLInputElement>)=> {
        const { target : { files } }= event;
        const uploaded : File = files[0];

        if(uploaded.size > 1048576) {
            dispatch(controlMessageToast({ openYn: true, type: "error", title : "File Upload Error", content : "File Size exceed 1MB"}))
        } else {
            const {result, value} = await setAvatarBinary(uploaded)
            
            if(result) {
                dispatch(controlMessageToast({ openYn : true, type : 'confirm', title : 'Success', content : "Avatar Image Changed"}))
            } else {
                dispatch(controlMessageToast({ openYn : true, type : 'error', title : 'Error Occured', content : value}))
            }
        }
    }

    const onDeleteAvatarImg = async()=> {
        const { result, value } = await delAvatarBinary()
        if(result) {
            value && controlMessageToast({ openYn : true, type : 'confirm', title : "Success", content : 'Avatar Image Deleted'})  
        } else {
            controlMessageToast({ openYn : true, type : 'error', title : 'Error Occured', content : value})
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
                        You can control the visibility of your avatar.
                    </li>
                    <li>
                        Upload File has a size limit of 1MB.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center">
            {avatarImg 
                ?   <img
                        className="h-36 w-36 mx-auto object-cover rounded-full" 
                        src={avatarImg} 
                    />
                        
                : 
                    <UserCircleIcon className="w-36 h-36 text-gray-600 dark:text-white"/> 
            }

            </div>
            <div className="flex flex-row-reverse">
                <label
                    className="inline-flex relative items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer"
                        />


                </label>
                
            </div>
            <div className="flex flex-row-reverse gap-2">
                <button
                    onClick={()=> document.getElementById("tempAvatar").click()} 
                    className="confirm-button py-1 px-2">
                    Select
                </button>
                <input type='file' id="tempAvatar"accept="image/*" onChange={(e)=> onChangeTempAvatar(e)} style={{ display : 'none'}} />
                <button
                    onClick={onDeleteAvatarImg} 
                    className="decline-button py-1 px-2 ">
                    Delete
                </button>
            </div>
        </div>
    )
}