"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import * as React from 'react'
import GenreBox from "../components/GenreBox";

export default function MovieCard({movie, genre} : {movie : movieInfo, genre : number[]}) {


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
                <Box sx={{display : 'flex'}}>
                    {genre.map((id) => <GenreBox genre={id} />)}
                </Box>
            </Box>
        </Card>
    )
}