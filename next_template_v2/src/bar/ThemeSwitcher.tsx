'use client';

import { Switch, useColorScheme } from "@mui/material";
import React from "react";

export default function ThemeSwitcher() {
    const [ darkYn, setDarkYn] = React.useState(false)
    const { mode, systemMode, setMode } = useColorScheme();
    
    const onClickSwitchMode = ()=> {
        setDarkYn(!darkYn)
    }

    
    // const onClickSwitchMode = React.useCallback(()=> {
    //     if(mode) {
    //         const curMode = mode === 'dark' ? 'light' : 'dark';
    //         setMode(curMode);
    //     }
    // },[mode, systemMode])

    return (
        <Switch
            checked={darkYn}
            onClick={()=>onClickSwitchMode()}/>
    )
}