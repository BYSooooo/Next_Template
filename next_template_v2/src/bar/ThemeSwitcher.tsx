'use client';

import { Switch, useMediaQuery } from "@mui/material";
import React from "react";

export default function ThemeSwitcher() {
    
    React.useEffect(()=> {
        const savedTheme = localStorage.getItem('theme');
    },[])
    
    const onChangeTheme = ()=> {

    }

    return (
        <Switch onChange={onChangeTheme}/>
    )
}