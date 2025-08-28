import { UserCircleIcon } from "@heroicons/react/24/solid"
import { UserInfo } from "../../typeDef"

export default function UserDetailInfo({userInfo} : {userInfo : UserInfo}) {
    
    const avatarHandler = ()=> {
        switch(userInfo.avatarOpenYn) {
            case true : 
                return userInfo.avatarImg 
                    ? <img 
                        src={userInfo.avatarImg} 
                        className="w-28 h-28 mx-auto object-cover rounded-full"/>
                    : <UserCircleIcon className="w-28 h-28"/>
            case false :
                    return  <UserCircleIcon className="w-28 h-28"/>
        }            
    }

    return (
        <div 
            style={userInfo.profileImg ? { backgroundImage: `url(${userInfo.profileImg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            className='flex flex-col h-full items-center justify-center'>
            {avatarHandler()}
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