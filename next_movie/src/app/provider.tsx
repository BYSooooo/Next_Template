"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import React from "react";
import { getGenre } from "../components/fetchData";
import { initGenreList } from "../redux/features";

export default function ModeProvider({children} : {children  : React.ReactNode}) {
    const dispatch = useAppDispatch()
    const appSelector = useAppSelector((state)=> state.themeReducer);
    
    const themeSelect = React.useMemo(()=> 
        createTheme({
            palette : {
                mode : appSelector.theme ? 'dark' : 'light'
            }
        }),[appSelector.theme]
    )
    
    React.useEffect(()=> {
        const fetchPopular = async()=> {
            try {
                const response = await fetch("/api/genre")
                const data = await response.json();
                console.log(data)
            } catch(error) {
                throw new Error(error);
            }
        }
        getGenre().then((result)=> dispatch(initGenreList(result)) )
    },[])

    

    return (
        <ThemeProvider theme={themeSelect}>
            {children}
        </ThemeProvider>
    )
}