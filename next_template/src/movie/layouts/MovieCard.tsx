"use client";

import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import * as React from 'react'
import GenreBox from "../components/GenreBox";
import { useAppSelector } from "@/redux/hook";

export default function MovieCard({key, movie, genre} : {key : number, movie : movieInfo, genre : number[]}) {
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);
    
    const getName = (selected : number) => {
       // Must Modify!
       let selName = ""
        for(var i=0; i<genreList.length; i++) {
            if(genreList[i].id === selected) {
                selName = genreList[i].name
            }
        }
        return selName;
    }

    return (
        <Card key={key} variant='outlined' sx={{ display : 'flex', flexDirection : 'column', maxWidth : 300}}>
            <Stack direction="row">
                <CardMedia
                    sx={{ width: 100}}
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                 <Box sx={{display : 'flex', flexDirection : 'column'}}>
                    <Typography component="div" variant="h5">
                        {movie.original_title}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        {genre.map((id) => {       
                            return (
                                <GenreBox 
                                    id={id} 
                                    name={getName(id)} />
                            )
                        })}
                    </Stack>
                </Box>
            </Stack>
            
           
        </Card>
    )
}