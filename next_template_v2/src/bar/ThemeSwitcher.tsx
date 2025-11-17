'use client';

import { Switch } from "@mui/material";
import React from "react";

export default function ThemeSwitcher() {
    const [theme, setTheme] = React.useState();
    
    const onChangeTheme = ()=> {

    }

    return (
        <Switch onChange={onChangeTheme}/>
    )
}