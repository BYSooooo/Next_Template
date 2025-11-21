'use client';

import React from "react";
import { Switch } from "@mui/material";
import { ThemeContext } from "../theme/ThemeProvider";

export default function ThemeSwitcher() {
    const { mode, toggleTheme } = React.useContext(ThemeContext);   
    
    return (
        <Switch checked={mode === "dark"} onChange={toggleTheme}/>
    )
}