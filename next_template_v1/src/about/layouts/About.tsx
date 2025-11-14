"use client";

import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

export default function About() {
    return (
        <Container maxWidth="lg">
            <Box>
                <Typography variant='h4' component="h1" gutterBottom>
                    This is About Page
                </Typography>
                <Link href="/">
                    Route to Home
                </Link>
            </Box>
        </Container>
    )
}