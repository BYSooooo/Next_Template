import React, { HTMLAttributes } from 'react'

import { Popover } from '@headlessui/react';
import { getUserInfoInStrg } from '../FirebaseController'
import Spinner from '../public/Spinner';

export function ListElement({mailAddress} : {mailAddress : string}) {
    const [photoURL, setPhotoURL] = React.useState("");
    const [selected, setSelected] = React.useState(false)
    const [focused, setFocused] = React.useState(false);
    React.useEffect(()=> {
        getPhotoURL()
    },[])
    React.useEffect(()=> {
        
    },[focused])

    const getPhotoURL = async()=> {
        const {result, value} = await getUserInfoInStrg(mailAddress)
        console.log(result)
        setPhotoURL(value)
    }

    const selectHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        
    }
    const focusHandler = (e) => {
        console.log(e)
    }
    
    return (
        <button 
            onClick={(e)=> selectHandler(e)}
            onFocus={(e)=>focusHandler(e)}
            className='flex w-80 p-2 m-1 rounded-md border-slate-500 border-2 hover:bg-slate-500 hover:text-white hover:cursor-pointer transition duration-200 focus:h-32'>
                {
                    selected 
                    ?   <div>
                            <h4>
                                Selected
                            </h4>
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
