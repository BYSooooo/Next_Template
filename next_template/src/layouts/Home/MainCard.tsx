"use client";

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

interface item {
    path : string
}

export default function MainCard() {
    const [url, setUrl] = React.useState("");
    React.useEffect(()=> {
        setUrl("/about")
    },[])
    return (
        <Card sx={{maxWidth : 350}}>
            <CardActionArea href={`${url}`}>
                <CardMedia
                    component="img"
                    height="200"
                    image=''
                    alt='' />
                <CardContent>
                    <Typography gutterBottom variant='h5' component="div">
                        About Page
                    </Typography>
                    <Typography variant='body2' color="text.secondary">
                        This is About Page View Detail Text Area. 
                        If you click this Card, you route to About Page
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    )

}