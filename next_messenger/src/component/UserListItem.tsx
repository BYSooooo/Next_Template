"use client"

import { UserIcon } from "@heroicons/react/24/solid"

export default function UserListItem({user, selected} : {user : UserInfo, selected:Function}) {
    const onClickItem = ()=> {
        selected(user)
    }

    return (
        <li 
            onClick={onClickItem}
            key={user.email}
            className="listItem-user">
            <UserIcon className='w-10 h-10 mr-2' />
            <div className="flex flex-col text-start truncate">
                <p className="font-bold">
                    {user.displayName}
                </p>
                <p className="text-sm font-light opacity-70 truncate">
                    {user.email}
                </p>
            </div>
        </li>   
    )
}