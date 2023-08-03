"use client"
import React from 'react';


import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import { useAppSelector } from '@/redux/hook';

export default function SearchMain() {
    const searchResult = useAppSelector((state) => state.searchResult);


    return (
        <Container sx={{mt : "5rem", maxWidth : "80vw"}}>
            <Typography variant='h4'>
                Result : 
            </Typography>

        </Container>
    )
}