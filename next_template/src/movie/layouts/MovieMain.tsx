"use client"

import * as React from 'react';
import { Box, Container, Link, Typography } from "@mui/material";
import { getPopular } from '../components/FetchData';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setList } from '@/redux/features/movieReducer';


export default function MovieMain() {
    const popular = useAppSelector((state) => state.moviePopular);
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        getPopular().then((results) => {
            dispatch(setList({...results}))
        })
    },[])

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
    </Container>
    )
}