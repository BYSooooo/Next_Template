import React, { HTMLAttributes } from 'react'


import { getUserInfo, getUserInfoInStrg } from '../FirebaseController'
import { UserIcon } from '@heroicons/react/20/solid';
import PopOver from '../public/PopOver';

export function ListElement({mailAddress} : {mailAddress : string}) {
    const [photoURL, setPhotoURL] = React.useState("");
    const [selected, setSelected] = React.useState(false)
    const [infoInDoc, setInfoInDoc] = React.useState<userInfo>()

    React.useEffect(()=> {
        getPhotoURL()
        getSelectedUserInfo()
    },[])
    
    const getPhotoURL = async()=> {
        const {result, value} = await getUserInfoInStrg(mailAddress)
        setPhotoURL(value)
    }

    const selectHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const selected = e
        console.log(selected)
    }

    const onClickAddButton = ()=> {
        
    }

    const getSelectedUserInfo = () => {
        getUserInfo(mailAddress).then((result: userInfo)=> {
            setInfoInDoc(result)
        })
    }

    return (
        <li 
            onMouseOver={()=>setSelected(true)}
            onMouseOut={()=>setSelected(false)}
            onClick={(e)=> selectHandler(e)}
            className='flex p-2 m-1 rounded-md border-slate-500 border-2 hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer transition duration-200 hover:h-32'>
                {
                    selected 
                    ?   <div>
                            <div className='flex items-center gap-3'>
                                {photoURL.length > 0 
                                ?   <img className='w-12 h-12 rounded-full border-none shadow-none' src={photoURL} /> 
                                :   <UserIcon className='w-12 h-12 border-2 rounded-full border-white border-solid text-white'/>}
                                <ul>
                                    <li className='font-bold text-lg'>
                                        {mailAddress}
                                    </li>
                                    <li className='font-bold text-sm'>
                                        {infoInDoc.displayName}
                                    </li>
                                </ul>
                            </div>
                            <div className='flex justify-end items-end mt-6'>
                                <button
                                    onClick={onClickAddButton} 
                                    className='flex w-full px-2 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-600 transition duration-200 justify-center'>
                                    Send Request
                                </button>

                            </div>                            
                        </div>
                    :   <div className='flex items-center gap-2'>
                            {photoURL
                                ?   <img className='w-8 h-8 rounded-full border-none shadow-none' src={photoURL} />
                                :   <UserIcon className='w-8 h-8 border-2 rounded-full border-slate-500 border-solid text-slate-500'/>
                                
                            }
                            <h4 className='font-bold'>
                                {mailAddress}
                            </h4>
                        </div>
                }
        </li>
    )
    
}


{/* <Popover>
            <Popover.Button
                className='flex p-2 m-1 w-80 items-center gap-2 rounded-md border-slate-500 border-2 hover:bg-slate-500 hover:text-white hover:cursor-pointer'>  
                {photoURL.length > 0
                    ?   <img className='w-8 h-8 rounded-full border-none shadow-none' src={photoURL} />
                    :   <Spinner lightMode='black' darkMode='white' />

                }
                <h4 className='font-bold'>
                    {mailAddress}
                </h4>
            </Popover.Button>
            <Popover.Panel className='bg-slate-600 rounded-md ml-1 p-2 text-white w-80'>
                Panel Content
            </Popover.Panel>
        </Popover> */}
