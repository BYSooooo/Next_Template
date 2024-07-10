'use client'

import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import theme from './theme';
import { useTheme } from 'next-themes';

export default function ThemeRegistry({children} : {children : React.ReactNode}) {
    const [mode, setMode] = React.useState('');    
    const [mount, setMount] = React.useState(false)
    const { setTheme } = useTheme()
    const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const initialMode = preferDarkMode ? 'dark' : 'light';
    
    React.useEffect(()=> {
        setMount(true)
        setMode(initialMode) 
        window.localStorage.setItem('mode', initialMode);
        window.addEventListener('stroage',()=> {
            const getMode = window.localStorage.getItem('mode')
            setMode(getMode === 'dark' ? 'dark' : 'light')
            setTheme(getMode === 'dark' ? 'dark' : 'light')
        
        })
    },[])

    if(!mount) {
        return null
    }

    return (
        <ThemeProvider theme={theme(mode === 'dark' ? 'dark' : 'light')}>
            {children}
            <CssBaseline />
        </ThemeProvider>    
    )
}