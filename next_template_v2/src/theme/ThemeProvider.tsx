'use client';

import React from "react";

export const ThemeContext = React.createContext({
    mode : "light",
    toggle : ()=> {}
})

export default function ThemeProvider({ children } : { children : React.ReactNode}) {
    const [mode, setMode] = React.useState<'light'|'dark'>('light');

    React.useEffect(()=> {
        // Get Saved theme string in localstorage
        const saved = localStorage.getItem("theme");
        
        if(saved === "dark" || saved === "light") {
            setMode(saved);
        }
    },[]);
}