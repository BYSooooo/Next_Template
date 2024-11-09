'use client'

import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function HomeButton() {
    const router = useRouter()

    return (
        <HomeIcon
            onClick={()=>router.push('/')} 
            className='
                size-7 text-white
                hover:cursor-pointer
            '/>
    )
}