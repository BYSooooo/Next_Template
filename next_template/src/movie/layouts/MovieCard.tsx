"use client";

import { useAppSelector } from "@/redux/hook";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import * as React from 'react'
import { getGenre } from "../components/FetchData";

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

interface MovieGenreInfo {
    id : number,
    text : string
}



export default function MovieCard({movie, genre} : {movie : movieInfo, genre : number[]}) {
    const genreList : Array<any> = useAppSelector((state) => state.movieGenre);
    const [selected, setSelected ] = React.useState([]);
    React.useEffect(()=> {
        getGenre().then(() => {
            setSelected(genre.filter((id) => {
               genreList.forEach(listed => {
                    if(listed.id === id) {
                        return {id : listed.id, text : listed.text};
                    }
               }); 
            }))
        });
        
    },[])
    console.log(selected)
    
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
                    genre.map(())
                </Typography>
            </Box>
        </Card>
    )
}