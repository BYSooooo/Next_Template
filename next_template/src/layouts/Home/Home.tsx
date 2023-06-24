"use client";

import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import MainCard from './MainCard';

export default function Home() {

    return (
        <Container maxWidth="lg">
            <Box>
                <Typography variant='h4' component="h1" gutterBottom>
                    Home View
                </Typography>
                <MainCard />
            </Box>
        </Container>
    )
}