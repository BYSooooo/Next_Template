'use client'

import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';


export default function ThemeRegistry({children} : {children : React.ReactNode}) {
    const [mode, setMode] = React.useState<'light'|'dark'>('dark')
    
    return (
        <ThemeProvider theme={theme(mode)}>
            {children}
            <CssBaseline />
        </ThemeProvider>
        
        
    )
}