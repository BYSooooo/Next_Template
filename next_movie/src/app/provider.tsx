"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { useAppSelector } from "../redux/hooks"
import React from "react";

export default function ModeProvider({children} : {children  : React.ReactNode}) {
    const appSelector = useAppSelector((state)=> state.themeReducer);

    const themeSelect = React.useMemo(()=> 
        createTheme({
            palette : {
                mode : appSelector.theme ? 'dark' : 'light'
            }
        }),[appSelector.theme]
    )

    return (
        <ThemeProvider theme={themeSelect}>
            {children}
        </ThemeProvider>
    )
}