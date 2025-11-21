'use client';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme }from './theme';
import React from "react";

export const ThemeContext = React.createContext({
    mode : "light",
    toggleTheme : ()=> {}
})

export default function ThemeRegister({ children } : { children : React.ReactNode}) {
    const [mode, setMode] = React.useState<'light'|'dark'>('light');

    React.useEffect(()=> {
        // Get Saved theme string in localstorage
        const saved = localStorage.getItem("theme");
        if(saved === "dark" || saved === "light") {
            setMode(saved);
        }
    },[]);

    // onChange Event in Switcher Component
    const toggleTheme = ()=> {
        setMode(prev => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            return next;
        })
    }


    

    return (
        <ThemeContext.Provider value={ {mode, toggleTheme} }>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
    
}