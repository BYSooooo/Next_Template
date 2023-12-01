import { SVGAttributes } from "react"


/**
 * Spinner that use during the loading of content.
 * @param lightMode - Spinner's line color in Light Mode 
 * @param darkMode - Spinner's line color in Dark Mode
 * @returns 
 */
export default function Spinner({lightMode, darkMode} : {lightMode : string, darkMode : string}) {
    const cssSetting : SVGAttributes<SVGElement> = {
        className :`animate-spin h-8 w-8 text-${lightMode}-500 dark:text-${darkMode}`
    }

    return (
        <>
            <svg className={cssSetting.className} fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='3'/>
                <path className='opacity-75' fill='currentColor' d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        </>
    )
}