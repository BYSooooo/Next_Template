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
    
    // Get genre List in Movie
    React.useEffect(()=> {
        const fetchGenre = async()=> {
            try {
                const response = await fetch("/api/genre")
                const data = await response.json();
                dispatch(initGenreList(data.genres));
            } catch(error) {
                throw new Error(error);
            }
        }
        fetchGenre()
    },[])

    

    return (
        <ThemeProvider theme={themeSelect}>
            {children}
        </ThemeProvider>
    )
}