import React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CheckIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { initPopOverToggle, popOverToggleHook } from '@/redux/features/messengerReducer';

/**
 * Call the window with the text you set at the bottom of the window.
 * 
 */
export default function PopOver() {
    const dispatch = useAppDispatch();
    const popReducer = useAppSelector((state)=> state.messengerPopOverControl);

    React.useEffect(()=> {
        
        if(popReducer.showYn) {
            setTimeout(()=> {
                dispatch(initPopOverToggle())
            }, 3000)
        }
    },[popReducer.showYn])

    const selectedType = () => {
        switch(popReducer.type) {
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
                className="absolute bottom-1 left-1/2 z-50 shadow-box border-black p-4 bg-gray-100 dark:border-slate-600 dark:bg-black w-fit "
                style={{animationName : 'fade-out',
                        animationDuration : '3s',
                        animationFillMode : 'forwards' }}>
                    <div className='flex gap-2'>
                        {selectedType()}
                        <h4 className='text-base font-bold text-black'>
                            {popReducer.messageString}
                        </h4>
                    </div>
            </div>
        </>
    )
}