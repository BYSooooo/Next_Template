"use client";

import * as React from 'react';

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import MovieCard from '../components/MovieCard';
import MessengerCard from '../components/MessengerCard';

export default function Home() {

    return (
        <Container maxWidth="lg" sx={{ mt : "5rem", maxWidth : "80vw"}}>
            <Box>
                <Typography variant='h4' component="h1" gutterBottom fontWeight='bold'>
                    Project List
                </Typography>
                <Stack direction="row" spacing={3}>
                    <MovieCard path='/movie'/>
                    <MessengerCard path='/messenger' />
                </Stack>
            </Box>
        </Container>
    )
}