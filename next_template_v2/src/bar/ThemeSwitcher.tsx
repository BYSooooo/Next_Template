'use client';

import React from "react";
import { Switch, useColorScheme } from "@mui/material";
import { ThemeContext } from "../theme/ThemeProvider";

export default function ThemeSwitcher() {
    const { mode} = useColorScheme()
    const darkYn = mode === 'dark';
    

    return (
        <Switch checked={mode === "dark"} onChange={toggleTheme}/>
    )
}