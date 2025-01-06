"use client"

import { UserIcon } from "@heroicons/react/24/solid"


export default function UserListItem({user} : {user : UserInfo}) {
    const onClickItem = ()=> {
        alert("Hello")
    }

    return (
        <li 
            onClick={onClickItem}
            key={user.email}
            className="listItem-user">
            {user.photoUrl 
                ? <img src={user.photoUrl} />
                : <UserIcon className="w-5 h-5" />
            }
            {user.email}
        </li>   
    )
}