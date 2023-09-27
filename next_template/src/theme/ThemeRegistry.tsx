'use client'

import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import theme from './theme';

export default function ThemeRegistry({children} : {children : React.ReactNode}) {
    const [mode, setMode] = React.useState('');    
    const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const initialMode = preferDarkMode ? 'dark' : 'light';
    
    React.useEffect(()=> {
        setMode(initialMode) 
        window.localStorage.setItem('mode', initialMode);
        window.addEventListener('stroage',()=> {
            const getMode = window.localStorage.getItem('mode')
            setMode(getMode === 'dark' ? 'dark' : 'light')
        })
    },[])

    // if(typeof window !== "undefined") {
        
    // }
    
    // React.useEffect(()=> {
        
    // },[window.localStorage.getItem('mode')]) 
    
    return (
        <ThemeProvider theme={theme(mode === 'dark' ? 'dark' : 'light')}>
            {children}
            <CssBaseline />
        </ThemeProvider>    
    )
}