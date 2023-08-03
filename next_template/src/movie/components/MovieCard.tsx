"use client";

import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import * as React from 'react'
import GenreBox from "./GenreBox";
import { useAppSelector } from "@/redux/hook";

export default function MovieCard({id,  movie, genre} : { id: number, movie : MovieInfo, genre : number[]}) {
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
        <Card key={id} variant='outlined' sx={{ display : 'block', flexDirection : 'column', minWidth : 400}}>
            <Stack direction="row" >
                <CardMedia
                    key={id}
                    sx={{ width: 120}}
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                 <Box sx={{display : 'flex', flexDirection : 'column', m : 2, }} >
                    <Typography component="div" variant="h5">
                        {movie.original_title}
                    </Typography>
                    <Stack flexWrap="wrap" direction="row" spacing={0.5}>
                        {genre.map((id) => {       
                            return (
                                <GenreBox 
                                    id={id}
                                    key={id}
                                    name={getName(id)} />
                            )
                        })}
                    </Stack>
                </Box>
            </Stack>
        </Card>
    )
}