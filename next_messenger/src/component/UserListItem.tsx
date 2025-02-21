"use client"

import { UserIcon } from "@heroicons/react/24/solid"

export default function UserListItem({user, selected} : {user : UserInfo, selected:Function}) {
    const onClickItem = ()=> {
        selected(user)
    }

    const showAvatar = ()=> {
        console.log(user)
        switch(user.avatarOpenYn) {
            case true :
                if(user.avatarImg) {
                    return <p>Hello</p>
                } else {
                    return <p> Hello2</p>
                }
                // return user.avatarImg
                //     ? 
                //     : <UserIcon className='w-10 h-10 mr-2' /> 
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