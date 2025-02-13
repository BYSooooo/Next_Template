import { UserCircleIcon } from "@heroicons/react/24/solid";

export function CustomAvatar({size, color} : {size : string, color: string}) {
    
    const widthHeight = `w-${size} h-${size}`
    return <UserCircleIcon className={`${widthHeight}`}/>
}