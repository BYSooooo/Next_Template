import React, { HTMLAttributes } from 'react'

import { Popover } from '@headlessui/react';
import { getUserInfoInStrg } from '../FirebaseController'
import Spinner from '../public/Spinner';
import { UserIcon } from '@heroicons/react/20/solid';

export function ListElement({mailAddress} : {mailAddress : string}) {
    const [photoURL, setPhotoURL] = React.useState("");
    const [selected, setSelected] = React.useState(false)

    React.useEffect(()=> {
        getPhotoURL()
    },[])
    
    const getPhotoURL = async()=> {
        const {result, value} = await getUserInfoInStrg(mailAddress)
        setPhotoURL(value)
    }

    const selectHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        
    }

    const onClickAddButton = ()=> {
        
    }
    return (
        <button 
            onClick={(e)=> selectHandler(e)}
            onFocus={()=>setSelected(true)}
            onBlur={()=>setSelected(false)}
            className='flex w-80 p-2 m-1 rounded-md border-slate-500 border-2 hover:bg-slate-500 hover:text-white focus:hover:text-black hover:cursor-pointer transition duration-200 focus:h-32 focus:hover:bg-neutral-50'>
                {
                    selected 
                    ?   <div>
                            <div className='flex items-center gap-3'>
                                {photoURL.length > 0 
                                ?   <img className='w-12 h-12 rounded-full border-none shadow-none' src={photoURL} /> 
                                :   <UserIcon className='w-12 h-12 border-2 rounded-full border-slate-500 border-solid text-slate-500'/>}
                                <h4 className='font-bold text-lg'>
                                    {mailAddress}
                                </h4>
                            </div>
                            <div>
                                {}
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    onClick={onClickAddButton} 
                                    className='flex w-fit p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200 justify-center'>
                                    Send Request
                                </button>

                            </div>
                            

                            
                        </div>
                    :   <div className='flex items-center gap-2'>
                            {photoURL.length > 0
                                ?   <img className='w-8 h-8 rounded-full border-none shadow-none' src={photoURL} />
                                :   <Spinner lightMode='black' darkMode='white' />
                                
                            }
                            <h4 className='font-bold'>
                                {mailAddress}
                            </h4>
                        </div>
                }
                
        </button>
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
