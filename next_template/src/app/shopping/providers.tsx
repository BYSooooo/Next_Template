"use client";

import React from 'react';
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Providers({children} : {children : React.ReactNode}) {
    const [theme, setTheme] = React.useState('');

    React.useEffect(()=> {
        window.addEventListener('storage', ()=> {
            console.log(window.localStorage)
            setTheme(window.localStorage.getItem('mode'))
            console.log(theme)
        })
    },[])
    

    
    
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" forcedTheme={theme}>
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    )
}