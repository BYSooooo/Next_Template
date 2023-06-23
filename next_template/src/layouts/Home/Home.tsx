"use client";

import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

export default function Home() {
    return (
        <Container maxWidth="lg">
            <Box>
                <Typography variant='h4' component="h1" gutterBottom>
                    Home View
                </Typography>
                <Link href="/about">
                    Route to About Page
                </Link>
            </Box>
        </Container>
    )
}