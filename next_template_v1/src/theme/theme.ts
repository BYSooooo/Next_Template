import { Inter } from "next/font/google";

import { SxProps, Theme } from "@mui/material/styles";

const GoogleInterFont = Inter( {subsets: ['latin']});


/* Movie Detail Box Light Style in Top Part  */
export const lightBoxStyle : SxProps<Theme> = (
    {
        backgroundColor : 'rgba(0, 0, 0, 0.08)' ,    
        borderRadius : 2,
        p : 1 
    }
)
/* Movie Detail Box Dark Style in Top Part */
export const darkBoxStyle : SxProps<Theme> = (
    {
        backgroundColor : 'rgba(255, 255, 255, 0.1)',
        borderRadius : 2,
        p : 1 
    }
)
/* Movie Detail Grid Light Style in Middle Part */
export const lightGridStyle : SxProps<Theme> = (
    {
        height : '25vh',
        borderRadius : 2,
        backgroundColor : 'ghostWhite',
        p : 1 
    }
)
/* Movie Detail Grid Dark Style in Middle Part */
export const darkGridStyle : SxProps<Theme> = (
    {
        height : '25vh',
        borderRadius : 2,
        backgroundColor : 'rgba(255, 255, 255, 0.1) ',
        p : 1
    }
)