"use client"

import React from 'react';

import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useAppSelector } from '@/redux/hook';

export default function DetailTop() {
    const movieDetail : MovieDetail[] = useAppSelector((state)=> state.movieDetail)
    const detail = movieDetail[0];
    console.log(detail)

    return (
        <Stack direction='row'>
            <img
                // src={detail.poster_path && `https://image.tmdb.org/t/p/w500${detail.posterPath}`} 
                alt='loading...'/>
            
            <Typography variant='h2'>
                
            </Typography>
        </Stack>
        
    )
}