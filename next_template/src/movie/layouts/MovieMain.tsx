"use client"

import * as React from 'react';
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { getGenre, getPopular } from '../components/FetchData';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import MovieCard from './MovieCard';
import { setGenreList, setPopularList } from '@/redux/features/movieReducer';


export default function MovieMain() {
    const popular : Array<any> = useAppSelector((state) => state.moviePopular);
    const genreList : Array<any> = useAppSelector((state) => state.movieGenre);

    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        //get Popular Movie List 20
        getPopular().then((lists) => {
            dispatch(setPopularList(lists))
        })

        // get Movie Genres List
        getGenre().then((genres) => {
            dispatch(setGenreList(genres))
        })
    },[])

    console.log("popular : ",popular)
    console.log("genre : ", genreList)

    return (
        <Container maxWidth="lg">
        <Box>
            <Typography variant='h4' component="h1" gutterBottom>
                This is Movie Page
            </Typography>
            <Link href="/">
                Route to Home
            </Link>
        </Box>
        <Typography variant='h4'>
            Popular Movie List in 20
        </Typography>
        <Stack spacing={{ xs : 1}} direction="row" sx={{ overflow : "auto"}}>
            {popular.map((item:movieInfo) => {
                return (
                    <MovieCard key={item.id} movie={item} genre={item.genre_ids}/>
                )
            })}
        </Stack>
    </Container>
    
    )
}