import { UserCircleIcon } from "@heroicons/react/24/solid"

export default function UserDetailInfo({userInfo} : {userInfo : UserInfo}) {
    
    return (
        <div className='flex flex-col h-full items-center justify-center'>
            {userInfo.photoUrl
                ?   <img />
                :   <UserCircleIcon className="w-28 h-28"/>

            }
            {userInfo.displayName
                ?   <p className="font-bold text-lg">
                        {userInfo.displayName}
                    </p>
                :   <p className="font-bold text-lg text-gray-300">
                        No DisplayName
                    </p>   
            }
            
        </div>    
      
    )
}