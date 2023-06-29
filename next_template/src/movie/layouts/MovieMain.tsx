"use client"

import * as React from 'react';
import { Box, Container, Link, Typography } from "@mui/material";
import { getPopular } from '../components/FetchData';


export default function MovieMain() {

    React.useEffect(()=> {
        const result : Promise<JSON> = getPopular()
        console.log(result)
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