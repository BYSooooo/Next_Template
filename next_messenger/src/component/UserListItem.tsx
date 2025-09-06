"use client"

import { UserIcon } from "@heroicons/react/24/solid"
import { UserInfo } from "../../typeDef"

export default function UserListItem({user, selected} : {user : UserInfo, selected:Function}) {
    const onClickItem = ()=> {
        selected(user)
    }

    const showAvatar = ()=> {
        switch(user.avatarOpenYn) {
            case true :
                return user.avatarImg.length > 0
                    ? <img src={user.avatarImg} className="w-10 h-10 mx-auto object-cover rounded-full mr-2"/>
                    : <UserIcon className='w-10 h-10 mr-2' /> 
            default : 
                return <UserIcon className='w-10 h-10 mr-2' />   
        } 
    }

    return (
        <li 
            onClick={onClickItem}
            key={user.email}
            className="listItem-user">
            {showAvatar()}
            
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