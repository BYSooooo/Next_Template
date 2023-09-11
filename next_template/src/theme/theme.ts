import { Inter } from "next/font/google";
import React from 'react';
import { createTheme } from "@mui/material/styles";

const GoogleInterFont = Inter( {subsets: ['latin']});

const theme = (selectedMode : 'light' | 'dark') => createTheme({
    palette : {
        mode : selectedMode
    },

    // components : {
    //     MuiContainer : {
    //         styleOverrides : {
    //             root : {
    //                 backgroundColor : 'snowWhite',
                    
    //             }           
    //         }
    //     }

    // }
    
})

export default theme;