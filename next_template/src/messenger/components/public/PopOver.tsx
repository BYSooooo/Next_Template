import { CheckIcon, XCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

/**
 * Call the window with the text you set at the bottom of the window.
 * Appears on screen and disappears after 5 seconds.
 * @param content  - Text to display inside
 * @param type - Types of situations to show Modal 
 * @param control - A function that associates it with a useState action that determines whether it is visible
 * @returns 
 */
export default function PopOver({content, type, control} : {content : string, type : "success"|"fail", control: Function}) {
    const [isOpen, setIsOpen] = React.useState(false);
    
    React.useEffect(()=> {
        setIsOpen(true)
        if(isOpen) {
            setTimeout(()=> {
                setIsOpen(false)
                control(false)
            }, 5000)
        }
    },[isOpen])

    const selectedType = () => {
        switch(type) {
            case "success" : 
                return <CheckIcon className='w-6 h-6 text-green-600' />
            case "fail" : 
                return <XCircleIcon className='w-6 h-6' />
            default : break;
        }
    }
    
    return (
        <>
            <div 
                className="absolute bottom-1 left-1/2 z-50 rounded-md border-solid border-2 border-black p-4 bg-white dark:border-slate-600 dark:bg-black w-fit "
                style={{
                   animationName : 'fade-out',
                   animationDuration : '5s',
                   animationFillMode : 'forwards'
                }}>
                    <div className='flex gap-2'>
                        {selectedType()}
                        <h4 className='text-base font-bold text-black'>
                            {content}   
                        </h4>
                    </div>
            </div>
        </>
    )
}