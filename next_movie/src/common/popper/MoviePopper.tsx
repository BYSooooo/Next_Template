import React from 'react';
import { Box, Divider, Popper, Typography } from "@mui/material";
import GenreList from "./content/GenreList";
import { useAppSelector } from '../../redux/hooks';
import LanguageList from './content/LanguageList';

export default function MoviePopper({anchorEl, name, extra} : {anchorEl : HTMLElement|null, name : string, extra?: any}) {
    const themeYn = useAppSelector((state)=> state.themeReducer).theme;
    const openYn = Boolean(anchorEl)
    const contentSwitcher =()=> {
        switch(name) {
            case "Genres" : 
                return <GenreList genreList={extra}/>
            case "Languages":
                return <LanguageList langList={extra}/> 
            default : break;
                
        } 
    }

    return (
        <Popper
            sx={{
                borderRadius : 4,
                bgcolor : themeYn ? "black" : "white",
                p : 2
            }}
            open={openYn}
            anchorEl={anchorEl}>
            <Typography variant='h6' fontWeight='bold'>
                {name}
            </Typography>
            <Divider />
                <Box>
                    {contentSwitcher()}
                </Box>
        </Popper>
    )
}