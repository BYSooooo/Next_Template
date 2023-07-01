"use client";

import { Box, Card, CardMedia, Typography } from "@mui/material";
import * as React from 'react'

interface movieInfo {
    adult : boolean,
    backdrop_path : string,
    gen_ids : [number],
    id : number,
    original_language : string,
    original_title : string,
    overview : string,
    poster_path : string,
    release_date : string,
    video : boolean,
    vote_average : number,
    vote_count : number
}

export default function MovieCard({movie} : {movie : movieInfo}) {
    
    return (
        <Card variant='outlined' sx={{ display : 'flex', flexDirection : 'column', maxWidth : 300}}>
            <CardMedia
                sx={{ width: 100}}
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <Box sx={{display : 'flex', flexDirection : 'column'}}>
                <Typography component="div" variant="h5">
                    {movie.original_title}
                </Typography>
                <Typography component="div" color="text.secondary" variant="subtitle1" >
                    SubTitle
                </Typography>
            </Box>
        </Card>
    )
}