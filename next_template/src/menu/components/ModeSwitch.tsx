import React from 'react';

import Switch from '@mui/material/Switch';
import useMediaQuery from '@mui/material/useMediaQuery';
//import { cookies } from 'next/headers'

// const setThemeCookie = () => {
//     "use server"
    
//     const cookieStroage = cookies()
//     cookieStroage.set('theme','light')
// }

export default function ModeSwitch({toggle} : {toggle:Function}) {
    const preferDarkMode = useMediaQuery('(prefers-color-scheme : dark)');
    const [mode, setMode] = React.useState(false)

    React.useEffect(()=> {
        setMode(preferDarkMode)

    },[preferDarkMode])

    const onChange = (event : React.ChangeEvent<HTMLInputElement>)=> {
        setMode(event.target.checked)
        toggle(mode)
    }
    return (
        <Switch checked={mode} onChange={onChange}/>
    )
}