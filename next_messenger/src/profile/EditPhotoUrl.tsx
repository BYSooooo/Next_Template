import { UserCircleIcon } from "@heroicons/react/24/solid"

export default function EditPohtoUrl({photoUrl} : {photoUrl : string}) {
    const photoCircle = ()=> {

    }

    return (
        
        <div>
            <p>
                Photo
            </p>
            {photoUrl 
                ? 
                    <p>
                        Yes
                    </p>
                : 
                    <UserCircleIcon className="w-32 h-32"/> 
            }
            <button>
                Edit
            </button>
        </div>
    )
}