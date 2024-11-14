'use client';

import React from 'react';
import { useTheme } from 'next-themes';

export default function Toggle() {
    const [ checked, setChecked] = React.useState<boolean>(false)
    const { theme, setTheme } = useTheme();

    React.useEffect(()=> {
        setChecked(theme === 'dark' ? true : false)
    },[])

    const toggleHandler = (e : React.MouseEvent<HTMLDivElement,MouseEvent>)=> {
        setChecked(!checked)
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <div className="flex">
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={checked}
                        readOnly
                    />
                    <div
                        onClick={(e)=>toggleHandler(e)}
                        className="w-11 h-6 bg-gray-200 rounded-full 
                            peer  
                            peer-focus:ring-green-300  
                            peer-checked:after:translate-x-full 
                            peer-checked:after:border-white 
                            after:content-[''] 
                            after:absolute 
                            after:top-0.5 
                            after:left-[2px] 
                            after:bg-white 
                            after:border-gray-100 
                            after:border 
                            after:rounded-full 
                            after:h-5 
                            after:w-5 
                            after:transition-all 
                            peer-checked:bg-gray-500">
                    </div>
                </label>
            </div>
        </div>
    )
}