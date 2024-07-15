"use client";

import React from 'react';
import { Switch, useMediaQuery } from "@mui/material";
import { useAppDispatch } from '../redux/hooks';
import { setTheme } from '../redux/features';


export default function ModeSwitch() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {noSsr : true});
    
    const [checked, setChecked] = React.useState(false)
    const dispatch = useAppDispatch();
    
    React.useEffect(()=> {
        setChecked(prefersDarkMode)
        dispatch(setTheme({theme : prefersDarkMode}))
        console.log('useEffect Called')
    },[])

    const onchangeMode = (event : React.ChangeEvent<HTMLInputElement>)=> {
        setChecked(event.target.checked)
        dispatch(setTheme({theme : event.target.checked}))    
    }
    
    return (
        <Switch 
            checked={checked}
            onChange={onchangeMode}
            inputProps={{ 'aria-label' : 'controlled'}}
        />
    )    
}