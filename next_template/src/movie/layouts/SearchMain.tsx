"use client"
import React from 'react';

import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainSearch from '../components/main/MainSearch';

import { useAppSelector } from '@/redux/hook';
import { Grid } from '@mui/material';

export default function SearchMain() {
    const searchResult:SearchMovie[]  = useAppSelector((state) => state.searchResult);
    const searchFilter = useAppSelector((state) => state.searchFilter)
    

    return (
        <Container sx={{mt : "5rem", maxWidth : "80vw"}}>
            <MainSearch />
            <Grid container direction='row' sx={{ background : 'skyblue', borderRadius : "1rem", m : 1, p: 1}} columnGap={1}>
                <Box sx={{background : 'white', border : '1px solid white', borderRadius : "0.5rem", p: 0.5}}>
                    <Typography variant='body2'>
                        Result : {searchResult[0].total_results}
                    </Typography>
                </Box>
                <Box sx={{background : 'white', border : '1px solid white', borderRadius : "0.5rem", p: 0.5}}>
                    <Typography variant='body2'>
                        Page : {`${searchResult[0].page} - ${searchResult[0].total_pages}`}
                    </Typography>
                </Box>
            </Grid>
        </Container>
    )
}