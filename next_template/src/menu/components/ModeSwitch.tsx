import React from 'react';

import Switch from '@mui/material/Switch';
import { useMediaQuery } from '@mui/material';

export default function ModeSwitch() {
    const preferDarkMode = useMediaQuery('(prefers-color-scheme : dark)');
    const [mode, setMode] = React.useState(false)
    
    React.useEffect(()=> {
        setMode(preferDarkMode)
        changeLocalStroage(preferDarkMode ? 'dark' : 'light')
    },[])

    const changeLocalStroage = (selectMode: string) => {
        window.localStorage.setItem('mode', selectMode)
        window.dispatchEvent(new Event('stroage'));
    }

    const onChange = (event : React.ChangeEvent<HTMLInputElement>)=> {
        setMode(event.target.checked)
        changeLocalStroage(event.target.checked ? 'dark' : 'light')
    }
    return (
        <Switch checked={mode} onChange={onChange}/>
    )
}