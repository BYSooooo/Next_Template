"use client";

import { Box, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import MainCard from './MainCard';

export default function Home() {

    return (
        <Container maxWidth="lg" sx={{ mt : "5rem", maxWidth : "80vw"}}>
            <Box>
                <Typography variant='h4' component="h1" gutterBottom>
                    Home View
                </Typography>
                <Stack direction="row" spacing={3}>
                    <MainCard path='/movie'/>
                </Stack>
            </Box>
        </Container>
    )
}