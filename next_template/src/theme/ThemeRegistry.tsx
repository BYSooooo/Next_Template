'use client'

import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import theme from './theme';

export default function ThemeRegistry({children} : {children : React.ReactNode}) {
    const [mode, setMode] = React.useState('');    
    const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    React.useEffect(()=> {
        const initialMode = preferDarkMode ? 'dark' : 'light';
        window.localStorage.setItem('mode', initialMode);
        setMode(initialMode) 
    },[])
    
    React.useEffect(()=> {
        window.addEventListener('stroage',()=> {
            const getMode = window.localStorage.getItem('mode')
            setMode(getMode === 'dark' ? 'dark' : 'light')
        })
    },[window.localStorage.getItem('mode')]) 
    
    return (
        <ThemeProvider theme={theme(mode === 'dark' ? 'dark' : 'light')}>
            {children}
            <CssBaseline />
        </ThemeProvider>    
    )
}