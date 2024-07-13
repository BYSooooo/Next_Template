"use client";

import React from 'react';
import { Switch, useMediaQuery } from "@mui/material";
import { useAppDispatch } from '../redux/hooks';
import { setTheme } from '../redux/features';

export default function ModeSwitch() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    
    const [mode, setMode] = React.useState<boolean>(true)
    const dispatch = useAppDispatch();
    
    React.useEffect(()=> {
        setMode(prefersDarkMode ? true : false)
        dispatch(setTheme({theme : prefersDarkMode ? 'true' : 'false'}));
        console.log(prefersDarkMode)
    },[])

    const onchangeMode = (event : React.ChangeEvent<HTMLInputElement>)=> {
        setMode(event.target.checked)
    }
    
    return (
        <Switch 
            checked={mode} 
            onChange={onchangeMode}
            inputProps={{ 'aria-label' : 'controlled'}}
        />
    )    
}