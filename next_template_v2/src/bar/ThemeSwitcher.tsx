'use client';

import { Switch, useColorScheme } from "@mui/material";
import React from "react";

export default function ThemeSwitcher() {
    const { mode, setMode } = useColorScheme()
    const [ mounted, setMounted ] = React.useState(false);
    console.log(mode)
    React.useEffect(()=> {
        setMounted(true);
    },[])

    if(!mounted) {
        return <div style={{ width: 62, height: 38 }} />;
    }

    const isDark = mode === 'dark' || 
                        (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);;

    const handleToggle = ()=> {
        setMode(isDark ? 'light' : 'dark')
    }

    return (
        <Switch
            checked={isDark}
            onChange={handleToggle}
            inputProps={{ 'aria-label' : 'theme-toggle'}}/>
    )
}