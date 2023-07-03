"use client"

import * as React from 'react';
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { getPopular } from '../components/FetchData';
import { useAppSelector } from '@/redux/hook';
import MovieCard from './MovieCard';


export default function MovieMain() {
    const popular : Array<any> = useAppSelector((state) => state.moviePopular);

    React.useEffect(()=> {
        getPopular();   //get Popular Movie List 20
         
    },[])

    console.log(popular)
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
        <Stack>
            {popular.map((item:any) => {
                return (
                    <MovieCard key={item.id} movie={item} genre={item.genre_ids}/>
                )
            })}
        </Stack>
    </Container>
    
    )
}