'use client'

import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { cookies } from 'next/headers'
import theme from './theme';

export default function ThemeRegistry({children} : {children : React.ReactNode}) {
    const [mode, setMode] = React.useState<'light'|'dark'>('light')
 
    return (
        <ThemeProvider theme={theme(mode)}>
            {children}
            <CssBaseline />
        </ThemeProvider>
        
        
    )
}