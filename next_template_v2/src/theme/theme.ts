"use client"
import { createTheme } from "@mui/material"

export const lightTheme = createTheme({
    cssVariables : true,
    typography : {
        fontFamily : 'var(--font-roboto)'
    },
    palette : {
        mode : 'light'
    }
})

export const darkTheme = createTheme({
    cssVariables : true,
    typography : {
        fontFamily : 'var(--font-roboto)'
    },
    palette : {
        mode : 'dark'
    }
})