'use client';

import { Switch, useColorScheme } from "@mui/material";
import React from "react";

export default function ThemeSwitcher() {
    const { mode, systemMode, setMode } = useColorScheme();

    const onClickSwitchMode = React.useCallback(()=> {
        console.log("onClicked")
        console.log(systemMode)
        if(mode) {
            const curMode = mode === 'dark' ? 'light' : 'dark';
            setMode(curMode);
        }
    },[mode, systemMode])

    return (
        <Switch
            checked={mode === 'dark'}
            onClick={()=>onClickSwitchMode()}/>
    )
}