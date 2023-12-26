import React from 'react';
import { getUserInfo, getUserInfoInStrg, setFriendRequestControl} from '../../FirebaseController';
import { UserIcon } from '@heroicons/react/20/solid';
import { RequestFriend, UserInfo } from '../../../../../msg_typeDef';

export function ResListElement({requestInfo, refresh} : {requestInfo : RequestFriend, refresh : Function}) {
    const [selected, setSelected] = React.useState(false)
    const [photoURL, setphotoURL] = React.useState("");
    const [infoInDoc, setInfoInDoc] = React.useState<UserInfo>();

    React.useEffect(()=> { 
        getPhotoURL()
        getSelectedUserInfo()
    },[])

    const getPhotoURL = async ()=> {
        const {result, value} = await getUserInfoInStrg(requestInfo.from)
        setphotoURL(value)
    }

    const getSelectedUserInfo = () => {
        getUserInfo(requestInfo.from).then((result)=> {
            result.result === true && setInfoInDoc(result.value)
        })
    }

    const onClickHandler = async(acceptYn : boolean)=> {
        await setFriendRequestControl(requestInfo,acceptYn)
            .then((result)=> result === true && refresh())
    }
    
    return (
        <li onMouseOver={()=>setSelected(true)}
            onMouseOut={()=>setSelected(false)}
            className='flex p-2 rounded-md border-2 border-slate-500 hover:cursor-pointer'>
            {selected 
                ? 
                <div>
                    <div className='transition duration-200'>
                        <div className='flex items-center gap-3'>
                            {photoURL.length > 0 
                                ?   <img className='w-12 h-12 rounded-full border-none shadow-none' src={photoURL} /> 
                                :   <UserIcon className='w-12 h-12 border-2 rounded-full border-white border-solid text-white'/> 
                            }
                            <ul>
                                <li className='font-bold text-lg'>
                                    {requestInfo.from}
                                </li>
                                <li className='font-bold text-sm'>
                                    {infoInDoc?.displayName}
                                </li>
                                <li>
                                    <h4 className='text-sm'>
                                        Request Date : {requestInfo.req_date.toDate().toLocaleDateString()}
                                    </h4> 
                                </li>
                            </ul>
                        </div>
                        <div className='flex justify-between gap-1 mt-1 w-full'>
                            <button
                                onClick={()=>onClickHandler(false)} 
                                className='p-1 w-1/2 rounded-md border-2 border-red-500 hover:text-white font-bold hover:bg-red-500 transition duration-200'>
                                Decline
                            </button>
                            <button 
                                onClick={()=>onClickHandler(true)}
                                className='p-1 w-1/2 rounded-md border-2 border-blue-500 hover:text-white font-bold hover:bg-blue-500 transition duration-200'>
                                Accept
                            </button>
                        </div>
                    </div>
                    
                </div>
                : 
                
                <div className='flex items-center gap-2'>
                    {photoURL 
                        ? <img className='w-8 h-8 rounded-full border-none shadow-none' src={photoURL} />
                        : <UserIcon className='w-8 h-8 border-2 rounded-full border-slate-500 border-solid text-slate-500'/>
                     }
                     <h4 className='font-bold'>
                        {requestInfo.from}
                    </h4>
                </div>
                
                }
        </li>
    )
}