"use client"

import EditPohtoUrl from "../profile/EditPhotoUrl";
import { useAppSelector } from "../redux/hooks"

export default function UserDetailInfo() {
    const userInfoSlice = useAppSelector((state)=> state.userStore);

    return (
        <div className='default-box
            flex flex-col max-w-[79vw] ml-1 w-[100vw] p-5' >
            <p className="font-bold text-start text-5xl">
                Profile
            </p>
            <div className="flex flex-row gap-3">
                {/* DisplayName*/}
                <EditPohtoUrl photoUrl={userInfoSlice.photoUrl}/>
                <div className="">
                    <p >
                        DisplayName
                    </p>
                </div>
                <div>
                    <p>
                        Profile Photo
                    </p>
                </div>
                <div>
                    <p>
                        Email Change
                    </p>
                </div>
            </div>
        </div>
    )
}