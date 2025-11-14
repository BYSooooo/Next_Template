'use client'

import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme, CssBaseline, useMediaQuery } from '@mui/material';

export default function ThemeRegistry({children} : {children : React.ReactNode}) {
    const [mode, setMode] = React.useState<'light'|'dark'>('light');    
    const [mount, setMount] = React.useState(false);
    const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    
    const theme = React.useMemo(
        ()=> createTheme({
            palette : {
                mode,
            }
        }),[mode]
    )

    React.useEffect(()=> {
        setMount(true)
        window.addEventListener('stroage',()=> {
            const getMode = window.localStorage.getItem('mode')
            console.log(getMode)
            setMode(getMode === 'dark' ? 'dark' : 'light')
        })
        
        setMode(preferDarkMode ? 'dark' : 'light') 
        window.localStorage.setItem('mode', preferDarkMode ? 'dark' : 'light');
    },[])

    if(!mount) { return null } 

    return (
        <ThemeProvider theme={theme}>
            {children}
            <CssBaseline />
        </ThemeProvider>    
    )
}