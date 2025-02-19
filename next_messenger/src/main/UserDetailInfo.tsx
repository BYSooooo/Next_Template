"use client"

import EditAvatarIcon from "../profile/EditAvatarIcon";
import EditDisplayName from "../profile/EditDisplayName";

import { useAppSelector } from "../redux/hooks"

export default function UserDetailInfo() {
    const userInfoSlice = useAppSelector((state)=> state.userStore);

    return (
        <div className='default-box
            flex flex-col max-w-[79vw] ml-1 p-5 gap-3' >
            <p className="font-bold text-start text-5xl">
                Profile
            </p>
            <div className="grid grid-flow-row grid-cols-2 gap-3 min-w-full justify-between">
                {/* DisplayName*/}
                <EditAvatarIcon 
                    avatarImg={userInfoSlice.avatarImg}
                    avatarOpenYn={userInfoSlice.avatarOpenYn}/>
                <EditDisplayName name={userInfoSlice.displayName}/>
                
            </div>
        </div>
    )
}