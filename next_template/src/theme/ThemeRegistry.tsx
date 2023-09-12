'use client'

import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import theme from './theme';

export default function ThemeRegistry({children} : {children : React.ReactNode}) {
    const [mode, setMode] = React.useState<'light'|'dark'>('light');    
    const preferDarkMode = useMediaQuery('(prefers-color-scheme : dark)');

    React.useEffect(()=> {
        setMode(preferDarkMode ? 'dark' : 'light')
    },[])

    window.addEventListener('stroage',()=> {
        const getMode = window.localStorage.getItem('mode')
        setMode(getMode === 'dark' ? 'dark' : 'light')
    })

    return (
        
        <ThemeProvider theme={theme(mode === 'dark' ? 'dark' : 'light')}>
            {children}
            <CssBaseline />
        </ThemeProvider>
        
        
    )
}