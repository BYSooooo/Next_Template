'use client';

import { Switch, useColorScheme } from "@mui/material";
import React from "react";

export default function ThemeSwitcher() {
    const { mode, setMode } = useColorScheme()
    const [ mounted, setMounted ] = React.useState(false);
    
    React.useEffect(()=> {
        setMounted(true);
    },[])

    if(!mounted) {
        return <div style={{ width: 62, height: 38 }} />;
    }

    const isDark = mode === 'dark';

    const handleToggle = ()=> {
        se
    }

    return (
        <Switch
            checked={darkYn}
            onClick={()=>onClickSwitchMode()}/>
    )
}